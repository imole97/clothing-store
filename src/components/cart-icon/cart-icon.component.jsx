import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
// import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.jsx'
import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx'


const CartIcon = () => {
    const {setIsCartOpen, isCartOpen, cartCount} = useContext(CartContext)
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <CartIconContainer  onClick={toggleCartOpen}>
            <ShoppingIcon  className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon