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
import { studentStore } from "@/store/studentStore";
import { userStore } from "@/store/userStore";
import { GraduationCap, LucideMenuSquare, User } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const FacultyAndStudent = () => {
  const { faculties, user } = userStore();
  const {students} = studentStore();
  const navigateTo = useNavigate();
  return (
    <div className="p-6">
      <Card className="p-4">
        <CardContent>
          <h3 className="text-[1.7rem] lg:text-4xl font-bold mb-4 text-gray-900">
            Faculties & Students:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Faculty Table */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Faculties</h4>
                  <p className=" text-gray-700 font-semibold text-[0.75rem] mb-2">
                    (Total Faculties: {faculties?.length})
                  </p>
                </div>
                {user?.role === "admin" && (
                  <Button
                    className={"cursor-pointer"}
                    onClick={() => navigateTo("/addFaculty")}
                  >
                    <User />
                    Add Faculty
                  </Button>
                )}
              </div>
              <Table className="w-full border border-muted-foreground">
                <TableHeader>
                  <TableRow
                    className={"hover:bg-transparent border-muted-foreground"}
                  >
                    <TableHead>Name</TableHead>
                    <TableHead className={"hidden md:table-cell"}>
                      Email
                    </TableHead>
                    <TableHead className={"text-end md:text-start"}>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {faculties?.length === 0 ? (
                    <TableRow className={"hover:bg-transparent"}>
                      <TableCell
                        colSpan={4}
                        className="text-center text-2xl font-bold text-gray-900"
                      >
                        No faculties found
                      </TableCell>
                    </TableRow>
                  ) : (
                    faculties?.map((faculty) => (
                      <TableRow
                        key={faculty._id}
                        className={
                          "border-muted-foreground hover:bg-transparent"
                        }
                      >
                        <TableCell>{faculty.name}</TableCell>
                        <TableCell className={"hidden md:table-cell"}>
                          {faculty.email}
                        </TableCell>
                        <TableCell className={"text-end md:text-start"}>
                          <Button
                            className={"cursor-pointer"}
                            onClick={() =>
                              navigateTo(`/getFaculty/${faculty._id}`)
                            }
                          >
                            <LucideMenuSquare />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))
                  )}
                </TableBody>
              </Table>
            </div>

            {/* Students Table */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Students</h4>
                  <p className=" text-gray-700 font-semibold text-[0.75rem] mb-2">
                    (Total Students: {students?.length})
                  </p>
                </div>
                {user?.role === "admin" && (
                  <Button className={"cursor-pointer"} onClick={() => navigateTo('/addStudent')}>
                    <GraduationCap />
                    Add Student
                  </Button>
                )}
              </div>
              <Table className="w-full border border-muted-foreground">
                <TableHeader>
                  <TableRow
                    className={"hover:bg-transparent border-muted-foreground"}
                  >
                    <TableHead>Name</TableHead>
                    <TableHead className={"hidden md:table-cell"}>
                      Email
                    </TableHead>
                    <TableHead className={"text-end md:text-start"}>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {students?.map((student) => (
                      <TableRow key={student._id} className={'border-muted-foreground hover:bg-transparent'}>
                        <TableCell>{student.name}</TableCell>
                        <TableCell className={"hidden md:table-cell"}>{student.email}</TableCell>
                        <TableCell className={"text-end md:text-start"}>
                          <Button
                            className={"cursor-pointer"}
                            onClick={() =>
                              navigateTo(`/viewStudent/${student._id}`)
                            }
                          >
                            <LucideMenuSquare />
                            View
                          </Button>
                        </TableCell>
                      </TableRow>
                    ))}
                </TableBody>
              </Table>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default FacultyAndStudent;
