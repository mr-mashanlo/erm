import { z } from 'zod';

export const TypeSchema = z.object( {
  name: z.string()
} );

export const FilteringSchema = z.object( {
  name: z.string().optional()
} );

export const SortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).default( 'asc' ).optional()
  ),
  sort: z.preprocess(
    v => [ 'id', 'name' ].includes( v ) ? v : undefined,
    z.enum( [ 'id', 'name' ] ).default( 'id' ).optional()
  )
} );

export const PaginationSchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );