import React, { useEffect } from "react";
import { RouterProvider } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";

import appRoutes from "./routes/AppRoutes";

import {
  getProfile,
  logoutUser,
  selectToken,
  selectUser,
} from "./features/auth/authSlice";

function App() {
  const dispatch = useDispatch();

  const token = useSelector(selectToken);
  const user = useSelector(selectUser);

  useEffect(() => {
    // Token exists but Redux lost the user (page refresh)
    if (token && !user) {
      dispatch(getProfile());
    }

    // User exists but token is gone
    if (!token && user) {
      dispatch(logoutUser());
    }
  }, [dispatch, token, user]);

  return <RouterProvider router={appRoutes} />;
}

export default App;
