export const MainContent = () => {
    return (<><main>
        <div className="main-content">
            <div className="content-box">
                <h2>Welcome to Finite R&D</h2>
                <p>At Finite Research Group, we push the boundaries of technology and innovation. Our interdisciplinary team works on cutting-edge projects in computational sciences, advanced materials, and future technologies.</p>

                <div className="research-highlight">
                    <h3>Current Focus: Quantum Computing Algorithms</h3>
                    <p>Our team is developing novel quantum algorithms that could revolutionize data processing and encryption. This research has potential applications in secure communications and complex system modeling.</p>
                    <a href="#" className="btn btn-primary" style={{marginTop: "10px"}}>Learn More</a>
                </div>

                <h3>Latest Breakthrough</h3>
                <p>We recently announced a breakthrough in energy-efficient computing architectures that reduce power consumption by 40% while maintaining peak performance. This technology has immediate applications in data centers and high-performance computing environments.</p>

                <div style={{marginTop: "20px"}}>
                    <a href="#" className="btn">View All Projects</a>
                    <a href="#" className="btn btn-primary" style={{marginLeft: "10px"}}>Annual Report 2023</a>
                </div>
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
            <h3>Research Areas</h3>
            <ul>
                <li>Quantum Computing</li>
                <li>Advanced Materials</li>
                <li>Artificial Intelligence</li>
                <li>Biotechnology</li>
                <li>Renewable Energy Systems</li>
                <li>Space Technologies</li>
            </ul>

            <h3>Recent Publications</h3>
            <ul>
                <li>"Quantum Algorithms for Optimization" - Nature</li>
                <li>"Metamaterials for Energy Harvesting" - Science</li>
                <li>"AI-driven Drug Discovery" - Cell</li>
                <li>"Sustainable Computing Architectures" - IEEE</li>
            </ul>

            <h3>Quick Links</h3>
            <div style={{display: "flex", flexDirection: "column", gap: "10px"}}>
                <a href="#" className="btn">Career Opportunities</a>
                <a href="#" className="btn">Research Grants</a>
                <a href="#" className="btn btn-primary">Collaborate With Us</a>
            </div>
        </div>
    </main></>)
}