'use client'
import Link from 'next/link';
import { useEffect, useState } from 'react';

export function Header() {

    const [isUser, setIsUser] = useState()

    useEffect(() => {
        const token = localStorage.getItem('token')
        setIsUser(token)
    }, [])

    const logout = () => {
        localStorage.removeItem('token')
        window.location.href = '/'
    }

    return (
        <header className="fixed top-0 w-full bg-gray-200 z-50">
            <div className="container mx-auto px-4 h-16 flex items-center justify-between">
                <div className='w-24'></div>
                <Link href="/" className="text-2xl font-black tracking-tighter text-black">АВОСЬКА</Link>
                <div className="w-24 flex justify-end">
                    {isUser ? <button onClick={logout} className="px-4 py-2 bg-black text-white font-medium rounded-full cursor-pointer">Выйти</button> : <Link href="/login" className="px-4 py-2 bg-black text-white font-medium rounded-full">Войти</Link> }  
                </div>
            </div>
        </header>
    );
}