import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Root from "../layout/Root";
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/CreateTask";
import UpdateTask from "../pages/UpdateTask";
import PrivateRoute from "./PrivateRoute";
import AssignedTasks from "../pages/AssignedTasks";

const router = createBrowserRouter([
    {
      path: "/",
      element: <Root />,
      children: [
        {
          path: "/",
          element: <Home></Home>
        }
        ,{
          path: "/register",
          element: <Register />,
        },
        {
          path: "/login",
          element: <Login></Login>
        },
        {
          path: "/tasks",
          element: <PrivateRoute><Tasks></Tasks></PrivateRoute>
        },
        {
          path: "/createTask",
          element: <PrivateRoute><CreateTask></CreateTask></PrivateRoute>
        },
        {
          path: "/updateTask/:id",
          element: <PrivateRoute><UpdateTask></UpdateTask></PrivateRoute>
        },
        {
          path: "/assignedTasks",
          element: <PrivateRoute><AssignedTasks></AssignedTasks></PrivateRoute>
        }
      ]
    }
  ]);
  
export default router