
import { CardElement, useElements, useStripe } from '@stripe/react-stripe-js';
import './common.css';
import { useEffect, useState } from 'react';
import useAxiosSecure from '@/hooks/useAxiosSecure';
import useAuth from '@/hooks/useAuth';
import toast from 'react-hot-toast';
import { useNavigate } from 'react-router-dom';

const CheckoutForm = ({ price }) => {
    const { user, setIsSubscribe } = useAuth()
    const [clientSecret, setClientSecret] = useState("")
    const axiosSecure = useAxiosSecure()
    const navigate = useNavigate()

    useEffect(() => {
        paymentIntent()
    }, [price])

    const paymentIntent = async () => {
        try {
            const { data } = await axiosSecure.post(`create-payment-intent`, { email: user?.email, price: price })
            setClientSecret(data.clientSecret)
        } catch (error) {
            console.log(error)
        }
    }


    const stripe = useStripe();
    const elements = useElements();

    const handleSubmit = async (event) => {
        // Block native form submission.
        event.preventDefault();

        if (!stripe || !elements) {
            return;
        }

        const card = elements.getElement(CardElement);

        if (card == null) {
            return;
        }

        // Use your card Element with other Stripe.js APIs
        const { error, paymentMethod } = await stripe.createPaymentMethod({
            type: 'card',
            card,
        });

        if (error) {
            console.log('[error]', error);
        } else {
            console.log('[PaymentMethod]', paymentMethod);
        }

        // confirm payment
        const { paymentIntent } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: {
                card: card,
                billing_details: {
                    name: user?.displayNme,
                    email: user?.email,
                },
            },
        })
        if (paymentIntent.status === "succeeded") {
            // update user role normal user to premium user
            try {
                // Ensure price is defined
                if (!price) {
                    console.error("Price is not defined.");
                    return;
                }

                // Ensure user email is valid
                if (!user?.email) {
                    console.error("User email is not available.");
                    return;
                }

                console.log("Payment amount:", paymentIntent.amount);

                // API call to update user role
                const { data } = await axiosSecure.post("/update-user", { email: user?.email, price: paymentIntent.amount });
                console.log("Update user response:", data);
                setIsSubscribe(true)
                navigate("/")
                const { data:role } = await axiosSecure.get(`/users/role/${user?.email}`)
                console.log(role)
                toast.success(`Congrats, You have taken the ${paymentIntent.amount === 500 ? "Standard" : "Premium"} Subscription`)
            } catch (error) {
                console.error("Error updating user role:", error);
            }
        }
    };

    return (
        <form onSubmit={handleSubmit}>
            <CardElement
                options={{
                    style: {
                        base: {
                            fontSize: '16px',
                            color: '#424770',
                            '::placeholder': {
                                color: '#aab7c4',
                            },
                        },
                        invalid: {
                            color: '#9e2146',
                        },
                    },
                }}
            />
            <button
                type="submit" disabled={!stripe}
                className="w-full py-3 bg-gray-800 text-white rounded-md hover:bg-gray-700 transition duration-300"
            >
                Pay {price}$
            </button>
        </form>
    );
};

export default CheckoutForm