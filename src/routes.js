import AuthLayout from "./components/AuthLayout.jsx";
import NotFound404 from "./pages/404.jsx";
import InternalError500 from "./pages/500.jsx";
import App from "./pages/App.jsx";
import Dashboard from "./pages/logged/Dashboard.jsx";
import Profile from "./pages/logged/Profile.jsx";
import Ptik from "./pages/logged/Ptik.jsx";
import Login from "./pages/Login.jsx";
import Logout from "./pages/Logout.jsx";

export const routes = [
    { path: "/", component: App },
    { path: "/login", component: Login },
    { path: "/logout", component: Logout },
    { path: "/500", component: InternalError500 },
    { path: "*404", component: NotFound404 },
    {
        component: AuthLayout,
        children: [
            { path: "/ptik", component: Ptik },
            { path: "/dashboard", component: Dashboard },
            { path: "/profile", component: Profile },
        ],
    },
];
