import React, { useEffect, useState } from "react";
import styles from "./loginForm.module.scss";
import Image from "next/image";
const UserIcon = "/assets/images/user1.png";

import { axiosInstance } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
const Logo = "/assets/logo/logo.jpeg";
const BG = "/assets/images/signin2.jpg";
// import Autocomplete from 'react-google-autocomplete';

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
  // setFirstOpen,
  formik
}) {

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
  const { handleSubmit, handleChange, values, touched, errors, setValues } = formik
  const [avatar, setAvatar] = useState(null);
  const handleAvatarChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (upload) => {
        setAvatar(upload.target.result);
      };
      reader.readAsDataURL(file);
      setValues({ ...values, avatar: file });
    }
  };
  // const onSetAddress = (value) => {
  //   const option = value?.split(',')
  //   let defaultOP: any = {}
  //   if (option?.length === 3) {
  //     defaultOP = { ...values, ...inputData, city_title: option[0].trim(), state_title: option[1].trim(), country_title: option[2].trim(), }
  //   } else if (option?.length === 2) {
  //     defaultOP = { ...values, ...inputData, city_title: option[0].trim(), state_title: option[1].trim() }
  //   } else if (option?.length === 1) {
  //     defaultOP = { ...values, ...inputData, city_title: option[0].trim() }
  //   } else {
  //     defaultOP = { ...value, ...inputData }
  //   }
  //   setValues({ ...defaultOP, ...{ address1: value } });
  //   setinputData((pre) => {
  //     return { ...pre, ['address1']: value }
  //   })
  // }

  // const handleChangeValue = (e) => {
  //   const { name, value } = e.target
  //   setinputData((pre) => {
  //     return { ...pre, [name]: value }
  //   })
  //   setValues({ ...values, [name]: value });
  // }


  return (
    <div className={styles.signupSection}>
      <div className={styles.formContainer}>
        <div className={styles.logo}>
          <Image src={Logo} alt="Logo" unoptimized height={0} width={0} />
        </div>
        <h2>Signup Step 2</h2>
        <div className={styles.avatarupload}>
            <div className={styles.avataricon} onClick={() => document.getElementById("avatarInput").click()}>
              {avatar ? (
                <img src={avatar} alt="Avatar" className={styles.aa} />
              ) : (
                <img src={UserIcon} alt="User Icon" />
              )}
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div>
          </div>
        <div className={styles.form}>

          
          {/* <Autocomplete
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
          {errors.address1 && touched.address1 ? (
            <p className={styles.error_content}>
              {errors.address1}
            </p>
          ) : null
          } */}
          <div className={styles.inlineInputs}>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="City"
                  onChange={handleChange}
                  name="city_title"
                  value={values.city_title}
                />
              </div>
              <div>
                {errors.city_title && touched.city_title && (
                  <p className={styles.error_content}>
                    {errors.city_title}
                  </p>
                )}
              </div>
            </div>
            <div>
              <div>
                <input
                  type="text"
                  placeholder="Zipcode"
                  onChange={handleChange}
                  name="zipcode"
                  value={values.zipcode}
                />
              </div>
              <div>
                {errors.zipcode && touched.zipcode && (
                  <p className={styles.error_content}>
                    {errors.zipcode}
                  </p>
                )}
              </div>
            </div>
          </div>
          <input
            type="text"
            placeholder="State"
            onChange={handleChange}
            name="state_title"
            value={values.state_title}
          />
          {errors.state_title && touched.state_title ? (
            <p className={styles.error_content}>
              {errors.state_title}
            </p>
          ) : null
          }
          <select onChange={handleChange} name="country_title" value={values.country_title}>
            <option value="">Country</option>
            <option value="USA">USA</option>
            <option value="UK">UK</option>
            <option value="Canada">Canada</option>
          </select>
          {errors.country_title && touched.country_title ? (
            <p className={styles.error_content}>
              {errors.country_title}
            </p>
          ) : null
          }
          <input
            type="text"
            placeholder="Call Sign/Nickname"
            onChange={handleChange}
            name="sign_name"
            value={values.sign_name}
          />
          {errors.sign_name && touched.sign_name ? (
            <p className={styles.error_content}>
              {errors.sign_name}
            </p>
          ) : null
          }
          <textarea
            placeholder="About me"
            onChange={handleChange}
            name="about"
            value={values.about}
          ></textarea>
          {errors.about && touched.about ? (
            <p className={styles.error_content}>
              {errors.about}
            </p>
          ) : null
          }
          <CustomMultiSelect
            options={groupOption}
            selectedOptions={values.group}
            onChange={(option) => {
              const groupID = option?.map((item) => {
                const slectedoption = groupOption.find((op) => op.label === item)
                return slectedoption?.id
              })
              setValues({ ...values, group: option, group_id: groupID });
            }}
          />
          {errors.group && touched.group ? (
            <p className={styles.error_content}>
              Group name is required.
            </p>
          ) : null
          }
          <input
            type="date"
            placeholder="Date of Birth"
            onChange={handleChange}
            name="dob"
            value={values.dob}
          />
          {errors.dob && touched.dob ? (
            <p className={styles.error_content}>
              {errors.dob}
            </p>
          ) : null
          }
          <select onChange={handleChange} name="gender" value={values.gender}>
            <option value="">Gender</option>
            <option value="male">Male</option>
            <option value="female">Female</option>
            <option value="other">Other</option>
          </select>
          {errors.gender && touched.gender ? (
            <p className={styles.error_content}>
              {errors.gender}
            </p>
          ) : null
          }
        </div>

        {/* <button style={{ marginBottom: '10px' }}
          onClick={() => {
            setFirstOpen(true)
          }}
        >Back</button> */}
        {/* {
          isLoading ? (
            <button style={{ backgroundColor: "#9e9e9e" }} type="button">
              Submit
            </button>
          ) : ( */}
        <button onClick={() => { handleSubmit() }}>Submit</button>
        {/* )
        } */}
      </div>
      <div className={styles.imageContainer}>
        <Image src={BG} alt="Background" unoptimized height={0} width={0} />
      </div>
    </div>
  );
}
