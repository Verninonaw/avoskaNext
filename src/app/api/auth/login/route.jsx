import { pool } from "@/lib/db";
import { NextResponse } from "next/server";
import jwt from 'jsonwebtoken'
import bcrypt from 'bcrypt'
import 'dotenv/config'

export async function POST(req) {
    try {
        const { login, password } = await req.json()
        const result = await pool.query('SELECT * FROM "user" WHERE login = $1', [login])

        const user = result.rows[0]

        if(!user) {
            return NextResponse.json({message: 'Пользователь не найден'}, {status: 401})
        }

        const checkPass = await bcrypt.compare(password, user.password)

        if(!checkPass) {
            return NextResponse.json({message: 'Неверный пароль'}, {status: 401})
        }

        const token = jwt.sign(
            {id: user.id, name: user.full_name, role: user.id_role}, process.env.JWT_SECRET
        )

        return NextResponse.json({message: 'Вы успешно авторизовались!', token, user: {name: user.name, role: user.id_role}}, {status: 200} )
    } catch(e) {
        console.error(e)
        return NextResponse.json({message: 'Ошибка сервера'}, {status: 500})
    }
    
}