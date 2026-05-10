import 'dotenv/config';

import { PrismaPg } from '@prisma/adapter-pg';

import { PrismaClient } from '../generated/client.ts';

const adapter = new PrismaPg( { connectionString: process.env.DB_URL } );

export const prisma = new PrismaClient( { adapter } );