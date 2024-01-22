import { formatFiles, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { addServiceToModuleDecorator } from './add-service-to-module-decorator'

describe('add-service-to-module-providers.ts', () => {
  let tree: Tree

  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should add a service to a module file', async () => {
    // ARRANGE
    const sourcePath = 'libs/test/test.module.ts'
    tree.write(
      sourcePath,
      `import { Module } from '@nestjs/common'
@Module({ providers: [] })
export class TestModule {}`,
    )

    // ACT
    addServiceToModuleDecorator(tree, sourcePath, 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`providers: [TestService]`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Module } from '@nestjs/common';
      import { TestService } from './test.service';

      @Module({ providers: [TestService] })
      export class TestModule {}
      "
    `)
  })

  it('should add a service to a module file without a providers array', async () => {
    // ARRANGE
    const sourcePath = 'libs/test/test.module.ts'
    tree.write(
      sourcePath,
      `import { Module } from '@nestjs/common'
@Module({})
export class TestModule {}`,
    )

    // ACT
    addServiceToModuleDecorator(tree, sourcePath, 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`providers: [TestService]`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Module } from '@nestjs/common';
      import { TestService } from './test.service';

      @Module({
        providers: [TestService],
      })
      export class TestModule {}
      "
    `)
  })

  it('should add a service to a module file with existing services', async () => {
    // ARRANGE
    const sourcePath = 'libs/test/test.module.ts'
    tree.write(
      sourcePath,
      `import { Module } from '@nestjs/common'
      import { ATestService } from './test.service';
      import { ZTestService } from './test.service';

@Module({ providers: [ATestService, ZTestService] })
export class TestModule {}`,
    )

    // ACT
    addServiceToModuleDecorator(tree, sourcePath, 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`providers: [ATestService, ZTestService, TestService]`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Module } from '@nestjs/common';
      import { ATestService } from './test.service';
      import { ZTestService } from './test.service';
      import { TestService } from './test.service';

      @Module({ providers: [ATestService, ZTestService, TestService] })
      export class TestModule {}
      "
    `)
  })
})
