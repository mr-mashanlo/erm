import { z } from 'zod';

export const PaginationQuerySchema = z.object( {
  limit: z.string().transform( v => Number( v ) < 1 ? 0 : Number( v ) ).default( 10 ).optional(),
  page: z.string().transform( v => Number( v ) < 1 ? 1 : Number( v ) ).default( 1 ).optional()
} );

// export const SortingQuerySchema = z.object( {
//   order: z.preprocess(
//     v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
//     z.enum( [ 'asc', 'desc' ] ).transform( v => v.toUpperCase() ).default( 'ASC' ).optional()
//   ),
//   sort: z.preprocess(
//     v => [ 'id', 'name' ].includes( v ) ? v : undefined,
//     z.enum( [ 'id', 'name' ] ).default( 'id' ).optional()
//   )
// } );

// export const FilteringQuerySchema = z.object( {
//   search: z.preprocess(
//     v => v !== '' ? v : undefined,
//     z.string().optional()
//   )
// } );