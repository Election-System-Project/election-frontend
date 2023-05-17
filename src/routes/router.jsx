import React from "react";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import AnnouncementPage from "../pages/AnnouncementPage";
import Login from "../pages/Login";

export default function Router() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Login />,
      exact: false,
    },
    {
      path: "/announce",
      element: <AnnouncementPage />,
    },
  ]);

  return <RouterProvider router={router} />;
}
