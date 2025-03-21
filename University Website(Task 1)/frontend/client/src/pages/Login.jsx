import { University } from "lucide-react";
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
import { useState } from "react";
import { Eye, EyeOff, LoaderPinwheel, LogIn } from "lucide-react";
import { clientStore } from "@/store/clientStore";
import Footer from "./sub-comonents/Footer";
const Login = () => {
  const { login, loading } = clientStore();
  const [data, setData] = useState({ email: "", password: "" });
  const [showPassword, setShowPassword] = useState(false);

    const handleSubmit = (e) => {
      e.preventDefault();
      login(data);
    };
  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <div className="flex-grow flex flex-col items-center justify-center pt-10">
          <div className={"flex flex-col gap-6 lg:h-[60vh]"}>
            <Card className={"h-full w-sm justify-center"}>
              <CardHeader className=" flex flex-col items-center text-center">
                <div className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground animate-bounce">
                  <University className="size-4" />
                </div>
                <CardTitle className="text-xl">University Website</CardTitle>
                <CardDescription>
                  Login with your university-issued account
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
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
                            <LogIn className="h-5 w-5" />
                            {"Login"}
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
      <Footer />
      </div>
    </>
  );
};

export default Login;
