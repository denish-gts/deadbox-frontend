import AddGroup from "@/component/group/AddGroup";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Add Group",
};

export default function Page() {

  return (
    <AddGroup
      type=''
      header={''}
      groupId={''}
    />
  );
}
