
// frontend/src/components/home

import React from "react";
import { Container, Typography } from "@mui/material";
import potterytwo from "./potterytwo.png"; // ensure bundling and correct path

const Home = () => (
    <Container>
        <img
            src={potterytwo}
            alt="Pottery Times"
            style={{ maxWidth: "100%", height: "auto" }}
        />
        <Typography variant="body1"> <h1>Pottery Times</h1>
            <p>Pottery times is a local artist-run studio that offers affordable pottery lessons to adults, teenagers, and children. We offer a fun and hands-on experience while teaching the fundamentals of pottery-making.  </p>

            <ul>
                <li>No long-term commitments</li>
                <li>No membership requirements</li>
                <li>Beginner friendly! </li>
            </ul></Typography>
    </Container>
);

export default Home;

/*import React from "react";

const Home = () => {
    return (
        <div style={{ padding: "2rem", textAlign: "center" }}>
            <h1> Home is rendering!</h1>
            <p>If you see this text, React Router and App.jsx are working fine.</p>
        </div>
    );
};

export default Home;
*/