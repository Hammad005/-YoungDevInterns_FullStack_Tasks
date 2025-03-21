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
import React, { useEffect } from "react";
import { Link } from "react-router-dom";

const Profile = () => {
  const { user, logout } = userStore();
  const {facultyCourses, getCourseByFaculty} = courseStore();
    const {notices, getNotices} = noticeStore();
    
    useEffect(() => {
      getNotices();
      if (user?.name) {
        getCourseByFaculty(user.name);
      }
    }, [user?.name, getNotices]);
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 lg:h-[70vh]"}>
            <Card className={"h-fit justify-center"}>
              <CardHeader className="text-center">
                <CardTitle className="text-xl">Profile</CardTitle>
                <CardDescription>Profile Information</CardDescription>
              </CardHeader>
              <CardContent>
                <div className="p-4 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Name:</p>
                    <span className="text-gray-700 font-normal">
                      {user.name}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Email:</p>
                    <span className="text-gray-700 font-normal">
                      {user.email}
                    </span>
                  </div>
                  <div className="flex flex-row items-center justify-between">
                    <p className="text-gray-900 font-semibold">Role:</p>
                    <span className="text-gray-700 font-normal first-letter:uppercase">
                      {user.role}
                    </span>
                  </div>
                </div>
                {facultyCourses?.length > 0 && <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Your Courses
                    </h3>
                    <p className="text-gray-700">
                    {facultyCourses?.map(course => (      
                        <Link to={`/getSingleCourse/${course._id}`} className="text-gray-700 text-[0.8rem] mr-2 border-b border-gray-900 hover:text-gray-900 font-semibold" key={course._id}>{course.title}</Link>
                        ))}
                    </p>
                  </div>}
                  {notices?.filter(notice => notice.postedBy.name === user?.name).length > 0 && <div className="p-4 mt-5 bg-transparent bg-opacity-50  rounded-lg border border-gray-900">
                    <h3 className="text-xl font-bold text-gray-900 mb-3">
                      Your Notices
                    </h3>
                    <p className="text-gray-700">
                    {notices?.filter(notice => notice.postedBy.name === user?.name).map(notice => (      
                        <Link to={`/viewNotice/${notice._id}`} className="text-gray-700 mr-2 text-[0.7rem] border-b border-gray-900 hover:text-gray-900 font-semibold" key={notice._id}>{notice.title}</Link>
                        ))}
                    </p>
                  </div>}
                <div className="p-4 mt-5 bg-transparent bg-opacity-50 rounded-lg border border-gray-900">
                  <h3 className="text-xl font-bold text-gray-900 mb-3">
                    Account Activity
                  </h3>
                  <p className="text-gray-700">
                    <div className="flex flex-row items-center justify-between">
                      <p className="text-gray-900 font-semibold">Joined:</p>
                      {new Date(user.createdAt).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </div>
                  </p>
                </div>
              </CardContent>
              <CardFooter>
                <Button onClick={logout} className="w-full cursor-pointer">
                  Logout
                </Button>
              </CardFooter>
            </Card>
          </div>
        </div>
      </div>
    </>
  );
};

export default Profile;
