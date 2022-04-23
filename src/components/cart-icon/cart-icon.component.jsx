import { useContext } from 'react'
import { CartContext } from '../../context/cart.context'
import {ReactComponent as ShoppingIcon} from '../../assets/shopping-bag.svg'
import './cart-icon.styles.scss'


const CartIcon = () => {
    const {setIsCartOpen, isCartOpen} = useContext(CartContext)
    const toggleCartOpen = () => setIsCartOpen(!isCartOpen)
    return(
        <div className='cart-icon-container' onClick={toggleCartOpen}>
            <ShoppingIcon  className='shopping-icon'/>
            <spam className='item-count'>0</spam>
        </div>
    )
}

export default CartIcon