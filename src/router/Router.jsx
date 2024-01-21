import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Root from "../layout/Root";
import Tasks from "../pages/Tasks";
import CreateTask from "../pages/CreateTask";

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
          element: <Tasks></Tasks>
        },
        {
          path: "/createTask",
          element: <CreateTask></CreateTask>
        }
      ]
    }
  ]);
  
export default router