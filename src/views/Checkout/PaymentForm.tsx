import React from 'react'
import { Typography, Button, Divider } from '@material-ui/core'
import { Elements, CardElement, ElementsConsumer } from '@stripe/react-stripe-js'
import { loadStripe, Stripe, StripeElements } from '@stripe/stripe-js'
import Review from './Review'
import { CheckoutToken } from '@chec/commerce.js/types/checkout-token'

const stripePromise = loadStripe(process.env.REACT_APP_STRIPE_PUBLIC_KEY as string)

type Props = {
  checkoutToken: CheckoutToken
  nextStep: () => void
  backStep: () => void
}

const PaymentForm = ({ checkoutToken, nextStep, backStep }: Props) => {
  const handleSubmit = async (
    event: React.FormEvent<HTMLFormElement>,
    elements: StripeElements | null,
    stripe: Stripe | null
  ) => {
    event.preventDefault()

    if (!stripe || !elements) return

    const cardElement = elements.getElement(CardElement)

    const { error } = await stripe.createPaymentMethod({
      type: 'card',
      card: cardElement as any
    })

    if (error) {
      console.log('[error]', error)
    } else {
      nextStep()
    }
  }

  return (
    <>
      <Review checkoutToken={checkoutToken} />
      <Divider />
      <Typography variant='h6' gutterBottom style={{ margin: '20px 0' }}>
        Payment method
      </Typography>
      <Elements stripe={stripePromise}>
        <ElementsConsumer>
          {({ elements, stripe }) => (
            <form onSubmit={e => handleSubmit(e, elements, stripe)}>
              <CardElement />
              <br /> <br />
              <div style={{ display: 'flex', justifyContent: 'space-between' }}>
                <Button variant='outlined' onClick={backStep}>
                  Back
                </Button>
                <Button type='submit' variant='contained' disabled={!stripe} color='primary'>
                  Pay {checkoutToken.live.subtotal.formatted_with_symbol}
                </Button>
              </div>
            </form>
          )}
        </ElementsConsumer>
      </Elements>
    </>
  )
}

export default PaymentForm
