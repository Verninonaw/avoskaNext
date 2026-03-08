import { pool } from "@/lib/db"
import { NextResponse } from "next/server"

export async function PATCH(req) {
    try {
        const { orderId, statusId } = await req.json()
        await pool.query('UPDATE "order" SET id_status = $1 WHERE id = $2', [statusId, orderId])
        return NextResponse.json({status: 200})
    } catch(e) {
        console.error(e)
        return NextResponse.json({status: 500})
    }
} 