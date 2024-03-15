import { UserUpdateTeamInput } from '@pubkey-link/sdk'
import { useSdk } from '@pubkey-link/web-core-data-access'
import { toastError, toastSuccess } from '@pubkey-ui/core'
import { useQuery } from '@tanstack/react-query'

export function useUserFindOneTeam({ teamId }: { teamId: string }) {
  const sdk = useSdk()
  const query = useQuery({
    queryKey: ['user', 'find-one-team', teamId],
    queryFn: () => sdk.userFindOneTeam({ teamId }).then((res) => res.data),
    retry: 0,
  })
  const item = query.data?.item ?? undefined

  return {
    item,
    query,
    addTeamMember: async (userId: string) =>
      sdk
        .userAddTeamMember({ teamId, userId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Team member added')
            await query.refetch()
            return true
          }
          toastError('Team member not added')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    removeTeamMember: async (userId: string) =>
      sdk
        .userRemoveTeamMember({ teamId, userId })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Team member removed')
            await query.refetch()
            return true
          }
          toastError('Team member not removed')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
    updateTeam: async (input: UserUpdateTeamInput) =>
      sdk
        .userUpdateTeam({ teamId, input })
        .then((res) => res.data)
        .then(async (res) => {
          if (res) {
            toastSuccess('Team updated')
            await query.refetch()
            return true
          }
          toastError('Team not updated')
          return false
        })
        .catch((err) => {
          toastError(err.message)
          return false
        }),
  }
}
