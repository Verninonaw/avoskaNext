import { pool } from "@/lib/db"
import { NextResponse } from "next/server"

export async function GET(req) {
    try {
        const url = new URL(req.url)
        const userId = url.searchParams.get('userId')

        const orders = await pool.query(`SELECT 
        "order".id AS order_id,
        product.name AS product_name,
        product.price AS product_price,
        "order".count,
        status.name AS status_name,
        "order".address,
        "order".created_at
FROM "order"
JOIN product ON "order".id_product = product.id
JOIN status ON "order".id_status = status.id
WHERE "order".id_user = $1
ORDER BY "order".id asc `, [userId])
        return NextResponse.json(orders.rows, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }

}