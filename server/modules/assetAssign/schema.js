import { z } from 'zod';

export const AssetAssignSchema = z.object( {
  employeeId: z.string(),
  assetId: z.string()
} );

export const FilteringSchema = z.object( {
  employeeId: z.string().optional(),
  assetId: z.string().optional()
} );

export const SortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).default( 'desc' ).optional()
  ),
  sort: z.preprocess(
    v => [ 'id' ].includes( v ) ? v : undefined,
    z.enum( [ 'id' ] ).default( 'id' ).optional()
  )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );