"use client";
import { useState } from "react";
import SignUpFirstForm from "./Components/SignUpFirstForm";
import SignUpSecondForm from "./Components/SignUpSecondForm";
import styles from "./signup.module.scss";
export default function Signup() {
  const [firstOpen, setFirstOpen] = useState(true);
  const [inputData, setinputData] = useState(null);
  console.log('inputDatainputDatainputDatainputData',inputData);
  return (
    <div>
      {firstOpen ? (
        <SignUpFirstForm
          setFirstOpen={setFirstOpen}
          inputData={inputData}
          setinputData={setinputData}
        />
      ) : (
        <SignUpSecondForm
          setFirstOpen={setFirstOpen}
          inputData={inputData}
        />
      )}
    </div>
  );
}

