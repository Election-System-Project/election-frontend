import React from "react";
import {
    createBrowserRouter,
    RouterProvider,
} from "react-router-dom";

export default function Root() {
    const router = createBrowserRouter([
        {
            path: "/",
            element: <div>Hello world!</div>,
        },
    ]);

    return (
        <RouterProvider router={router} />
    );
}