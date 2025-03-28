import React, { useEffect, useState } from "react";
import { Card, CardSkeletonContainer } from "../components/Card";
import { Label } from "../components/Label";
import { Input, TextArea } from "../components/Input";
import { ArrowLeftIcon, Loader } from "lucide-react";
import { schoolStore } from "../store/schoolStore";
import { Link, useNavigate } from "react-router-dom";

const AddSchool = () => {
  const [data, setData] = useState({ name: "", address: "", contact: "" });
  const { addSchool, loading, success, schoolId, resetSuccess } = schoolStore();
  const navigateTo = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    await addSchool(data);
};

useEffect(() => {
    resetSuccess();
}, [resetSuccess])


useEffect(() => {
    if (success) {
      setData({ name: "", address: "", contact: "" });
        navigateTo(`/add-school-admin/${schoolId}`);
    }

    resetSuccess()
}, [success, schoolId, resetSuccess]);

  return (
    <>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-7">
      <Link to={'/'}>
        <ArrowLeftIcon className="w-4 h-4 text-white" />
      </Link>
        <CardSkeletonContainer
          className={"text-center flex justify-center items-center mb-4"}
        >
          <div className="flex flex-col items-center justify-center text-3xl md:text-3xl uppercase font-bold text-white animate-pulse">
            Add School
          </div>
        </CardSkeletonContainer>
        <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
          <Label htmlFor="name">Name</Label>
          <Input
            id="name"
            placeholder="Oxford High School"
            type="text"
            required
            value={data.name}
            onChange={(e) => setData({ ...data, name: e.target.value })}
          />
          <Label htmlFor="address">Address</Label>
          <TextArea
            id="address"
            placeholder="123, Oxford Street, London"
            required
            value={data.address}
            onChange={(e) => setData({ ...data, address: e.target.value })}
          />
          <Label htmlFor="contact">Contact</Label>
          <Input
            id="contact"
            placeholder="08012345678"
            type="number"
            required
            value={data.contact}
            onChange={(e) => setData({ ...data, contact: e.target.value })}
          />
          <button
            className="group/btn relative block h-10 w-full disabled:cursor-no-drop disabled:text-gray-400  rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
            type="submit"
            disabled={loading}
          >
            {loading ? (
              <>
                <div className="flex items-center justify-center gap-2">
                  <Loader className="size-5 animate-spin" />
                </div>
              </>
            ) : (
              <>Add &rarr;</>
            )}
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
          </button>
        </form>
      </Card>
    </>
  );
};

export default AddSchool;
