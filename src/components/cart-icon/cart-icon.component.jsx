
import { useSelector, useDispatch } from 'react-redux'
import { setIsCartOpen } from '../../store/cart/cart.action.js'
import { selectCartCount,selectIsCartOpen, } from '../../store/cart/cart.selector.js'
import './cart-icon.styles.jsx'
import { CartIconContainer, ItemCount, ShoppingIcon} from './cart-icon.styles.jsx'


const CartIcon = () => {

    const dispatch = useDispatch()
    const isCartOpen = useSelector(selectIsCartOpen)
    const cartCount = useSelector(selectCartCount)
    const toggleCartOpen = () => dispatch(setIsCartOpen(!isCartOpen)) 
    return(
        <CartIconContainer  onClick={toggleCartOpen}>
            <ShoppingIcon  className='shopping-icon'/>
            <ItemCount>{cartCount}</ItemCount>
        </CartIconContainer>
    )
}

export default CartIcon