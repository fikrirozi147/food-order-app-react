import React, { useContext, useState } from "react";
import { Grid, Button } from "@mui/material";
import AddForm from "./AddForm";
import AdminMealsItem from "./AdminMealsItem";
import { ItemsContext } from "../../context/ItemsContext";

const Main = () => {
    const { items } = useContext(ItemsContext);
    const [openForm, setOpenForm] = useState(false);

    return (
        <div style={{ padding: "2rem", marginLeft: "2rem" }}> {/* Added marginLeft */}
            <Button variant="contained" style={{ backgroundColor: "#333" }} onClick={() => setOpenForm(true)}>
                Add Food Item
            </Button>

            <AddForm open={openForm} handleClose={() => setOpenForm(false)} />

            <Grid container spacing={4} style={{ marginTop: "2rem" }}>
                {items.map(item => (
                    <Grid item xs={12} sm={6} md={4} key={item.id}>
                        <AdminMealsItem item={item} />
                    </Grid>
                ))}
            </Grid>
        </div>
    );
};

export default Main;
