import React, { createContext, useEffect, useState } from "react";

export const ItemsContext = createContext();

const LOCAL_STORAGE_KEY = "food_items";

const ItemsProvider = ({ children }) => {
    const [items, setItems] = useState(() => {
        const saved = localStorage.getItem(LOCAL_STORAGE_KEY);
        return saved ? JSON.parse(saved) : [];
    });

    // Sync to localStorage whenever items change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(items));
    }, [items]);

    const addItem = (newItem) => {
        setItems((prev) => [...prev, newItem]);
    };

    const deleteItem = (id) => {
        setItems((prev) => prev.filter((item) => item.id !== id));
    };

    return (
        <ItemsContext.Provider value={{ items, addItem, deleteItem }}>
            {children}
        </ItemsContext.Provider>
    );
};

export default ItemsProvider;
