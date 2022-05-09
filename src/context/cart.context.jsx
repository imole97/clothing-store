import { createContext, useReducer } from "react";
import { createAction } from "../utils/reducer/reducer.utils";

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

export const CartContext = createContext({
    isCartOpen: false,
    setIsCartOpen: () => {},
    cartItems: [],
    addItemToCart: () => {},
    removeItemFromCart: () => {},
    clearItemFromCart: () => {},
    cartCount: 0, 
    total: 0
})

const CART_ACTION_TYPE = {
    'SET_CART_ITEMS': 'SET_CART_ITEMS',
    'SET_IS_CART_OPEN': 'SET_IS_CART_OPEN'
}

const INITIAL_STATE = {
    isCartOpen: false,
    cartItems: [],
    cartCount: 0,
    total: 0
}

const cartReducer = (state, {type, payload}) => {

    switch (type){
        
        case CART_ACTION_TYPE.SET_CART_ITEMS:
            return{
                ...state,
                ...payload
            }
        case CART_ACTION_TYPE.SET_IS_CART_OPEN:
            return{
                ...state,
                isCartOpen: payload
            }
        default:
            throw new Error (`unhandled type of ${type} in cart reducer`)
    }

}






export const CartProvider  = ({children}) => {

    const [{cartItems, cartCount, isCartOpen, cartTotal}, dispatch] = useReducer( cartReducer, INITIAL_STATE )


    const updateCartItemsReducer = (newCartItems) => {
        //generate newCartTotal
        const newCartTotal = newCartItems.reduce((total, cartItem) =>
        total + cartItem.quantity*cartItem.price, 0 )

        //generate newCartCount
        const newCartCount = newCartItems.reduce((total, cartItem) =>
        total + cartItem.quantity, 0 )

        //dispatch new action with payload = {newCartItems, newCartCount, newCartTotal}
        dispatch(createAction(CART_ACTION_TYPE.SET_CART_ITEMS,{
                cartItems: newCartItems,
                cartTotal: newCartTotal,
                cartCount: newCartCount
            }))
        
    }


    // add item to cart function
    const addItemToCart = (productToAdd) => {
        const newCartItems = addCartItem(cartItems,productToAdd)
        updateCartItemsReducer(newCartItems)
    }

    //remove item from cart function
    const removeItemFromCart = (cartItemToRemove) => {
        const newCartItems = removeCartItem(cartItems,cartItemToRemove)
        updateCartItemsReducer(newCartItems)
    }

    //clear item from cart function
    const clearItemFromCart = (cartItemToClear) => {
        const newCartItems = clearCartItem(cartItems,cartItemToClear)
        updateCartItemsReducer(newCartItems)
    }

    const setIsCartOpen = (bool) => {
        dispatch(createAction(CART_ACTION_TYPE.SET_IS_CART_OPEN,bool))
    }


    const value  = {
        isCartOpen, 
        setIsCartOpen, 
        addItemToCart, 
        cartItems, 
        cartCount, 
        cartTotal,
        removeItemFromCart,
        clearItemFromCart,  
    }
    return(

        <CartContext.Provider value={value}>
            {children}
        </CartContext.Provider>
    )
}
