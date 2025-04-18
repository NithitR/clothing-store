import './cart-dropdown.styles.scss'
import Button from "../button/button.component.jsx";
import CartItem from "../cart-item/cart-item.component.jsx";
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";
import {useNavigate} from "react-router-dom";

const CardDropdown = () => {
    const {cartItems} = useContext(CartContext);
    const navigate = useNavigate();

    const gotoCheckoutHandler = () => {
        navigate("/checkout");
    }
    return (
        <div className="cart-dropdown-container">
            <div className="cart-items">
                {cartItems.map((item) => (
                    <CartItem key={item.id} cartItem={item}></CartItem>
                    ))
                }
            </div>
            <Button onClick={()=>gotoCheckoutHandler()}>Go to Checkout</Button>
        </div>
    )
}

export default CardDropdown;