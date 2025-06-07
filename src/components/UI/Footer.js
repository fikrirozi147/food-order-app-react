import React from "react";
import { Button, Toolbar } from "@mui/material";

const Footer = ({ toggleRole, isAdmin }) => {
    return (
        <Toolbar style={{ justifyContent: "center" }}>
            <Button variant="contained" style={{ backgroundColor: "#333" }} onClick={toggleRole}>
                Switch to {isAdmin ? "User" : "Admin"} View
            </Button>
        </Toolbar>
    );
};

export default Footer;
