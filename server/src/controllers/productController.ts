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

export const getProducts = async(req: Request, res: Response): Promise<void> => {
    try {
        const search = req.query.search?.toString();
        const whereCondition = search 
                                ? {name: {contains: search}}
                                : {}
        const products = await prisma.products.findMany({
            where: whereCondition
            
        })
        res.status(201).json(products)
    } catch (error) {
        res.status(500).json({message: "Error retrieving products"})
    }
}

export const createProduct = async(req: Request, res: Response): Promise<void> => {
    try {
        const {productId, name, price, rating, stockQuantity} = req.body;
        const product = await prisma.products.create({
            data: {
                productId,
                name,
                price,
                rating,
                stockQuantity,
            }
        })
        res.status(201).json(product)
    } catch (error) {
        res.status(500).json({message: "Error creating products"})
    }
}