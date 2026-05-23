import './Home.css'; 
import Header from '../component/Header'; 
export default function Home() {
    return (
        <div className="home-page">
            <Header /> 
            {/* 1. Hero Section */}
            <section className="hero-section">
                <div className="hero-glowing-blur"></div> {/* إضاءة خلفية فخمة */}
                <div className="container hero-container">
                    <span className="hero-badge">Next-Gen Digital Solutions</span>
                    <h1 className="hero-title">
                        Connecting Ideas With <span className="gradient-text">Future Technology</span>
                    </h1>
                    <p className="hero-subtitle">
                        We build high-end, premium digital experiences that elevate your brand and scale your business to new heights.
                    </p>
                    <div className="hero-actions">
                        <a href="#Services" className="btn-primary">Explore Services</a>
                        <a href="#how-it-works" className="btn-secondary">Learn More</a>
                    </div>
                </div>
            </section>

            {/* 2. How It Works Section */}
            <section id="how-it-works" className="section how-it-works-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">How It Works</h2>
                        <p className="section-desc">Three simple steps to bring your vision to life.</p>
                    </div>
                    <div className="steps-grid">
                        <div className="step-card">
                            <div className="step-number">01</div>
                            <h3>Discovery & Strategy</h3>
                            <p>We deeply analyze your business goals and map out the perfect path forward.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">02</div>
                            <h3>Premium Design & Dev</h3>
                            <p>Crafting stunning user interfaces with lightning-fast performance and clean code.</p>
                        </div>
                        <div className="step-card">
                            <div className="step-number">03</div>
                            <h3>Launch & Scale</h3>
                            <p>Deploying your product to the world and continuous optimization for growth.</p>
                        </div>
                    </div>
                </div>
            </section>

            {/* 3. Showcase Section */}
            <section id="Showcase" className="section showcase-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Showcase</h2>
                        <p className="section-desc">Explore some of our latest premium projects and digital creations.</p>
                    </div>
                    <div className="showcase-grid">
                        <div className="project-card">
                            <div className="project-image-wrapper">
                                <div className="project-placeholder">Project Alpha Preview</div>
                            </div>
                            <div className="project-info">
                                <span>FinTech App</span>
                                <h3>Next-Gen NeoBank</h3>
                            </div>
                        </div>
                        <div className="project-card">
                            <div className="project-image-wrapper">
                                <div className="project-placeholder">Project Beta Preview</div>
                            </div>
                            <div className="project-info">
                                <span>E-Commerce</span>
                                <h3>Luxury Brand Store</h3>
                            </div>
                        </div>
                    </div>
                </div>
            </section>

            {/* 4. Services Section */}
            <section id="Services" className="section services-section">
                <div className="container">
                    <div className="section-header">
                        <h2 className="section-title">Our Services</h2>
                        <p className="section-desc">Tailored digital services engineered for modern businesses.</p>
                    </div>
                    <div className="services-grid">
                        <div className="service-card">
                            <div className="service-icon">✦</div>
                            <h3>Web Development</h3>
                            <p>High-performance, secure, and fully scalable web applications built with React & Next.js.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">✦</div>
                            <h3>UI/UX Premium Design</h3>
                            <p>Bespoke interactive interfaces focused on conversion, user retention, and modern aesthetics.</p>
                        </div>
                        <div className="service-card">
                            <div className="service-icon">✦</div>
                            <h3>Cloud Architecture</h3>
                            <p>Reliable cloud infrastructure and API integrations designed for absolute stability.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}