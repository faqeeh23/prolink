import { useState, type FormEvent } from "react";
import "./Register.css";
import axios  from "axios";


interface ValidationErrors {
    confirmPassword?: string;
}

export default function Register() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [loading, setLoading] = useState(false);
    const [success, setSuccess] = useState(false);
    const [validationErrors, setValidationErrors] = useState<ValidationErrors>({});
    const [serverError, setServerError] = useState("");
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const [Name, setName] = useState("");

    const handleSubmit = async (e: FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setSuccess(false);
        setServerError("");
        setValidationErrors({});
        if (password !== confirmPassword) {
            setValidationErrors({ confirmPassword: "Passwords do not match" });
            return;
        }
        setLoading(true);

        try {
            const response = await axios.post("http://localhost:5000/api/auth/register", {
                name: Name,
                email,
                password
            });
            const data = await response.data;
            if (response.status != 201) {
                throw new Error(data.message || "Registration failed");
            } 
        } catch (err) {
            if (axios.isAxiosError(err)) {
                setServerError(err.response?.data?.message || "Registration failed");
            } else {
                setServerError("An unexpected error occurred during registration");
            }

        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="reg-page-wrapper">
            <div className="reg-glowing-blur"></div>
            
            <div className="reg-card">
                {/* Logo Section */}
                <div className="reg-logo-section">
                    <div className="reg-logo-text-group">
                        <span className="reg-logo-main">Pro<span className="reg-accent">Link</span></span>
                        <span className="reg-logo-author">by Mohammed Al Faqeeh</span>
                    </div>
                </div>

                <div className="reg-header-text">
                    <h1 className="reg-title">Create Account</h1>
                    <p className="reg-subtitle">Join ProLink platform and build your elite future</p>
                </div>
                
                <form onSubmit={handleSubmit} className="reg-form">
                    
                    {/* Name Field */}
                    <div className="reg-input-group">
                        <label className="reg-label">Full Name</label>
                        <input
                            type="text"
                            placeholder="John Doe"
                            value={Name}
                            onChange={(e) => setName(e.target.value)}
                            className="reg-input"
                            required
                        />
                    </div>

                    {/* Email Address Field */}
                    <div className="reg-input-group">
                        <label className="reg-label">Email Address</label>
                        <input
                            type="email"
                            placeholder="name@example.com"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="reg-input"
                            required
                        />
                    </div>
                    
                    {/* First Password Field */}
                    <div className="reg-input-group">
                        <label className="reg-label">Password</label>
                        <div className="reg-password-wrapper">
                            <input
                                type={showPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                                className="reg-input password-field"
                                required
                            />
                            <button
                                type="button"
                                className="reg-toggle-btn"
                                onClick={() => setShowPassword(!showPassword)}
                            >
                                {showPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>
                    
                    {/*   Confirm password  */}
                    <div className="reg-input-group">
                        <label className="reg-label">Confirm Password</label>
                        <div className="reg-password-wrapper">
                            <input
                                type={showConfirmPassword ? "text" : "password"}
                                placeholder="••••••••"
                                value={confirmPassword}
                                onChange={(e) => setConfirmPassword(e.target.value)}
                                className="reg-input password-field"
                                required
                            />
                            <button
                                type="button"
                                className="reg-toggle-btn"
                                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                            >
                                {showConfirmPassword ? "Hide" : "Show"}
                            </button>
                        </div>
                    </div>

                    {validationErrors.confirmPassword && (
                        <div className="reg-alert-box error">
                            <span>⚠️</span> <p>{validationErrors.confirmPassword}</p>
                        </div>
                    )}
                    
                    {serverError && (
                        <div className="reg-alert-box error">
                            <span>⚠️</span> <p>{serverError}</p>
                        </div>
                    )}
                    
                    {success && (
                        <div className="reg-alert-box success">
                            <span>🎉</span> <p>Registration successful! Welcome to the grid.</p>
                        </div>
                    )}

                    {/* send button */}
                    <button type="submit" className="reg-submit-btn" disabled={loading}>
                        {loading ? "Creating Matrix Account..." : "Create Account"}
                    </button>
                </form>

                <div className="reg-footer">
                    <p>Protected by ProLink Core Security</p>
                </div>
            </div>
        </div>
    );
}