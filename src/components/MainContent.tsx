import React from 'react';
import { ResearchAreas, ResearchHighlight, ResearchPublications } from './Research';
import PrismaticBurst from './PrismaticBurst';

export const MainContent = () => {
    const [showContact, setShowContact] = React.useState(false);
    document.getElementById('contact')?.addEventListener('click', () => {
        if (!showContact)
            setShowContact(true);
        else setShowContact(false);
    });
    
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
                <div id="contact" className="contact-form">
                    <h2>Contact Us</h2>
                    <form>
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
                <h2>Welcome to Finite R&D</h2>
                <p>At Finite Research Group, we push the boundaries of technology and innovation. Our interdisciplinary team works on cutting-edge projects in computational sciences, advanced materials, and future technologies.</p>

                <div className="research-highlight">
                    <ResearchHighlight />
                </div>

                <h3>Latest Breakthrough</h3>
                <p>We recently announced a breakthrough in energy-efficient computing architectures that reduce power consumption by 40% while maintaining peak performance. This technology has immediate applications in data centers and high-performance computing environments.</p>

                <div style={{marginTop: "20px"}}>
                    <a href="/Projects" className="btn">View All Projects</a>
                    <a href="#" className="btn btn-primary" style={{marginLeft: "10px"}}>Annual Report 2023</a>
                </div>
                </>}
            </div>

            <div className="content-box">
                <h2>Upcoming Events</h2>

                <h3>International Tech Symposium 2023</h3>
                <p>Our team will be presenting three papers at the upcoming International Tech Symposium in November. Join us for presentations on quantum computing applications and sustainable tech innovations.</p>

                <h3>Finite Open House</h3>
                <p>Tour our facilities and meet our researchers at our annual Open House event. Experience hands-on demonstrations of our latest projects and prototypes.</p>

                <div style={{marginTop: "20px", textAlign: "center"}}>
                    <a href="#" className="btn btn-primary">Register for Events</a>
                </div>
            </div>
        </div>

        <div className="sidebar">
                <ResearchAreas/>

                <ResearchPublications />
            

            <h3>Quick Links</h3>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <a href="#" className="btn">Career Opportunities</a>
                <a href="#" className="btn">Research Grants</a>
                <a href="#" className="btn btn-primary">Collaborate With Us</a>
            </div>
        </div>
    </main></>)
}