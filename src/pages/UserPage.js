import React from "react";
import Appbar from "../components/UI/AppBar";
import Meals from "../components/User/Meals";
import CartProvider from "../context/CartContext";
import ItemsProvider from "../context/ItemsContext";
import OrderProvider from "../context/OrderContext";

const UserPage = () => {
    return (
        <OrderProvider>
            <ItemsProvider>
                <CartProvider>
                    <Appbar />
                    <Meals />
                </CartProvider>
            </ItemsProvider>
        </OrderProvider>
    );
};

export default UserPage;
