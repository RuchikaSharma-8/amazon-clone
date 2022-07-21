import React from 'react';
import './Payment.css';
import axios from './axios';
import CheckoutProduct from './CheckoutProduct';
import { useState, useEffect } from 'react';
import { useStateValue } from "./StateProvider";
import { Link, useHistory } from "react-router-dom";
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import CurrencyFormat from "react-currency-format";
import { getCartTotal } from "./reducer";
import { db } from "./firebase";

function Payment() {
    const [{cart, user} , dispatch]= useStateValue();
    const history = useHistory();

    const stripe = useStripe();
    const elements = useElements();

    const [succeeded, setSucceeded] = useState(false);
    const [processing ,setProcessing ] = useState("");
    const [error, setError ] = useState(null);
    const [disabled, setDisabled] = useState(true);
    const [clientSecret, setClientSecret] = useState(true);

    useEffect(() => {
        // Generate the special stripe secret which allows us to charge a customer
        const getClientSecret = async () => {
            const response = await axios({
                method: 'post', 
                // Stripe expects the total in a currencies subunits i.e. 100 for Rupees 
                url: `/payments/create?total=${getCartTotal(cart) * 100}`
            });
            setClientSecret(response.data.clientSecret)
        }
        getClientSecret();
    }, [cart])

    const handleSubmit = async (event) => {
        event.preventDefault();
        setProcessing(true);

        const payload = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: elements.getElement(CardElement)
            }
        }).then(({ paymentIntent }) => {
            //paymentIntent is like payment confirmation

            db
              .collection('users')
              .doc(user?.uid)
              .collection('orders')
              .doc(paymentIntent.id)
              .set({
                  cart: cart,
                  amount: paymentIntent.amount,
                  created: paymentIntent.created
              })

            setSucceeded(true);
            setError(null);
            setProcessing(false);

            dispatch({
                type: 'EMPTY_CART'
            })

            history.push('/orders');
        })
    }

    const handleChange = event => {
        setDisabled( event.empty );
        setError( event.error ? event.error.message : "" )
    }

  return (
    <div className="payment">
        <div className="payment-container">
        <h1> Checkout (<Link to="/checkout">{ cart.length } items</Link>) </h1>

            { /* Payment Section 1 - Delivery Address */ }
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Delivery Address</h3>
                </div>
                <div className="payment-address">
                    <p>{ user?.email }</p>
                    <p>Your address here</p>
                </div>
            </div>

            { /* Payment Section 2 - Review Items */ }
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Review items and delivery</h3>
                </div>
                <div className="payment-items">
                    {cart.map( item => (
                        <CheckoutProduct
                            id={item.id}
                            title={item.title}
                            image={item.image}
                            price={item.price}
                            rating={item.rating}
                        />
                    ))}
                </div>
            </div>

            { /* Payment Section 3 - Payment Method */ }
            <div className="payment-section">
                <div className="payment-title">
                    <h3>Payment Method</h3>
                </div>
                <div className="payment-details">
                    <form onSubmit={ handleSubmit }>
                        <CardElement onChange={ handleChange }/>
                        <div className="payment-price-container">
                            <CurrencyFormat
                                renderText={( value ) => (
                                    <h3>Order Total: {value}</h3>
                                )}
                                decimalScale={2}
                                value={getCartTotal(cart)}
                                displayType={"text"}
                                thousandSeparator={true}
                                prefix={"₹"}
                            />
                            <button disabled={ processing || disabled || succeeded }>
                                <span>{ processing ? <p>Processing</p> : "Buy Now" }</span>
                            </button>
                        </div>
                        { /* To handle errors */ }
                        {error && <div>{ error }</div>} 
                    </form> 
                </div>
            </div>
        </div>
    </div>
  )
}

export default Payment