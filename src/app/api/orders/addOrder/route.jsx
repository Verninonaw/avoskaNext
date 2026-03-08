import { pool } from "@/lib/db";
import { NextResponse } from "next/server";

export async function POST(req) {
    try {
        const { adress, count, userId, productId } = await req.json()
        await pool.query('INSERT INTO "order" (id_user, id_product, id_status, count, address) VALUES ($1, $2, 1, $3, $4)', [userId, productId, count, adress])
        return NextResponse.json({ message: 'Заказ успешно оформлен!' }, { status: 200 })
    }catch(e) {
        console.error(e)
        return NextResponse.json({ message: 'Ошибка сервера'}, {status: 500})
    }
}