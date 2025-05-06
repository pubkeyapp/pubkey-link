import { z } from 'zod'

export const ResolverConfigHeliusSchema = z.object({
  heliusApiKey: z.string().min(1, 'Helius API key is required'),
  heliusCluster: z.enum(['mainnet-beta', 'devnet'], {
    errorMap: () => ({ message: 'Helius cluster must be either "mainnet-beta" or "devnet"' }),
  }),
})

export type ResolverConfigHelius = z.infer<typeof ResolverConfigHeliusSchema>

export function validateResolverConfigHelius(config: unknown): ResolverConfigHelius {
  try {
    return ResolverConfigHeliusSchema.parse(config)
  } catch (error) {
    if (error instanceof z.ZodError) {
      throw new Error(`Validation failed: ${error.errors.map((e) => e.message).join(', ')}`)
    }
    throw new Error('Unknown validation error')
  }
}
