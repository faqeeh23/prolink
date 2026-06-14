import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './Workspace.css';
import axios from 'axios';

export default function Workspace() {
    const navigate = useNavigate();
    
    const [activeTab, setActiveTab] = useState<string>('tasks');
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [isGenerating, setIsGenerating] = useState<boolean>(false);
    const [isGeneratingSchema, setIsGeneratingSchema] = useState<boolean>(false); 
    const [error, setError] = useState<string | null>(null);

    const [databaseType, setDatabaseType] = useState<string>('Prisma');

    const [currentProjectId, setCurrentProjectId] = useState<string | null>(null);
    
    const [outputData, setOutputData] = useState<{
        tasks: string[];
        fileTree: string;
        schemaCode: string;
    }>({
        tasks: [],
        fileTree: "",
        schemaCode: ""
    });

    useEffect(() => {
        const token = localStorage.getItem('token');
        if (!token) {
            navigate('/login'); 
        }
    }, [navigate]);

    const handleGenerate = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (!description.trim() || !name.trim()) {
            setError("الرجاء إدخال اسم المشروع ووصف البنية التحتية أولاً.");
            return;
        }

        setIsGenerating(true);
        setError(null); 

        try {
            const token = localStorage.getItem('token'); 

            const response = await axios.post(
                "http://localhost:5000/api/projects/generate", 
                { name, description }, 
                {
                    headers: {
                        'Authorization': `Bearer ${token}` 
                    }
                }
            );
            
            setOutputData({
                tasks: response.data.tasks || [],
                fileTree: response.data.fileTree || "",
                schemaCode: "" 
            });

            if (response.data.projectId) {
                setCurrentProjectId(response.data.projectId as string);
            }

        } catch (err) {
            console.error("Error fetching engine output:", err);
            if (axios.isAxiosError(err)) {
                setError((err.response?.data as { message?: string })?.message ?? "Failed to generate architecture blueprints. Please try again.");
            } else {
                setError("Failed to generate architecture blueprints. Please try again.");
            }
        } finally {
            setIsGenerating(false);
        }
    };

    const handleGenerateSchema = async () => {
        if (!currentProjectId) {
            setError("يجب توليد هيكل المشروع أولاً قبل طلب مخطط قاعدة البيانات.");
            return;
        }

        setIsGeneratingSchema(true);
        setError(null);

        try {
            const token = localStorage.getItem('token');

            const response = await axios.post(
                `http://localhost:5000/api/projects/${currentProjectId}/generate-schema`,
                { databaseType },
                {
                    headers: {
                        'Authorization': `Bearer ${token}`
                    }
                }
            );

            setOutputData(prev => ({
                ...prev,
                schemaCode: response.data.schema || response.data.schemaCode || ""
            }));

        } catch (err) {
            console.error("Error generating database schema:", err);
            if (axios.isAxiosError(err)) {
                setError((err.response?.data as { message?: string })?.message ?? "Failed to generate database schema. Please try again.");
            } else {
                setError("Failed to generate database schema. Please try again.");
            }
        } finally {
            setIsGeneratingSchema(false);
        }
    };

    return (
        <div className="workspace-page">
            <div className="workspace-container">
                
                {/* Control Panel */}
                <div className="control-panel">
                    <div className="panel-header">
                        <h2>Pro<span className="accent">Link</span> Engine</h2>
                        <p>Generate your core architecture instantly using system requirements.</p>
                    </div>
                    
                    <form onSubmit={handleGenerate} className="prompt-form">
                        <input 
                            type="text"
                            value={name}
                            onChange={(e) => setName(e.target.value)}
                            placeholder="Project Name (e.g., ShopVibe API)"
                            className="project-name-input"
                        />
                        <textarea
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            placeholder="Describe your system requirements (e.g., Multi-vendor e-commerce with Express, Prisma, and PostgreSQL)..."
                            className="prompt-textarea"
                        />
                        <button type="submit" className="generate-btn" disabled={isGenerating}>
                            {isGenerating ? 'Synthesizing Core...' : 'Generate Blueprint'}
                        </button>
                    </form>
                </div>

                {/* Output Panel */}
                <div className="output-panel">
                    <div className="tabs-header">
                        <button 
                            className={`tab-link ${activeTab === 'tasks' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tasks')}
                        >
                            📋 Generated Tasks
                        </button>
                        <button 
                            className={`tab-link ${activeTab === 'tree' ? 'active' : ''}`}
                            onClick={() => setActiveTab('tree')}
                        >
                            📁 File Tree
                        </button>
                        <button 
                            className={`tab-link ${activeTab === 'schema' ? 'active' : ''}`}
                            onClick={() => setActiveTab('schema')}
                        >
                            🛠️ Core Schema
                        </button>
                    </div>

                    <div className="tab-content">
                        {error && <div className="error-message-box">⚠️ {error}</div>}

                        {isGenerating ? (
                            <div className="loading-state">
                                <div className="spinner"></div>
                                <p>Analyzing specs and synthesizing structural code...</p>
                            </div>
                        ) : (
                            <>
                                {/* Generated Tasks Tab */}
                                {activeTab === 'tasks' && (
                                    <div className="tasks-list">
                                        {outputData.tasks.length > 0 ? (
                                            outputData.tasks.map((task, index) => (
                                                <div key={index} className="task-item">
                                                    <input type="checkbox" id={`task-${index}`} />
                                                    <label htmlFor={`task-${index}`}>{task}</label>
                                                </div>
                                            ))
                                        ) : (
                                            <p className="empty-state">No tasks generated yet. Write a description to begin.</p>
                                        )}
                                    </div>
                                )}

                                {/* File Tree Tab */}
                                {activeTab === 'tree' && (
                                    <pre className="code-block">
                                        <code>{outputData.fileTree || "No directory tree mapping available. Generate a project first."}</code>
                                    </pre>
                                )}

                                {/* schema Tab */}
                                {activeTab === 'schema' && (
                                    <div className="schema-tab-container">
                                        <div className="schema-toolbar">
                                            <div className="select-wrapper">
                                                <label htmlFor="db-select">Database System:</label>
                                                <select 
                                                    id="db-select"
                                                    value={databaseType} 
                                                    onChange={(e) => setDatabaseType(e.target.value)}
                                                    className="db-dropdown"
                                                >
                                                    <option value="Prisma">Prisma Schema</option>
                                                    <option value="MySQL">MySQL (DDL SQL)</option>
                                                    <option value="PostgreSQL">PostgreSQL (DDL SQL)</option>
                                                    <option value="MongoDB">MongoDB (Mongoose Schema)</option>
                                                </select>
                                            </div>
                                            <button 
                                                onClick={handleGenerateSchema} 
                                                className="schema-btn"
                                                disabled={isGeneratingSchema || !currentProjectId}
                                            >
                                                {isGeneratingSchema ? 'Architecting Models...' : 'Generate Database Schema'}
                                            </button>
                                        </div>

                                        {isGeneratingSchema ? (
                                            <div className="loading-state-sub">
                                                <div className="spinner-small"></div>
                                                <p>Building standard operational schemas for {databaseType}...</p>
                                            </div>
                                        ) : (
                                            <pre className="code-block">
                                                <code className="language-prisma">
                                                    {outputData.schemaCode || "Select database type and click..."}
                                                </code>
                                            </pre>
                                        )}
                                    </div>
                                )}
							</>
                        )}
                    </div>
                </div>

            </div>
        </div>
    );
}