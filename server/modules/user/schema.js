import { z } from 'zod';

export const AuthSchema = z.object( {
  email: z.email( { error: 'Email has invalid format' } ),
  password: z.string().min( 8, 'Password must be ≥ 8 characters' )
} );