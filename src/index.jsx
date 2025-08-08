/* @refresh reload */
import { render } from "solid-js/web";
import { Route, Router } from "@solidjs/router";
import "./index.css";

import AuthLayout from "./components/AuthLayout";

import NotFound from "./pages/NotFound";
import App from "./pages/App";
import Login from "./pages/Login";
import Ptik from "./pages/logged/Ptik";
import Dashboard from "./pages/logged/Dashboard";
import Profile from "./pages/logged/Profile";
import Logout from "./pages/Logout";

const root = document.getElementById("root");

if (import.meta.env.DEV && !(root instanceof HTMLElement)) {
    throw new Error(
        "Root element not found. Did you forget to add it to your index.html? Or maybe the id attribute got misspelled?",
    );
}

render(() => (
    <Router>
        <Route path="/" component={App} />
        <Route path="/login" component={Login} />
        <Route path="/logout" component={Logout} />
        <Route path="*404" component={NotFound} />
        <Route component={AuthLayout}>
            <Route path="/ptik" component={Ptik} />
            <Route path="/dashboard" component={Dashboard} />
            <Route path="/profile" component={Profile} />
        </Route>
    </Router>
), root);
