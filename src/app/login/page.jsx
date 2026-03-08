"use client"

import Link from "next/link"
import { useRouter } from "next/navigation"
import { useState } from "react"

export default function Login() {

    const [login, setLogin] = useState('')
    const [password, setPassword] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')

    const navigate = useRouter()

    const logina = async () => {
        const res = await fetch('/api/auth/login', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                login: login,
                password: password
            })
        })

        const data = await res.json()

        if (res.ok) {
            localStorage.setItem('token', data.token)
            setError('')
            setCorrect(data.message)

            if (data.user.role === 2) {
                setTimeout(() => {
                    window.location.href = '/paneladmin'
                }, 750);
            }
            else {
                setTimeout(() => {
                    window.location.href = '/catalog'
                }, 750);
            }

        }
        else {
            setError(data.message)
        }
    }

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 w-96">
                <h1 className="text-center font-medium text-xl">Авторизация</h1>
                <input type="text" placeholder="Введите логин" className="rounded-xl bg-gray-200  p-2" value={login} onChange={(e) => setLogin(e.target.value)} />
                <input type="text" placeholder="Введите пароль" className="rounded-xl bg-gray-200 p-2" value={password} onChange={(e) => setPassword(e.target.value)} />
                <button onClick={logina} className="bg-gray-400 rounded-xl p-2 cursor-pointer mt-3">Войти</button>
                <Link href='/register' className="bg-gray-400 rounded-xl p-2 cursor-pointer mt-3 text-center">Еще не зарегистрированы?</Link>
                {error && <div className="bg-red-300 rounded-xl flex items-center justify-center p-2">{error}</div>}
                {correct && <div className="bg-green-300 rounded-xl flex items-center justify-center p-2">{correct}</div>}
            </div>
        </div>
    )
}
