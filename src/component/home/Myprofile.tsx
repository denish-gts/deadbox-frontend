
"use client";

import { useEffect, useState } from "react";
import ProfileSection from "./ProfileSection";
import SuggestedGroupsSection from "./SuggestedGroupsSection";
import PeopleYouMayKnowSection from "./PeopleYouMayKnowSection";
import EditProfile from "./EditProfile";
import { errorCheckAPIResponse } from "@/utils/helpers";
import { post } from "@/api/base";


const Myprofile = () => {

  const [isEditProfile, setIsEditProfile] = useState(false);
  const [userData, setuserData] = useState(null);  

  useEffect(() => {
    post(`user/get-profile`)
    .then((res) => {      
      setuserData(res?.data?.data);
        // setIsLoading(false)
    })
    .catch((error) => {
        errorCheckAPIResponse(error);
        // setIsLoading(false)
    }); 
  }, []);
  return (
          <div>
            {!isEditProfile ? (
              <>
                <ProfileSection
                  isEditProfile={isEditProfile}
                  setIsEditProfile={setIsEditProfile}
                  userData={userData}
                  setuserData={setuserData}
                />
                <SuggestedGroupsSection />
                <PeopleYouMayKnowSection />
              </>
            ) : (
              <>
                <EditProfile setIsEditProfile={setIsEditProfile} userData={userData} setuserData={setuserData} />
              </>
            )}
          </div>

  );
};

export default Myprofile;