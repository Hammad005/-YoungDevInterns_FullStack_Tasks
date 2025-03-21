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
import { courseStore } from "@/store/courseStore";
import { noticeStore } from "@/store/noticeStore";
import { userStore } from "@/store/userStore";
import { BookAIcon, LucideGanttChartSquare, LucideMenuSquare } from "lucide-react";
import React from "react";
import { useNavigate } from "react-router-dom";

const CoursesAndNotices = () => {
  const { courses } = courseStore();
  const { notices } = noticeStore();
  const { user } = userStore();
  const navigateTo = useNavigate();
  return (
    <div className="p-6">
      <Card className="p-4">
        <CardContent>
          <h3 className="text-[1.7rem] lg:text-4xl font-bold mb-4 text-gray-900">
            Courses & Notices:
          </h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Courses Table */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Courses</h4>
                  <p className=" text-gray-700 font-semibold text-[0.75rem] mb-2">
                    (Total Courses: {courses?.length})
                  </p>
                </div>
                {user?.role === "admin" && (
                  <Button
                    className={"cursor-pointer"}
                    onClick={() => navigateTo("/addCourse")}
                  >
                    <BookAIcon />
                    Add Course
                  </Button>
                )}
              </div>
              <Table className="w-full border border-muted-foreground">
                <TableHeader>
                  <TableRow
                    className={"hover:bg-transparent border-muted-foreground"}
                  >
                    <TableHead>Title</TableHead>
                    <TableHead>Faculty</TableHead>
                    <TableHead className={"text-end md:text-start"}>
                      Action
                    </TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {courses?.length === 0 ? (
                    <TableRow className={"hover:bg-transparent"}>
                      <TableCell
                        colSpan={4}
                        className="text-center text-2xl font-bold text-gray-900"
                      >
                        No courses found
                      </TableCell>
                    </TableRow>
                  ) : (
                    courses?.map((course) => (
                      <TableRow
                        key={course._id}
                        className={
                          "border-muted-foreground hover:bg-transparent"
                        }
                      >
                        <TableCell>{course.title}</TableCell>
                        <TableCell>{course.faculty}</TableCell>
                        <TableCell className={"text-end md:text-start"}>
                          <Button
                            className={"cursor-pointer"}
                            onClick={() =>
                              navigateTo(`/getSingleCourse/${course._id}`)
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

            {/* Notices Table */}
            <div>
              <div className="flex justify-between items-center">
                <div>
                  <h4 className="text-xl font-bold text-gray-800">Notices</h4>
                  <p className=" text-gray-700 font-semibold text-[0.75rem] mb-2">
                    (Total Notices: {notices?.length})
                  </p>
                </div>
                <Button className={"cursor-pointer"} onClick={() => navigateTo('/addNotice')}>
                  <LucideGanttChartSquare />
                  Add Notice
                </Button>
              </div>
              <Table className="w-full border border-muted-foreground">
                <TableHeader>
                  <TableRow
                    className={"hover:bg-transparent border-muted-foreground"}
                  >
                    <TableHead>Title</TableHead>
                    <TableHead>Posted By</TableHead>
                    <TableHead>Action</TableHead>
                  </TableRow>
                </TableHeader>
                <TableBody>
                  {notices?.map((notice) => (
                        <TableRow key={notice._id} className={'border-muted-foreground'}>
                          <TableCell>{notice.title.length >= 12 ? notice.title.slice(0, 12)+"..." : notice.title}</TableCell>
                          <TableCell>{notice?.postedBy.role === "admin"
                          ? "Admin"
                          : notice?.postedBy?.name}</TableCell>
                          <TableCell>
                          <Button
                            className={"cursor-pointer"}
                            onClick={() =>
                              navigateTo(`/viewNotice/${notice._id}`)
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

export default CoursesAndNotices;
