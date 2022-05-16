import { createSelector } from "reselect"

//getting cart slice from state
const selectCartReducer  = (state) => state.cart

export const selectCartItems = createSelector(
        //input
        [selectCartReducer],
        //output
        (cart) => cart.cartItems
) 

export const selectIsCartOpen = createSelector(
        [selectCartReducer],
        (cart) => cart.isCartOpen
)

export const selectCartCount = createSelector(
        [selectCartItems],
        (cartItems) => cartItems.reduce((total, cartItem) =>
        total + cartItem.quantity, 0 )  
)
export const selectCartTotal = createSelector(
        [selectCartItems],
        (cartItems) => cartItems.reduce((total, cartItem) =>
        total + cartItem.quantity*cartItem.price, 0 )  
)

// //generate newCartTotal
// const newCartTotal = cartItems.reduce((total, cartItem) =>
// total + cartItem.quantity*cartItem.price, 0 )

//         //generate newCartCount
// const newCartCount = CartItems.reduce((total, cartItem) =>
// total + cartItem.quantity, 0 )