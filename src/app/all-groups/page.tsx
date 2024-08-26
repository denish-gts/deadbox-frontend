
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "All Groups",
};
import GroupTab from "@/component/group/GroupTab";

export default function Page() {

  return (
    <>    
    <GroupTab/> 
    </>
 );
}
