
import Group from "@/component/group/Group";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "My Groups",
};

export default function Page() {

  return (
    <>    
    <Group/> 
    </>
 );
}
