'use client'
import { useRouter } from "next/navigation";
import { useEffect } from "react";

export function protect() {
    const navigate = useRouter()
    useEffect(() => {
        const token = localStorage.getItem('token')
        if(!token) {
            navigate.push('/login')
        }
    })
}