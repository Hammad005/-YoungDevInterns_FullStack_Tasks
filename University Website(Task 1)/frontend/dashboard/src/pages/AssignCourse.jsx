import React, { useEffect, useState } from "react";
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
import { ArrowLeft, BookAIcon, LoaderPinwheel, User } from "lucide-react";
import { courseStore } from "@/store/courseStore";
import { studentStore } from "@/store/studentStore";
import { useParams } from "react-router-dom";

const AssignCourse = () => {
  const { courses, getCourses } = courseStore();
  const { student, getSingleStudent, loading, assignCourse } = studentStore();
  const [courseId, setcourseId] = useState('')
  const {id} = useParams();
  useEffect(() => {
    getCourses();
    getSingleStudent(id);
  }, [getCourses, getSingleStudent, id]);

  const handleSubmit = (e) => {
    e.preventDefault();
    assignCourse(courseId, student?._id);
    setcourseId('');
  };
  const handleBack = () => {
    window.history.back();
  }
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 lg:h-[70vh]"}>
            <Card className={"h-fit justify-center"}>
              <CardHeader className="text-center">
                <ArrowLeft className="size-5 text-gray-900 cursor-pointer" onClick={handleBack}/>
                <CardTitle className="text-xl">Assign Course</CardTitle>
                <CardDescription>
                  Only admins and Faculty can assign course to student.
                </CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Student Name</Label>
                        <Input
                          id="title"
                          type="text"
                          value={student?.name}
                          disabled
                        />
                      </div>
                      <div className="relative">
                        <div className="flex items-center mb-2">
                          <Label>Courses</Label>
                          {}
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 items-start ">
                          {courses?.map((course) => (
                            <label
                              key={course._id}
                              className="flex items-center gap-[0.25rem]"
                            >
                              <Input
                                type="radio"
                                name="course"
                                value={course._id}
                                checked={courseId === course._id}
                                onChange={(e) =>
                                    setcourseId(e.target.value )
                                }
                                required
                              />
                              {course.title}
                            </label>
                          ))}
                        </div>
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
                            <BookAIcon className="h-5 w-5" />
                            {"Assign A Course"}
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

export default AssignCourse;
