import { z } from 'zod';

export const AssetSchema = z.object( {
  name: z.string(),
  serialNumber: z.string(),
  employeeId: z.number()
} );