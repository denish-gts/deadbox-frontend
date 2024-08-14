'use client'
import { useEffect, useState } from "react";
import styles from "./group.module.scss";
import Image from "next/image";
import { post } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/auth.util";
import Pagination from "../pagination/index";
import Loader from "../common/Loader";

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
  const [userID, setUserID] = useState('')
  const [groupId, setGroupId] = useState('')
  const [pagination, setPagination] = useState({});
  const initialFilterData = { page: 1, per_page: 10 };
  const [filterData, setFilterData] = useState(initialFilterData);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserID(getUserInfo()?.id)
    }
  }, [router])
  const handleClick = (page) => {
    setFilterData((pre) => {
      return { ...pre, page };
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups?.filter((group) =>
    group?.title?.toLowerCase()?.includes(searchTerm?.toLowerCase())
  );

  const getGroup = () => {
    const payload={
      "paginate": {
        ...filterData,
        "order": "DESC",
        "order_by": "group.created"
    },
    "filter": {
        "title": null,
        "group_type": null, //deadbox, saas, general_private, general_public
        "admin_approval_status": null //0=>Pending,1=>Approved,2=>Declined
    }
    }
    setIsLoading(true)

    post(`group/paginate-my-groups`,payload)
      .then((data: any) => {
        const responce = data.data?.data
        const paginations = {
          pages: responce.pages, total: responce?.total, current_page: responce?.page, per_page: 10
        }
        setPagination(paginations);
        setGroups(responce?.list);
        setIsLoading(false)
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }
  useEffect(() => {
    getGroup()
  }, [filterData]);
  const hadleClickRemove = () => {
    if (userID && groupId) {
      const body = {
        "group_id": groupId,
        "user_id": userID
      }
      setIsLoading(true)

      post(`group-member/remove`, body)
        .then((data: any) => {
          getGroup()
          setGroupId('')
          setShowModel(false)
          const msg = { data: { message: 'Group remove successfully' } }
          successAPIResponse(msg)
          setIsLoading(false)
        })
        .catch((error) => {
          setGroupId('')
          setShowModel(false)
          errorCheckAPIResponse(error);
          setIsLoading(false)
        });
    }
  }
  console.log('filterDatafilterDatafilterDatafilterData', filterData);

  return (
    <>
      <div className="container">
      {isLoading && (
        <Loader />
      )}
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
                      onClick={() => {
                        setGroupId(group.id as any)
                        setShowModel(true)
                      }}
                    >
                      Remove Group
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
          <div className={styles.pagination}>
            {/* <button disabled>1</button>
            <button>2</button>
            <button>3</button>
            <button>4</button>
            <button>5</button> */}
            <Pagination pagination={pagination} handleClick={handleClick} />
          </div>
        </div>
      </div>
      {showModel && (
        <div className={styles.modal}>
          <div className={styles.modalContent}>
            <button
              className={styles.closeButton}
              onClick={() => {
                setGroupId('')
                setShowModel(false)
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
            <h1>Are you sure you want to remove the group?</h1>
            <div className={styles.buttonGroup}>
              <button onClick={() => {
                hadleClickRemove()
              }}>Yes</button>
              <button onClick={() => {
                setShowModel(false)
                setGroupId('')
              }}>No</button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
