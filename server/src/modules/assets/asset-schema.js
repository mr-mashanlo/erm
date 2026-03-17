import { z } from 'zod';

export const AssetSchema = z.object( {
  name: z.string(),
  serialNumber: z.string(),
  typeId: z.xor( [ z.string(), z.number() ] ),
  companyId: z.number(),
  archived: z.boolean()
} );

export const AssetFilteringSchema = z.object( {
  search: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  serialNumber: z.string().optional(),
  typeId: z.xor( [ z.string(), z.number() ] ).transform( v => Number( v ) ).optional(),
  companyId: z.xor( [ z.string(), z.number() ] ).transform( v => Number( v ) ).optional(),
  archived: z.xor( [ z.string(), z.boolean() ] ).transform( v => v === 'true' ? true : false ).optional()
} );

export const AssetSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v.toUpperCase() ).default( 'ASC' ).optional()
  ),
  sort: z.preprocess(
    v => [ 'id', 'name', 'serialNumber', 'employee', 'assignedAt' ].includes( v ) ? v : undefined,
    z.enum( [ 'id', 'name', 'serialNumber', 'employee', 'assignedAt' ] ).default( 'id' ).optional()
  )
} );

export const TypeSchema = z.object( {
  name: z.string(),
  slug: z.string(),
  companyId: z.number()
} );

export const TypeFilteringSchema = z.object( {
  search: z.string().optional(),
  name: z.string().optional(),
  slug: z.string().optional(),
  companyId: z.xor( [ z.string(), z.number() ] ).transform( v => Number( v ) ).optional()
} );

export const TypeSortingSchema = z.object( {
  order: z.preprocess(
    v => [ 'asc', 'desc' ].includes( v ) ? v : undefined,
    z.enum( [ 'asc', 'desc' ] ).transform( v => v.toUpperCase() ).default( 'ASC' ).optional()
  ),
  sort: z.preprocess(
    v => [ 'id', 'name' ].includes( v ) ? v : undefined,
    z.enum( [ 'id', 'name' ] ).default( 'id' ).optional()
  )
} );

// export const AssetQuerySchema = z.object( {
//   name: z.string(),
//   serialNumber: z.string(),
//   typeId: z.xor( [ z.string(), z.number() ] ),
//   companyId: z.xor( [ z.string(), z.number() ] )
// } );

// export const TypeQuerySchema = z.object( {
//   name: z.string()
// } );

// export const FilteringQuerySchema = z.object( {
//   search: z.preprocess( v => v || undefined, z.string().optional() ),
//   employeeId: z.preprocess( v => v || undefined, z.xor( [ z.string(), z.number() ] ).optional() ),
//   companyId: z.xor( [ z.string(), z.number() ] ),
//   archived: z.boolean().optional(),
//   orphaned : z.boolean().optional()
// } );

// export const FilteringTypeQuerySchema = z.object( {
//   search: z.preprocess( v => v || undefined, z.string().optional() ),
//   companyId: z.preprocess( v => v || undefined, z.xor( [ z.string(), z.number() ] ).optional() )
// } );