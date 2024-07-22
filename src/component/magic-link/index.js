"use client";

import React, { useEffect } from "react";
import { useRouter, useSearchParams } from 'next/navigation'
import { axiosInstance } from "@/api/base";
import { toast } from "react-toastify";
import { setToken, setUserInfo } from "@/utils/auth.util";

function MagicLinkContent() {
    const searchParams = useSearchParams()
    const router = useRouter()

    useEffect(() => {
        const token = searchParams.get('token')
        if (token) {
            axiosInstance.get(`/auth/magic-link/${token}`).then((res) => {
                setToken(res.data.access_token)
                setUserInfo({ ...res.data.data, ...res.data.user_info })
                router.push(`/dashboard`)
            }).catch((error) => {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            })
        }
    }, [])
    return
}

export default MagicLinkContent;