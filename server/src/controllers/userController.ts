import type { Request, Response } from "express";
import { PrismaClient } from "@prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";
import { Pool } from "pg";
import dotenv from "dotenv";

dotenv.config();

// Configura el pool igual que en seed.ts
const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
  max: 20,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 2000,
});

const adapter = new PrismaPg(pool);
const prisma = new PrismaClient({ adapter });  // ← PASA EL ADAPTER


export const getUsers = async(req: Request, res: Response): Promise<void> => {
    try {
        const users = await prisma.users.findMany()
        res.status(201).json(users);
    } catch (error) {
        res.status(500).json({message: "Error retrieving users"})
    }
}