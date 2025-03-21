import { LogOut, Menu, University, User, Users2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Link, useNavigate } from "react-router-dom";
import { userStore } from "@/store/userStore";

export default function DashboardNavbar() {

    const navigateTo = useNavigate();
    const {logout, user} = userStore();
  return (
    <nav className="bg-gray-900 text-white px-6 py-3 flex justify-between items-center">
      {/* Logo or Dashboard Title */}
        <Link to={'/'} className="flex h-8 w-8 items-center justify-center rounded-md bg-white text-gray-900">
          <University className="size-4" />
        </Link>
      <h1 className="text-[0.97rem] lg:text-xl font-bold">University Website - Dashboard</h1>

      {/* User Profile Dropdown */}
      <DropdownMenu>
        <DropdownMenuTrigger asChild>
          <Button className={"cursor-pointer bg-white text-gray-900 hover:bg-gray-800 hover:text-white"} size="icon">
            <Menu size={24} />
          </Button>
        </DropdownMenuTrigger>
        <DropdownMenuContent align="end" className="bg-gray-800 text-white">
        <DropdownMenuItem className={'cursor-pointer'} onClick={() => navigateTo('/profile')}><User/>Profile</DropdownMenuItem>
        {user?.role === "admin" && <DropdownMenuItem className={'cursor-pointer'} onClick={() => navigateTo('/allADmins')}><Users2/>All Admins</DropdownMenuItem>}
        <DropdownMenuItem className={'cursor-pointer'} onClick={logout}><LogOut/>Logout</DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </nav>
  );
}
