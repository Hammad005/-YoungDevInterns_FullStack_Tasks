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
import { userStore } from "@/store/userStore";
import { ArrowLeft, BookAIcon, LoaderPinwheel } from "lucide-react";
import { Textarea } from "@/components/ui/textarea";
import { courseStore } from "@/store/courseStore";
import { Link } from "react-router-dom";
const AddCourse = () => {
  const { faculties, getAllFaculties } = userStore();
  const { loading, addCourse } = courseStore();
  const [data, setData] = useState({
    title: "",
    description: "",
    faculty: "",
  });
  useEffect(() => {
    getAllFaculties();
  }, [getAllFaculties]);

  const handleSubmit = (e) => {
    e.preventDefault();
    addCourse(data);
    setData({ title: "", description: "", faculty: "" });
  };
  return (
    <>
      <div className="flex min-h-svh flex-col items-center justify-center gap-6 bg-muted p-6 md:p-10">
        <div className="flex w-full max-w-sm flex-col gap-6">
          <div className={"flex flex-col gap-6 "}>
            <Card className={"h-fit justify-center"}>
              <CardHeader className="text-center">
              <Link to="/">
                    <ArrowLeft className="size-5 text-gray-900" />
                  </Link>
                <CardTitle className="text-xl">Course</CardTitle>
                <CardDescription>Only admins can add course.</CardDescription>
              </CardHeader>
              <CardContent>
                <form onSubmit={handleSubmit}>
                  <div className="grid gap-6">
                    <div className="grid gap-6">
                      <div className="grid gap-2">
                        <Label htmlFor="email">Title</Label>
                        <Input
                          id="title"
                          type="text"
                          value={data.title}
                          onChange={(e) =>
                            setData({ ...data, title: e.target.value })
                          }
                          placeholder="HTML"
                          required
                        />
                      </div>
                      <div className="grid gap-2">
                        <Label htmlFor="email">Description</Label>
                        <Textarea
                          id="description"
                          value={data.description}
                          onChange={(e) =>
                            setData({ ...data, description: e.target.value })
                          }
                          placeholder="Learn HTML With Cool Tricks"
                          required
                        />
                      </div>
                      <div className="relative">
                        <div className="flex items-center mb-2">
                          <Label>Faculty</Label>
                          {}
                        </div>
                        <div className="flex flex-row flex-wrap gap-4 items-start">
                          {faculties?.map((faculty) => (
                            <label
                              key={faculty._id}
                              className="flex items-center gap-[0.25rem]"
                            >
                              <Input
                                type="radio"
                                name="faculty"
                                value={faculty.name}
                                checked={data.faculty === faculty.name}
                                onChange={(e) =>
                                  setData({ ...data, faculty: e.target.value })
                                }
                                required
                              />
                              {faculty.name}
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
                            {"Add Course"}
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

export default AddCourse;
