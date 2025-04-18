import {createContext, useEffect, useState} from "react";

const addCartItem = (cartItems, productToAdd) => {
    let existingItem = cartItems.find(cartItem => cartItem.id === productToAdd.id);
    if (existingItem) {
        return cartItems.map((cartItem) => {
            return cartItem.id === productToAdd.id ? {...cartItem, quantity: cartItem.quantity + 1} : cartItem
        })
    } else {
        cartItems.push({...productToAdd, quantity: 1});
    }
    return cartItems;
}

const removeCartItem = (cartItems, removeCartItem) => {
    let index = cartItems.findIndex(cartItem => cartItem.id === removeCartItem.id);
    if (index > -1) {
        cartItems[index].quantity > 1 ? cartItems[index].quantity-- : cartItems.splice(index, 1);
    }
    return cartItems.length? [...cartItems]:[];
}

const clearCartItems = (cartItems,cartItemToClear) => {
    return cartItems.filter(cartItem => cartItemToClear.id !== cartItem.id);
}

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => null,
    cartItems: [],
    addItemToCart: ()=>{},
    removeItemFromCart: ()=>{},
    totalItems: 0,
    cartTotal: 0,
})

export const CartProvider = ({children}) => {
    const [isCartOpen, setIsCartOpen] = useState(false);
    const [cartItems, setCartItems] = useState([]);
    const [totalItems, setTotalItems] = useState(0);
    const [cartTotal, setTotal] = useState(0);

    useEffect(() => {
        let totalNumber = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
        setTotalItems(totalNumber);
    }, [cartItems]);

    useEffect(() => {
        let total = cartItems.reduce((acc, cur) => acc + cur.quantity * cur.price, 0);
        setTotal(total);
    }, [cartItems]);

    const addItemToCart = (productToAdd) => {
        setCartItems(addCartItem(cartItems, productToAdd))
    }

    const removeItemFromCart = (productToRemove) => {
        setCartItems(removeCartItem(cartItems, productToRemove))
    }

    const clearItemsFromCart = (itemToClear)=>{
        setCartItems(clearCartItems(cartItems,itemToClear));
    }
    const value = {isCartOpen, setIsCartOpen, addItemToCart, removeItemFromCart, cartItems, totalItems,clearItemsFromCart,cartTotal};
    return <CartContext.Provider value={value}>{children}</CartContext.Provider>;
}