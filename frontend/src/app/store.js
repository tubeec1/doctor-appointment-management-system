import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import departmentReducer from "../features/departments/departmentSlice";
import doctorReducer from "../features/doctors/doctorSlice";
import scheduleReducer from "../features/schedules/scheduleSlice";
import appointmentReducer from "../features/appointments/appointmentSlice";
import medicalRecordReducer from "../features/medicalRecords/medicalRecordSlice";
import paymentReducer from "../features/payments/paymentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import reportReducer from "../features/reports/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    department: departmentReducer,
    doctor: doctorReducer,
    schedule: scheduleReducer,
    appointment: appointmentReducer,
    medicalRecord: medicalRecordReducer,
    payment: paymentReducer,
    dashboard: dashboardReducer,
    report: reportReducer,
  },

  devTools: import.meta.env.DEV,
});

export default store;
