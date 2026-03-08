import { z } from 'zod';

export const AssetQuerySchema = z.object( {
  name: z.string(),
  serialNumber: z.string(),
  typeId: z.xor( [ z.string(), z.number() ] )
} );

export const TypeQuerySchema = z.object( {
  name: z.string()
} );

export const FilteringQuerySchema = z.object( {
  search: z.preprocess(
    v => v !== '' ? v : undefined,
    z.string().optional()
  ),
  employeeId: z.preprocess(
    v => v !== '' ? v : undefined,
    z.xor( [ z.string(), z.number() ] ).optional()
  ),
  departmentId: z.preprocess(
    v => v !== '' ? v : undefined,
    z.xor( [ z.string(), z.number() ] ).optional()
  ),
  archived: z.boolean().optional(),
  orphaned : z.boolean().optional()
} );

export const FilteringTypeQuerySchema = z.object( {
  search: z.preprocess(
    v => v !== '' ? v : undefined,
    z.string().optional()
  ),
  companyId: z.preprocess(
    v => v !== '' ? v : undefined,
    z.xor( [ z.string(), z.number() ] ).optional()
  )
} );