import React, { createContext, useEffect, useState } from "react";

export const OrderContext = createContext();

const LOCAL_STORAGE_KEY = "order_list";

const OrderProvider = ({ children }) => {
    const [orders, setOrders] = useState(() => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    });

    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(orders));
    }, [orders]);

    const addOrder = (items) => {
        const newOrder = {
            id: Date.now().toString(),
            number: orders.length + 1,
            items,
            done: false
        };
        setOrders((prev) => [...prev, newOrder]);
    };

    const deleteOrder = (id) => {
        setOrders((prev) => prev.filter(order => order.id !== id));
    };

    const toggleDone = (id) => {
        setOrders((prev) =>
            prev.map((order) =>
                order.id === id ? { ...order, done: !order.done } : order
            )
        );
    };

    return (
        <OrderContext.Provider value={{ orders, addOrder, deleteOrder, toggleDone }}>
            {children}
        </OrderContext.Provider>
    );
};

export default OrderProvider;
