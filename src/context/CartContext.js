import React, { createContext, useReducer, useEffect } from "react";

// Create context
export const CartContext = createContext();

const LOCAL_STORAGE_KEY = "cart_items";

// Reducer to manage cart logic
const cartReducer = (state, action) => {
    switch (action.type) {
        case "ADD_ITEM":
            const existingIndex = state.findIndex(item => item.id === action.item.id);
            if (existingIndex >= 0) {
                const updatedItem = {
                    ...state[existingIndex],
                    amount: state[existingIndex].amount + action.item.amount
                };
                const updatedState = [...state];
                updatedState[existingIndex] = updatedItem;
                return updatedState;
            }
            return [...state, action.item];

        case "REMOVE_ITEM":
            const removeIndex = state.findIndex(item => item.id === action.id);
            if (removeIndex >= 0) {
                const item = state[removeIndex];
                if (item.amount === 1) {
                    return state.filter(i => i.id !== action.id);
                } else {
                    const updated = [...state];
                    updated[removeIndex] = { ...item, amount: item.amount - 1 };
                    return updated;
                }
            }
            return state;

        case "CLEAR_CART":
            return [];

        default:
            return state;
    }
};

// Provider component
const CartProvider = ({ children }) => {
    // Load initial cart from localStorage
    const getInitialCart = () => {
        const stored = localStorage.getItem(LOCAL_STORAGE_KEY);
        return stored ? JSON.parse(stored) : [];
    };

    const [cartItems, dispatch] = useReducer(cartReducer, [], getInitialCart);

    // Save cart to localStorage on every change
    useEffect(() => {
        localStorage.setItem(LOCAL_STORAGE_KEY, JSON.stringify(cartItems));
    }, [cartItems]);

    const addItem = item => {
        dispatch({ type: "ADD_ITEM", item });
    };

    const removeItem = id => {
        dispatch({ type: "REMOVE_ITEM", id });
    };

    const clearCart = () => {
        dispatch({ type: "CLEAR_CART" });
    };

    return (
        <CartContext.Provider value={{ cartItems, addItem, removeItem, clearCart }}>
            {children}
        </CartContext.Provider>
    );
};

export default CartProvider;
