import { useState, useEffect  } from 'react';
import { Link, useNavigate } from "react-router-dom";
import './Header.css'; 
import { useAuth } from '../context/AuthContext';

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const navigate = useNavigate();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const { isLoggedIn, logout } = useAuth();
    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 20);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);
    
    const handleLogout = () => {
        logout();
        navigate('/');
    }
    return (
        <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                
                <div className="logo-div">
                    <div className="logo-text-group">
                        <span className="logo-text">Pro<span className="accent">Link</span></span>
                        <span className="logo-author">by Mohammed Al Faqeeh</span>
                    </div>
                </div>

                <button 
                    className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                    onClick={() => setIsMenuOpen(prev => !prev)}
                    aria-label="Toggle menu"
                    aria-expanded={isMenuOpen}
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <Link to="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</Link>
                    <Link to="#how-it-works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How it works</Link>
                    <Link to="#Showcase" className="nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</Link>
                    <Link to="#Services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</Link>

                    <div className="nav-cta-mobile">
                        { isLoggedIn ? (
                            <>
                                <Link to="/workspace" className="cta-btn mobile-full" onClick={() => setIsMenuOpen(false)}>Go to Workspace</Link>
                                <button className="cta-btn-logout mobile-full" onClick={() => {handleLogout(); setIsMenuOpen(false)}}>
                                    Logout
                                </button>
                            </>
                        ) : (
                            <>
                                <Link to="/login" className="auth-link-mobile" onClick={() => setIsMenuOpen(false)}>Sign In</Link>
                                <Link to="/register" className="cta-btn mobile-full" onClick={() => setIsMenuOpen(false)}>Register</Link>
                            </>
                        )}
                    </div>
                </nav>

                <div className="header-cta">
                    { isLoggedIn ? (
                        <>
                            <Link to="/workspace" className="cta-btn">Go to Workspace</Link>
                            <button className="cta-btn-logout" onClick={() => {handleLogout()}}>
                                Logout
                            </button>
                        </>
                    ) : (
                        <>
                            <Link to="/login" className="auth-link">Sign In</Link>
                            <Link to="/register" className="cta-btn">Register</Link>
                        </>
                    ) }
                </div>
                
            </div>
        </header>
    );
}