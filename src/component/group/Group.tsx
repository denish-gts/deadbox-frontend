import { useState } from "react";
import styles from "./group.module.scss";
import people1 from "../../../public/assets/images/people1.png";
import Image from "next/image";

interface Group {
  id: number;
  name: string;
  type: string;
  members: number;
  status: string;
}

const groupsData: Group[] = [
  {
    id: 1,
    name: "Mag Fed",
    type: "Public",
    members: 1294,
    status: "Activated Recently"
  },
  {
    id: 2,
    name: "Airsoft",
    type: "Public",
    members: 5107,
    status: "Activated 1 week ago"
  },
  {
    id: 3,
    name: "Milsim",
    type: "Public",
    members: 7204,
    status: "Activated 1 month ago"
  },
  // Add more group data as necessary
];

export default function Group({
  isGroup,
  setIsGroup,
}: {
  isGroup: boolean;
  setIsGroup: (isGroup: boolean) => void;
}) {
  const [groups, setGroups] = useState<Group[]>(groupsData);
  const [searchTerm, setSearchTerm] = useState("");

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchTerm(e.target.value);
  };

  const filteredGroups = groups.filter((group) =>
    group.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRemoveGroup = (id: number) => {
    setGroups(groups.filter((group) => group.id !== id));
  };

  return (
    <>
      <div className={styles.myGroups}>
        <div className={styles.flexs}>
          <div className=''>
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
              onClick={() => setIsGroup(true)}
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
            {filteredGroups.map((group) => (
              <tr key={group.id}>
                <td>
                  <input type="checkbox" />
                </td>
                <td>
                  <div className={styles.groupName}>
                    <Image height={0} width={0} unoptimized src={people1} alt={'People'} />
                    <span>{group.name}</span>
                  </div>
                </td>
                <td>{group.type}</td>
                <td>{group.members}</td>
                <td>{group.status}</td>
                <td>
                  <button
                    className={styles.removeGroupButton}
                    onClick={() => handleRemoveGroup(group.id)}
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
    </>
  );
}
