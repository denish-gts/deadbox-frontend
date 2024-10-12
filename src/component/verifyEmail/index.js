"use client";

import  { useEffect } from "react";
import { useParams, useRouter } from 'next/navigation'
import { axiosInstance } from "@/api/base";
import { toast } from "react-toastify";
import { setUserInfo, setToken } from "@/utils/auth.util";

function VerifyEmailContent() {
    const router = useRouter();

    const params = useParams(); // Access dynamic route parameters
    const { email, token } = params;

    useEffect(() => {

        if (token) {
            // const apiData = new FormData()
            // apiData.append("magic_link_token", token)
            const payload = {
                email: decodeURIComponent(email),
                email_verification_token: decodeURIComponent(token)
            }
            axiosInstance.post(`auth/verify-email`, payload).then((res) => {
                console.log('resresresresresresres', res?.data, res?.data?.data?.success);

                // localStorage.setItem('userDetails', JSON.stringify(res.data.data))
                // setToken(res.data.data.token)
                setUserInfo({ email: decodeURIComponent(email) })
                if (res.data.success == 1) {
                    router.push(`/signup-2`)
                }
            }).catch((error) => {
                if (error?.response?.data?.message) {
                    toast.error(error?.response?.data?.message)
                }
            })
        }
    }, [params])
    return
}

export default VerifyEmailContent;