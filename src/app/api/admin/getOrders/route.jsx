import { NextResponse } from "next/server"
import { pool } from "@/lib/db"

export async function GET() {
    try {
        const orders = await pool.query(`
            SELECT 
                o.id AS order_id,
                u.full_name AS customer_name,
                p.name AS product_name,
                o.count,
                (o.count * p.price) AS total_price,
                s.name AS status_name,
                o.address
            FROM "order" o
            JOIN "user" u ON o.id_user = u.id   -- Было userId, теперь id_user
            JOIN "product" p ON o.id_product = p.id -- Было productId, теперь id_product
            JOIN "status" s ON o.id_status = s.id   -- Было statusId, теперь id_status
            ORDER BY o.id DESC
        `,)
        return NextResponse.json(orders.rows, { status: 200 })
    } catch (e) {
        console.error(e)
        return NextResponse.json({ message: 'Ошибка сервера' }, { status: 500 })
    }

}