"use client";
import { useEffect, useState } from "react";
import styles from "./addGroup.module.scss";
import Image from "next/image";
import { useFormik } from "formik";
import * as Yup from "yup";
import { post, postFormData } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import classNames from "classnames";
import { useRouter } from "next/navigation";
import Loader from "../common/loader";

import Pencil from "../../../public/assets/images/pencils.png";
import Delete from "../../../public/assets/images/delete.svg";
interface User {
  id: number;
  name: string;
  imageUrl: string;
}
const phoneRegExp = /^(\+\d{1,3}[- ]?)?\d{10}$/;

const validationSchema = Yup.object().shape({
  groupName: Yup.string().required("Group Name is required."),
  groupType: Yup.string().required("Group Type is required."),
  phone: Yup.string()
    .matches(phoneRegExp, "Phone number is not valid")
    .required("Phone number is required"),
  phone_code: Yup.string().required("Country code is required."),
  about: Yup.string().required("About is required."),
  email: Yup.string()
    .email("Please enter a valid email address.")
    .required("Email address is required."),
  invitees: Yup.array()
    .min(1, "At least one invitee is required")
    .required("Invitees are required"),
});

export default function AddGroup() {
  const router = useRouter();

  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [peopleId, setPeopleId] = useState("");
  const { handleSubmit, values, touched, errors, handleChange, setValues } =
    useFormik({
      initialValues: {
        groupName: "",
        groupType: "general_private",
        phone: "",
        phone_code: "",
        email: "",
        about: "",
        invitees: [],
        avatar: "",
      },
      validationSchema: validationSchema,
      onSubmit: (values) => {
        setIsLoading(true);
        const apiData = new FormData();
        if (values.avatar) {
          apiData.append("f_image", values.avatar);
        }
        apiData.append("title", values.groupName);
        apiData.append("group_type", values.groupType);
        apiData.append("phone", values.phone);
        apiData.append("phone_code", values.phone_code);
        apiData.append("email", values.email);
        apiData.append("description", values.about);

        apiData.append(
          "group_members_str",
          JSON.stringify(
            values.invitees.map((item) => {
              return {
                user_id: item.id,
                role_id: item?.role_id,
              };
            })
          )
        );
        postFormData(`group/create`, apiData)
          .then((res) => {
            router.push("/group");
            const msg = {
              data: {
                message:
                  "Your group is created and sent for the approval to the admin",
              },
            };
            successAPIResponse(msg);
            setIsLoading(false);
          })
          .catch((error) => {
            errorCheckAPIResponse(error);
          });
      },
    });

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

  const [userList, setuserList] = useState([]);
  const getUserList = async () => {
    await post(`user/list`)
      .then((data: any) => {
        setuserList(data.data?.data);
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
      });
  };
  useEffect(() => {
    getUserList();
  }, []);

  // const [members, setMembers] = useState([
  //   {
  //     name: "Marvin McKinney",
  //     email: "marvinmckinney@gmail.com",
  //     activeOn: "17/07/2024",
  //     role: "Member",
  //     roleColor: "#6ccf51", // Green
  //     avatar: "path/to/avatar1.jpg",
  //   },
  //   {
  //     name: "Jerome Bell",
  //     email: "jeromebell@gmail.com",
  //     activeOn: "16/07/2024",
  //     role: "President",
  //     roleColor: "#f44336", // Red
  //     avatar: "path/to/avatar2.jpg",
  //   },
  //   {
  //     name: "Bessie Cooper",
  //     email: "bessiecooper@gmail.com",
  //     activeOn: "16/07/2024",
  //     role: "Recruiter",
  //     roleColor: "#ffa726", // Orange
  //     avatar: "path/to/avatar3.jpg",
  //   },
  //   {
  //     name: "Brooklyn Simmons",
  //     email: "brooklynsimmons@gmail.com",
  //     activeOn: "16/07/2024",
  //     role: "Squad-Leader",
  //     roleColor: "#ffa726", // Orange
  //     avatar: "path/to/avatar4.jpg",
  //   },
  //   {
  //     name: "Guy Hawkins",
  //     email: "guyhawkins@gmail.com",
  //     activeOn: "15/07/2024",
  //     role: "Vice President",
  //     roleColor: "#f44336", // Red
  //     avatar: "path/to/avatar5.jpg",
  //   },
  // ]);

  // const roles = [
  //   "Member",
  //   "President",
  //   "Recruiter",
  //   "Squad-Leader",
  //   "Vice President",
  // ];

  // const handleRoleChange = (index, newRole) => {
  //   const updatedMembers = members.map((member, i) =>
  //     i === index ? { ...member, role: newRole } : member
  //   );
  //   setMembers(updatedMembers);
  // };
  const DadboxRoles = [
    {
      lable: 'Admin',
      value: 1
    },
    {
      lable: 'Member',
      value: 2,
      color: 'green'
    }]

  const handleChangeRole = (e: any, index: number) => {
    const updateData = values?.invitees?.map((item: any, i: number) => {
      if (i === index) {
        return { ...item, role_id: e.target.value }
      } else {
        return item
      }
    })
    setValues({ ...values, invitees: updateData });
  }
  const RolesData = DadboxRoles
  return (
    <>
      <div className="container">
        {isLoading && <Loader />}
        <div className={styles.addGroupContainer}>
          <div className={styles.groupFormContainer}>
            <div
              className={styles.avatarSection}
              onClick={() => document.getElementById("avatarInput").click()}
            >
              <div className={styles.avatar}>
                <img
                  src={avatar ? avatar : "https://via.placeholder.com/150"}
                  alt="Avatar"
                  className={styles.avatarImage}
                />
                <button
                  className={styles.deleteAvatarButton}
                  onClick={() => document.getElementById("avatarInput").click()}
                >
                  {!avatar ? (
                    <>
                      <Image src={Pencil} alt="Pencil" />
                    </>
                  ) : (
                    <>
                      <Image src={Delete} alt="Delete" />
                    </>
                  )}
                </button>
              </div>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={(e) => {
                  handleAvatarChange(e);
                }}
              />
            </div>
            {/* <div className={styles.avatarSection}>
              <div className={styles.avatar}
                onClick={() => document.getElementById("avatarInput").click()}
              >
                <img
                  src={avatar ? avatar : "https://via.placeholder.com/150"}
                  alt="Avatar"
                  className={styles.avatarImage}
                />
                <button
                  type="button"
                  className={styles.deleteAvatarButton}
                >
                  🗑️
                </button>
              </div>
              <input
                id="avatarInput"
                type="file"
                accept="image/*"
                style={{ display: "none" }}
                onChange={handleAvatarChange}
              />
            </div> */}
            <div className={styles.formSection}>
              <h1 className={styles.header}>Add New Group</h1>

              <div className={styles.formRow}>
                <div className={styles.formGroup}>
                  <label htmlFor="groupName">Group Name</label>
                  <input
                    type="text"
                    name="groupName"
                    onChange={handleChange}
                    value={values.groupName}
                  />
                  {errors.groupName && touched.groupName ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {errors.groupName}
                    </p>
                  ) : null}
                </div>
                <div className={styles.formGroup}>
                  <label htmlFor="groupType">Group</label>
                  <select
                    id="groupType"
                    name="groupType"
                    onChange={handleChange}
                    value={values.groupType}
                  >
                    {/* <option value="deadbox">Deadbox</option>
                    <option value="saas">Saas</option> */}
                    <option value="general_private">General Private</option>
                    <option value="general_public">General Public</option>
                  </select>
                  {errors.groupType && touched.groupType ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {errors.groupType}
                    </p>
                  ) : null}
                </div>
              </div>
              {/* <select
              name="phone_code"
              onChange={handleChange}
              value={values.phone_code}
            >
              <option value="">Select Country Code</option>
              <option value="+1">+1</option>
              <option value="+44">+44</option>
            </select>
            {errors.phone_code && touched.phone_code ? (
              <p className={styles.error_content}>
                {errors.phone_code}
              </p>
            ) : null} */}
              <div className={styles.formRow}>



                <div className={styles.formGroup}>
                  <label htmlFor="phoneWithCode">Phone Number</label>
                  <div className={styles.grids}>
                    <select
                      name="phone_code"
                      onChange={handleChange}
                      value={values.phone_code}
                      className={styles.phoneCodeSelect}
                    >
                      <option value="">Code</option>
                      <option value="+1">+1</option>
                      <option value="+44">+44</option>
                    </select>
                    <input
                      type="text"
                      name="phone"
                      onChange={handleChange}
                      value={values.phone}
                      className={styles.phoneNumberInput}
                      placeholder="Phone Number"
                    />
                  </div>
                  {(errors.phone_code && touched.phone_code) || (errors.phone && touched.phone) ? (
                    <p style={{ color: "red", fontSize: "12px" }}>
                      {errors.phone_code || errors.phone}
                    </p>
                  ) : null}
                </div>
                {/* <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <select
                    name="phone_code"
                    onChange={handleChange}
                    value={values.phone_code}
                  >
                    <option value="">Select Country Code</option>
                    <option value="+1">+1</option>
                    <option value="+44">+44</option>
                  </select>
                  {errors.phone_code && touched.phone_code ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {errors.phone_code}
                    </p>
                  ) : null}
                </div> */}
              </div>
              <div className={styles.formRow}>
                {/* <div className={styles.formGroup}>
                  <label htmlFor="phone">Phone</label>
                  <input
                    type="number"
                    id="phone"
                    name="phone"
                    onChange={handleChange}
                    value={values.phone}
                  />
                  {errors.phone && touched.phone ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {errors.phone}
                    </p>
                  ) : null}
                </div> */}
                <div className={styles.formGroup}>
                  <label htmlFor="email">Email Address</label>
                  <input
                    type="email"
                    id="email"
                    name="email"
                    onChange={handleChange}
                    value={values.email}
                  />
                  {errors.email && touched.email ? (
                    <p
                      style={{
                        color: "red",
                        fontSize: "12px",
                      }}
                    >
                      {errors.email}
                    </p>
                  ) : null}
                </div>
              </div>
              <div className={classNames(styles.formGroup, styles.secRow)}>
                <label htmlFor="aboutGroup">About Group</label>
                <textarea
                  id="aboutGroup"
                  name="about"
                  onChange={handleChange}
                  value={values.about}
                ></textarea>
                {errors.about && touched.about ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.about}
                  </p>
                ) : null}
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="invitees">Invite People</label>
                <select
                  id="invitees"
                  name="invitees"
                  onChange={(e) => {
                    const data: any = userList.find(
                      (user: any) => user.id === parseInt(e.target.value)
                    )
                    const isUserExist = values.invitees.some((item) => item.id === data?.id)
                    if (!isUserExist) {
                      setValues({
                        ...values,
                        invitees: [
                          ...values.invitees,
                          ...[{ ...data, role_id: 2 }],
                        ],
                      });
                    }
                  }}
                  value={""}
                >
                  <option value="">Select</option>
                  {userList?.map((user: any) => {
                    return (
                      <option key={user.id} value={user.id}>
                        {user.first_name} {user.last_name}
                      </option>
                    );
                  })}
                </select>
                {errors.invitees && touched.invitees ? (
                  <p
                    style={{
                      color: "red",
                      fontSize: "12px",
                    }}
                  >
                    {errors.invitees as any}
                  </p>
                ) : null}
                {/* <div className={styles.invitedPeople}>
                  {values.invitees.map((invitee, key) => (
                    <div className={styles.person} key={key}>
                      <Image
                        src={invitee.image}
                        alt="people1"
                        height={0}
                        width={0}
                        unoptimized
                      />
                      <div>
                        {invitee.first_name} {invitee.last_name}
                      </div>
                      <div className={styles.delete}>
                        <svg
                          width="19"
                          height="19"
                          viewBox="0 0 19 19"
                          fill="none"
                          xmlns="http://www.w3.org/2000/svg"
                          onClick={() => {
                            setShowModel(true);
                            setPeopleId(invitee.id);
                          }}
                        >
                          <g clip-path="url(#clip0_101_535)">
                            <path
                              d="M16.0999 3.06667H13.7232C13.5453 2.20142 13.0745 1.42397 12.3902 0.86535C11.7059 0.306736 10.8499 0.00111514 9.96654 0L8.4332 0C7.54985 0.00111514 6.69388 0.306736 6.00958 0.86535C5.32527 1.42397 4.85448 2.20142 4.67654 3.06667H2.29987C2.09654 3.06667 1.90153 3.14744 1.75775 3.29122C1.61398 3.435 1.5332 3.63 1.5332 3.83333C1.5332 4.03667 1.61398 4.23167 1.75775 4.37545C1.90153 4.51923 2.09654 4.6 2.29987 4.6H3.06654V14.5667C3.06775 15.583 3.47201 16.5573 4.19064 17.2759C4.90926 17.9945 5.88358 18.3988 6.89987 18.4H11.4999C12.5162 18.3988 13.4905 17.9945 14.2091 17.2759C14.9277 16.5573 15.332 15.583 15.3332 14.5667V4.6H16.0999C16.3032 4.6 16.4982 4.51923 16.642 4.37545C16.7858 4.23167 16.8665 4.03667 16.8665 3.83333C16.8665 3.63 16.7858 3.435 16.642 3.29122C16.4982 3.14744 16.3032 3.06667 16.0999 3.06667ZM8.4332 1.53333H9.96654C10.4421 1.53391 10.9058 1.68159 11.2941 1.95611C11.6824 2.23062 11.9763 2.61854 12.1354 3.06667H6.2643C6.42345 2.61854 6.71733 2.23062 7.10563 1.95611C7.49394 1.68159 7.95766 1.53391 8.4332 1.53333ZM13.7999 14.5667C13.7999 15.1767 13.5576 15.7617 13.1262 16.193C12.6949 16.6243 12.1099 16.8667 11.4999 16.8667H6.89987C6.28987 16.8667 5.70486 16.6243 5.27352 16.193C4.84219 15.7617 4.59987 15.1767 4.59987 14.5667V4.6H13.7999V14.5667Z"
                              fill="black"
                            />
                            <path
                              d="M7.66657 13.8001C7.8699 13.8001 8.06491 13.7193 8.20868 13.5755C8.35246 13.4318 8.43324 13.2367 8.43324 13.0334V8.43341C8.43324 8.23008 8.35246 8.03508 8.20868 7.8913C8.06491 7.74752 7.8699 7.66675 7.66657 7.66675C7.46324 7.66675 7.26823 7.74752 7.12445 7.8913C6.98068 8.03508 6.8999 8.23008 6.8999 8.43341V13.0334C6.8999 13.2367 6.98068 13.4318 7.12445 13.5755C7.26823 13.7193 7.46324 13.8001 7.66657 13.8001Z"
                              fill="black"
                            />
                            <path
                              d="M10.7335 13.8001C10.9368 13.8001 11.1318 13.7193 11.2756 13.5755C11.4194 13.4318 11.5001 13.2367 11.5001 13.0334V8.43341C11.5001 8.23008 11.4194 8.03508 11.2756 7.8913C11.1318 7.74752 10.9368 7.66675 10.7335 7.66675C10.5301 7.66675 10.3351 7.74752 10.1913 7.8913C10.0476 8.03508 9.9668 8.23008 9.9668 8.43341V13.0334C9.9668 13.2367 10.0476 13.4318 10.1913 13.5755C10.3351 13.7193 10.5301 13.8001 10.7335 13.8001Z"
                              fill="black"
                            />
                          </g>
                          <defs>
                            <clipPath id="clip0_101_535">
                              <rect width="18.4" height="18.4" fill="white" />
                            </clipPath>
                          </defs>
                        </svg>
                      </div>
                    </div>
                  ))}
                   </div> */}
                {values.invitees && values.invitees.length > 0 && (
                  <div className={styles.memberTable}>
                    <table>
                      <thead>
                        <tr>
                          <th>MEMBER NAME</th>
                          <th>EMAIL ADDRESS</th>
                          <th>GROUP ROLES</th>
                          <th>ACTION</th>
                        </tr>
                      </thead>
                      <tbody>
                        {values.invitees.map((invitee, key) => (
                          <tr key={key}>
                            <td>
                              <div className={styles.memberInfo}>
                                <Image
                                  src={invitee.image}
                                  alt="people1"
                                  height={0}
                                  width={0}
                                  unoptimized
                                />
                                <span>{invitee?.first_name} {invitee?.last_name}</span>
                              </div>
                            </td>
                            <td>{invitee.email}</td>
                            <td>
                              <div className={styles.roleDropdown}>
                                <div className={styles.role}>
                                  <span
                                    className={styles.roleIndicator}
                                    style={{
                                      backgroundColor: invitee.roleColor,
                                    }}
                                  ></span>
                                  <select
                                    value={invitee.role_id}
                                    onChange={(e) => {
                                      handleChangeRole(e, key)
                                    }}

                                  >
                                    {RolesData.map((role, i) => (
                                      <option
                                        key={i}
                                        value={role?.value}
                                      >
                                        {role?.lable}
                                      </option>
                                    ))}
                                  </select>
                                </div>
                              </div>
                            </td>
                            <td>
                              <button className={styles.deleteButton}>
                                <svg
                                  width="19"
                                  height="19"
                                  viewBox="0 0 19 19"
                                  fill="none"
                                  xmlns="http://www.w3.org/2000/svg"
                                  onClick={() => {
                                    setShowModel(true);
                                    setPeopleId(invitee.id);
                                  }}
                                >
                                  <g clip-path="url(#clip0_101_535)">
                                    <path
                                      d="M16.0999 3.06667H13.7232C13.5453 2.20142 13.0745 1.42397 12.3902 0.86535C11.7059 0.306736 10.8499 0.00111514 9.96654 0L8.4332 0C7.54985 0.00111514 6.69388 0.306736 6.00958 0.86535C5.32527 1.42397 4.85448 2.20142 4.67654 3.06667H2.29987C2.09654 3.06667 1.90153 3.14744 1.75775 3.29122C1.61398 3.435 1.5332 3.63 1.5332 3.83333C1.5332 4.03667 1.61398 4.23167 1.75775 4.37545C1.90153 4.51923 2.09654 4.6 2.29987 4.6H3.06654V14.5667C3.06775 15.583 3.47201 16.5573 4.19064 17.2759C4.90926 17.9945 5.88358 18.3988 6.89987 18.4H11.4999C12.5162 18.3988 13.4905 17.9945 14.2091 17.2759C14.9277 16.5573 15.332 15.583 15.3332 14.5667V4.6H16.0999C16.3032 4.6 16.4982 4.51923 16.642 4.37545C16.7858 4.23167 16.8665 4.03667 16.8665 3.83333C16.8665 3.63 16.7858 3.435 16.642 3.29122C16.4982 3.14744 16.3032 3.06667 16.0999 3.06667ZM8.4332 1.53333H9.96654C10.4421 1.53391 10.9058 1.68159 11.2941 1.95611C11.6824 2.23062 11.9763 2.61854 12.1354 3.06667H6.2643C6.42345 2.61854 6.71733 2.23062 7.10563 1.95611C7.49394 1.68159 7.95766 1.53391 8.4332 1.53333ZM13.7999 14.5667C13.7999 15.1767 13.5576 15.7617 13.1262 16.193C12.6949 16.6243 12.1099 16.8667 11.4999 16.8667H6.89987C6.28987 16.8667 5.70486 16.6243 5.27352 16.193C4.84219 15.7617 4.59987 15.1767 4.59987 14.5667V4.6H13.7999V14.5667Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M7.66657 13.8001C7.8699 13.8001 8.06491 13.7193 8.20868 13.5755C8.35246 13.4318 8.43324 13.2367 8.43324 13.0334V8.43341C8.43324 8.23008 8.35246 8.03508 8.20868 7.8913C8.06491 7.74752 7.8699 7.66675 7.66657 7.66675C7.46324 7.66675 7.26823 7.74752 7.12445 7.8913C6.98068 8.03508 6.8999 8.23008 6.8999 8.43341V13.0334C6.8999 13.2367 6.98068 13.4318 7.12445 13.5755C7.26823 13.7193 7.46324 13.8001 7.66657 13.8001Z"
                                      fill="black"
                                    />
                                    <path
                                      d="M10.7335 13.8001C10.9368 13.8001 11.1318 13.7193 11.2756 13.5755C11.4194 13.4318 11.5001 13.2367 11.5001 13.0334V8.43341C11.5001 8.23008 11.4194 8.03508 11.2756 7.8913C11.1318 7.74752 10.9368 7.66675 10.7335 7.66675C10.5301 7.66675 10.3351 7.74752 10.1913 7.8913C10.0476 8.03508 9.9668 8.23008 9.9668 8.43341V13.0334C9.9668 13.2367 10.0476 13.4318 10.1913 13.5755C10.3351 13.7193 10.5301 13.8001 10.7335 13.8001Z"
                                      fill="black"
                                    />
                                  </g>
                                  <defs>
                                    <clipPath id="clip0_101_535">
                                      <rect
                                        width="18.4"
                                        height="18.4"
                                        fill="white"
                                      />
                                    </clipPath>
                                  </defs>
                                </svg>
                              </button>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                )}

              </div>

              {isLoading ? (
                <button
                  type="button"
                  style={{ backgroundColor: "#9e9e9e" }}
                  className={styles.submitGroupButton}
                >
                  Submit My Group
                </button>
              ) : (
                <button
                  onClick={() => {
                    handleSubmit();
                  }}
                  className={styles.submitGroupButton}
                >
                  Submit My Group
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
      {showModel && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowModel(false);
                setPeopleId("");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="#707070"
                width={20}
                height={20}
                className="bi bi-x-lg"
                viewBox="0 0 16 16"
              >
                <path d="M2.146 2.854a.5.5 0 1 1 .708-.708L8 7.293l5.146-5.147a.5.5 0 0 1 .708.708L8.707 8l5.147 5.146a.5.5 0 0 1-.708.708L8 8.707l-5.146 5.147a.5.5 0 0 1-.708-.708L7.293 8z" />
              </svg>
            </button>
            <h1>Are you sure you want to remove this people?</h1>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => {
                  setValues({
                    ...values,
                    invitees: values.invitees.filter(
                      (inv) => inv.id !== peopleId
                    ),
                  });
                  setShowModel(false);
                  setPeopleId("");
                }}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setPeopleId("");
                  setShowModel(false);
                }}
              >
                No
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
