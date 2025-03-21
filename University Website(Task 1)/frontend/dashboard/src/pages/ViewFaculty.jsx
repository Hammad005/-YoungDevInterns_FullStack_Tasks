import { Button } from "@/components/ui/button";
import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";
import { courseStore } from "@/store/courseStore";
import { noticeStore } from "@/store/noticeStore";
import { userStore } from "@/store/userStore";
import { ArrowLeft, Loader2 } from "lucide-react";
import React, { useEffect } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";

const ViewFaculty = () => {
  const { faculty, getSingleFaculty, loading, deleteUser, success, user, makeAdmin } =
    userStore();
  const { facultyCourses, getCourseByFaculty } = courseStore();
  const { notices, getNotices } = noticeStore();

  const navigateTo = useNavigate();

  const { id } = useParams();
  useEffect(() => {
    getSingleFaculty(id);
  }, [getSingleFaculty, id]);

  useEffect(() => {
    getNotices();
    if (faculty?.name) {
      getCourseByFaculty(faculty.name);
    }
  }, [faculty?.name, getNotices]);

  const handleDelete = () => {
    deleteUser(faculty?._id);
  };
  if (success) {
    navigateTo("/");
  }

  const handleAdmin = () => {
    makeAdmin(faculty?._id);
  }
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 "}>
            {loading ? (
              <div className="flex items-center justify-center">
                <Loader2 className="size-18 animate-spin" />
              </div>
            ) : !faculty ? (
              <div className="flex items-center justify-center text-2xl font-bold text-gray-900">
                No faculty found!
              </div>
            ) : (
              <Card className={"h-full justify-center"}>
                <CardHeader className="text-center">
                <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                  <CardTitle className="text-xl">Faculty</CardTitle>
                  <CardDescription>Faculty Information</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="p-4 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-900 font-semibold">Name:</p>
                      <span className="text-gray-700 font-normal">
                        {faculty?.name}
                      </span>
                    </div>
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-900 font-semibold">Email:</p>
                      <span className="text-gray-700 font-normal">
                        {faculty?.email}
                      </span>
                    </div>
                  </div>

                  {facultyCourses?.length > 0 && (
                    <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Faculty Courses
                      </h3>
                      <p className="text-gray-700 flex flex-row flex-wrap gap-2">
                        {facultyCourses?.map((course) => (
                          <Link
                            to={`/getSingleCourse/${course._id}`}
                            className="text-gray-700 text-[0.8rem] mr-2 border-b border-gray-900 hover:text-gray-900 font-semibold"
                            key={course._id}
                          >
                            {course.title}
                          </Link>
                        ))}
                      </p>
                    </div>
                  )}
                  
                  {notices?.filter(
                    (notice) => notice.postedBy.name === faculty?.name
                  ).length > 0 && (
                    <div className="p-4 mt-5 bg-transparent bg-opacity-50  rounded-lg border border-gray-900">
                      <h3 className="text-xl font-bold text-gray-900 mb-3">
                        Faculty Notices
                      </h3>
                      <p className="text-gray-700">
                        {notices
                          ?.filter(
                            (notice) => notice.postedBy.name === faculty?.name
                          )
                          .map((notice) => (
                            <Link
                              to={`/viewNotice/${notice._id}`}
                              className="text-gray-700 mr-2 text-[0.7rem] border-b border-gray-900 hover:text-gray-900 font-semibold"
                              key={notice._id}
                            >
                              {notice.title}
                            </Link>
                          ))}
                      </p>
                    </div>
                  )}
                  <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Account Activity
                    </h3>
                    <p className="text-gray-700">
                      <div className="flex flex-row items-center justify-between">
                        <p className="text-gray-900 font-semibold">Joined:</p>
                        {new Date(faculty?.createdAt).toLocaleDateString(
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
                {user?.role === "admin" && (
                  <CardFooter>
                    <div className="flex items-center justify-center gap-2 w-full">
                      <Button onClick={handleDelete} className="cursor-pointer">
                        Delete Faculty
                      </Button>
                      {faculty?.role === "faculty" && <Button onClick={handleAdmin} className="cursor-pointer">
                        Assign As Admin
                      </Button>
                      }
                    </div>
                  </CardFooter>
                )}
              </Card>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default ViewFaculty;
