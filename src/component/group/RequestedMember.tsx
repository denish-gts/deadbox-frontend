'use client'
import { useEffect, useState } from "react";
import styles from "./group.module.scss";
import Image from "next/image";
import { post } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
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

export default function RequestedMember() {
  const [groups, setGroups] = useState<Group[]>([]);
  const [showModel, setShowModel] = useState(false);
  const [groupId, setGroupId] = useState('')
  const [pagination, setPagination] = useState({});
  const initialFilterData = { page: 1, per_page: 10, title: '', group_type: '' };
  const [filterData, setFilterData] = useState(initialFilterData);
  const [isLoading, setIsLoading] = useState(false);

  const handleClick = (page) => {
    setFilterData((pre) => {
      return { ...pre, page };
    });
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFilterData((pre) => {
      return { ...pre, title: e.target.value?.toLowerCase() }
    })
  };

  const getGroup = () => {
    const payload = {
      "list_type": "suggested_list",
      "paginate": {
        ...filterData,
        "order": "DESC",
        "order_by": "groupMember.created"
      },
      "filter": {
        "title": (filterData?.title || null),
        "admin_approval_status": null
      }

    }
    setIsLoading(true)

    post(`group-member/paginate-join-request`, payload)
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

  const hadleClickJoinGroup = () => {
    setIsLoading(true)

    post(`group-member/request-join`, { group_id: groupId })
      .then((res) => {
        setIsLoading(false)
        setGroupId('')
        setShowModel(false)
        const msg = { data: { message: 'Group join successfully' } }
        successAPIResponse(msg)
        getGroup()
      })
      .catch((error) => {
        setGroupId('')
        setShowModel(false)
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }

  return (
    <>
      {/* <div className="container"> */}
      {isLoading && (
        <Loader />
      )}
      <div className={styles.myGroups}>
        <div className={styles.flexs}>
          <div className="">
            <h1>Requested Member</h1>
            <p>Manage your selected groups</p>
          </div>
          <div className={styles.searchContainer}>
            <input
              type="text"
              placeholder="Search by groups name"
              value={filterData?.title}
              onChange={handleSearchChange}
            />
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
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups?.map((group: any) => {
              return (
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
                  <td>
                    <button
                      className={styles.acceptBtn}
                      onClick={() => {
                        setGroupId(group.id as any)
                        setShowModel(true)
                      }}                  >
                      Join Group
                    </button>
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
        {groups?.length === 0 && (
          <div style={{
            textAlign: 'center',
            paddingTop: '20px'
          }}> No data Avilable</div>
        )}
        {groups?.length > 0 && (
          <div className={styles.pagination}>
            <Pagination pagination={pagination} handleClick={handleClick} />
          </div>
        )}
      </div>
      {/* </div> */}
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
            <h1>Are you sure you want to Join the group?</h1>
            <div className={styles.buttonGroup}>
              <button onClick={() => {
                hadleClickJoinGroup()
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
