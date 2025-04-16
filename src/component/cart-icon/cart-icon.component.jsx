import {useContext} from "react";
import './cart-icon.styles.scss';
import ShoppingIcon from "../../assets/shopping-bag.svg?react";
import {CartContext} from "../../contexts/cart.context.jsx";

const CartIcon = ()=>{
    const {isCartOpen,setIsCartOpen,cartItems} = useContext(CartContext);
    let totalNumber = cartItems.reduce((acc, cur) => acc + cur.quantity, 0);
    const toggleCart = () => setIsCartOpen(!isCartOpen);
    return (
        <div className="cart-icon-container" onClick={toggleCart}>
            <ShoppingIcon className="shopping-icon"/>
            <span className='item-count'>{totalNumber}</span>
        </div>
    )
}
export default CartIcon;