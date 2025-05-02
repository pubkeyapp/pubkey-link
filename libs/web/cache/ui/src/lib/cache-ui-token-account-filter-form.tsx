import { Button, Group, TagsInput, Text, TextInput } from '@mantine/core'
import { TokenAccountFilter, TokenAccountFilterAction } from '@pubkey-link/web-cache-data-access'
import React from 'react'

export function CacheUiTokenAccountFilterForm({
  dispatch,
  state,
}: {
  dispatch: (action: TokenAccountFilterAction) => void
  state: TokenAccountFilter
}) {
  return (
    <form>
      <Group align="start">
        <TagsInput
          data={[]}
          placeholder="Owners"
          maw={300}
          value={state.owners}
          onChange={(owners) => dispatch({ type: 'UPDATE_FILTER', field: 'owners', value: owners })}
        />
        <TagsInput
          data={[]}
          placeholder="Addresses"
          maw={300}
          value={state.addresses}
          onChange={(addresses) => dispatch({ type: 'UPDATE_FILTER', field: 'addresses', value: addresses })}
        />

        <TextInput
          leftSection={
            <Text c="dimmed" size="xs" pt={2}>
              Min
            </Text>
          }
          placeholder="Amount Min"
          min={0}
          type="number"
          value={state.amountMin}
          onChange={(e) => dispatch({ type: 'UPDATE_FILTER', field: 'amountMin', value: Number(e.target.value) })}
        />
        <TextInput
          leftSection={
            <Text c="dimmed" size="xs" pt={2}>
              Max
            </Text>
          }
          placeholder="Amount Max"
          min={0}
          type="number"
          value={state.amountMax}
          onChange={(e) => dispatch({ type: 'UPDATE_FILTER', field: 'amountMax', value: Number(e.target.value) })}
        />
        <Button type="button" onClick={() => dispatch({ type: 'RESET' })}>
          Reset
        </Button>
      </Group>
    </form>
  )
}
