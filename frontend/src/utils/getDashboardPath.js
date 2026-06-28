export const getDashboardPath = (role) => {
  switch (role) {
    case "Admin":
      return "/admin/dashboard";

    case "Doctor":
      return "/doctor/dashboard";

    case "Patient":
      return "/patient/dashboard";

    default:
      return "/";
  }
};
