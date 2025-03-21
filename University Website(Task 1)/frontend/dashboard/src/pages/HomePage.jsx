import React, { useEffect } from "react";
import CounterCard from "./sub-components/CounterCard";
import { userStore } from "@/store/userStore";
import { studentStore } from "@/store/studentStore";
import Messages from "./sub-components/Messages";
import { messageStore } from "@/store/messageStore";
import FacultyAndStudent from "./sub-components/FacultyAndStudent";
import CoursesAndNotices from "./sub-components/CoursesAndNotices";
import { courseStore } from "@/store/courseStore";
import { eventStore } from "@/store/eventStore";
import { noticeStore } from "@/store/noticeStore";
import Events from "./sub-components/Events";

const HomePage = () => {
  const { getTotalUsers, getTotalAdmins, getAllFaculties } = userStore();
  const { getStudents } = studentStore();
  const { getMessages } = messageStore();
  const { getCourses } = courseStore();
  const { getEvents } = eventStore();
  const { getNotices } = noticeStore();

  useEffect(() => {
    getCourses();
    getEvents();
    getNotices();
    getTotalUsers();
    getTotalAdmins();
    getStudents();
    getMessages();
    getAllFaculties();
  }, [
    getCourses,
    getEvents,
    getNotices,
    getTotalUsers,
    getTotalAdmins,
    getStudents,
    getMessages,
    getAllFaculties,
  ]);

  return (
    <>
      <CounterCard />
      <FacultyAndStudent />
      <Messages />
      <CoursesAndNotices/>
      <Events/>
    </>
  );
};

export default HomePage;
