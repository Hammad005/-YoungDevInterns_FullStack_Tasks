import React from "react";
import { IoIosSchool } from "react-icons/io";
import { ContainerTextFlip } from "./container-text-flip";
import { adminStore } from "../store/adminStore";
import { Link, useNavigate } from "react-router-dom";

const BasicNavbar = () => {
  const { logout } = adminStore();
  const navigateTp = useNavigate();
  const handleLogout = () => {
    logout();
    navigateTp("/login");
  }
  return (
    <>
      <div className="flex items-center justify-between w-full h-16 px-4 ">
        <Link className="flex flex-row items-center justify-center" to={'/'}>
          <IoIosSchool className="text-center text-5xl font-bold text-black md:text-5xl dark:text-white animate-pulse" />
          <ContainerTextFlip
            words={["MultiLogin", "School", "System"]}
            className={"text-3xl md:text-3xl uppercase"}
          />
        </Link>
        <button
          className="group/btn relative block h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
          onClick={handleLogout}
        >
          Logout
          <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
          <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
        </button>
      </div>
      <span className=" h-px w-full bg-gradient-to-r from-indigo-500 via-cyan-500 to-emerald-500 flex opacity-40" />

    </>
  );
};

export default BasicNavbar;
