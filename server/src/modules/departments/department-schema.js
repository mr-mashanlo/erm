import { z } from 'zod';

export const DepartmentQuerySchema = z.object( {
  name: z.string()
} );