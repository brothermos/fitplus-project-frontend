import React from "react";
import image from '../../assets/8225.jpg'
import "./Home.css";
import {  Typography } from "@mui/material";
const Home = () => {
    return (
        <div>
            <Typography variant="h2" padding={3} textAlign="center" color="#4158D0" marginTop={2}>
                Exercise Tracker
            </Typography>
            <img src={image} alt="" />
        </div>
    );
};

export default Home;
