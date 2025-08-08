
"use client";

import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import SuggestedGroupsSection from "./SuggestedGroupsSection";
import PeopleYouMayKnowSection from "./PeopleYouMayKnowSection";
// import EditProfile from "./EditProfile";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { post } from "@/api/base";
import Loader from "../common/loader";


const Myprofile = () => {
  const [userData, setuserData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    setIsLoading(true)

    post(`user/get-profile`)
      .then((res) => {
        setuserData(res?.data?.data?.userDetails);
        setIsLoading(false)
      })
      .catch((error) => {
        errorCheckAPIResponse(error);
        setIsLoading(false)
      });
  }, []);
  return (
    <div>
      {isLoading && (
        <Loader />
      )}
      <ProfileSection
        userData={userData}
      />
      <SuggestedGroupsSection />
      <PeopleYouMayKnowSection />
      {/* </>
            ) : (
              <>
                <EditProfile setIsEditProfile={setIsEditProfile} userData={userData} setuserData={setuserData} />
              </>
            )} */}
    </div>

  );
};

export default Myprofile;
