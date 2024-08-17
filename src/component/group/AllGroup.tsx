"use client";
import { useEffect, useState } from "react";
import styles from "./group.module.scss";
import Image from "next/image";
import { post } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/auth.util";
import Pagination from "../pagination/index";

interface Group {
  id: number;
  title: string;
  type: string;
  members: number;
  sd: string;
  description: string;
  logo: string;
  group_type: string;
  admin_approval_sd: any;
  created_by: number;
  updated_by: number;
}

export default function AllGroup() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [showModal, setShowModal] = useState(false);
  const [modalAction, setModalAction] = useState<string | null>(null);
  const [userID, setUserID] = useState("");
  const [groupId, setGroupId] = useState<number | null>(null);
  const [pagination, setPagination] = useState({});
  const initialFilterData = { page: 1, per_page: 10 };
  const [filterData, setFilterData] = useState(initialFilterData);
  const [sd, setSd] = useState("");

  useEffect(() => {
    if (typeof window !== "undefined") {
      setUserID(getUserInfo()?.id);
    }
  }, [router]);

  const handleClick = (page: number) => {
    setFilterData((prev) => {
      return { ...prev, page };
    });
  };

  const sdHandler = (action: string, id: number) => {
    setGroupId(id);
    setSd(action);
    setModalAction(action);
    setShowModal(true);
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups?.filter((group) =>
    group?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getGroup = () => {
    const payload = {
      paginate: {
        ...filterData,
        order: "DESC",
        order_by: "group.created",
      },
      filter: {
        title: null,
        group_type: null,
        admin_approval_sd: null,
      },
    };
    post('group/paginate-my-groups', payload)
      .then((data: any) => {
        const response = data.data?.data;
        const paginations = {
          pages: response.pages,
          total: response?.total,
          current_page: response?.page,
          per_page: 10,
        };
        setPagination(paginations);
        setGroups(response?.list);
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
      });
  };

  useEffect(() => {
    getGroup();
  }, [filterData]);

  const handleModalAction = (action: string) => {
    // Handle Accept/Reject based on the action
    console.log(`${action} group with ID: ${groupId}`);
    // Here you would send the request to accept or reject the group
    // e.g., post(`group/${action}`, { groupId });

    setShowModal(false); // Close modal after action
  };

  return (
    <>
      <div className={styles.myGroups}>
        <div className={styles.flexs}>
          <div className="">
            <h1>All Groups</h1>
            <p>Manage your selected groups</p>
          </div>
         
        </div>
        <table className={styles.groupsTable}>
          <thead>
            <tr>
              <th>
                <input type="checkbox" />
              </th>
              <th>Groups Name</th>
              <th>Group Type</th>
              <th>Members</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {filteredGroups?.map((group) => (
              <tr key={group?.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className={styles.groupName}>
                    <Image
                      height={0}
                      width={0}
                      unoptimized
                      src={group?.logo || ""}
                      alt={"People"}
                    />
                    <span>{group.title}</span>
                  </div>
                </td>
                <td>{group.group_type}</td>
                <td>{group.total_members}</td>
                {/* <td>-</td> */}
                <td>
                  <button
                    className={styles.acceptBtn}
                    onClick={() => sdHandler("accept", group.id)}
                  >
                    Accept
                  </button>
                  <button
                    className={styles.rejectBtn}
                    onClick={() => sdHandler("reject", group.id)}
                  >
                    Reject
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <Pagination pagination={pagination} handleClick={handleClick} />
        </div>
      </div>

      {showModal && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setShowModal(false);
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
            <h1>Are you sure you want to {modalAction} the group?</h1>
            <div className={styles.buttonGroup}>
              <button
                onClick={() => handleModalAction(modalAction || "")}
              >
                Yes
              </button>
              <button
                onClick={() => {
                  setShowModal(false);
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
