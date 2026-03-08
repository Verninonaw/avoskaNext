import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import bcrypt from 'bcrypt'

export async function POST(req) {
    try {
        const { surname, number, email, login, password } = await req.json()
        const hash = await bcrypt.hash(password, 10)
        await pool.query('INSERT INTO "user" (id_role, full_name, phone, email, login, password) VALUES (1, $1, $2, $3, $4, $5)', [surname, number, email, login, hash])
        return NextResponse.json({message: 'Вы успешно зарегистрировались!'}, {status: 201})
    } catch(e) {
        if(e.code === '23505') {
            const isLogin = e.detail.includes('login')
            const message = isLogin ? 'Этот логин уже занят' : 'Этот email уже занят'
            return NextResponse.json({message: message}, {status: 400})
        }

        console.error(e)
        return NextResponse.json({ message: 'Ошибка сервера'}, {status: 500})
    }
}