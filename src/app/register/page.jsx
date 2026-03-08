"use client"

import Link from "next/link"
import { useState } from "react"

export default function Reg() {

    const [surname, setSurname] = useState('')
    const [number, setNumber] = useState('')
    const [email, setEmail] = useState('')
    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')


    const regis = async () => {
        const res = await fetch('/api/auth/regsiter', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                surname: surname,
                number: number,
                email: email,
                login: login,
                password: password
            })
        })
        const data = await res.json()

        if (res.ok) {
            setError('')
            setTimeout(() => {
                window.location.href = '/login'
            }, 750);
            setCorrect(data.message)
        }

        else {
            setError(data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 w-96">
                <h1 className="text-center font-medium text-xl">Регистрация</h1>
                <input type="text" className="bg-gray-200 rounded-xl p-2" placeholder="Введите ФИО" value={surname} onChange={(e) => setSurname(e.target.value)} />
                <input type="number" className="bg-gray-200 rounded-xl p-2" placeholder="Введите номер телефона" value={number} onChange={(e) => setNumber(e.target.value)} />
                <input type="email" className="bg-gray-200 rounded-xl p-2" placeholder="Введите email" value={email} onChange={(e) => setEmail(e.target.value)} />
                <input type="text" placeholder="Введите логин" className="rounded-xl bg-gray-200 p-2" value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="password" placeholder="Введите пароль" className="rounded-xl bg-gray-200 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={regis} className="bg-gray-400 rounded-xl p-2 cursor-pointer mt-3">Зарегистрироваться</button>
                <Link href='/login' className="bg-gray-400 rounded-xl p-2 cursor-pointer mt-3 text-center">Уже зарегистрирован? Войти</Link>
                {error && <div className="bg-red-300 rounded-xl flex items-center justify-center p-2">{error}</div>}
                {correct && <div className="bg-green-300 rounded-xl flex items-center justify-center p-2">{correct}</div>}
            </div>
        </div>
    )
}