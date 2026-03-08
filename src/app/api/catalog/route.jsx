import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function GET() {
    try {
        const product = await pool.query('SELECT * FROM product')
        return NextResponse.json(product.rows, {status: 200})
    } catch(e) {
        console.error(e)
        return NextResponse.json({status: 500})
    }
}