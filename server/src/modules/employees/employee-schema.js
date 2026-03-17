import { z } from 'zod';

export const EmployeeSchema = z.object( {
  name: z.string(),
  companyId: z.number(),
  archived: z.boolean()
} );

export const EmployeeFilteringSchema = z.object( {
  search: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  companyId: z.xor( [ z.string(), z.number() ] ).transform( v => Number( v ) ).optional(),
  createdAt: z.xor( [ z.string(), z.number() ] ).transform( v => Number( v ) ).optional(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false ).optional()
} );

export const EmployeeSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v.toUpperCase() ).default( 'ASC' ).optional()
  ),
  sort: z.preprocess(
    v => [ 'id', 'name', 'email', 'assets', 'createdAt' ].includes( v ) ? v : undefined,
    z.enum( [ 'id', 'name', 'email', 'assets', 'createdAt' ] ).default( 'id' ).optional()
  )
} );