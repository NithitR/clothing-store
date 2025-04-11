import {StrictMode} from 'react'
import {createRoot} from 'react-dom/client'
import {BrowserRouter} from "react-router-dom";
import './index.scss'
import {UserProvider} from "./contexts/user.context.jsx";
import {ProductProvider} from "./contexts/product.context.jsx";
import {CartProvider} from "./contexts/cart.context.jsx";
import App from './App.jsx'

createRoot(document.getElementById('root')).render(
    <StrictMode>
        <BrowserRouter>
            <UserProvider>
                <ProductProvider>
                    <CartProvider>
                        <App/>
                    </CartProvider>
                </ProductProvider>
            </UserProvider>
        </BrowserRouter>
    </StrictMode>,
)
