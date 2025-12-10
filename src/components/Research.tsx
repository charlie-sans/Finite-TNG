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

    useEffect(() => {
        fetch('/Content/publications.json')
            .then(response => response.json())
            .then(json => setData(json))
            .catch(error => {
                console.error("Failed to fetch publications:", error);
                setData([]);
            });
    }, []);

    return (
        <>
            <h3>Recent Publications</h3>
            <ul>
                {data.map((element, idx) => (
                    <li key={idx}>
                        <a href={element.link || "#"}>{element.title || "Untitled"}</a>
                    </li>
                ))}
            </ul>
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
            <p>At Finite Research Group, we are dedicated to pushing the boundaries of technology and innovation. Our interdisciplinary team works on cutting-edge projects in computational sciences, advanced materials, and future technologies.</p>
        </div>
    );
}
export default Research;