import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import { useState } from 'react'
import {useSelector} from 'react-redux'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import {selectCartTotal} from '../../store/cart/cart.selector'
import {selectCurrentUser} from '../../store/user/user.selector';

import './payment-form.styles.scss'

const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements()
    const amount = useSelector(selectCartTotal)
    const currentUser = useSelector(selectCurrentUser)
    const [isProcessingPayment, setIsProcessingPayment] = useState(false)
    
    
    const paymentHandler = async (e) => {
        e.preventDefault()


        if(!stripe || !elements){
            return
        }

        setIsProcessingPayment(true)
        //make fetch request to backend to create a payment intent. 
        //stripe uses this to confirm a payment is about to happen
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({amount: amount * 100})
        }).then(res => res.json())
        // .then(text => console.log(text))


        const {
            paymentIntent: {client_secret}
        } = response

        
        const paymentResult = await stripe.confirmCardPayment(client_secret, {
            payment_method: {
                card: elements.getElement(CardElement),
                billing_details: {
                    name: currentUser? currentUser.displayName : 'Guest',
                }
            }
        })

        setIsProcessingPayment(false)
        
        // console.log(paymentResult);

        if(paymentResult.error){
            alert(paymentResult.error.message)
        } else {
            if (paymentResult.paymentIntent.status === 'succeeded'){
                alert('Payment Successful')
            }
        }

    }
    return(
        <>
        <div className='payment-form-container'>
            <form className='form-container' onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <Button className="payment-button" isLoading={isProcessingPayment} buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </form>
        </div>
        </>
    )
}

export default PaymentForm



//client secret attaches an actual payment to the payment intent that was generated in the backend 