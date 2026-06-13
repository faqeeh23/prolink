import { useState, type FormEvent } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import "./Login.css";

interface LoginResponse {
        token: string;
    }
interface ApiError {
    message: string;
}
export default function Login() {
    const [email, setEmail] = useState<string>("");
    const [password, setPassword] = useState<string>("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState<boolean>(false); 

    const navigate = useNavigate();
    
    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);
        setLoading(true);

        try {
            const response = await axios.post<LoginResponse>("http://localhost:5000/api/auth/login", {
                email: email.trim(),
                password
            });
            
            if(response.data.token) {
                localStorage.setItem("token", response.data.token);
                navigate("/workspace");
            }
        } catch (err) {
            if (axios.isAxiosError<ApiError>(err)) {
                setError(
                    err.response?.data?.message ??
                    "Login failed"
                );
            } else {
                setError("An unexpected error occurred");
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
                        <span className="login-logo-main">Pro<span className="login-accent">Link</span></span>
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