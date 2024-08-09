import React, { useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { axiosInstance, BASE_URL } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin2.jpg";
import Autocomplete from 'react-google-autocomplete';

const validationSchema = Yup.object().shape({
  zip: Yup.string().required("Zipcode is required."),
  about: Yup.string().required("About Us is required."),
  gender: Yup.string().required("Gender is required."),
  country: Yup.string().required("Country Us is required."),
  city: Yup.string().required("City is required."),
  sign_name: Yup.string().required("Sign is required."),
  address1: Yup.string().required("Address is required."),
  state_title: Yup.string().required("State is required."),
  // dob: Yup.string().required("Dob is required."),
  group: Yup.array()
    .required("Group name is required.")
    .min(1, "Group name is required."),
});
const CustomMultiSelect = ({ options, selectedOptions, onChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  const handleToggle = () => {
    setIsOpen(!isOpen);
  };

  const handleOptionChange = (option) => {
    if (selectedOptions.includes(option)) {
      onChange(selectedOptions.filter((item) => item !== option));
    } else {
      onChange([...selectedOptions, option]);
    }
  };

  return (
    <div className={styles.custommultiselect}>
      <div className={styles.selectbox} onClick={handleToggle}>
        {selectedOptions?.length > 0
          ? selectedOptions?.join(", ")
          : "Select options"}
        <span className={styles.arrow}>{isOpen ? "▲" : "▼"}</span>
      </div>
      {isOpen && (
        <div className={styles.optionscontainer}>
          {options.map((option) => (
            <div className={styles.option} key={option.value}>
              <label>
                <input
                  type="checkbox"
                  checked={selectedOptions.includes(option.value)}
                  onChange={() => handleOptionChange(option.value)}
                />
                {option.label}
              </label>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default function SignUpSecondForm({
  setFirstOpen,
  inputData,
  setinputData,
}) {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [groupOption, setGroupOption] = useState([]);

  useEffect(() => {
    axiosInstance.post('group/list', {
      "group_type": "deadbox",
    }).then((data) => {
      const groupOption = data?.data?.data?.map((item) => {
        return { value: item?.title, id: item?.id, label: item?.title }
      })
      setGroupOption(groupOption)

    }).catch((error) => {
      errorCheckAPIResponse(error)

    })
  }, [])
  const { handleSubmit, values, touched, errors, setValues } =
    useFormik({
      initialValues: {
        gender: "",
        country: "",
        zip: "",
        city: "",
        group: [],
        about: "",
        sign_name: "",
        state_title: '',
        dob: "",
        address1: ''
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();

        if (inputData.avatar) {
          apiData.append("f_image", inputData.avatar);
        }
        const groupID = values?.group?.map((item) => {
          const slectedoption = groupOption.find((op) => op.label === item)
          return slectedoption?.id
        })

        apiData.append("first_name", inputData.first_name);
        apiData.append("last_name", inputData.last_name);
        apiData.append("email", inputData.email);
        apiData.append("phone_code", inputData.country_code);
        apiData.append("phone", inputData.mobile_no);
        apiData.append("over_13", 'true');
        apiData.append("privacy_policy", "1");
        apiData.append("zipcode", values.zip);
        apiData.append("country_title", values.country);
        apiData.append("sign_name", values.sign_name);
        apiData.append("state_title", values.state_title);
        apiData.append("address1", values.address1);
        apiData.append("city_title", values.city);
        apiData.append("gender", values.gender);
        apiData.append("about", values.about);
        apiData.append("group_id", groupID.toString() as any);

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

  const onSetAddress = (value) => {
    const option = value?.split(',')
    let defaultOP: any = {}
    if (option?.length === 3) {
      defaultOP = { ...values, ...inputData, city: option[0].trim(), state_title: option[1].trim(), country: option[2].trim(), }
    } else if (option?.length === 2) {
      defaultOP = { ...values, ...inputData, city: option[0].trim(), state_title: option[1].trim() }
    } else if (option?.length === 1) {
      defaultOP = { ...values, ...inputData, city: option[0].trim() }
    } else {
      defaultOP = { ...value, ...inputData }
    }
    setValues({ ...defaultOP, ...{ address1: value } });
    setinputData((pre) => {
      return { ...pre, ['address1']: value }
    })
  }

  const handleChangeValue = (e) => {
    const { name, value } = e.target
    setinputData((pre) => {
      return { ...pre, [name]: value }
    })
    setValues({ ...values, [name]: value });
  }

  useEffect(() => {
    setValues({ ...values, ...inputData });
  }, [setFirstOpen])

  return (
    <div className={styles.signupSection}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
        </div>
        <h2>Signup</h2>
        <form onSubmit={handleSubmit}>
          <Autocomplete
            apiKey="AIzaSyAf0gOA0AoiliWzS8rG5mxBOtqPrM34cjA"
            name="address1"
            onPlaceSelected={(place) => {
              const value = place?.formatted_address
              onSetAddress(value)
            }}
            onChange={(event) => {
              onSetAddress(event.target.value)
            }}
            value={values.address1}
            // types={['address']}
            onKeyDown={(event) => {
              if (event.code === "Enter") {
                onSetAddress(event.target.value)
              }
            }}

            placeholder="Address"
          />
          {
            errors.address1 && touched.address1 ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.address1}
              </p>
            ) : null
          }
          <div className={styles.inlineInputs}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  onChange={handleChangeValue}
                  name="city"
                  value={values.city}
                />
              </div>
              <div>
                {errors.city && touched.city && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                      marginBottom: "16px",
                    }}
                  >
                    {errors.city}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Zipcode"
                  onChange={handleChangeValue}
                  name="zip"
                  value={values.zip}
                />
              </div>
              <div>
                {errors.zip && touched.zip && (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                      marginTop: "-10px",
                      marginBottom: "16px",
                    }}
                  >
                    {errors.zip}
                  </p>
                )}
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="State"
            onChange={handleChangeValue}
            name="state_title"
            value={values.state_title}
          />
          {
            errors.state_title && touched.state_title ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.state_title}
              </p>
            ) : null
          }
          <select onChange={handleChangeValue} name="country" value={values.country}>
            <option value="">Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          {
            errors.country && touched.country ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.country}
              </p>
            ) : null
          }
          <input
            type="text"
            placeholder="Call Sign/Nickname"
            onChange={handleChangeValue}
            name="sign_name"
            value={values.sign_name}
          />
          {
            errors.sign_name && touched.sign_name ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.sign_name}
              </p>
            ) : null
          }
          <textarea
            placeholder="About me"
            onChange={handleChangeValue}
            name="about"
            value={values.about}
          ></textarea>
          {
            errors.about && touched.about ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.about}
              </p>
            ) : null
          }
          <CustomMultiSelect
            options={groupOption}
            selectedOptions={values.group}
            onChange={(option) => {
              const data = { target: { value: option, name: 'group' } }
              handleChangeValue(data)
            }}
          />
          {
            errors.group && touched.group ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                Group name is required.
              </p>
            ) : null
          }
          <input
            type="date"
            placeholder="Date of Birth"
            // onChange={handleChangeValue}
            name="dob"
          // value={values.dob}
          />
          <select onChange={handleChangeValue} name="gender" value={values.gender}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {
            errors.gender && touched.gender ? (
              <p
                style={{
                  color: "red",
                  fontSize: "12px",
                  marginTop: "-10px",
                  marginBottom: "16px",
                }}
              >
                {errors.gender}
              </p>
            ) : null
          }
        </form>

        <button style={{ marginBottom: '10px' }}
          onClick={() => {
            setFirstOpen(true)
          }}
        >Back</button>
        {
          isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : (
            <button onClick={() => { handleSubmit() }}>Submit</button>
          )
        }
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
