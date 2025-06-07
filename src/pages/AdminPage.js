import React from "react";
import Sidebar from "../components/Admin/Sidebar";
import Main from "../components/Admin/Main";
import ItemsProvider from "../context/ItemsContext";
import OrderProvider from "../context/OrderContext"; // Ensure this is imported

const AdminPage = () => {
    return (
        <OrderProvider>
            <ItemsProvider>
                <div style={{ display: "flex" }}>
                    <Sidebar />
                    <div style={{ marginLeft: 240, flex: 1 }}>
                        <Main />
                    </div>
                </div>
            </ItemsProvider>
        </OrderProvider>
    );
};

export default AdminPage;
