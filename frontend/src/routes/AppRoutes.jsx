import { createBrowserRouter } from "react-router-dom";

import PublicLayout from "../layouts/PublicLayout";
import DashboardLayout from "../layouts/DashboardLayout";

import PublicRoute from "./PublicRoute";
import ProtectedRoute from "./ProtectedRoute";

/* Public */
import HomePage from "../pages/public/Home";
import DoctorsPage from "../pages/public/Doctors";
import DepartmentsPage from "../pages/public/Departments";
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

/* Patient */
import PatientDashboardPage from "../pages/patient/Dashboard";
import PatientBookAppointmentPage from "../pages/patient/BookAppointment";
import PatientMyAppointmentsPage from "../pages/patient/MyAppointments";
import PatientMedicalRecordsPage from "../pages/patient/MedicalRecords";
import PatientPaymentsPage from "../pages/patient/Payments";
import PatientProfilePage from "../pages/patient/Profile";

const appRoutes = createBrowserRouter([
  {
    path: "/",
    element: <PublicLayout />,
    children: [
      { index: true, element: <HomePage /> },
      { path: "doctors", element: <DoctorsPage /> },
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

      {
        path: "patient",
        children: [
          { index: true, element: <PatientDashboardPage /> },
          {
            path: "book-appointment",
            element: <PatientBookAppointmentPage />,
          },
          {
            path: "my-appointments",
            element: <PatientMyAppointmentsPage />,
          },
          {
            path: "medical-records",
            element: <PatientMedicalRecordsPage />,
          },
          { path: "payments", element: <PatientPaymentsPage /> },
          { path: "profile", element: <PatientProfilePage /> },
        ],
      },
    ],
  },

  {
    path: "*",
    element: <NotFoundPage />,
  },
]);

export default appRoutes;
