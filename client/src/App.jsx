import "./App.css";
import { createBrowserRouter, RouterProvider } from "react-router-dom";
import { Layout, RequireAdmin } from "./routes/Layout";
import Homepage from "./routes/Homepage";
import { roomsListLoader } from "./lib/loaders";
import RoomsListPage from "./routes/RoomsListPage";
import Login from "./components/Login";
import Register from "./components/Register";
import Dashboard from "./routes/Dashboard";

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
    // {
    //   path: "/",
    //   element: <RequireAuth />,
    //   children: [
    //     {
    //       path: "/profile",
    //       element: <ProfilePage />,
    //       loader: profilePageLoader,
    //     },
    //     {
    //       path: "/:id",
    //       element: <Singlepage />,
    //       loader: singlePageLoader,
    //     },
    //     {
    //       path: "/profile/update",
    //       element: <ProfileUpdatePage />,
    //     },
    //     {
    //       path: "/add",
    //       element: <NewPostPage />,
    //     },
    //   ],
    // },
    {
      path: "/",
      element: <RequireAdmin />,
      children: [
        {
          path: "/dashboard",
          element: <Dashboard />,
        }
      ],
    }
  ]);

  return <RouterProvider router={router} />;
}

export default App;
