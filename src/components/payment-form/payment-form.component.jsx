import { CardElement, useStripe, useElements } from '@stripe/react-stripe-js'
import Button, {BUTTON_TYPE_CLASSES} from '../button/button.component'
import './payment-form.styles.scss'

const PaymentForm = () => {

    const stripe = useStripe()
    const elements = useElements()

    const paymentHandler = async (e) => {
        e.preventDefault()

        if(!stripe || !elements){
            return
        }

        //make fetch request to backend to create a payment intent. 
        //stripe uses this to confirm a payment is about to happen
        const response = await fetch('/.netlify/functions/create-payment-intent', {
            method: 'post',
            headers: {
                'Content-Type':'application/json',
                'Accept': 'application/json'
            },
            body: JSON.stringify({amount: 10000})
        }).then(res => res.json())
        // .then(text => console.log(text))


        console.log(response)

    }
    return(
        <>
        <div className='payment-form-container'>
            <form className='form-container' onSubmit={paymentHandler}>
                <h2>Credit Card Payment: </h2>
                <CardElement/>
                <Button buttonType={BUTTON_TYPE_CLASSES.inverted}>Pay now</Button>
            </form>
        </div>
        </>
    )
}

export default PaymentForm
