import { Outlet } from "react-router-dom";
import  { Sidebar  }from "../component/Sidebar";

export const WorkspaceLayout = () => {
    return (
        <div className="workspace-layout">
            <Sidebar />

            <main className="workspace-content">
                <Outlet />
            </main>
        </div>
    );
};