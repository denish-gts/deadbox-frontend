'use client'

import { usePathname } from "next/navigation";
import AddGroup from "./AddGroup";


export default function EditGroup() {
    const path = usePathname().split('/')
    const groupId = path[path.length - 1]
    return (
        <>
            <AddGroup
                type='edit_group'
                header={'Edit Group'}
                groupId={groupId} 
                />
        </>

    );
}
