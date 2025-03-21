import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { userStore } from "@/store/userStore";
import { ArrowLeft, Eye, EyeOff, LoaderPinwheel, User } from "lucide-react";
import toast from "react-hot-toast";
import { Link } from "react-router-dom";
const AddFaculty = () => {
  const { addFaculty, loading } = userStore();
  const [data, setData] = useState({
    name: "",
    email: "",
    password: "",
    role: "faculty",
  });
  const [cnPassword, setCnPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showCnPassword, setShowCnPassword] = useState(false);

  const handleSubmit = (e) => {
    e.preventDefault();
    if (data.password !== cnPassword) {
      return toast.error("Passwords do not match");
    }
    addFaculty(data);
    setData({ name: "", email: "", password: "", role: "faculty" });
    setCnPassword("");
  };
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 lg:h-[70vh]"}>
            <Card className={"h-fit justify-center"}>
              <CardHeader className="text-center">
              <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                <CardTitle className="text-xl">Faculty Registration</CardTitle>
                <CardDescription>
                  Only admins can register faculty accounts.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Name</Label>
                        <Input
                          id="name"
                          type="text"
                          value={data.name}
                          onChange={(e) =>
                            setData({ ...data, name: e.target.value })
                          }
                          placeholder="John Dev"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Email</Label>
                        <Input
                          id="email"
                          type="email"
                          value={data.email}
                          onChange={(e) =>
                            setData({ ...data, email: e.target.value })
                          }
                          placeholder="m@example.com"
                          required
                        />
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <Label htmlFor="password">Password</Label>
                        </div>
                        <Input
                          id="password"
                          type={showPassword ? "text" : "password"}
                          value={data.password}
                          onChange={(e) =>
                            setData({ ...data, password: e.target.value })
                          }
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 pt-3 flex items-center"
                          onClick={() => setShowPassword(!showPassword)}
                        >
                          {showPassword ? (
                            <EyeOff className="h-5 w-5 text-base-content/40 cursor-pointer" />
                          ) : (
                            <Eye className="h-5 w-5 text-base-content/40 cursor-pointer" />
                          )}
                        </button>
                      </div>
                      <div className="relative">
                        <div className="flex items-center">
                          <Label htmlFor="password">Confirm Password</Label>
                        </div>
                        <Input
                          id="password"
                          type={showCnPassword ? "text" : "password"}
                          value={cnPassword}
                          onChange={(e) => setCnPassword(e.target.value)}
                          placeholder="••••••••"
                          required
                        />
                        <button
                          type="button"
                          className="absolute inset-y-0 right-0 pr-3 pt-3 flex items-center"
                          onClick={() => setShowCnPassword(!showCnPassword)}
                        >
                          {showCnPassword ? (
                            <EyeOff className="h-5 w-5 text-base-content/40 cursor-pointer" />
                          ) : (
                            <Eye className="h-5 w-5 text-base-content/40 cursor-pointer" />
                          )}
                        </button>
                      </div>
                      <Button
                        type="submit"
                        className="w-full cursor-pointer"
                        disabled={loading}
                      >
                        {loading ? (
                          <>
                            <LoaderPinwheel className="h-5 w-5 animate-spin" />
                            {"Loading..."}
                          </>
                        ) : (
                          <>
                            <User className="h-5 w-5" />
                            {"Add Faculty"}
                          </>
                        )}
                      </Button>
                    </div>
                  </div>
                </form>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default AddFaculty;
