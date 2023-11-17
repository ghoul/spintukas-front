import { lazy } from "react";
import { Navigate } from "react-router-dom";
import OneTrick from "../views/OneTrick.js";
import DefectsList from "../views/Defects.js";

/****Layouts*****/
const FullLayout = lazy(() => import("../layouts/FullLayout.js"));

/***** Pages ****/


const Login = lazy(() => import("../views/Login.js"));
const SignUp = lazy(() => import("../views/SignUp.js"));
const UpdateDefect = lazy(() => import("../views/UpdateDefect.js"));
const Add = lazy(() => import("../views/Add.js"));
const About = lazy(() => import("../views/About.js"));
const Alerts = lazy(() => import("../views/ui/Alerts"));
const Badges = lazy(() => import("../views/ui/Badges"));
const Buttons = lazy(() => import("../views/ui/Buttons"));
const Cards = lazy(() => import("../views/ui/Cards"));
const Grid = lazy(() => import("../views/ui/Grid"));
const Tables = lazy(() => import("../views/ui/Tables"));
const Forms = lazy(() => import("../views/ui/Forms"));
const Breadcrumbs = lazy(() => import("../views/ui/Breadcrumbs"));


/*****Routes******/


const ThemeRoutes = [
  {
    path: "/",
    element: <FullLayout />,
    children: [
      { path: "/", exact: true, element: <DefectsList /> },

      { path: "/defects", element: <DefectsList  />},
    
      { path: "/defect/:defectId/edit", element: <UpdateDefect  />},
      
  
      { path: "/login", element: <Login  />},
      { path: "/signup", element: <SignUp  />},

      { path: "/defect/create", exact: true, element: <Add /> },
      { path: "/about", exact: true, element: <About /> },
      { path: "/alerts", exact: true, element: <Alerts /> },
      { path: "/badges", exact: true, element: <Badges /> },
      { path: "/buttons", exact: true, element: <Buttons /> },
      { path: "/cards", exact: true, element: <Cards /> },
      { path: "/grid", exact: true, element: <Grid /> },
      { path: "/table", exact: true, element: <Tables /> },
      { path: "/forms", exact: true, element: <Forms /> },
      { path: "/breadcrumbs", exact: true, element: <Breadcrumbs /> },
    ],
  },
];

export default ThemeRoutes;
