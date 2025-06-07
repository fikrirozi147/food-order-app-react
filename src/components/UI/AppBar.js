import React, { useState, useContext } from "react";
import {
    AppBar,
    Toolbar,
    Typography,
    Button,
    Badge
} from "@mui/material";
import ShoppingCartIcon from "@mui/icons-material/ShoppingCart";
import CartModal from "./CartModal";
import { CartContext } from "../../context/CartContext";

const Appbar = () => {
    const [openCart, setOpenCart] = useState(false);
    const { cartItems } = useContext(CartContext);

    const totalQuantity = cartItems.reduce((sum, item) => sum + item.amount, 0);

    return (
        <>
            <AppBar position="static">
                <Toolbar style={{ justifyContent: "space-between", backgroundColor: "#333" }}>
                    <Typography variant="h6">Food Order App</Typography>
                    <Button
                        color="inherit"
                        onClick={() => setOpenCart(true)}
                        startIcon={
                            <Badge badgeContent={totalQuantity} color="secondary">
                                <ShoppingCartIcon />
                            </Badge>
                        }
                    >
                        Your Cart
                    </Button>
                </Toolbar>
            </AppBar>

            <CartModal open={openCart} handleClose={() => setOpenCart(false)} />
        </>
    );
};

export default Appbar;
