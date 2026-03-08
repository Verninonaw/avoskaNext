'use client'
import { useParams, useRouter } from "next/navigation"
import { jwtDecode } from "jwt-decode"
import { useEffect, useState } from "react"
import Link from "next/link"
import { protect } from "@/components/protect"
export default function Checkout() {
    protect()

    const { id } = useParams()

    const [userId, setUserId] = useState('')

    const navigate = useRouter()

    const [adress, setAdress] = useState('')
    const [count, setCount] = useState('')
    const [error, setError] = useState('')
    const [correct, setCorrect] = useState('')


    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            setUserId(decode.id)
        }
    }, [])

    const addOrder = async () => {
        const res = await fetch('/api/orders/addOrder', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                adress: adress,
                count: count,
                userId: userId,
                productId: id
            })
        })

        const data = await res.json()

        if (res.ok) {
            setError('')
            setTimeout(() => {
                navigate.push('/catalog')
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
                <h1 className="text-center text-xl font-bold">Оформление заказа</h1>
                <input type="email" className="bg-gray-200 rounded-xl p-2" placeholder="Введите адресс" value={adress} onChange={(e) => setAdress(e.target.value)} />
                <input type="number" placeholder="Укажите количество" className="rounded-xl bg-gray-200 p-2" value={count} onChange={(e) => setCount(e.target.value)} />
                <button onClick={addOrder} className="bg-gray-300 rounded-xl p-2 cursor-pointer mt-3">Заказать</button>
                <Link href='/catalog' className="bg-gray-300 rounded-xl p-2 cursor-pointer text-center">Назад</Link>
                {error && <div className="bg-red-300 rounded-xl flex items-center justify-center p-2">{error}</div>}
                {correct && <div className="bg-green-300 rounded-xl flex items-center justify-center p-2">{correct}</div>}
            </div>
        </div>
    )
}