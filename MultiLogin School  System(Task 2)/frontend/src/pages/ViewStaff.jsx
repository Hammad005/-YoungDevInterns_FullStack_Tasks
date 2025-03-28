import React, { useEffect } from "react";
import { ArrowLeftIcon, Edit, Loader, Loader2, Trash2 } from "lucide-react";
import { staffStore } from "../store/staffStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { Card } from "../components/Card";
import { adminStore } from "../store/adminStore";

const ViewStaff = () => {
  const { loading, getSingleStaff, singlestaffMember, deleteStaff, success } =
    staffStore();
  const { id } = useParams();
  // Fetch single staff member on component load
  useEffect(() => {
    getSingleStaff(id);
  }, [getSingleStaff, id]);

  // Re-fetch staff member when `success` changes
  useEffect(() => {
    if (success) {
      getSingleStaff(id);
      console.log(singlestaffMember);
      
    }
  }, [success, id, getSingleStaff]);
  const navigateTo = useNavigate();
  const { admin } = adminStore();
  const handleDelete = (id) => {
    deleteStaff(id);
  }
  return (
    <>
      {loading ? (
        <div className="min-h-screen w-full flex justify-center items-center absolute top-0">
          <Loader2 className="size-20 text-white animate-spin" />
        </div>
      ) : !singlestaffMember ? (
        <div className="min-h-screen w-full flex justify-center items-center relative top-0">
          <h1 className="text-white uppercase font-bold text-4xl text-center mt-4">
            No Staff Memeber Found
          </h1>
        </div>
      ) : (
        <div className="min-h-screen w-full flex flex-col  mt-5 md:mt-7">
          <h1 className="text-white uppercase font-bold text-4xl text-center mt-4">
            Staff Member Details
          </h1>
          <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2  flex flex-col">
            <div onClick={() => navigateTo(-1)} className="cursor-pointer">
              <ArrowLeftIcon className="w-4 h-4 text-white" />
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 font-semibold text-lg">Name:</p>
              <h2 className="text-white font-semibold text-lg">
                {singlestaffMember?.name}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 font-semibold text-lg">Email:</p>
              <h2 className="text-white font-semibold text-lg">
                {singlestaffMember?.email}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 font-semibold text-lg">Role:</p>
              <h2 className="text-white font-semibold text-lg">
                {singlestaffMember?.role}
              </h2>
            </div>
            <div className="flex justify-between items-center">
              <p className="text-gray-300 font-semibold text-lg">Phone:</p>
              <h2 className="text-white font-semibold text-lg">
                {singlestaffMember?.phone}
              </h2>
            </div>
            {singlestaffMember?.subjects && (
              <div>
                <p className="text-gray-300 font-semibold text-lg pb-3">
                  Subjects:
                </p>
                <Card>
                  <h2 className="text-white font-semibold text-md">
                    {singlestaffMember?.subjects}
                  </h2>
                </Card>
              </div>
            )}
            {admin?.role === "schoolAdmin" && (
              <div className="flex items-center justify-center mt-5 gap-2">
                <button
                  className="group/btn relative flex items-center justify-center gap-1 h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                  onClick={() => navigateTo(`/editStaff/${singlestaffMember?._id}`)}
                >
                  <Edit className="size-4" />
                  Edit
                  <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                  <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                </button>

                <button
                  className="group/btn relative flex items-center justify-center gap-1 h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                  onClick={() => handleDelete(singlestaffMember?._id)}
                  disabled={loading}
                >
                  {loading ? (
                    <>
                      <Loader className="size-4 animate-spin" />
                      Deleting
                    </>
                  ) : (
                    <>
                      <Trash2 className="size-4" />
                      Delete
                    </>
                  )}
                  <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                  <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                </button>
              </div>
            )}
          </Card>
        </div>
      )}
    </>
  );
};

export default ViewStaff;
