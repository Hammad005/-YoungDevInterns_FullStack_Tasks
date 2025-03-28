import React, { useState } from "react";
import { BackgroundBeams } from "../components/BackgroundBeams";
import { Card, CardSkeletonContainer } from "../components/Card";
import { ContainerTextFlip } from "../components/container-text-flip";
import { IoIosSchool } from "react-icons/io";
import { Label } from "../components/Label";
import { Input } from "../components/Input";
import { adminStore } from "../store/adminStore";
import { Eye, EyeOff, Loader } from "lucide-react";
const LoginPage = () => {
  const [data, setData] = useState({ email: "", password: "" });
  const { login, loading } = adminStore();
  const [showPassword, setShowPassword] = useState(false);

  const handleLogin = (e) => {
    e.preventDefault();
    login(data);
  };
  return (
    <>
      <Card className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <CardSkeletonContainer
          className={"text-center flex justify-center items-center mb-4"}
        >
          <div className="flex flex-col items-center justify-center">
            <IoIosSchool className="text-center text-4xl font-bold text-black md:text-7xl dark:text-white animate-pulse" />
            <ContainerTextFlip
              words={["MultiLogin", "School", "System"]}
              className={"text-3xl md:text-3xl uppercase"}
            />
          </div>
        </CardSkeletonContainer>
        <form className="flex w-full flex-col space-y-4" onSubmit={handleLogin}>
          <Label htmlFor="email">Email</Label>
          <Input
            id="email"
            placeholder="tylerSwift90@gmail.com"
            type="email"
            required
            value={data.email}
            onChange={(e) => setData({ ...data, email: e.target.value })}
          />
          <Label htmlFor="email">Password</Label>
          <div className="relative">
            <Input
              id="password"
              placeholder="********"
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
              <>Login &rarr;</>
            )}
            <span className="absolute inset-x-0 -bottom-px block h-px w-full bg-gradient-to-r from-transparent via-cyan-500 to-transparent opacity-0 transition duration-500 group-hover/btn:opacity-100" />
            <span className="absolute inset-x-10 -bottom-px mx-auto block h-px w-1/2 bg-gradient-to-r from-transparent via-indigo-500 to-transparent opacity-0 blur-sm transition duration-500 group-hover/btn:opacity-100" />
          </button>
        </form>
      </Card>
    </>
  );
};

export default LoginPage;
