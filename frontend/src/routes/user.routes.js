import React from "react";
import { Route, Routes } from "react-router-dom";
// import RequesterProfile from "../components/requester/requesterProfile";
import RequesterSignIn from "../components/Donator/requesterSignIn";
import RequesterSignUp from "../components/Donator/requesterSignUp";
// import RequesterProfileUpdate from "../components/requester/updateProfileDetails";

export default function User() {
  return (
    <>
      <Routes>
        <Route path="/signup" element={<RequesterSignUp />} />
        <Route path="/signin" element={<RequesterSignIn />} />
        {/* <Route path="/profile/:userId" element={<RequesterProfile />} /> */}
        {/* <Route path="/profile/update/:userId" element={<RequesterProfileUpdate/>} /> */}
      </Routes>
    </>
  );
}
