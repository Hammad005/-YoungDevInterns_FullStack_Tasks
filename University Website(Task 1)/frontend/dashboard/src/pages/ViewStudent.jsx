import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
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
import { ArrowLeft, Loader2, X } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewStudent = () => {
  const { user } = userStore();
  const {
    getSingleStudent,
    loading,
    success,
    student,
    deleteStudent,
    deassignCourse,
  } = studentStore();

  const navigateTo = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getSingleStudent(id);
  }, [getSingleStudent, id]);

  const handleDelete = () => {
    deleteStudent(student?._id);
  };
  if (success) {
    navigateTo("/");
  }
  const handleUnenroll = async (courseId, studentId) => {
    await deassignCourse(courseId, studentId);
  };
  

  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 "}>
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="size-18 animate-spin" />
              </div>
            ) : !student ? (
              <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
                No student found!
              </div>
            ) : (
              <Card className={"h-full justify-center"}>
                <CardHeader className="text-center">
                  <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                  <CardTitle className="text-xl">Student</CardTitle>
                  <CardDescription>Student Information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-900 font-semibold">Name:</p>
                      <span className="text-gray-700 font-normal">
                        {student?.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-900 font-semibold">Email:</p>
                      <span className="text-gray-700 font-normal">
                        {student?.email}
                      </span>
                    </div>
                  </div>

                  {student?.courses.length > 0 && (
                    <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                      <h3 className="text-xl font-bold text-gray-900">
                        Enrolled Courses
                      </h3>
                      <p className=" text-gray-700 font-semibold text-[0.75rem] mb-3">
                        Total Enrolled Courses: ({student?.courses.length})
                      </p>
                      <Table className={"border border-muted-foreground"}>
                        <TableHeader>
                          <TableRow
                            className={
                              "hover:bg-gray-800 border border-muted-foreground bg-gray-800"
                            }
                          >
                            <TableHead
                              className={
                                "text-accent border border-muted-foreground"
                              }
                            >
                              Name
                            </TableHead>
                            <TableHead
                              className={
                                "text-accent border border-muted-foreground"
                              }
                            >
                              Assigned by
                            </TableHead>
                            <TableHead
                              className={
                                "text-end text-accent border border-muted-foreground"
                              }
                            >
                              Action
                            </TableHead>
                          </TableRow>
                        </TableHeader>
                        <TableBody>
                          {student?.courses?.map((course) => (
                            <TableRow
                              key={course.courseId._id}
                              className={
                                "hover:bg-transparent border border-muted-foreground bg-gray-300"
                              }
                            >
                              <TableCell>
                                <Link
                                  to={`/getSingleCourse/${course.courseId._id}`}
                                  className="text-gray-700 text-[0.8rem] mr-2 hover:text-gray-900 font-semibold"
                                  key={course.courseId._id}
                                >
                                  {course.courseId.title}
                                </Link>
                              </TableCell>
                              <TableCell>
                                {course.assignedBy.role === "admin" ? (
                                  <p className="text-gray-700 text-[0.8rem] mr-2 font-semibold">
                                    Admin
                                  </p>
                                ) : (
                                  <Link
                                    to={`/getFaculty/${course.assignedBy._id}`}
                                    className="text-gray-700 text-[0.8rem] mr-2 hover:text-gray-900 font-semibold"
                                  >
                                    {course.assignedBy.name}
                                  </Link>
                                )}
                              </TableCell>
                              <TableCell className={"flex justify-center ml-4"}>
                                <X
                                  className="size-4 text-red-700 hover:text-red-900 cursor-pointer"
                                  onClick={() =>
                                    handleUnenroll(
                                      course.courseId._id,
                                      student?._id
                                    )
                                  }
                                />
                              </TableCell>
                            </TableRow>
                          ))}
                        </TableBody>
                      </Table>
                    </div>
                  )}
                  <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Account Activity
                    </h3>
                    <p className="text-gray-700">
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-gray-900 font-semibold">Joined:</p>
                        {new Date(student?.createdAt).toLocaleDateString(
                          "en-US",
                          {
                            year: "numeric",
                            month: "long",
                            day: "numeric",
                          }
                        )}
                      </div>
                    </p>
                  </div>
                </CardContent>
                <CardFooter>
                  <div className="flex items-center justify-center gap-2 w-full">
                    {user?.role === "admin" && (
                      <Button onClick={handleDelete} className="cursor-pointer">
                        Delete Student
                      </Button>
                    )}
                    <Button
                      onClick={() =>
                        navigateTo(`/assignCourseToStudent/${student?._id}`)
                      }
                      className={`cursor-pointer ${
                        user?.role !== "admin" && "w-full"
                      }`}
                    >
                      Assign A Course
                    </Button>
                  </div>
                </CardFooter>
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewStudent;
