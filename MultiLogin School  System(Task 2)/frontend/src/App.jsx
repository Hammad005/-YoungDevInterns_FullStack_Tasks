import { Navigate, Route, Routes } from "react-router-dom";
import AdminDashboard from "./pages/AdminDashboard";
import LoginPage from "./pages/LoginPage";
import SchoolDashboard from "./pages/SchoolDashboard";
import { adminStore } from "./store/adminStore";
import { Toaster } from "react-hot-toast";
import { useEffect } from "react";
import { BackgroundBeams } from "./components/BackgroundBeams";
import BasicNavbar from "./components/BasicNavbar";
import AddSchool from "./pages/AddSchool";
import AddSchoolAdmin from "./pages/AddSchoolAdmin";
import SchoolProfile from "./pages/SchoolProfile";
import AddStaff from "./pages/AddStaff";
import ViewStaff from "./pages/ViewStaff";
import EditStaff from "./pages/EditStaff";

function App() {
  const { admin, checkAuth } = adminStore();

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  return (
    <>
      <div className="relative min-h-screen  bg-black">
        <BackgroundBeams />
        {admin && <BasicNavbar />}
        <Routes>
          <Route
            path="/"
            element={
              admin ? (
                admin?.role === "admin" ? (
                  <AdminDashboard />
                ) : (
                  <SchoolDashboard />
                )
              ) : (
                <Navigate to={"/login"} />
              )
            }
          />
          <Route
            path="/login"
            element={!admin ? <LoginPage /> : <Navigate to={"/"} />}
          />
          <Route
            path="/add-school"
            element={admin && admin?.role === 'admin' ? <AddSchool /> : <Navigate to={"/"} />}
          />
          <Route
            path="/add-school-admin/:id"
            element={admin && admin?.role === 'admin' ? <AddSchoolAdmin /> : <Navigate to={"/"} />}
          />
          <Route
            path="/schoolProfile"
            element={admin ? <SchoolProfile /> : <Navigate to={"/"} />}
          />
          <Route
            path="/addStaff"
            element={admin && admin?.role === 'schoolAdmin' ? <AddStaff /> : <Navigate to={"/"} />}
          />
          <Route
            path="/editStaff/:id"
            element={admin && admin?.role === 'schoolAdmin' ? <EditStaff /> : <Navigate to={"/"} />}
          /> 
          <Route
            path="/viewStaff/:id"
            element={admin && <ViewStaff />}
          />
          <Route
            path="/viewSchool/:id"
            element={admin ? <SchoolDashboard /> : <Navigate to={"/"} />}
          />
        </Routes>
        <Toaster />
      </div>
    </>
  );
}

export default App;
