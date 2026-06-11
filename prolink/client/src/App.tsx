import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.tsx";
import Login from "./pages/Login.tsx";
import Home from "./pages/Home.tsx";
import Workspace from "./pages/Workspace.tsx";

import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/register" element={<Register />} />
                <Route path="/login" element={<Login />} />
                <Route path="/workspace" element={<Workspace />} />
            </Routes>
        </BrowserRouter>
    );
}

export default App;