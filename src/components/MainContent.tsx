import { useEffect, useState } from 'react';
import type { Dispatch, SetStateAction } from 'react';
import { ResearchAreas, ResearchHighlight, ResearchPublications, Research } from './Research';
import PrismaticBurst from './Templates/PrismaticBurst';

export const MainPage = ({ CValue }: { CValue: string }) => {
    const [currentPage, setCurrentPage] = useState<"default" | "research" | "publications" | "Contact" | "team" | "partners">("default");

    return (
        <div className="bg-content">
            <div className="container" style={{ position: "relative", zIndex: 1 }}>
                <header>
                    <div className="header-content">
                        <div className="logo">
                            <div>
                                <div className="logo-text">F<span className="logo-accent">INITE</span></div>
                                <div className="tagline">Advanced Research & Development Group</div>
                            </div>
                        </div>
                        <div className="glass-panel">
                            <div style={{ fontSize: "0.9rem", color: "#333" }}>{CValue}</div>
                            <div style={{ fontWeight: "bold", color: "#A902DB" }}>Innovating Tomorrow</div>
                        </div>
                    </div>
                    <nav aria-label="Main navigation">
                        <ul className="nav-menu" role="menubar">
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "default" ? 'active' : ''}`} onClick={() => setCurrentPage("default")}>Home</button>
                            </li>
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "research" ? 'active' : ''}`} onClick={() => setCurrentPage("research")}>Research</button>
                            </li>
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "publications" ? 'active' : ''}`} onClick={() => setCurrentPage("publications")}>Publications</button>
                            </li>
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "team" ? 'active' : ''}`} onClick={() => setCurrentPage("team")}>Team <span className="badge">New</span></button>
                            </li>
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "partners" ? 'active' : ''}`} onClick={() => setCurrentPage("partners")}>Partners</button>
                            </li>
                            <li role="none">
                                <button role="menuitem" className={`nav-item ${currentPage === "Contact" ? 'active' : ''}`} onClick={() => setCurrentPage("Contact")}>Contact</button>
                            </li>
                            <li role="none">
                                <a className="nav-item" href="/admin-login">Login</a>
                            </li>
                        </ul>
                    </nav>
                </header>
                <MainContent currentPage={currentPage} setCurrentPage={setCurrentPage} />
                <footer>
                    <div className="footer-links">
                        <a href="/privacy">Privacy Statement</a>
                        <a href="/tos">Terms of Use</a>
                        <a id="contact" href="#contact">Contact</a>
                    </div>
                    <p>{CValue} All rights reserved.</p>
                </footer>
            </div>
        </div>
    );
};

const DefaultContent = () => {
    return (
        <>
            <h2>Welcome to Finite R&D</h2>
            <p>At Finite Research Group, we push the boundaries of technology and innovation. Our interdisciplinary team works on cutting-edge projects in computational sciences, advanced materials, and future technologies.</p>

            <div className="research-highlight">
                <ResearchHighlight />
            </div>

            <h3>Latest Breakthrough</h3>
            <p>Nothing right now, but check back later and we might have something!</p>
{/* 
            <div style={{ marginTop: "20px" }}>
                <a href="/Projects" className="btn">View All Projects</a>
                <a href="#" className="btn btn-primary" style={{ marginLeft: "10px" }}>Annual Report 2023</a>
            </div> */}
            </>
    );
}
const RoutingSystem = ({ currentPage, setCurrentPage }: { currentPage: "default" | "research" | "publications" | "Contact" | "team" | "partners"; setCurrentPage: Dispatch<SetStateAction<"default" | "research" | "publications" | "Contact" | "team" | "partners">>; }) => {
    useEffect(() => {
        // Read current hash and set the page accordingly
        const setFromHash = () => {
            const path = window.location.hash;
            switch (path) {
                case "#research":
                    setCurrentPage("research");
                    break;
                case "#publications":
                    setCurrentPage("publications");
                    break;
                case "#team":
                    setCurrentPage("team");
                    break;
                case "#partners":
                    setCurrentPage("partners");
                    break;
                case "#contact":
                    setCurrentPage("Contact");
                    break;
                default:
                    setCurrentPage("default");
            }
        };

        setFromHash();
        const handler = () => setFromHash();
        window.addEventListener('hashchange', handler);
        return () => window.removeEventListener('hashchange', handler);
    }, [setCurrentPage]);

    return (
        <>
            {currentPage === "default" && <DefaultContent />}
            {currentPage === "research" && <Research />}
            {currentPage === "publications" && <ResearchPublications />}
            {currentPage === "team" && <div><h2>Our Team</h2><p>Meet the brilliant minds behind Finite Research Group. Our team comprises experts in various fields dedicated to advancing technology and innovation.</p></div>}
            {currentPage === "partners" && <div><h2>Our Partners</h2><p>We collaborate with leading institutions and organizations worldwide to drive research and development in cutting-edge technologies.</p></div>}
        </>
    );
}
export const MainContent = ({ currentPage, setCurrentPage }: { currentPage: "default" | "research" | "publications" | "Contact" | "team" | "partners"; setCurrentPage: Dispatch<SetStateAction<"default" | "research" | "publications" | "Contact" | "team" | "partners">>; }) => {
    const showContact = currentPage === 'Contact';
    useEffect(() => {
        // Keep the URL hash in sync with currentPage when navigating programmatically
        const map: Record<string, string> = {
            default: '',
            research: '#research',
            publications: '#publications',
            team: '#team',
            partners: '#partners',
            Contact: '#contact'
        };
        const newHash = map[currentPage] || '';
        if (window.location.hash !== newHash) {
            window.location.hash = newHash;
        }
    }, [currentPage]);

    function onformsubmit(e: React.FormEvent) {
        e.preventDefault();
        // grab all the data, form a email body then load it up in the users email client
        const form = e.target as HTMLFormElement;
        const name = (form.elements.namedItem('name') as HTMLInputElement).value;
        const email = (form.elements.namedItem('email') as HTMLInputElement).value;
        const message = (form.elements.namedItem('message') as HTMLInputElement).value;
        const subject = `Contact Form Submission from ${name}`;
        const body = `Name: ${name}%0D%0AEmail: ${email}%0D%0A%0D%0A${message}`;
        window.location.href = `mailto:Developers@finite.ovh?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    }

    return (<>
        <main>
            <div className="main-content">
                <div className="content-box">
                    {/* if yes, show contact form. else show main content */}
                    {showContact && (
                        <div id="contact-form" className="contact-form">
                            <h2>Contact Us</h2>
                            <form onSubmit={onformsubmit}>
                                <label>Name:</label>
                                <input type="text" name="name" required />
                                <label>Email:</label>
                                <input type="email" name="email" required />
                                <label>Message:</label>
                                <textarea name="message" required></textarea>
                                <button type="submit">Send</button>
                            </form>
                        </div>
                    )}
                    {!showContact && <>
                        <RoutingSystem currentPage={currentPage} setCurrentPage={setCurrentPage} />
                    </>
                    }
                </div>

                <div className="content-box">
                    <h2>Upcoming Events</h2>
                    <p>We do not have any events at the moment.</p>
                    {/* <h3>International Tech Symposium 2023</h3>
                    <p>Our team will be presenting three papers at the upcoming International Tech Symposium in November. Join us for presentations on quantum computing applications and sustainable tech innovations.</p>

                    <h3>Finite Open House</h3>
                    <p>Tour our facilities and meet our researchers at our annual Open House event. Experience hands-on demonstrations of our latest projects and prototypes.</p>

                    <div style={{ marginTop: "20px", textAlign: "center" }}>
                        <a href="#" className="btn btn-primary">Register for Events</a>
                    </div> */}
                </div>
            </div>

            <div className="sidebar">
                <ResearchAreas />

                <ResearchPublications />


                <h3>Quick Links</h3>
                {/* <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                    <a href="#" className="btn">Career Opportunities</a>
                    <a href="#" className="btn">Research Grants</a>
                    <a href="#" className="btn btn-primary">Collaborate With Us</a>
                </div> */}
            </div>
        </main></>)
}

// removed unused rerender
