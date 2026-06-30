import React from "react";
import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

/* Public */
import HomePage from "../pages/public/Home";
import DoctorsPage from "../pages/public/Doctors";
import DoctorDetails from "../pages/public/DoctorDetails";
import DepartmentsPage from "../pages/public/Departments";
import BookAppointment from "../pages/public/BookAppointment";
import MyAppointments from "../pages/public/MyAppointments";
import MyProfilePage from "../pages/public/MyProfile";
import MyMedicalRecords from "../pages/public/MyMedicalRecords";
import AboutPage from "../pages/public/About";
import ContactPage from "../pages/public/Contact";
import LoginPage from "../pages/auth/Login";
import SignupPage from "../pages/auth/Signup";

import NotFoundPage from "../pages/public/NotFoundPage";

/* Admin */
import AdminDashboardPage from "../pages/admin/Dashboard";
import AdminUsersPage from "../pages/admin/Users";
import AdminPatientsPage from "../pages/admin/Patients";
import AdminDoctorsPage from "../pages/admin/Doctors";
import AdminDepartmentsPage from "../pages/admin/Departments";
import AdminDoctorDepartmentsPage from "../pages/admin/DoctorDepartments";
import AdminSchedulesPage from "../pages/admin/Schedules";
import AdminAppointmentsPage from "../pages/admin/Appointments";
import AdminMedicalRecordsPage from "../pages/admin/MedicalRecords";
import AdminPaymentsPage from "../pages/admin/Payments";
import AdminReportsPage from "../pages/admin/Reports";
import AdminProfilePage from "../pages/admin/Profile";

/* Doctor */
import DoctorDashboardPage from "../pages/doctor/Dashboard";
import DoctorAppointmentsPage from "../pages/doctor/Appointments";
import DoctorMedicalRecordsPage from "../pages/doctor/MedicalRecords";
import DoctorProfilePage from "../pages/doctor/Profile";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "doctors", element: <DoctorsPage /> },
      { path: "doctor-details/:id", element: <DoctorDetails /> },
      // ✅ Book Appointment
      { path: "book-appointment", element: <BookAppointment /> },
      { path: "book-appointment/:doctorId", element: <BookAppointment /> },
      { path: "my-appointments", element: <MyAppointments /> },
      { path: "my-medical-records", element: <MyMedicalRecords /> },
      { path: "my-profile", element: <MyProfilePage /> },
      { path: "departments", element: <DepartmentsPage /> },
      { path: "about", element: <AboutPage /> },
      { path: "contact", element: <ContactPage /> },

      {
        path: "login",
        element: (
          <PublicRoute>
            <LoginPage />
          </PublicRoute>
        ),
      },

      {
        path: "signup",
        element: (
          <PublicRoute>
            <SignupPage />
          </PublicRoute>
        ),
      },
    ],
  },

  {
    path: "/dashboard",
    element: (
      <ProtectedRoute>
        <DashboardLayout />
      </ProtectedRoute>
    ),

    children: [
      /* ================= ADMIN ================= */

      {
        path: "admin",
        children: [
          { index: true, element: <AdminDashboardPage /> },
          { path: "users", element: <AdminUsersPage /> },
          { path: "patients", element: <AdminPatientsPage /> },
          { path: "doctors", element: <AdminDoctorsPage /> },
          { path: "departments", element: <AdminDepartmentsPage /> },
          {
            path: "doctor-departments",
            element: <AdminDoctorDepartmentsPage />,
          },
          { path: "schedules", element: <AdminSchedulesPage /> },
          { path: "appointments", element: <AdminAppointmentsPage /> },
          {
            path: "medical-records",
            element: <AdminMedicalRecordsPage />,
          },
          { path: "payments", element: <AdminPaymentsPage /> },
          { path: "reports", element: <AdminReportsPage /> },
          { path: "profile", element: <AdminProfilePage /> },
        ],
      },

      /* ================= DOCTOR ================= */

      {
        path: "doctor",
        children: [
          { index: true, element: <DoctorDashboardPage /> },
          {
            path: "appointments",
            element: <DoctorAppointmentsPage />,
          },
          {
            path: "medical-records",
            element: <DoctorMedicalRecordsPage />,
          },
          { path: "profile", element: <DoctorProfilePage /> },
        ],
      },

      /* ================= PATIENT ================= */
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default appRoutes;
