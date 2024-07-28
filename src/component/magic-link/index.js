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
            const apiData = new FormData()
            apiData.append("magic_link_token",token)
            axiosInstance.post(`/auth/verify-magic-link`, apiData).then((res) => {
                localStorage.setItem('userDetails', JSON.stringify(res.data.data))
                // setToken(res.data.access_token)

                // setUserInfo({ ...res.data.data, ...res.data.user_info })
                router.push(`/home`)
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