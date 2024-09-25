"use client";
import { useState } from "react";
import SignUpSecondForm from "./Components/SignUpSecondForm";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { setToken, setUserInfo, getUserInfo } from "@/utils/auth.util";
import Loader from "@/component/common/loader";

const validationSchemaSecond = Yup.object().shape({
  zipcode: Yup.string().required("Zipcode is required."),
  // about: Yup.string().required("About Us is required."),
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
export default function SignupContent() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const email = getUserInfo()?.email
  console.log('emailemailemailemail', email);

  const formikSecond =
    useFormik({
      initialValues: {
        zipcode: "",
        country_title: "",
        state_title: '',
        city_title: "",
        gender: "",
        group: [],
        avatar: "",
        group_id: [],
        about: "",
        sign_name: "",
        dob: "",
        address1: ''
      },
      validationSchema: validationSchemaSecond,
      onSubmit: (values) => {
        // const allData = { ...formik?.values, ...values }
        setIsLoading(true);
        const apiData = new FormData();

        if (values.avatar) {
          apiData.append("f_image", values.avatar);
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

        // apiData.append("first_name", allData.first_name);
        // apiData.append("last_name", allData.last_name);
        // apiData.append("email", allData.email);
        // apiData.append("phone_code", allData.phone_code);
        // apiData.append("phone", allData.phone);
        // apiData.append("over_13", 'true');
        // apiData.append("privacy_policy", "1");
        
        apiData.append("email", email);
        apiData.append("zipcode", values.zipcode);
        apiData.append("country_title", values.country_title);
        apiData.append("sign_name", values.sign_name);
        apiData.append("state_title", values.state_title);
        apiData.append("city_title", values.city_title);
        apiData.append("gender", values.gender);
        apiData.append("about", values.about);
        apiData.append("group_id", values?.group_id as any);

        axiosInstance.post(`auth/sign-up/step-2`, apiData).then((res) => {
          // successAPIResponse(res);
          // router.push('/magic')
          setToken(res.data.data.token)
          setUserInfo(res.data.data)
          router.push(`/profile`)
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
      <SignUpSecondForm
        formik={formikSecond}
      // setFirstOpen={setFirstOpen}
      />
    </div>
  );
}

