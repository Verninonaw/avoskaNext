'use client'

import { useEffect, useState } from "react"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { protect } from "@/components/protect"

export default function Orders() {
    protect()

    const [order, setOrder] = useState([])
    const [userId, setUserId] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            setUserId(decode.id)
        }
    }, [])

    const postId = async () => {
        const res = await fetch(`/api/orders/getOrders?userId=${userId}`)
        const data = await res.json()

        if (res.ok) {
            setOrder(data)
        }
    }

    useEffect(() => {
        if (userId) {
            postId()
        }
    }, [userId])

    return (
        <div className="min-h-screen flex items-center justify-center pt-24">
            <div className="flex flex-col gap-3 w-96">
                <h1 className="text-center font-bold text-xl">Список ваших заказов: </h1>
                {order.map((e) => (
                    <div key={e.order_id} className="flex flex-col gap-3 bg-gray-300 rounded-xl p-5 mb-4">

                        <div className="text-center border-b border-gray-400 pb-2">
                            <p className="font-bold text-lg">Заказ № {e.order_id}</p>
                        </div>

                        <div className="flex flex-row justify-between border-b">

                            <div className="flex flex-col">
                                <span>Наименование:</span>
                                <p className="font-medium">{e.product_name}</p>
                            </div>

                            <div className="text-right flex flex-col ">
                                <span>Количество:</span>
                                <p className="font-medium text-x">{e.count} шт.</p>
                            </div>

                        </div>

                        <div className="text-center">
                            <span>Статус:</span>
                            {e.status_name === 'Новое' ? <p className="text-yellow-500 font-medium">{e.status_name}</p> : e.status_name === 'Подтверждено' ? <p className="text-green-500 font-medium">{e.status_name}</p> : <p className="text-red-500 font-medium">{e.status_name}</p>}
                        </div>
                    </div>
                ))}
                <Link href='/catalog' className="bg-gray-300 rounded-xl p-2 cursor-pointer text-center">Новый заказ</Link>
            </div>
        </div>
    )
}