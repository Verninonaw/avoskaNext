'use client'

import { jwtDecode } from "jwt-decode"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Admin() {

    const [userName, setUserName] = useState('')

    const navigate = useRouter()

    const [orders, setOrders] = useState([])

    const getOrders = async () => {
        const res = await fetch('/api/admin/getOrders')
        const data = await res.json()

        setOrders(data)
    }

    useEffect(() => {
        getOrders()
    }, [])



    const changeStatus = async (orderId, statusId) => {
        const res = await fetch('/api/admin/changeStatus', {
            method: 'PATCH',
            headers: {
                'Content-Type': 'application/json'
            },
            body: JSON.stringify({
                orderId: orderId,
                statusId: statusId
            })
        })

        if (res.ok) {
            await getOrders()
        }
    }

    useEffect(() => {
        const token = localStorage.getItem('token')
        const decoded = jwtDecode(token)
        const fullName = decoded.name
        const nameUser = fullName.split(' ')[1]
        setUserName(nameUser)
        if(decoded.role !== 2) {
            navigate.push('/')
            return
        }

    }, [])

    return (
        <div className="min-h-screen flex flex-col items-center pt-24">
            <div className="flex flex-col gap-3 w-96">
                <h1 className="text-center font-medium">Добро пожаловать, {userName}</h1>
                <h2 className="text-center text-red-500 font-bold">АДМИН - ПАНЕЛЬ</h2>
                {orders.map((e) => (
                    <div key={e.order_id} className="flex flex-col gap-3 bg-gray-300 rounded-xl p-5 mb-4">

                        <div className="text-center border-b border-gray-400 pb-2">
                            <p className="font-bold text-lg">Заказ № {e.order_id}</p>
                        </div>

                        <div className="text-center border-gray-400 pb-2">
                            <p className="font-bold text-lg">ФИО ЗАКАЗЧИКА: {e.customer_name}</p>
                        </div>

                        <div className="flex flex-row justify-between border-b">

                            <div className="flex flex-col">
                                <span>Наименование:</span>
                                <p className="font-medium" style={{ paddingBottom: '10px' }}>{e.product_name}</p>
                                <span>Адрес:</span>
                                <p className="font-medium">{e.address}</p>
                            </div>

                            <div className="text-right flex flex-col ">
                                <span>Количество:</span>
                                <p className="font-medium" style={{ paddingBottom: '10px' }}>{e.count} шт.</p>
                                <span>Сумма:</span>
                                <p className="font-medium">{e.total_price} Р.</p>
                            </div>

                        </div>

                        <div className="text-center">
                            <span>Статус:</span>
                            {e.status_name === 'Новое' ? <p className="text-yellow-500 font-medium">{e.status_name}</p> : e.status_name === 'Подтверждено' ? <p className="text-green-500 font-medium">{e.status_name}</p> : <p className="text-red-500 font-medium">{e.status_name}</p>}
                                <button onClick={() => changeStatus(e.order_id, 2)} className="bg-green-400 font-medium rounded-xl p-2 cursor-pointer mr-3 mt-2">Подтвердить</button>
                                <button onClick={() => changeStatus(e.order_id, 3)} className="bg-red-400 font-medium rounded-xl p-2 cursor-pointer">Отклонить</button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    )
}