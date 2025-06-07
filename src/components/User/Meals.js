import React, { useContext } from "react";
import { Grid, Container, Typography } from "@mui/material";
import UserMealsItem from "./UserMealsItem";
import { ItemsContext } from "../../context/ItemsContext";

const Meals = () => {
    const { items } = useContext(ItemsContext);

    return (
        <Container>
            <Typography variant="h4" style={{ margin: "2rem 0" }}>
                Available Meals
            </Typography>
            <Grid container spacing={4}>
                {items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <UserMealsItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </Container>
    );
};

export default Meals;
