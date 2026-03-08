import { z } from 'zod';

export const EmployeeQuerySchema = z.object( {
  name: z.string(),
  departmentId: z.xor( [ z.string(), z.number() ] ),
  companyId: z.xor( [ z.string(), z.number() ] )
} );

export const FilteringQuerySchema = z.object( {
  search: z.preprocess(
    v => v !== '' ? v : undefined,
    z.string().optional()
  ),
  departmentId: z.preprocess(
    v => v !== '' ? v : undefined,
    z.xor( [ z.string(), z.number() ] ).optional()
  ),
  archived: z.boolean().optional()
} );