import { configureStore } from "@reduxjs/toolkit";

import authReducer from "../features/auth/authSlice";

import departmentReducer from "../features/department/departmentSlice";
import doctorReducer from "../features/doctor/doctorSlice";
import patientReducer from "../features/patient/patientSlice";
import scheduleReducer from "../features/schedule/scheduleSlice";
import appointmentReducer from "../features/appointment/appointmentSlice";
import medicalRecordReducer from "../features/medicalRecord/medicalRecordSlice";
import paymentReducer from "../features/payment/paymentSlice";
import dashboardReducer from "../features/dashboard/dashboardSlice";
import reportReducer from "../features/report/reportSlice";

export const store = configureStore({
  reducer: {
    auth: authReducer,

    department: departmentReducer,
    doctor: doctorReducer,
    patient: patientReducer,
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
