import { useState } from "react";
import axios from "axios"; 
import "./Login.css"; // ربط ملف الـ CSS الفخم الجديد

export default function Login() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false); 

    const handleSubmit = async (e) => {
        e.preventDefault();
        setError(""); 
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/login", { 
                email, 
                password 
            });
            
            console.log("استجابة الباك إند بنجاح:", response.data);
            
            if(response.data.token) {
                localStorage.setItem("token", response.data.token);
            }

            alert("Logged in successfully!");
            
        } catch (err) {
            console.error("تفاصيل الخطأ:", err);
            if (err.response && err.response.data && err.response.data.message) {
                setError(err.response.data.message);
            } else {
                setError("Login failed. Please check your credentials or server connection.");
            }
        } finally {
            setLoading(false); 
        }
    };

    return (
        <div className="login-page-wrapper">
            <div className="login-glowing-blur"></div>
            
            <div className="login-card">
                <div className="login-logo-section">
                    <div className="login-logo-text-group">
                        <span className="login-logo-main">Init<span className="login-accent">Prompt</span></span>
                        <span className="login-logo-author">by Mohammed Al Faqeeh</span>
                    </div>
                </div>

                <div className="login-header-text">
                    <h1 className="login-title">Welcome Back</h1>
                    <p className="login-subtitle">Enter your credentials to access your dashboard</p>
                </div>
                
                <form onSubmit={handleSubmit} className="login-form">
                    <div className="input-group">
                        <label className="input-label">Email Address</label>
                        <input 
                            type="email" 
                            placeholder="name@example.com" 
                            value={email} 
                            onChange={(e) => setEmail(e.target.value)} 
                            className="login-input" 
                            required
                        />
                    </div>
                    
                    <div className="input-group">
                        <label className="input-label">Password</label>
                        <input 
                            type="password" 
                            placeholder="••••••••" 
                            value={password} 
                            onChange={(e) => setPassword(e.target.value)} 
                            className="login-input" 
                            required
                        />
                    </div>
                    
                    {error && (
                        <div className="login-error-box">
                            <span className="error-icon">⚠️</span>
                            <p className="login-error-text">{error}</p>
                        </div>
                    )}

                    <button type="submit" className="login-submit-btn" disabled={loading}>
                        {loading ? (
                            <span className="spinner-text">Authenticating...</span>
                        ) : (
                            "Sign In"
                        )}
                    </button>
                </form>

                <div className="login-footer">
                    <p>Secured by ProLink Encryption Matrix</p>
                </div>
            </div>
        </div>
    );
}