import React, { useEffect, useState } from "react";
import { adminStore } from "../store/adminStore";
import { schoolStore } from "../store/schoolStore";
import { ArrowLeftIcon, Trash2, User2 } from "lucide-react";
import { Link, useNavigate, useParams } from "react-router-dom";
import AllStaff from "../components/AllStaff";
import { staffStore } from "../store/staffStore";

const SchoolDashboard = () => {
  const { admin } = adminStore();
  const { getSingleSchool, singleSchool, deleteSchool } = schoolStore();
  const { getAllStaff } = staffStore();
  const { id } = useParams();
  const navigateTo = useNavigate();
  useEffect(() => {
    if (admin?.role === "schoolAdmin") {
      getSingleSchool(admin.schoolId);
      getAllStaff();
    }
  }, [getSingleSchool, admin.schoolId, getAllStaff]);

  useEffect(() => {
    if (admin?.role === "admin") {
      getSingleSchool(id);
      getAllStaff(id);
    }
  }, [getSingleSchool, id, getAllStaff]);

  const handleDelete = () => {
    deleteSchool(id);
  }
  return (
    <>
      {!singleSchool ? (
        <div className="min-h-screen w-full flex flex-col justify-center items-center ">
          <Link to={"/"} className="relative">
                  <div className="flex items-center justify-center bg-white text-black hover:bg-gray-700 hover:text-white transition-colors rounded-full size-8">
                    <ArrowLeftIcon className="w-4 h-4 " />
                  </div>
                </Link>
          <h1 className="text-white uppercase font-bold text-4xl text-center mt-4">
            No School Found
          </h1>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center mt-6 ">
          <div className="flex items-center md:px-20 px-10   justify-between w-full ">
            {admin?.role === "admin" && (
              <>
                <Link to={"/"} className="relative">
                  <div className="flex items-center justify-center bg-white text-black hover:bg-gray-700 hover:text-white transition-colors rounded-full size-8">
                    <ArrowLeftIcon className="w-4 h-4 " />
                  </div>
                </Link>
                <button
                  className="group/btn relative flex items-center justify-center gap-1 h-10 w-40  disabled:cursor-no-drop disabled:text-gray-400  rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                  onClick={handleDelete}
                >
                  <Trash2 className="w-4 h-4" />
                  Delete School
                  <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                  <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                </button>
              </>
            )}
          </div>
          <div className="w-1/2 flex h-[60vh] md:h-[80vh] items-center flex-col gap-6 justify-center">
            <h1 className="md:text-7xl text-6xl  font-bold text-center text-white uppercase">
              {singleSchool?.name}
            </h1>
            <button
              className="group/btn relative flex items-center justify-center gap-1 h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              onClick={() => navigateTo("/schoolProfile")}
            >
              <User2 className="w-4 h-4" />
              Profile
              <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
              <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
            </button>
          </div>

          <AllStaff />
        </div>
      )}
    </>
  );
};

export default SchoolDashboard;
