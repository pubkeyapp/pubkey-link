import { ActionIcon, Button, Popover, Stack, TextInput } from '@mantine/core'
import { IconChevronDown, IconClipboard, IconSearch } from '@tabler/icons-react'
import { useState } from 'react'
import { useQueryState, parseAsString } from 'nuqs'

export function CollectionUiOwnerSearch() {
  const [opened, setOpened] = useState(false)

  const [ownerSearch, setOwnerSearch] = useQueryState('owner', parseAsString.withDefault(''))

  const [searchValue, setSearchValue] = useState(ownerSearch)

  function handleApply() {
    setOwnerSearch(searchValue.trim())
    setOpened(false)
  }

  async function handlePaste() {
    try {
      const text = await navigator.clipboard.readText()
      setSearchValue(text.trim())
    } catch (err) {
      console.error('Failed to read clipboard:', err)
    }
  }

  return (
    <Popover width={320} position="bottom-start" opened={opened} onChange={setOpened}>
      <Popover.Target>
        <Button
          variant="default"
          color="gray"
          rightSection={<IconChevronDown size={16} />}
          onClick={() => setOpened((o) => !o)}
          style={{
            backgroundColor: ownerSearch ? 'var(--mantine-color-blue-light)' : undefined,
            borderColor: ownerSearch ? 'var(--mantine-color-blue-6)' : undefined,
          }}
        >
          Owner {ownerSearch && '✓'}
        </Button>
      </Popover.Target>

      <Popover.Dropdown>
        <Stack gap="md">
          <div>
            <h4 style={{ margin: '0 0 8px 0', fontSize: '14px', fontWeight: 600 }}>Owner</h4>

            <TextInput
              placeholder="Search by address"
              value={searchValue}
              onChange={(e) => setSearchValue(e.target.value)}
              leftSection={<IconSearch size={16} />}
              rightSection={
                <ActionIcon variant="subtle" size="sm" color="blue" onClick={handlePaste} title="Paste from clipboard">
                  <IconClipboard size={16} />
                </ActionIcon>
              }
            />
          </div>

          <Button onClick={handleApply} disabled={!searchValue.trim()} fullWidth>
            Apply
          </Button>

          {ownerSearch && (
            <Button
              variant="light"
              color="gray"
              onClick={() => {
                setOwnerSearch('')
                setSearchValue('')
                setOpened(false)
              }}
              fullWidth
            >
              Clear
            </Button>
          )}
        </Stack>
      </Popover.Dropdown>
    </Popover>
  )
}
