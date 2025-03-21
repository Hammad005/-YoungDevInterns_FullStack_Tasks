import { Navigate, Route, Routes } from "react-router-dom";
import Homepage from "./pages/Homepage";
import { useEffect } from "react";
import { clientStore } from "./store/clientStore";
import { Toaster } from "react-hot-toast";
import Notices from "./pages/Notices";
import Navbar from "./pages/sub-comonents/Navbar";
import SingleNotice from "./pages/SingleNotice";
import Events from "./pages/Events";
import SingleEvent from "./pages/SingleEvent";
import Courses from "./pages/Courses";
import SingleCourse from "./pages/SingleCourse";
import Login from "./pages/Login";
import LoadingPage from "./pages/sub-comonents/LoadingPage";
import Profile from "./pages/Profile";

function App() {
  const {
    getCourses,
    getNotices,
    getEvents,
    student,
    checkingAuth,
    checkAuth,
  } = clientStore();
  useEffect(() => {
    getCourses();
    getNotices();
    getEvents();
  }, [getCourses, getNotices, getEvents]);
  
  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  if (checkingAuth) return <LoadingPage />;
  return (
    <>
      <Navbar />
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route path="/" element={<Homepage />} />
        <Route path="/notices" element={<Notices />} />
        <Route path="/singleNotice/:id" element={<SingleNotice />} />
        <Route path="/events" element={<Events />} />
        <Route path="/singleEvent/:id" element={<SingleEvent />} />
        <Route path="/courses" element={<Courses />} />
        <Route path="/singleCourse/:id" element={<SingleCourse />} />

        <Route
          path="/login"
          element={!student ? <Login /> : <Navigate to={"/"} />}
        />
        <Route
          path="/profile"
          element={student ? <Profile /> : <Navigate to={"/"} />}
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
