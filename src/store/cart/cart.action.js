import { CART_ACTION_TYPES } from "./cart.types";
import { createAction } from "../../utils/reducer/reducer.utils";



const addCartItem = (cartItems,productToAdd) => {
    //find if cart item contains product to add
    const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === productToAdd.id)
    //if item found increment quantity
    if(existingCartItem){
        return cartItems.map((cartItem) => cartItem.id === productToAdd.id?
        {...cartItem, quantity: cartItem.quantity + 1}
            : cartItem
        )
    }
    //return new array with modified cartitem/ new cart item
    return [...cartItems, {...productToAdd, quantity:1}]
}

const removeCartItem = (cartItems, cartItemToRemove) => {
    //find the cart item to remove
    const existingCartItem = cartItems.find((cartItem) => 
    cartItem.id === cartItemToRemove.id)
    //check if quantity is equal to 1, if it is, remove item from cart
    if(existingCartItem.quantity === 1){
        return cartItems.filter((cartItem) => cartItem.id !== cartItemToRemove.id)
    }
    // return back cartitems with matching cart item with reduced quantity
    return cartItems.map ((cartItem) => 
    cartItem.id === cartItemToRemove.id
    ?{...cartItem, quantity: cartItem.quantity - 1}
    : cartItem
    )
} 

const clearCartItem = (cartItems, cartItemToClear) => {
    return cartItems.filter((cartItem) => cartItem.id !== cartItemToClear.id)
}











export const setIsCartOpen = (boolean) => 
createAction(CART_ACTION_TYPES.SET_IS_CART_OPEN, boolean)


  // add item to cart function
export const addItemToCart = (cartItems, productToAdd) => {
    const newCartItems = addCartItem(cartItems,productToAdd)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS, newCartItems)
}

//remove item from cart function
export const removeItemFromCart = (cartItems, cartItemToRemove) => {
    const newCartItems = removeCartItem(cartItems,cartItemToRemove)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}

//clear item from cart function
export const clearItemFromCart = (cartItems, cartItemToClear) => {
    const newCartItems = clearCartItem(cartItems,cartItemToClear)
    return createAction(CART_ACTION_TYPES.SET_CART_ITEMS,newCartItems)
}