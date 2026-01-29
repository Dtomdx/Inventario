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

export const getExpensesByCategory = async(req: Request, res:Response): Promise<void> => {
    console.log("getExpenseByCategory")
    try {
        const expenseByCategorySummaryRaw = await prisma.expenseByCategory.findMany({
            take: 5,
            orderBy: {
                date: "desc",
            }
        })
        const expenseByCategorySummary = expenseByCategorySummaryRaw.map(
            (item: any) => ({
                ...item,
                amount: item.amount.toString()
            })
        )
        console.log("siguie")
        res.status(201).json(expenseByCategorySummary);
    } catch (error) {
        res.status(500).json({message: "Error retrieving expenses by category"})
    }

}