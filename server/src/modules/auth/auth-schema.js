import { z } from 'zod';

export const AuthSchema = z.object( {
  email: z.email().min( 4, 'Email has invalid format' ),
  password: z.string().min( 8, 'Password must be at least 8 characters long' )
} );