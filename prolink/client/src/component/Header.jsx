import { useState, useEffect } from 'react';
import './Header.css'; 

export default function Header() {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMenuOpen, setIsMenuOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => {
            if (window.scrollY > 20) {
                setIsScrolled(true);
            } else {
                setIsScrolled(false);
            }
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <header className={`modern-header ${isScrolled ? 'scrolled' : ''}`}>
            <div className="header-container">
                
                <div className="logo-div">
                    <div className="logo-text-group">
                        <span className="logo-text">Init<span className="accent">Prompt</span></span>
                        <span className="logo-author">by Mohammed Al Faqeeh</span>
                    </div>
                </div>

                <button 
                    className={`menu-toggle ${isMenuOpen ? 'open' : ''}`} 
                    onClick={() => setIsMenuOpen(!isMenuOpen)}
                    aria-label="Toggle menu"
                >
                    <span></span>
                    <span></span>
                    <span></span>
                </button>

                <nav className={`nav-menu ${isMenuOpen ? 'active' : ''}`}>
                    <a href="/" className="nav-link" onClick={() => setIsMenuOpen(false)}>Home</a>
                    <a href="#how-it-works" className="nav-link" onClick={() => setIsMenuOpen(false)}>How it works</a>
                    <a href="#Showcase" className="nav-link" onClick={() => setIsMenuOpen(false)}>Portfolio</a>
                    <a href="#Services" className="nav-link" onClick={() => setIsMenuOpen(false)}>Services</a>
                    
                    <div className="nav-cta-mobile">
                        <a href="/Login" className="auth-link-mobile" onClick={() => setIsMenuOpen(false)}>Sign In</a>
                        <a href="/Register" className="cta-btn mobile-full" onClick={() => setIsMenuOpen(false)}>Register</a>
                    </div>
                </nav>

                <div className="header-cta">
                    <a href="/Login" className="auth-link">Sign In</a>
                    <a href="/Register" className="cta-btn">Register</a>
                </div>
                
            </div>
        </header>
    );
}