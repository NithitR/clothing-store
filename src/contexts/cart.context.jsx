import {createContext, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    let existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity+1} : cartItem
        })
    } else {
        cartItems.push({...productToAdd, quantity: 1});
    }
    return cartItems;
}
export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    setCartItems: () => {
    },
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart,cartItems};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}