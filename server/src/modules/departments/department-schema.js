import { z } from 'zod';

export const DepartmentSchema = z.object( {
  name: z.string(),
  address: z.string()
} );