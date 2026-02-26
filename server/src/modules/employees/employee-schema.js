import { z } from 'zod';

export const EmployeeQuerySchema = z.object( {
  name: z.string(),
  departmentId: z.string().transform( ( v ) => Number( v ) ).optional()
} );

export const FilteringQuerySchema = z.object( {
  search: z.preprocess(
    ( v ) => v !== '' ? v : undefined,
    z.string().optional()
  ),
  departmentId: z.preprocess(
    ( v ) => v !== '' ? v : undefined,
    z.string().optional()
  )
} );