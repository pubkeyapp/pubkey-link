import { UserCreateSnapshotInput } from '@pubkey-link/sdk'
import { useUserFindManySnapshot } from '@pubkey-link/web-snapshot-data-access'
import { UserSnapshotUiCreateForm } from '@pubkey-link/web-snapshot-ui'
import { toastError, UiBack, UiCard, UiPage } from '@pubkey-ui/core'
import { useNavigate } from 'react-router-dom'

export function UserSnapshotCreateFeature() {
  const navigate = useNavigate()
  const { createSnapshot } = useUserFindManySnapshot()

  async function submit(input: UserCreateSnapshotInput) {
    return createSnapshot(input)
      .then((res) => {
        if (res) {
          navigate(`/snapshots/${res?.id}`)
        }
      })
      .then(() => true)
      .catch((err) => {
        toastError(err.message)
        return false
      })
  }

  return (
    <UiPage leftAction={<UiBack />} title="Create Snapshot">
      <UiCard>
        <UserSnapshotUiCreateForm submit={submit} />
      </UiCard>
    </UiPage>
  )
}
