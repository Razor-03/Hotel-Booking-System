import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAdmin, RequireAuth } from "./routes/Layout";
import Homepage from "./routes/Homepage";
import { roomsListLoader, singleRoomLoader } from "./lib/loaders";
import RoomsListPage from "./routes/RoomsListPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./routes/Dashboard";
import EmployeeUpdateForm from "./components/EmployeeUpdateForm";
import AddRoomForm from "./components/AddRoomForm";
import AdminRoomsList from "./routes/AdminRoomsList";
import UpdateRoomForm from "./components/UpdateRoomForm";
import RoomDetailsPage from "./routes/RoomDetailsPage";
import ProfilePage from "./routes/ProfilePage";
import Success from "./components/Success";
import Failure from "./components/Failure";
import ContactPage from "./routes/ContactPage";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: <Layout />,
      children: [
        {
          path: "/",
          element: <Homepage />,
        },
        {
          path: "/list",
          element: <RoomsListPage />,
          loader: roomsListLoader,
        },
        {
          path: "/login",
          element: <Login />,
        },
        {
          path: "/register",
          element: <Register />,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAuth />,
      children: [
        {
          path: "/profile",
          element: <ProfilePage />,
        },
        {
          path: "/success",
          element: <Success />,
        },
        {
          path: "/cancel",
          element: <Failure />,
        },
        {
          path: "/contact",
          element: <ContactPage />,
        },
        {
          path: "/:id",
          element: <RoomDetailsPage />,
          loader: singleRoomLoader,
        },
      ],
    },
    {
      path: "/",
      element: <RequireAdmin />,
      children: [
        {
          path: "/admin/dashboard",
          element: <Dashboard />,
        },
        {
          path: "/updateEmployee/:id",
          element: <EmployeeUpdateForm />,
        },
        {
          path: "/admin/rooms/new",
          element: <AddRoomForm />,
        },
        {
          path: "/admin/rooms",
          element: <AdminRoomsList />,
          loader: roomsListLoader,
        },
        {
          path: "/admin/rooms",
          element: <AdminRoomsList />,
          loader: roomsListLoader,
        },
        {
          path: "/:id/update",
          element: <UpdateRoomForm />,
          loader: roomsListLoader,
        },
      ],
    },
  ]);

  return <RouterProvider router={router} />;
}

export default App;
