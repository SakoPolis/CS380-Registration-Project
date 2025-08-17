import React from "react";
import { Container, Typography } from "@mui/material";

const Home = () => {
    return (
        <Container>
            <img
                src="/potterytwo.png"
                alt="Pottery Times"
                style={{ maxWidth: "100%", height: "auto" }}
            />
            <Typography variant="body1">Home Page</Typography>
        </Container>
    );
};

export default Home;
