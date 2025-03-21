import {
  Card,
  CardContent,
  CardDescription,
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
import { clientStore } from "@/store/clientStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import { Link } from "react-router-dom";
import Footer from "./sub-comonents/Footer";

const Profile = () => {
  const { student } = clientStore();

  return (
    <>
      <div className="flex flex-col min-h-screen items-center justify-center bg-gray-50">
        <div className="flex-grow flex flex-col items-center justify-center pt-20 pb-10">
          <div className={"flex flex-col gap-6 "}>
            <Card className={"h-full w-sm justify-center"}>
              <CardHeader className="text-center">
                <Link to="/">
                  <ArrowLeft className="size-5 text-gray-900" />
                </Link>
                <CardTitle className="text-xl">Profile</CardTitle>
                <CardDescription>Profile Information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="flex flex-col gap-2 border border-b-gray-900 pb-6 border-x-0 border-t-0">
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
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Joined:</p>
                    <span className="text-gray-700 font-normal">
                      {new Date(student?.createdAt).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </div>
                </div>

                {student?.courses.length > 0 && (
                  <div className="mt-5">
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
                                to={`/singleCourse/${course.courseId._id}`}
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
                                <p className="text-gray-700 text-[0.8rem] mr-2 hover:text-gray-900 font-semibold">
                                  {course.assignedBy.name}
                                </p>
                              )}
                            </TableCell>
                          </TableRow>
                        ))}
                      </TableBody>
                    </Table>
                  </div>
                )}
              </CardContent>
            </Card>
          </div>
        </div>
        <Footer/>
      </div>
    </>
  );
};

export default Profile;
