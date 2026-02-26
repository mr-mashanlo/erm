import { z } from 'zod';

export const AssetQuerySchema = z.object( {
  name: z.string(),
  serialNumber: z.string(),
  typeId: z.string().transform( ( v ) => Number( v ) )
} );

export const FilteringQuerySchema = z.object( {
  search: z.preprocess(
    ( v ) => v !== '' ? v : undefined,
    z.string().optional()
  ),
  employeeId: z.preprocess(
    ( v ) => v !== '' ? v : undefined,
    z.string().optional()
  )
} );