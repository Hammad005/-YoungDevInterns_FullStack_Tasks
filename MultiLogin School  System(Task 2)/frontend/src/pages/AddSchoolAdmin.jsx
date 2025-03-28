import React, { useEffect, useRef, useState } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { Card, CardSkeletonContainer } from "../components/Card";
import { Label } from "../components/Label";
import { Input, TextArea } from "../components/Input";
import { adminStore } from "../store/adminStore";
import { ArrowLeftIcon, Eye, EyeOff, Loader } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { schoolStore } from "../store/schoolStore";
import toast from "react-hot-toast";

const AddSchoolAdmin = () => {
  const { getSingleSchool, singleSchool } = schoolStore();
  const { registerSchoolAdmin, loading, success, resetSuccess } = adminStore();
  const { id } = useParams();
  const [data, setData] = useState({ name: "", email: "", password: "", schoolId: singleSchool?._id });
  const [showPassword, setShowPassword] = useState(false);
  const navigateTo = useNavigate();

  useEffect(() => {
    const singleSchoolFunc = async () => {
      await getSingleSchool(id);
    }
    singleSchoolFunc();
  }, [getSingleSchool, id]);

  useEffect(() => {
    if (singleSchool?.adminId) {
      toast.error("School already has an admin");
      navigateTo("/");
    }
  }, [singleSchool]);

  useEffect(() => {
      if (success) {
        setData({ name: "", email: "", password: "", schoolId: singleSchool?._id });
          navigateTo(`/`);
      }
  
      resetSuccess()
  }, [success, resetSuccess]);
  

  const submitRef = useRef(null);

  const handleSubmit = (e) => {
    e.preventDefault();
    registerSchoolAdmin(data);
  };
  return (
    <>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 max-w-[80%] mt-7">
        <div onClick={() => navigateTo(-1)} className="cursor-pointer">
          <ArrowLeftIcon className="w-4 h-4 text-white" />
        </div>
        <CardSkeletonContainer
          className={"text-center flex justify-center items-center mb-4"}
        >
          <div className="flex flex-col items-center justify-center text-2xl md:text-2xl uppercase font-bold text-white animate-pulse">
            Assign an Admin to a School
          </div>
        </CardSkeletonContainer>
        <div className="grid md:grid-cols-2 grid-cols-1 gap-4">
          <form className="flex w-full flex-col space-y-4">
            <Label htmlFor="name">School Name</Label>
            <Input
              id="name"
              placeholder="ABCD-School"
              type="text"
              required
              value={singleSchool?.name}
              disabled
            />
            <Label htmlFor="address">School Address</Label>
            <Input
              id="address"
              placeholder="123, Oxford Street, London"
              type="text"
              required
              value={singleSchool?.address}
              disabled
            />
            <Label htmlFor="contact">School Contact</Label>
            <Input
              id="contact"
              placeholder="08012345678"
              type="Number"
              required
              value={singleSchool?.contact}
              disabled
            />
          </form>

          <form className="flex w-full flex-col space-y-4" onSubmit={handleSubmit}>
            <Label htmlFor="name">Admin Name</Label>
            <Input
              id="name"
              placeholder="Enter admin name"
              type="text"
              required
              value={data.name}
              onChange={(e) => setData({ ...data, name: e.target.value })}
            />
            <Label htmlFor="email">Admin Email</Label>
            <Input
              id="email"
              placeholder="Enter admin email"
              type="email"
              required
              value={data.email}
              onChange={(e) => setData({ ...data, email: e.target.value })}
            />
            <Label htmlFor="password">Admin Password</Label>
            <div className="relative">
              <Input
                id="password"
                placeholder="Enter admin password"
                type={showPassword ? "text" : "password"}
                required
                value={data.password}
                onChange={(e) => setData({ ...data, password: e.target.value })}
              />
              <div className="absolute inset-y-0 right-0 pr-3 flex items-center">
                {showPassword ? (
                  <EyeOff
                    className="text-white size-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                ) : (
                  <Eye
                    className="text-white size-5 cursor-pointer"
                    onClick={() => setShowPassword(!showPassword)}
                  />
                )}
              </div>
            </div>
            <button
              className="hidden"
              type="submit"
              ref={submitRef}
              disabled={loading}
            ></button>
          </form>
        </div>
            <button
              className="group/btn relative block h-10 mt-2 w-full disabled:cursor-no-drop disabled:text-gray-400  rounded-md bg-gradient-to-br from-black to-neutral-600 font-medium text-white shadow-[0px_1px_0px_0px_#ffffff40_inset,0px_-1px_0px_0px_#ffffff40_inset] dark:bg-zinc-800 dark:from-zinc-900 dark:to-zinc-900 dark:shadow-[0px_1px_0px_0px_#27272a_inset,0px_-1px_0px_0px_#27272a_inset] cursor-pointer"
              type="button"
              onClick={() => submitRef.current?.click()}
              disabled={loading}
            >
              {loading ? (
                <>
                  <div className="flex items-center justify-center gap-2">
                    <Loader className="size-5 animate-spin" />
                  </div>
                </>
              ) : (
                <>Add Admin &rarr;</>
              )}
              <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
              <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
            </button>
      </Card>
    </>
  );
};

export default AddSchoolAdmin;
