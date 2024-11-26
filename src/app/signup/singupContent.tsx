"use client";
import { useState } from "react";
import SignUpFirstForm from "./Components/SignUpFirstForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Loader from "@/component/common/loader";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  phone_code: Yup.string().required("Country code is required."),
  password: Yup.string().required("Password is required."),
  phone: Yup.number().typeError('Please enter numbur value.')
    .positive('Must be a positive number.').required("Mobile no is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});

export default function SignupContent() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_code: "",
      phone: "",
      password: '',
      over_13: null,
      privacy_policy: 0,
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      axiosInstance.post(`auth/sign-up/step-1`, values).then((res) => {
        successAPIResponse(res);
        router.push('/verifyemail')
        setIsLoading(false);
      }).catch((error) => {
        setIsLoading(false);
        errorCheckAPIResponse(error)
      });
    },
  });


  return (
    <div>
      {isLoading && (
        <Loader />
      )}
      <SignUpFirstForm
        formik={formik}
      />

    </div>
  );
}

