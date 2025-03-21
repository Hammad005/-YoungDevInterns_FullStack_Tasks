import {
  Home,
  List,
  LogIn,
  LogOut,
  Menu,
  University,
  User2,
} from "lucide-react";
import React from "react";
import { Link, useNavigate } from "react-router-dom";
import {
  NavigationMenu,
  NavigationMenuContent,
  NavigationMenuIndicator,
  NavigationMenuItem,
  NavigationMenuLink,
  NavigationMenuList,
  NavigationMenuTrigger,
  NavigationMenuViewport,
} from "@/components/ui/navigation-menu";
import { clientStore } from "@/store/clientStore";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@radix-ui/react-dropdown-menu";

const Navbar = () => {
  const navigateTo = useNavigate();
  const { courses, student, logout } = clientStore();
  const handleLogout = () => {
    logout();
  };
  return (
    <>
      <nav className="bg-gray-950 text-white w-full px-6 py-3 flex justify-between items-center fixed top-0 z-5">
        {/* Logo or Dashboard Title */}
        <div className="flex items-center gap-2">
          <Link
            to={"/"}
            className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-900"
          >
            <University className="size-4" />
          </Link>
          <h1 className="text-[0.97rem] lg:text-xl font-bold">
            University Website
          </h1>
        </div>

        <div className="items-center gap-10 hidden md:flex">
          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/"}>
                  <NavigationMenuLink className={"font-semibold"}>
                    Home
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <NavigationMenuTrigger>Courses</NavigationMenuTrigger>
                <NavigationMenuContent>
                  <div className="grid grid-cols-2 w-56 gap-2">
                    {courses?.length > 4
                      ? courses?.slice(0, 4).map((course) => (
                          <Link to={`/singleCourse/${course._id}`} key={course.id}>
                            <NavigationMenuLink
                              className={
                                "font-semibold text-center text-[0.75rem]"
                              }
                            >
                              {course.title}
                            </NavigationMenuLink>
                          </Link>
                        ))
                      : courses?.map((course) => (
                          <Link to={`/singleCourse/${course._id}`} key={course.id}>
                            <NavigationMenuLink
                              className={
                                "font-semibold text-center text-[0.75rem]"
                              }
                            >
                              {course.title}
                            </NavigationMenuLink>
                          </Link>
                        ))}
                  </div>
                  <Link to={"/courses"}>
                    <Button
                      className={
                        "font-semibold text-center w-full cursor-pointer text-[0.75rem] mt-2"
                      }
                    >
                      View All
                    </Button>
                  </Link>
                </NavigationMenuContent>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/notices"}>
                  <NavigationMenuLink className={"font-semibold"}>
                    Notices
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/events"}>
                  <NavigationMenuLink className={"font-semibold"}>
                    Events
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>

          {student && <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/profile"}>
                  <NavigationMenuLink className={"font-semibold"}>
                    Profile
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>}

          {!student && <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                <Link to={"/login"}>
                  <NavigationMenuLink className={"font-semibold"}>
                    Login
                  </NavigationMenuLink>
                </Link>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>}

          {student && <NavigationMenu>
            <NavigationMenuList>
              <NavigationMenuItem>
                  <NavigationMenuLink className={"font-semibold cursor-pointer"} onClick={handleLogout}>
                    Logout
                  </NavigationMenuLink>
              </NavigationMenuItem>
            </NavigationMenuList>
          </NavigationMenu>}
        </div>
        <div className={"md:hidden flex"}>
          <DropdownMenu>
            <DropdownMenuTrigger asChild>
              <Button
                className={
                  "cursor-pointer bg-white text-gray-900 hover:bg-gray-800 hover:text-white"
                }
                size="icon"
              >
                <Menu size={24} />
              </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent
              align="end"
              className="flex flex-col gap-4  bg-gray-100 shadow-lg p-2 w-32 rounded-md mt-2 text-gray-900"
            >
              {student && <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/profile')}>
                  Profile
                </DropdownMenuItem>
              </div>}
              <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/')}>
                  Home
                </DropdownMenuItem>
              </div>
              <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/courses')}>
                  Course
                </DropdownMenuItem>
              </div>
              <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/notices')}>
                  Notices
                </DropdownMenuItem>
              </div>
              <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/events')}>
                  Events
                </DropdownMenuItem>
              </div>
              {!student && <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={() => navigateTo('/login')}>
                  Login
                </DropdownMenuItem>
              </div>}
              {student && <div className="flex gap-2">
                <DropdownMenuItem className={"cursor-pointer"} onClick={handleLogout}>
                  Logout
                </DropdownMenuItem>
              </div>}
            </DropdownMenuContent>
          </DropdownMenu>
        </div>
      </nav>
    </>
  );
};

export default Navbar;
