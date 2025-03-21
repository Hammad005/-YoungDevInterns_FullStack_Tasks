import { Navigate, Route, Routes } from "react-router-dom";
import HomePage from "./pages/HomePage";
import Login from "./pages/Login";
import { Toaster } from "react-hot-toast";
import { userStore } from "./store/userStore";
import { useEffect } from "react";
import DashboardNavbar from "./pages/sub-components/DashboardNavbar";
import Profile from "./pages/Profile";
import LoadingSpinner from "./pages/sub-components/LoadingSpinner";
import ViewMessage from "./pages/ViewMessage";
import AddFaculty from "./pages/AddFaculty";
import ViewFaculty from "./pages/ViewFaculty";
import AddCourse from "./pages/AddCourse";
import ViewCourse from "./pages/ViewCourse";
import AddNotice from "./pages/AddNotice";
import ViewNotice from "./pages/ViewNotice";
import AllAdmins from "./pages/AllAdmins";
import AddStudent from "./pages/AddStudent";
import ViewStudent from "./pages/ViewStudent";
import AssignCourse from "./pages/AssignCourse";
import AddEvent from "./pages/AddEvent";
import ViewEvent from "./pages/ViewEvent";

function ProtectRoute({ children, condition, redirectTo }) {
  return condition ? children : <Navigate to={redirectTo} />;
}

function App() {
  const { user, checkAuth, checkingAuth } = userStore();

  useEffect(() => {
    checkAuth();
    
  }, [checkAuth]);

  if (checkingAuth) return <LoadingSpinner />;
  return (
    <>
      {user && <DashboardNavbar />}
      <Routes>
        <Route path="*" element={<Navigate to={"/"} />} />
        <Route
          path="/"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <HomePage />
            </ProtectRoute>
          }
        />
        <Route
          path="/login"
          element={
            <ProtectRoute condition={!user} redirectTo={"/"}>
              <Login />
            </ProtectRoute>
          }
        />
        <Route
          path="/profile"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <Profile />
            </ProtectRoute>
          }
        />
        <Route
          path="/allAdmins"
          element={
            <ProtectRoute condition={user?.role === "admin"} redirectTo={"/"}>
              <AllAdmins />
            </ProtectRoute>
          }
        />
        <Route
          path="/viewMessage/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewMessage />
            </ProtectRoute>
          }
        />
         <Route
          path="/getFaculty/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewFaculty />
            </ProtectRoute>
          }
        />
        <Route
          path="/addFaculty"
          element={
            <ProtectRoute condition={user?.role === "admin"} redirectTo={"/"}>
              <AddFaculty />
            </ProtectRoute>
          }
        />
        <Route
          path="/addStudent"
          element={
            <ProtectRoute condition={user?.role === "admin"} redirectTo={"/"}>
              <AddStudent />
            </ProtectRoute>
          }
        />
        <Route
          path="/viewStudent/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewStudent />
            </ProtectRoute>
          }
        />
        <Route
          path="/assignCourseToStudent/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <AssignCourse/>
            </ProtectRoute>
          }
        />
        <Route
          path="/addCourse"
          element={
            <ProtectRoute condition={user?.role === "admin"} redirectTo={"/"}>
              <AddCourse />
            </ProtectRoute>
          }
        />
        <Route
          path="/getSingleCourse/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewCourse />
            </ProtectRoute>
          }
        />
       <Route
          path="/addNotice"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <AddNotice />
            </ProtectRoute>
          }
        />
       <Route
          path="/viewNotice/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewNotice />
            </ProtectRoute>
          }
        />
        <Route
          path="/addEvent"
          element={
            <ProtectRoute condition={user?.role === 'admin'} redirectTo={"/"}>
              <AddEvent />
            </ProtectRoute>
          }
        />
        <Route
          path="/viewEvent/:id"
          element={
            <ProtectRoute condition={user} redirectTo={"/login"}>
              <ViewEvent />
            </ProtectRoute>
          }
        />
      </Routes>
      <Toaster />
    </>
  );
}

export default App;
