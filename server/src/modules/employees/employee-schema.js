import { z } from 'zod';

export const EmployeeQuerySchema = z.object( {
  name: z.string(),
  companyId: z.xor( [ z.string(), z.number() ] )
} );

export const FilteringQuerySchema = z.object( {
  search: z.preprocess(
    v => v !== '' ? v : undefined,
    z.string().optional()
  ),
  archived: z.boolean().optional()
} );