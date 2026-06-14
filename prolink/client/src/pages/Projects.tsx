export const Projects = () => {
    return (
        <div className="projects-page">
            <h1>Projects</h1>
            <p>Here you can manage all your projects. Create new projects, view existing ones, and organize them as you like.</p>
            <div className="projects-list">
                <div className="project-card">
                    <h2>Project Alpha</h2>
                    <p>A web application for task management.</p>
                </div>
                <div className="project-card">
                    <h2>Project Beta</h2>
                    <p>A mobile app for fitness tracking.</p>
                </div>
                <div className="project-card">
                    <h2>Project Gamma</h2>
                    <p>An AI-powered chatbot for customer support.</p>
                </div>
            </div>  
        </div>
    );
}