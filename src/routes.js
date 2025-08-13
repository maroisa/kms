import { lazy } from "solid-js";
import AuthLayout from "./components/AuthLayout.jsx";
import App from "./pages/App.jsx";

export const routes = [
    { path: "/", component: App },
    { path: "/login", component: lazy(() => import("./pages/Login.jsx")) },
    { path: "/logout", component: lazy(() => import("./pages/Logout.jsx")) },
    { path: "/500", component: lazy(() => import("./pages/500.jsx")) },
    { path: "*404", component: lazy(() => import("./pages/404.jsx")) },
    {
        component: AuthLayout,
        children: [
            { path: "/ptik", component: lazy(() => import("./pages/logged/Ptik.jsx")) },
            { path: "/dashboard", component: lazy(() => import("./pages/logged/Dashboard.jsx")) },
            { path: "/profile", component: lazy(() => import("./pages/logged/Profile.jsx")) },
        ],
    },
];
