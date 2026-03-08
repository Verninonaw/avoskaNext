"use client"
import { jwtDecode } from "jwt-decode"
import Link from "next/link"
import { useEffect, useState } from "react"
import { protect } from "@/components/protect"
export default function Catalog() {

    const [userName, setUserName] = useState('')
    const [product, setProduct] = useState([])

    useEffect(() => {
        const token = localStorage.getItem('token')
        if (token) {
            const decode = jwtDecode(token)
            setUserName(decode.name)
        }
    }, [])

    protect()

    useEffect(() => {
        const render = async () => {
            const res = await fetch('/api/catalog')
            const data = await res.json()

            setProduct(data)
        }
        render()
    }, [])

    return (
        <div className="min-h-screen flex items-center justify-center">
            <div className="flex flex-col gap-3 w-96">
                <h1 className="text-center font-bold">Добро пожаловать, {userName}</h1>
                <p className="text-center font-medium">Ниже представлен каталог товаров:</p>
                {product.map((e) => (
                    <div className="flex flex-col gap-3 w-96 bg-gray-300 rounded-xl p-2" key={e.id}>
                        <p className="text-center">Наименование: {e.name}</p>
                        <p className="text-center">Цена: {e.price}</p>
                        <Link href={`/checkout/${e.id}`} className="bg-gray-200 rounded-full text-center p-2">Купить</Link>
                    </div>
                ))}
                <Link href='/orders' className="bg-gray-300 rounded-xl p-2 cursor-pointer text-center">Мои заказы</Link>
            </div>
        </div>
    )
}