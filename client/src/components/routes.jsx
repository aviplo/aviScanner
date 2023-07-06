import { createBrowserRouter } from "react-router-dom";
import Compare from "./Compare";
import Register from "./Register";
import App from "../App";
import Describe from "./Describe";
import Login from "./Login";
import Navbar from "./Navbar";
import Welcome from "./Welcome";
import Error from './Error'
const router = createBrowserRouter([
  {
    path: "/",
    element: <App />,
    errorElement: <Error />,
    children: [
      { index: true, element: <Welcome /> },
      // {
      //   path: "Compare",
      //   element: (
      //     <Compare
      //       openDrawer={openDrawer}
      //       handleOpenDrawer={handleDrawerToggle}
      //     />
      //   ),
      // },
      { path: "describe", element: <Describe /> },
      { path: "login", element: <Login /> },
      { path: "register", element: <Register /> },
    ],
  },
]);

export default router;
