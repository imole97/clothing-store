import { useDispatch, useSelector } from 'react-redux'
import { selectCartItems } from '../../store/cart/cart.selector'
import { addItemToCart } from '../../store/cart/cart.action'
import './product-card.styles.scss'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'

const ProductCard = ({product}) => {
    const dispatch  = useDispatch()
    const cartItems = useSelector(selectCartItems)
    const {name, price, imageUrl} = product
    const addProductToCart = () => {
        dispatch(addItemToCart(cartItems, product))
        // console.log(product)
        // console.log('cartadded');
    }
    return(
        <div className='product-card-container'>
            <img src={imageUrl} alt={`${name}`}/>
            <div className='footer'>
                <span className='name'>{name}</span>
                <span className='price'>{price}</span>
            </div>
            <Button buttonType={BUTTON_TYPE_CLASSES.inverted} onClick={addProductToCart}>Add to cart</Button>
        </div>
    )
}

export default ProductCard