import { createBrowserRouter } from "react-router";
import { AdminLogin } from "./components/AdminLogin";
import { ClientSatisfactionForm } from "./components/ClientSatisfactionForm";
import { AdminDashboard } from "./components/AdminDashboard";

export const router = createBrowserRouter([
  {
    path: "/",
    Component: ClientSatisfactionForm,
  },
  {
    path: "/admin",
    children: [
      { path: "login", Component: AdminLogin },
      { path: "dashboard", Component: AdminDashboard },
    ]
  }
]);
