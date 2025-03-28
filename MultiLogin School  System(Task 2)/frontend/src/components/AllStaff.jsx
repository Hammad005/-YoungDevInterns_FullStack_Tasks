import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import { Users2 } from "lucide-react";
import { staffStore } from "../store/staffStore";
import { adminStore } from "../store/adminStore";

const tableVariants = {
  hidden: { rotateX: 20, opacity: 0 },
  visible: { rotateX: 5, opacity: 1, transition: { duration: 0.8 } },
};
const AllStaff = () => {
  const navigateTo = useNavigate();
  const { staffs } = staffStore();
  const {admin} = adminStore()
  return (
    <>
      <div
        className="max-w-4xl mx-auto my-10"
        style={{ perspective: "1000px" }}
      >
        <div className="flex items-center gap-3 justify-between mb-6">
          <h1 className="text-white uppercase text-4xl font-bold text-center">
            Staff
          </h1>
          {admin?.role === "schoolAdmin" &&<button
            className="group/btn relative flex items-center justify-center gap-1 h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            onClick={() => navigateTo("/addStaff")}
          >
            <Users2 className="w-4 h-4" />
            Add Staff
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
          </button>}
        </div>
        {staffs?.length < 1 ? (
            <div className="text-white text-2xl font-bold text-center">
                No Staff
              </div>
        ) : (
          <motion.table
            className="min-w-full bg-white shadow-lg border border-gray-400"
            variants={tableVariants}
            initial="hidden"
            whileInView="visible"
            viewport={{ amount: 0.5 }}
          >
            <thead className="bg-black text-white">
              <tr>
                <th className="px-6 py-3 text-left">Name</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">
                  Email
                </th>
                <th className="px-6 py-3 text-left">Role</th>
                <th className="px-6 py-3 text-left hidden md:table-cell">
                  Phone
                </th>
                <th className="px-6 py-3 text-left">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-black">
              {staffs?.map((staff) => (
                <motion.tr
                  key={staff._id}
                  whileHover={{ scale: 1.02, rotateX: 0 }}
                  className="hover:bg-gray-200"
                >
                  <td className="px-6 py-4 whitespace-nowrap">{staff.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {staff.email}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">{staff.role}</td>
                  <td className="px-6 py-4 whitespace-nowrap hidden md:table-cell">
                    {staff.phone}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <button
                      className="group/btn relative flex items-center justify-center gap-1 h-10 w-20 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                      onClick={() => navigateTo(`/viewStaff/${staff._id}`)}
                    >
                      View
                      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                    </button>
                  </td>
                </motion.tr>
              ))}
            </tbody>
          </motion.table>
        )}
      </div>
    </>
  );
};

export default AllStaff;
