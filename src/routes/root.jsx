import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";
import AnnouncementPage from "../pages/AnnouncementPage";

export default function Root() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Login Page</div>,
        },
        {
            path: "/announce",
            element: <AnnouncementPage />
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}