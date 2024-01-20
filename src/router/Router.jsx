import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Register from "../pages/Register";
import Login from "../pages/Login";
import Root from "../layout/Root";

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
        }
      ]
    }
  ]);
  
export default router