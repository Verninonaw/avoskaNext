"use client"
import { jwtDecode } from "jwt-decode";
import Link from "next/link";
import { useState, useEffect } from "react";

export default function Home() {

  const [isUser, setIsUser] = useState()
  const [role, setRole] = useState()

  useEffect(() => {
    const token = localStorage.getItem('token')
    if (token) {
      const decode = jwtDecode(token)
      const role = (decode.role)
      setRole(role)
      setIsUser(token)
    }
  }, [])

  return (
    <main className="flex flex-col min-h-screen items-center gap-3 justify-center bg-black">
      <h1 className="text-4xl font-bold text-white">Добро пожаловать!</h1>
      <p className="text-4xl font-bold text-white">Авоська - современный интернет магазин</p>
      {role === 2 ?
        <div>
          <p className="text-4xl font-bold text-white">Для администрирования нажмите кнопку ниже.</p>
          <Link href='/paneladmin' className="bg-white font-bold rounded-full p-2 w-full flex items-center justify-center text-center mt-10">АДМИН - ПАНЕЛЬ</Link>
        </div>
        :
        role === 1 ?
          <div>
            <p className="text-4xl font-bold text-white">Загляните к нам в каталог!</p>
            <Link href='/catalog' className="bg-white font-bold rounded-full p-2 w-full flex items-center justify-center text-center mt-10">КАТАЛОГ</Link>
          </div>
          :
          <div>
            <p className="text-4xl font-bold text-white">Для продолжения - авторизируйтесь</p>
            <Link href='/login' className="bg-white font-bold rounded-full p-2 w-full flex items-center justify-center text-center mt-10">ВОЙТИ</Link>
          </div>}
    </main>
  )
}