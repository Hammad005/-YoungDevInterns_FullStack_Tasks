import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { userStore } from "@/store/userStore";
import { Loader2, User } from "lucide-react";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const AllAdmins = () => {
  const { getAdmins, admins, loading, makeFaculty, success } = userStore();
  const navigateTo = useNavigate();

  useEffect(() => {
    getAdmins();
  }, [getAdmins, makeFaculty]);

  if (success) {
    navigateTo('/')
  }

  return (
    <div className="p-6">
      {loading ? (
        <div className="flex items-center justify-center min-h-svh ">
          <Loader2 className="size-18 animate-spin" />
        </div>
      ) : (
        <Card className="p-4">
          <CardContent>
            <div className="flex justify-between items-center">
              <h3 className="text-3xl lg:text-4xl font-bold mb-4 text-gray-900">
                Admins:
              </h3>
              <p className=" text-gray-900 font-semibold text-[0.75rem] lg:text-xl md:text-xl">
                Total Admins: {admins?.length}
              </p>
            </div>
            <Table className="w-full">
              <TableHeader>
                <TableRow className={"hover:bg-transparent"}>
                  <TableHead>Name</TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    Email
                  </TableHead>
                  <TableHead className={"hidden md:table-cell"}>
                    Assign Admin At
                  </TableHead>
                  <TableHead className={"text-end "}>
                    Action
                  </TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {admins?.length === 0 ? (
                  <TableRow className={"hover:bg-transparent"}>
                    <TableCell
                      colSpan={4}
                      className="text-center text-2xl font-bold text-gray-900"
                    >
                      No Admin found
                    </TableCell>
                  </TableRow>
                ) : (
                  admins?.map((admin) => (
                    <TableRow
                      key={admin._id}
                      className={"hover:bg-transparent"}
                    >
                      <TableCell>{admin.name}</TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {admin.email?.length > 31
                          ? admin.email.slice(0, 31) + "..."
                          : admin.email}
                      </TableCell>
                      <TableCell className={"hidden md:table-cell"}>
                        {new Date(admin.updatedAt).toLocaleDateString("en-US", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                          hour: "2-digit",
                          minute: "2-digit"
                        })}
                      </TableCell>
                      <TableCell className={"text-end"}>
                        <Button
                          className={"cursor-pointer"}
                          onClick={() =>
                            makeFaculty(admin._id)
                          }
                        >
                          <User />
                          Asign As Faculty
                        </Button>
                      </TableCell>
                    </TableRow>
                  ))
                )}
              </TableBody>
            </Table>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default AllAdmins;
