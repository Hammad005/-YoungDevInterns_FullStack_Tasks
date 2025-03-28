import React, { useEffect } from "react";
import AllSchools from "../components/AllSchools";
import { schoolStore } from "../store/schoolStore";

const AdminDashboard = () => {
  const {getAllSchools} = schoolStore();
  useEffect(() => {
    getAllSchools();
  }, [getAllSchools])
  
  return (
    <>
      <AllSchools/>
    </>
  );
};

export default AdminDashboard;
