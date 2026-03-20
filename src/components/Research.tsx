import React, { useEffect, useState } from "react";

export const ResearchHighlight = () => {
    return (
        <>
            <h3>Current Focus: Object Orented IR Runtime</h3>
            <p>Currently At finite, we are developing an Object Oriented Intermediate Representation (IR) Runtime to allow developers to write programs in multiple language environments and have them run seamlessly.</p>
            <a href="#" className="btn btn-primary" style={{ marginTop: "10px" }}>Learn More</a>
        </>
    );
}


export const ResearchPublications = () => {
    const [data, setData] = useState<any[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        fetch('/Content/publications.json')
            .then(response => {
                if (!response.ok) throw new Error(response.statusText);
                return response.json();
            })
            .then(json => setData(Array.isArray(json) ? json : []))
            .catch(error => {
                console.error("Failed to fetch publications:", error);
                setData([]);
            })
            .finally(() => setLoading(false));
    }, []);

    const containerStyle: React.CSSProperties = {
        background: "#ffffff",
        border: "1px solid #e5e7eb",
        padding: 16,
        borderRadius: 8,
        boxShadow: "0 1px 3px rgba(0,0,0,0.06)",
        maxWidth: 760,
    };

    const listStyle: React.CSSProperties = { listStyle: "none", margin: 0, padding: 0 };
    const itemStyle: React.CSSProperties = {
        padding: "12px 8px",
        borderBottom: "1px solid #f3f4f6",
        display: "flex",
        flexDirection: "column",
    };
    const titleStyle: React.CSSProperties = {
        color: "#1f2937",
        textDecoration: "none",
        fontWeight: 600,
        fontSize: 15,
    };
    const metaStyle: React.CSSProperties = { color: "#6b7280", fontSize: 12, marginTop: 6 };
    const abstractStyle: React.CSSProperties = { color: "#374151", marginTop: 8, fontSize: 13 };

    return (
        <>
            <div style={containerStyle}>
                <h3 style={{ marginTop: 0 }}>Recent Publications</h3>

                {loading ? (
                    <p>Loading publications…</p>
                ) : data.length === 0 ? (
                    <p>No publications found.</p>
                ) : (
                    <ul style={listStyle}>
                        {data.map((element, idx) => {
                            const title = element.title || "Untitled";
                            const authors =
                                element.authors && (Array.isArray(element.authors)
                                    ? element.authors.join(", ")
                                    : element.authors);
                            const year = element.year || element.date || "";
                            return (
                                <li key={idx} style={itemStyle}>
                                    <a
                                        href={element.link || "#"}
                                        style={titleStyle}
                                        target={element.link ? "_blank" : undefined}
                                        rel={element.link ? "noopener noreferrer" : undefined}
                                    >
                                        {title}
                                    </a>
                                    {(authors || year) && (
                                        <span style={metaStyle}>{[authors, year].filter(Boolean).join(" • ")}</span>
                                    )}
                                    {element.abstract && <p style={abstractStyle}>{element.abstract}</p>}
                                </li>
                            );
                        })}
                    </ul>
                )}
            </div>
        </>
    );
}

export const ResearchAreas = () => {
    return (
        <>
        <h3>Research Areas</h3>
                <ul>
                    <li>Programming languages</li>
                    <li>Advanced Materials</li>
                    <li>Artificial Intelligence</li>
                    <li>Intermediate Representation</li>
                    <li>Computing platforms</li>
                    <li>Native Code Generators</li>
                </ul>
        </>
    );
}


export const Research = () => {
    return (
        <div className="research-section">
            <h2>Research at Finite</h2>
            <input/>
            <p>At Finite Research Group, we are dedicated to pushing the boundaries of technology and innovation. Our interdisciplinary team works on cutting-edge projects in computational sciences, advanced materials, and future technologies.</p>
        </div>
    );
}

export default Research;