import {Link } from "react-router-dom";
import "./Sidebar.css";

export const Sidebar = () => {
    return (
        <div className="sidebar">
            <div className="sidebar-logo">
                <span className="Username">Username</span>
            </div>
            <nav className="sidebar-nav">
                <Link to="/dashboard" className="sidebar-link">Dashboard</Link>
                <Link to="/projects" className="sidebar-link">Projects</Link>
                <Link to="/settings" className="sidebar-link">Settings</Link>
                <Link to="/profile" className="sidebar-link">Profile</Link>
                <Link to="/generate" className="sidebar-link">Generate Project</Link>
                <Link to="/diagram" className="sidebar-link">Archiecture Diagram</Link>
                <Link to="/ai-Assistant" className="sidebar-link">AI Assistant</Link>
                <Link to="/templates" className="sidbar-link">Templates</Link>
            </nav>
        </div>
    );
}