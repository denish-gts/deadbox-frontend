'use client'
import { useEffect, useState } from "react";
import styles from "./group.module.scss";
import people1 from "../../../public/assets/images/people1.png";
import Image from "next/image";
import { BASE_URL, post } from "@/api/base";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";

interface Group {
  id: number;
  title: string;
  type: string;
  members: number;
  status: string;
  description: string;
  logo: string;
  group_type: string;
  admin_approval_status: any;
  created_by: number;
  updated_by: number;
}

export default function Group() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const router = useRouter();
  const [showModel, setShowModel] = useState(false);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups?.filter((group) =>
    group?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const handleRemoveGroup = (id: number) => {
    setGroups(groups?.filter((group) => group.id !== id));
  };

  useEffect(() => {
    post(`group/paginate-my-groups`)
      .then((data: any) => {
        setGroups(data.data?.data.list);
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        // setIsLoading(false)
      });
  }, []);

  return (
    <>
      <div className={styles.myGroups}>
        <div className={styles.flexs}>
          <div className="">
            <h1>My Groups</h1>
            <p>Manage your selected groups</p>
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by groups name"
              value={searchTerm}
              onChange={handleSearchChange}
            />
            <button
              className={styles.addNewGroupButton}
              onClick={() => { router.push('/add-group') }}
            >
              Add New Group
            </button>
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
              <th>Action</th>
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
                <td>-</td>
                <td>{group.status}</td>
                <td>
                  <button
                    className={styles.removeGroupButton}
                    // onClick={() => handleRemoveGroup(group.id)}
                    onClick={()=>setShowModel(true)}
                  >
                    Remove Group
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className={styles.pagination}>
          <button disabled>1</button>
          <button>2</button>
          <button>3</button>
          <button>4</button>
          <button>5</button>
        </div>
      </div>
      {showModel && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => setShowModel(false)}
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
            <h1>Are you sure you want to remove this user?</h1>
            <div className={styles.buttonGroup}>
              <button>Yes</button>
              <button onClick={() => setShowModel(false)}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
