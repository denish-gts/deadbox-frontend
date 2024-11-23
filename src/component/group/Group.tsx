'use client'
import { use, useEffect, useState } from "react";
import styles from "./group.module.scss";
import Image from "next/image";
import { post } from "@/api/base";
import { errorCheckAPIResponse, successAPIResponse } from "@/utils/helpers";
import { useRouter } from "next/navigation";
import { getUserInfo } from "@/utils/auth.util";
import { RoleData } from '@/utils/data'
import Pagination from "../pagination/index";
import Loader from "../common/loader";

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
  const router = useRouter();
  const [showModel, setShowModel] = useState(false);
  const [userID, setUserID] = useState('')
  const [groupId, setGroupId] = useState('')
  const [pagination, setPagination] = useState({});
  const initialFilterData = { page: 1, per_page: 10, title: '', group_type: '' };
  const [filterData, setFilterData] = useState(initialFilterData);
  const [isLoading, setIsLoading] = useState(false);
  const [query, setQuery] = useState('');
  const [timeoutId, setTimeoutId] = useState(null);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      setUserID(getUserInfo()?.id)
    }
  }, [router])

  const handleClick = (page) => {
    const data = { ...filterData, page }
    setFilterData(data);
    getGroup(data)
  };

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setQuery(e.target.value?.toLowerCase())
  };

  const getGroup = (filterData) => {
    const payload = {
      "paginate": {
        ...filterData,
        "order": "DESC",
        "order_by": "group.created"
      },
      "filter": {
        "title": (filterData?.title || null),
        "group_type": (filterData?.group_type || null),
        "admin_approval_status": null
      }
    }
    setIsLoading(true)

    post(`group/paginate-my-groups`, payload)
      .then((data: any) => {
        const responce = data.data?.data
        const paginations = {
          pages: responce.pages, total: responce?.total, current_page: responce?.page, per_page: 10
        }
        const groupData = responce?.list.map((item) => {
          const roleObj = RoleData.map((roleitem) => {
            if (item?.asMember?.role_id?.toString()?.split(',')?.includes(roleitem?.id?.toString())) {
              return roleitem?.title
            }
          }).filter((item) => item).toString()
          return { ...item, roleName: roleObj }
        })

        setPagination(paginations);
        setGroups(groupData);
        setIsLoading(false)
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }

  const hadleClickRemove = () => {
    if (userID && groupId) {
      const body = {
        "group_id": groupId,
        "user_id": userID
      }
      setIsLoading(true)

      post(`group-member/remove`, body)
        .then((data: any) => {
          getGroup(filterData)
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

  const handleChangeGroupType = (e) => {
    const data = { ...filterData, group_type: e.target.value }
    setFilterData(data);
    getGroup(data)
  }

  useEffect(() => {
    if (timeoutId) {
      clearTimeout(timeoutId);
    }
    const newTimeoutId = setTimeout(() => {
      performSearch(query);
    }, 500);

    setTimeoutId(newTimeoutId);

    return () => clearTimeout(newTimeoutId);
  }, [query]);

  const performSearch = (query) => {
    const data = { ...filterData, page: 1, title: query }
    setFilterData(data);
    getGroup(data)
  };
  return (
    <>
      {/* <div className="container"> */}
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
              value={query}
              onChange={handleSearchChange}
            />
            <div>
              <select onChange={(e) => handleChangeGroupType(e)} value={filterData?.group_type}>
                <option value="">Select Group Type</option>
                <option value="deadbox">Dead Box</option>
                <option value="saas">SAS</option>
                <option value="general_private">General Private</option>
                <option value="general_public">General Public</option>
              </select>
            </div>
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
              <th>Role</th>
              <th>Status</th>
              <th>Action</th>
            </tr>
          </thead>
          <tbody>
            {groups?.map((group: any) => {
              let groupStatus = ''

              switch (group.status) {
                case 0:
                  groupStatus = 'Requested'
                  break;
                case 1:
                  groupStatus = 'Joined'
                  break;
                case 2:
                  groupStatus = 'Rejected'
                  break;
                default:
                  break;
              }
              return (
                <tr key={group?.id}>
                  <td>
                    <input type="checkbox" />
                  </td>
                  <td style={{ cursor: "pointer" }}>
                    <div className={styles.groupName}
                      onClick={() => {
                        router.push(`/edit-group/${parseInt(group?.id)}}`)
                      }}>
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
                  <td>{group.roleName}</td>
                  <td>{groupStatus}</td>
                  <td>
                    <button
                      className={styles.removeGroupButton}
                      onClick={() => {
                        setGroupId(group.id as any)
                        setShowModel(true)
                      }}
                    >
                      Remove Group
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
