import {Link } from "react-router-dom";
export const Dashboard = () => {
    return (
        <div className="dashboard-page">
            <h1>Dashboard</h1>
            <p>Welcome to your dashboard! Here you can see an overview of your projects, recent activity, and quick access to important features.</p>
            <div className="dashboard-overview">
                <div className="overview-card">
                    <h2>Projects</h2>
                    <p>You have 5 active projects.</p>
                </div>  
                <div className="overview-card">
                    <h2>Recent Activity</h2>
                    <p>You last logged in 2 days ago.</p>
                </div>
                <div className="overview-card">
                    <h2>Quick Actions</h2>
                    <ul>
                        <li><Link to="/workspace">Go to Workspace</Link></li>
                        <li><Link to="/projects">View Projects</Link></li>
                        <li><Link to="/settings">Update Settings</Link></li>
                    </ul>
                </div>
            </div>
        </div>
    );
}