import { BrowserRouter, Routes, Route } from "react-router-dom";
import Register from "./pages/Register.js";
import Login from "./pages/Login.js";
import Home from "./pages/Home.js";
import Workspace from "./pages/Workspace.js";
import Header from "./component/Header.js";
import "./index.css";

function App() {
    return (
        <BrowserRouter>
            <Header />
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