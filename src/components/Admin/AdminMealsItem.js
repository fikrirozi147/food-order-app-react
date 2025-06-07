import React, { useContext, useState } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    CardActions,
    Button,
    Dialog,
    DialogActions,
    DialogContent,
    DialogContentText,
    DialogTitle
} from "@mui/material";
import { ItemsContext } from "../../context/ItemsContext";

const AdminMealsItem = ({ item }) => {
    const { deleteItem } = useContext(ItemsContext);
    const [open, setOpen] = useState(false);

    const handleClickOpen = () => {
        setOpen(true);
    };

    const handleClose = () => {
        setOpen(false);
    };

    const handleDelete = () => {
        deleteItem(item.id);
        setOpen(false);
    };

    return (
        <>
            <Card style={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column' }}>
                <CardMedia
                    component="img"
                    height="180"
                    image={item.image}
                    alt={item.name}
                />
                <CardContent style={{ flex: 1 }}>
                    <Typography variant="h6" fontSize="1rem">{item.name}</Typography>
                    <Typography variant="body2" fontSize="0.7rem" color="textSecondary">
                        {item.description}
                    </Typography>
                    <Typography variant="body1" style={{ color: "yellowgreen" }}>
                        RM{item.price.toFixed(2)}
                    </Typography>
                </CardContent>
                <CardActions>
                    <Button variant="contained" style={{ backgroundColor: "#f44336" }} fullWidth onClick={handleClickOpen}>
                        Delete
                    </Button>
                </CardActions>
            </Card>

            <Dialog
                open={open}
                onClose={handleClose}
                aria-labelledby="alert-dialog-title"
                aria-describedby="alert-dialog-description"
            >
                <DialogTitle id="alert-dialog-title">{"Confirm Delete"}</DialogTitle>
                <DialogContent>
                    <DialogContentText id="alert-dialog-description">
                        Are you sure you want to delete "{item.name}" from the menu?
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button onClick={handleClose} variant="outlined" style={{ color: "#333", borderColor: "#333" }}>
                        Cancel
                    </Button>
                    <Button onClick={handleDelete} variant="contained" style={{ backgroundColor: "#f44336" }} autoFocus>
                        Delete
                    </Button>
                </DialogActions>
            </Dialog>
        </>
    );
};

export default AdminMealsItem;
