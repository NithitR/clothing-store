import './checkout-item.styles.scss';
import {useContext} from "react";
import {CartContext} from "../../contexts/cart.context.jsx";

const CheckoutItem = ({cartItem}) => {
    const {name, price, quantity, imageUrl} = cartItem;
    const {clearItemsFromCart,addItemToCart,removeItemFromCart} = useContext(CartContext);

    const clearItemsHandler = () => clearItemsFromCart(cartItem)
    const addToCartHandler = () => addItemToCart(cartItem);
    const removeFromCartHandler = () => removeItemFromCart(cartItem);

    return (
        <div className='checkout-item-container'>
            <div className='image-container'>
                <img src={imageUrl} alt={`${name}`}/>
            </div>
            <span className='name'>{name}</span>
            <span className='quantity'>
                <div className='arrow' onClick={removeFromCartHandler}>&#10094;</div>
                <span className='value'>{quantity}</span>
                <div className='arrow' onClick={addToCartHandler}>&#10095;</div>
                </span>
            <span className='price'>{price}</span>
            <span className='remove-button' onClick={clearItemsHandler}>&#10005;</span>
        </div>
    )
}
// <div key={id}>
//     <h2>{name}</h2>
//     <span>{quantity}</span>
//     <br/>
//     <span onClick={() => removeItemFromCart(cartItem)}> decrement</span>
//     <br/>
//     <span onClick={() => addItemToCart(cartItem)}>increment</span>
//     {/*<span>{price}</span>*/}
// </div>
export default CheckoutItem;