import { formatFiles, Tree } from '@nx/devkit'
import { createTreeWithEmptyWorkspace } from '@nx/devkit/testing'
import { addServiceToClassConstructor } from './add-service-to-class-constructor'

describe('add-service-to-service-decorator.ts', () => {
  let tree: Tree
  const sourcePath = 'libs/test/test.service.ts'
  beforeEach(() => {
    tree = createTreeWithEmptyWorkspace()
  })

  it('should inject a service to a service', async () => {
    // ARRANGE
    tree.write(
      sourcePath,
      `import { Injectable } from '@nestjs/common'
@Injectable()
export class ApiCompanyService {
  constructor() {}
}`,
    )

    // ACT
    addServiceToClassConstructor(tree, sourcePath, 'ApiCompanyService', 'test', 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`readonly test: TestService`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Injectable } from '@nestjs/common';
      import { TestService } from './test.service';

      @Injectable()
      export class ApiCompanyService {
        constructor(readonly test: TestService) {}
      }
      "
    `)
  })

  it('should inject a service to a service without a constructor', async () => {
    // ARRANGE
    tree.write(
      sourcePath,
      `import { Injectable } from '@nestjs/common'
@Injectable()
export class ApiCompanyService {}`,
    )

    // ACT
    addServiceToClassConstructor(tree, sourcePath, 'ApiCompanyService', 'test', 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`readonly test: TestService`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Injectable } from '@nestjs/common';
      import { TestService } from './test.service';

      @Injectable()
      export class ApiCompanyService {
        constructor(readonly test: TestService) {}
      }
      "
    `)
  })

  it('should inject a service to a service with existing services', async () => {
    // ARRANGE
    tree.write(
      sourcePath,
      `import { Injectable } from '@nestjs/common';
      import { OtherService } from './other.service';

      @Injectable()
      export class ApiCompanyService {
        constructor(readonly other: OtherService) {}
      }`,
    )

    // ACT
    addServiceToClassConstructor(tree, sourcePath, 'ApiCompanyService', 'test', 'TestService', 'test.service')

    await formatFiles(tree)

    // ASSERT
    expect(tree.read(sourcePath).toString()).toContain(`import { TestService } from './test.service'`)
    expect(tree.read(sourcePath).toString()).toContain(`readonly other: OtherService, readonly test: TestService`)
    expect(tree.read(sourcePath).toString()).toMatchInlineSnapshot(`
      "import { Injectable } from '@nestjs/common';
      import { OtherService } from './other.service';
      import { TestService } from './test.service';

      @Injectable()
      export class ApiCompanyService {
        constructor(readonly other: OtherService, readonly test: TestService) {}
      }
      "
    `)
  })
})
