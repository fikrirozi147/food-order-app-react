import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import {
    Modal,
    Fade,
    Paper,
    Typography,
    Button,
    IconButton,
    Divider,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { Add, Remove } from "@mui/icons-material";
import { CartContext } from "../../context/CartContext";
import { OrderContext } from "../../context/OrderContext"; // Import Order context

const modalRoot = document.getElementById("modal-root") || document.body;

const CartModal = ({ open, handleClose }) => {
    const { cartItems, addItem, removeItem, clearCart } = useContext(CartContext);
    const { addOrder } = useContext(OrderContext); // Access addOrder
    const [orderSuccess, setOrderSuccess] = useState(false);

    const totalAmount = cartItems.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
    );

    const handleOrder = () => {
        if (cartItems.length === 0) return;

        addOrder(cartItems);  // Save order
        clearCart();          // Clear cart
        setOrderSuccess(true); // Open success dialog
    };

    const handleCloseSuccess = () => {
        setOrderSuccess(false);
        handleClose();        // Close modal
    };

    return ReactDOM.createPortal(
        <>
            <Modal open={open} onClose={handleClose} closeAfterTransition>
                <Fade in={open}>
                    <Paper
                        style={{
                            maxWidth: 500,
                            margin: "5rem auto",
                            padding: "2rem",
                            outline: "none"
                        }}
                    >
                        <Typography variant="h5" gutterBottom>
                            Your Cart
                        </Typography>
                        <Divider />
                        {cartItems.length === 0 ? (
                            <Typography variant="body1" style={{ marginTop: "1rem" }}>
                                Cart is empty.
                            </Typography>
                        ) : (
                            cartItems.map((item) => (
                                <div key={item.id} style={{ margin: "1rem 0" }}>
                                    <Typography variant="subtitle1">{item.name}</Typography>
                                    <Typography variant="body2" color="textSecondary">
                                        RM{item.price.toFixed(2)} × {item.amount}
                                    </Typography>
                                    <div>
                                        <IconButton onClick={() => removeItem(item.id)}>
                                            <Remove />
                                        </IconButton>
                                        <IconButton onClick={() => addItem({ ...item, amount: 1 })}>
                                            <Add />
                                        </IconButton>
                                    </div>
                                    <Divider style={{ marginTop: "0.5rem" }} />
                                </div>
                            ))
                        )}

                        <Typography variant="h6" style={{ marginTop: "1.5rem" }}>
                            Total: RM{totalAmount.toFixed(2)}
                        </Typography>

                        <div
                            style={{
                                display: "flex",
                                justifyContent: "space-between",
                                marginTop: "1.5rem"
                            }}
                        >
                            <Button
                                onClick={handleClose}
                                variant="outlined"
                                style={{ color: "#f44336", borderColor: "#f44336" }}
                            >
                                Close
                            </Button>
                            <Button
                                variant="contained"
                                style={{ backgroundColor: "yellowgreen" }}
                                disabled={cartItems.length === 0}
                                onClick={handleOrder} // ✅ Hook up handler
                            >
                                Order
                            </Button>
                        </div>
                    </Paper>
                </Fade>
            </Modal>

            <Dialog
                open={orderSuccess}
                onClose={handleCloseSuccess}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">
                    {"Order Placed Successfully!"}&#128522;
                </DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Your order has been placed successfully. Thank you!
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleCloseSuccess} variant="contained" style={{ backgroundColor: "yellowgreen" }}>
                        OK
                    </Button>
                </DialogActions>
            </Dialog>
        </>,
        modalRoot
    );
};

export default CartModal;
