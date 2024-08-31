import styles from './home.module.scss'
import MegFed from '../../../public/assets/images/megfed.png';
import Speedball from '../../../public/assets/images/speedball.png';
import Airsoft from '../../../public/assets/images/airsoft.png';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { post } from '@/api/base';
import { errorCheckAPIResponse, successAPIResponse } from '@/utils/helpers';
import Loader from '../common/Loader';

const SuggestedGroupsSection = () => {
  const [suggestedGroup, setSuggestedGroup] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [showModel, setShowModel] = useState(false);
  const [groupId, setGroupId] = useState('')
  const getGroupList = () => {
    setIsLoading(true)
    const payload = {
      "list_type": "suggested_list",
      "paginate": {
        "page": 1,
        "limit": 5,
        "order": "DESC",
        "order_by": "total_members"
      },
    }
    post(`group/paginate-my-groups`, payload)
      .then((res) => {
        setSuggestedGroup(res?.data?.data?.list);
        setIsLoading(false)
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }
  useEffect(() => {
    getGroupList()
  }, []);

  const handleClickJointGroup = () => {
    setIsLoading(true)

    post(`group-member/request-join`, { group_id: groupId })
      .then((res) => {
        setIsLoading(false)
        setGroupId('')
        setShowModel(false)
        const msg = { data: { message: 'Group join successfully' } }
        successAPIResponse(msg)
        getGroupList()
      })
      .catch((error) => {
        setGroupId('')
        setShowModel(false)
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }

  return (
    <div className='container'>
      {isLoading && (
        <Loader />
      )}
      <div className={styles.suggestedGroupsSection}>
        <div className={styles.header}>
          <h3>Suggested for you</h3>
          <a href="/all-groups" className={styles.viewAll}>VIEW ALL</a>
        </div>
        {suggestedGroup.length > 0 ? <>

          <div className={styles.groups}>
            {suggestedGroup?.map((group, index) => {
              return (
                <div className={styles.group} key={index}>
                  <div>
                    <Image unoptimized height={0} width={0} src={group?.logo} alt="Group 1" />
                  </div>
                  <div>
                    <p>{group?.title}</p>
                    <span>Members - {group?.total_members}</span>
                    <button className={styles.joinButton}
                      onClick={() => {
                        setGroupId(group.id as any)
                        setShowModel(true)
                      }}
                    >JOIN GROUP</button>
                  </div>
                </div>
              )
            })}

          </div>
        </> :
          <span style={{ textAlign: 'center', display: 'block', fontSize: '20px' }}>No Group availabe.</span>
        }
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
            <h1>Are you sure you want to Join the group?</h1>
            <div className={styles.buttonGroup}>
              <button onClick={() => {
                handleClickJointGroup()
              }}>Yes</button>
              <button onClick={() => {
                setShowModel(false)
                setGroupId('')
              }}>No</button>
            </div>
          </div>
        </div>
      )}
    </div>
  )
}

export default SuggestedGroupsSection