import { lazy } from "solid-js";
import LoggedLayout from "./pages/logged/LoggedLayout.jsx";
import App from "./pages/App.jsx";

import Dashboard from "./pages/logged/Dashboard.jsx";
import Ptik from "./pages/logged/Ptik.jsx";
import Profile from "./pages/logged/Profile.jsx";
import Jadwal from "./pages/logged/Jadwal.jsx";

export const routes = [
    { path: "/", component: App },
    { path: "/login", component: lazy(() => import("./pages/Login.jsx")) },
    { path: "/logout", component: lazy(() => import("./pages/Logout.jsx")) },
    { path: "/500", component: lazy(() => import("./pages/500.jsx")) },
    { path: "*404", component: lazy(() => import("./pages/404.jsx")) },
    { path: "/shuffle", component: lazy(() => import("./pages/Randomizer.jsx")) },
    { path: "/jadwal", component: Jadwal },
    {
        component: LoggedLayout,
        children: [
            { path: "/dashboard", component: Dashboard },
            { path: "/ptik", component: Ptik },
            { path: "/profile", component: lazy(() => import("./pages/logged/Profile.jsx")) },
            { path: "/submission", component: lazy(() => import("./pages/logged/Submission.jsx")) },
        ],
    },
];
