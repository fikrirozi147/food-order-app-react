import React, { useContext } from "react";
import {
    Card,
    CardContent,
    CardMedia,
    Typography,
    Button,
    CardActions
} from "@mui/material";
import { CartContext } from "../../context/CartContext";

const UserMealsItem = ({ item }) => {
    const { addItem } = useContext(CartContext);

    const handleAddToCart = () => {
        addItem({ ...item, amount: 1 });
    };

    return (
        <Card style={{ width: '250px', height: '350px', display: 'flex', flexDirection: 'column' }}>
            <CardMedia
                component="img"
                height="180"
                image={item.image}
                alt={item.name}
            />
            <CardContent style={{ flex: 1 }}> {/* This will make the content take up the available space */}
                <Typography variant="h6" fontSize="1rem">{item.name}</Typography>
                <Typography variant="body2" fontSize="0.7rem" color="textSecondary">
                    {item.description}
                </Typography>
                <Typography variant="body1" style={{ color: "yellowgreen" }}>
                    RM{item.price.toFixed(2)}
                </Typography>
            </CardContent>
            <CardActions>
                <Button
                    variant="contained"
                    style={{ backgroundColor: "yellowgreen" }}
                    fullWidth
                    onClick={handleAddToCart}
                >
                    Add to Cart
                </Button>
            </CardActions>
        </Card>
    );
};

export default UserMealsItem;
