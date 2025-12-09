import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import App from "./App.jsx";
import "bootstrap/dist/js/bootstrap.bundle.min.js";

import { JobDetails } from "./pages/JobDetails.jsx";
import Form from "./pages/Form.jsx";

const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
  },
  { path: "/post-job", element: <Form /> },
  { path: "/jobs/:jId", element: <JobDetails /> },
]);

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <RouterProvider router={router} />
  </StrictMode>
);
