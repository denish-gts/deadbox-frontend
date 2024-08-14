"use client";
import { useState } from "react";
import SignUpFirstForm from "./Components/SignUpFirstForm";
import SignUpSecondForm from "./Components/SignUpSecondForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import Loader from "@/component/common/Loader";

const validationSchema = Yup.object().shape({
  first_name: Yup.string().required("First Name is required."),
  last_name: Yup.string().required("Last Name is required."),
  phone_code: Yup.string().required("Country code is required."),
  phone: Yup.number().typeError('Please enter numbur value.')
    .positive('Must be a positive number.').required("Mobile no is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
});

const validationSchemaSecond = Yup.object().shape({
  zipcode: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  gender: Yup.string().required("Gender is required."),
  country_title: Yup.string().required("Country is required."),
  city_title: Yup.string().required("City is required."),
  sign_name: Yup.string().required("Sign is required."),
  // address1: Yup.string().required("Address is required."),
  state_title: Yup.string().required("State is required."),
  dob: Yup.string().required("Dob is required."),
  group: Yup.array()
    .required("Group name is required.")
    .min(1, "Group name is required."),
});
export default function Signup() {
  const router = useRouter();
  const [firstOpen, setFirstOpen] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const formik = useFormik({
    initialValues: {
      first_name: "",
      last_name: "",
      email: "",
      phone_code: "",
      phone: "",
      over13: "",
      avatar: "",
      privacyPolicy: 0,
    },
    validationSchema: validationSchema,
    onSubmit: () => {
      setFirstOpen(false);
    },
  });

  const formikSecond =
    useFormik({
      initialValues: {
        zipcode: "",
        country_title: "",
        state_title: '',
        city_title: "",
        gender: "",
        group: [],
        group_id: [],
        about: "",
        sign_name: "",
        dob: "",
        address1: ''
      },
      validationSchema: validationSchemaSecond,
      onSubmit: (values) => {
        const allData = { ...formik?.values, ...values }
        setIsLoading(true);
        const apiData = new FormData();

        if (allData.avatar) {
          apiData.append("f_image", allData.avatar);
        }
        // for (const property in allData) {
        //   if (!['avatar', 'group'].includes(property)) {
        //     apiData.append([property] as any, allData[property]);
        //   }
        //   console.log(`${property}: ${allData[property]}`);
        // }
        // const groupID = values?.group?.map((item) => {
        //   const slectedoption = groupOption.find((op) => op.label === item)
        //   return slectedoption?.id
        // })

        apiData.append("first_name", allData.first_name);
        apiData.append("last_name", allData.last_name);
        apiData.append("email", allData.email);
        apiData.append("phone_code", allData.phone_code);
        apiData.append("phone", allData.phone);
        apiData.append("over_13", 'true');
        apiData.append("privacy_policy", "1");
        apiData.append("zipcode", values.zipcode);
        apiData.append("country_title", values.country_title);
        apiData.append("sign_name", values.sign_name);
        apiData.append("state_title", values.state_title);
        apiData.append("city_title", values.city_title);
        apiData.append("gender", values.gender);
        apiData.append("about", values.about);
        apiData.append("group_id", values?.group_id as any);

        axiosInstance.post(`auth/sign-up`, apiData).then((res) => {
          successAPIResponse(res);
          router.push('/magic')
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
      {firstOpen ? (
        <SignUpFirstForm
          formik={formik}
        />
      ) : (
        <SignUpSecondForm
          formik={formikSecond}
          setFirstOpen={setFirstOpen}
        />
      )}
    </div>
  );
}

