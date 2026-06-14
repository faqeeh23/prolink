import { Routes, Route } from "react-router-dom";

import Home from "./pages/Home";
import Register from "./pages/Register";
import Login from "./pages/Login";

import { WorkspaceLayout } from "./layouts/WorkspaceLayout";

import { Dashboard } from "./pages/Dashboard";
import { Projects } from "./pages/Projects";
import { Settings } from "./pages/Settings";
import { Profile } from "./pages/Profile";
import Workspace from "./pages/Workspace";

import Header from "./component/Header";

import "./index.css";

function App() {
    return (
        <>
            <Header />

            <Routes>

                {/* Public Pages */}
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />

                {/* Workspace (Protected Area) */}
                <Route element={<WorkspaceLayout />}>

                    <Route path="/workspace" element={<Workspace />} />
                    <Route path="/workspace/:projectId" element={<Workspace />} />

                    <Route path="/dashboard" element={<Dashboard />} />
                    <Route path="/projects" element={<Projects />} />
                    <Route path="/settings" element={<Settings />} />
                    <Route path="/profile" element={<Profile />} />

                </Route>

            </Routes>
        </>
    );
}

export default App;