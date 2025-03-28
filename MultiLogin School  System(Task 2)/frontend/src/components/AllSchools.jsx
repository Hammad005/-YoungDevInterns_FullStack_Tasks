import React from "react";
import { Card } from "./Card";
import { TextGenerateEffect } from "./TextGenerateEffect";
import { useNavigate } from "react-router-dom";
import { schoolStore } from "../store/schoolStore";
import { MapPin, PhoneCall, User2 } from "lucide-react";

const AllSchools = () => {
  const navigateTo = useNavigate();
  const { schools } = schoolStore();
  return (
    <>
      <div className="flex flex-col  items-center justify-center mt-6">
        <div className="w-1/2">
          <h1 className="text-3xl font-bold text-center text-white uppercase">
            Registerd Schools
          </h1>
        </div>

        {schools && (
          <div className="flex items-end justify-end w-full pr-6 mt-6">
            <button
              className="group/btn relative block h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              onClick={() => navigateTo("/add-school")}
            >
              Add School
              <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
              <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
            </button>
          </div>
        )}

        {!schools ? (
          <Card className={"mt-6"}>
            <div className="flex flex-col items-center justify-center">
              <TextGenerateEffect words={"No Schools Registered"} />
              <TextGenerateEffect
                words={"Please Register a School"}
                duration={1}
              />
              <button
                className="group/btn relative block h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer mt-6"
                onClick={() => navigateTo("/add-school")}
              >
                Add School
                <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
              </button>
            </div>
          </Card>
        ) : (
          <div className="grid grid-cols-1 gap-4 md:grid-cols-3 mb-6">
            {schools?.map((school) => (
              <Card className={"mt-6 flex items-center"} key={school._id}>
                <div className="flex flex-col">
                  <h1 className="font-bold text-3xl text-center text-white">
                    {school.name}
                  </h1>
                  <div className="flex gap-3 items-center mt-4">
                    <MapPin className="w-7 h-7 text-gray-500" />
                    <p className="text-white">{school.address}</p>
                  </div>
                  <div className="flex gap-3 items-center mt-4">
                    <PhoneCall className="w-5 h-5 text-gray-500" />
                    <p className="text-white">{school.contact}</p>
                  </div>
                  {school.adminId && (
                    <div className="flex gap-3 items-center mt-4">
                      <User2 className="w-5 h-5 text-gray-500" />
                      <p className="text-white">{school.adminId.name}</p>
                    </div>
                  )}
                  <div className="flex  items-end mt-6 gap-2">
                    <button
                      className="text-xs group/btn relative block h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                      onClick={() => navigateTo(`/viewSchool/${school._id}`)}
                    >
                      View
                      <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                      <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                    </button>
                    {!school.adminId && (
                      <button
                        className="text-xs group/btn relative block h-10 w-30 disabled:cursor-no-drop disabled:text-gray-400  rounded-full bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
                        onClick={() =>
                          navigateTo(`/add-school-admin/${school._id}`)
                        }
                      >
                        Assign Admin
                        <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
                        <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
                      </button>
                    )}
                  </div>
                </div>
              </Card>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default AllSchools;
