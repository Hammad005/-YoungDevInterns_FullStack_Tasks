import React, { useEffect, useState } from "react";
import { Card, CardSkeletonContainer } from "../components/Card";
import { Label } from "../components/Label";
import { Input, TextArea } from "../components/Input";
import { ArrowLeftIcon, Loader } from "lucide-react";
import { schoolStore } from "../store/schoolStore";
import { Link, useNavigate, useParams } from "react-router-dom";
import { staffStore } from "../store/staffStore";
const EditStaff = () => {
  const { singleSchool } = schoolStore();
  const { updateStaff, loading, getSingleStaff, singlestaffMember } = staffStore();
  const { id } = useParams();
  useEffect(() => {
    getSingleStaff(id);
  }, [getSingleStaff, id]);

  const [data, setData] = useState({
    name: singlestaffMember?.name,
    email: singlestaffMember?.email,
    phone: singlestaffMember?.phone,
    role: singlestaffMember?.role,
    subjects: singlestaffMember?.subjects,
    schoolId: singleSchool._id,
  });

  const navigateTo = useNavigate();
  const handleSubmit = async (e) => {
    e.preventDefault();
    await updateStaff(id, data);
  };
  return (
    <>
      <div className="min-h-screen md:mt-20">
        <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 mt-7">
          <div onClick={() => navigateTo(-1)} className="cursor-pointer">
            <ArrowLeftIcon className="w-4 h-4 text-white" />
          </div>
          <CardSkeletonContainer
            className={"text-center flex justify-center items-center mb-4"}
          >
            <div className="flex flex-col items-center justify-center text-3xl md:text-3xl uppercase font-bold text-white animate-pulse">
              Edit Staff Member
            </div>
          </CardSkeletonContainer>
          <form
            className="flex w-full flex-col space-y-4"
            onSubmit={handleSubmit}
          >
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              placeholder="Alex Pol"
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              placeholder="Alex Pol"
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              placeholder="Enter Staff Phone"
              type="number"
              required
              value={data.phone}
              onChange={(e) => setData({ ...data, phone: e.target.value })}
            />
            <Label htmlFor="role">Role</Label>
            <Input
              id="role"
              placeholder="Teacher, SRO, etc.."
              type="text"
              required
              value={data.role}
              onChange={(e) => setData({ ...data, role: e.target.value })}
            />
            <Label htmlFor="subject">Subjects</Label>
            <TextArea
              id="subject"
              placeholder="Math, English, Scince, etc..."
              value={data.subjects}
              onChange={(e) => setData({ ...data, subjects: e.target.value })}
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
                <>Update &rarr;</>
              )}
              <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
              <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
            </button>
          </form>
        </Card>
      </div>
    </>
  );
};

export default EditStaff;
