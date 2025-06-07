import React, { useContext, useState } from "react";
import ReactDOM from "react-dom";
import {
    Drawer,
    List,
    ListItem,
    ListItemText,
    Typography,
    IconButton,
    Divider,
    Modal,
    Fade,
    Paper,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import DeleteIcon from "@mui/icons-material/Delete";
import { OrderContext } from "../../context/OrderContext";

const modalRoot = document.getElementById("modal-root") || document.body;

const Sidebar = () => {
    const { orders, deleteOrder, toggleDone } = useContext(OrderContext);
    const [selectedOrder, setSelectedOrder] = useState(null);
    const [dialogOpen, setDialogOpen] = useState(false);
    const [deleteDialogOpen, setDeleteDialogOpen] = useState(false);
    const [orderToDelete, setOrderToDelete] = useState(null);

    const handleOpenDialog = (order) => {
        setSelectedOrder(order);
        setDialogOpen(true);
    };

    const handleCloseDialog = () => {
        setDialogOpen(false);
        setSelectedOrder(null);
    };

    const handleDone = () => {
        toggleDone(selectedOrder.id);
        handleCloseDialog();
    };

    const handleDeleteClick = (e, orderId) => {
        e.stopPropagation();
        setOrderToDelete(orderId);
        setDeleteDialogOpen(true);
    };

    const handleDeleteConfirm = () => {
        deleteOrder(orderToDelete);
        setDeleteDialogOpen(false);
        setOrderToDelete(null);
    };

    const handleDeleteCancel = () => {
        setDeleteDialogOpen(false);
        setOrderToDelete(null);
    };

    const totalAmount = selectedOrder?.items.reduce(
        (sum, item) => sum + item.price * item.amount,
        0
    );

    return (
        <>
            <Drawer variant="permanent" anchor="left">
                <div style={{ width: 260, padding: "1rem" }}>
                    <Typography variant="h6" gutterBottom>
                        Admin Panel
                    </Typography>

                    <Divider style={{ margin: "1rem 0" }} />

                    <Typography variant="subtitle1" gutterBottom>
                        Orders
                    </Typography>

                    <List>
                        {orders.length === 0 && (
                            <Typography variant="body2" color="textSecondary" style={{ padding: "0 1rem" }}>
                                No orders yet.
                            </Typography>
                        )}

                        {orders.map((order) => (
                            <ListItem
                                key={order.id}
                                button
                                onClick={() => handleOpenDialog(order)}
                                style={{
                                    backgroundColor: order.done ? "#d4edda" : undefined,
                                    marginBottom: "0.5rem",
                                    borderRadius: "8px"
                                }}
                            >
                                <ListItemText primary={`No. ${order.number.toString().padStart(2, "0")}`} />
                                <IconButton onClick={(e) => handleDeleteClick(e, order.id)}>
                                    <DeleteIcon fontSize="small" />
                                </IconButton>
                            </ListItem>
                        ))}
                    </List>
                </div>
            </Drawer>

            {/* Styled Order Detail Modal */}
            {dialogOpen && selectedOrder &&
                ReactDOM.createPortal(
                    <Modal open={dialogOpen} onClose={handleCloseDialog} closeAfterTransition>
                        <Fade in={dialogOpen}>
                            <Paper
                                style={{
                                    maxWidth: 500,
                                    margin: "5rem auto",
                                    padding: "2rem",
                                    outline: "none"
                                }}
                            >
                                <Typography variant="h5" gutterBottom>
                                    Order No. {selectedOrder.number.toString().padStart(2, "0")}
                                </Typography>
                                <Divider />

                                {selectedOrder.items.map((item, idx) => (
                                    <div key={idx} style={{ margin: "1rem 0" }}>
                                        <Typography variant="subtitle1">{item.name}</Typography>
                                        <Typography variant="body2" color="textSecondary">
                                            RM{item.price.toFixed(2)} × {item.amount}
                                        </Typography>
                                        <Divider style={{ marginTop: "0.5rem" }} />
                                    </div>
                                ))}

                                <Typography variant="h6" style={{ marginTop: "1.5rem" }}>
                                    Total: RM{totalAmount?.toFixed(2)}
                                </Typography>

                                <div
                                    style={{
                                        display: "flex",
                                        justifyContent: "space-between",
                                        marginTop: "1.5rem"
                                    }}
                                >
                                    <Button
                                        variant="contained"
                                        style={{ backgroundColor: "yellowgreen" }}
                                        onClick={handleDone}
                                    >
                                        Complete Order
                                    </Button>
                                    <Button
                                        onClick={handleCloseDialog}
                                        variant="outlined"
                                        style={{ color: "#f44336", borderColor: "#f44336" }}
                                    >
                                        Close
                                    </Button>
                                </div>
                            </Paper>
                        </Fade>
                    </Modal>,
                    modalRoot
                )}

            <Dialog
                open={deleteDialogOpen}
                onClose={handleDeleteCancel}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete this order?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleDeleteCancel} style={{ color: "#333", borderColor: "#333" }} variant="outlined">
                        Cancel
                    </Button>
                    <Button onClick={handleDeleteConfirm} variant="contained" style={{ backgroundColor: "#f44336" }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default Sidebar;
