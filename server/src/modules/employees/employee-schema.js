import { z } from 'zod';

export const EmployeeSchema = z.object( {
  name: z.string(),
  departmentId: z.number()
} );