import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { courseStore } from "@/store/courseStore";
import { eventStore } from "@/store/eventStore";
import { noticeStore } from "@/store/noticeStore";
import { studentStore } from "@/store/studentStore";
import { userStore } from "@/store/userStore";
import { BookAIcon, CalendarDays, GraduationCap, LucideGanttChartSquare, Plus, Users, Users2 } from "lucide-react";
import React from "react";

const CounterCard = () => {
    const { courses } = courseStore();
    const { totalUsers, totalAdmins } = userStore();
    const {students} = studentStore();
    const {events} = eventStore();
    const {notices} = noticeStore();
  return (
    <>
      <div className="p-6">
        <div className="flex items-center mb-4">
          <h2 className="text-3xl lg:text-4xl font-bold text-gray-900">Overview:</h2>
        </div>
        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-6 gap-4">
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <Users2 className="mr-2"/>
              <h3>Total Admins</h3>
              </div>
                <p className="text-2xl text-gray-700">{totalAdmins}</p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <Users className="mr-2"/>
              <h3>Total Faculties</h3>
              </div>
                <p className="text-2xl text-gray-700">{totalUsers}</p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <GraduationCap className="mr-2"/>
              <h3>Total Students</h3>
              </div>
                <p className="text-2xl text-gray-700">{students?.length}</p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <BookAIcon className="mr-2"/>
              <h3>Total Courses</h3>
              </div>
                <p className="text-2xl text-gray-700">{courses?.length}</p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <LucideGanttChartSquare className="mr-2"/>
              <h3>Total Notices</h3>
              </div>
                <p className="text-2xl text-gray-700">{notices?.length}</p>
            </CardContent>
          </Card>
          <Card className="p-4">
            <CardContent>
              <div className="text-lg font-bold text-gray-900">
                <CalendarDays className="mr-2"/>
              <h3>Total Events</h3>
              </div>
                <p className="text-2xl text-gray-700">{events?.length}</p>
            </CardContent>
          </Card>
        </div>
      </div>
    </>
  );
};

export default CounterCard;
