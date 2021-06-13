import React, { useState, useEffect, useContext } from 'react'
import { CssBaseline, Paper, Stepper, Step, StepLabel, Typography } from '@material-ui/core'
import { useHistory } from 'react-router-dom'

import { commerce } from '../../utils/commerce'
import AddressForm from './AddressForm'
import PaymentForm from './PaymentForm'
import useStyles from './styles'
import { Context } from '../../ContextProvider'

import { CheckoutToken } from '@chec/commerce.js/types/checkout-token'
import { useCallback } from 'react'

const steps = ['填写联系人信息', '付款详情']

const Checkout = () => {
  const { cart } = useContext(Context)

  const [checkoutToken, setCheckoutToken] = useState({} as CheckoutToken)
  const [activeStep, setActiveStep] = useState(0)
  const classes = useStyles()
  const history = useHistory()

  const nextStep = useCallback(() => setActiveStep(prevActiveStep => prevActiveStep + 1), [])
  const backStep = useCallback(() => setActiveStep(prevActiveStep => prevActiveStep - 1), [])

  useEffect(() => {
    if (cart.id) {
      const generateToken = async () => {
        try {
          const token = await commerce.checkout.generateToken(cart.id, { type: 'cart' })
          setCheckoutToken(token)
        } catch {
          if (activeStep !== steps.length) history.push('/')
        }
      }

      generateToken()
    }
  }, [cart, history])

  const Form = () =>
    activeStep === 0 ? (
      <AddressForm nextStep={nextStep} />
    ) : (
      <PaymentForm checkoutToken={checkoutToken} nextStep={nextStep} backStep={backStep} />
    )

  return (
    <>
      <CssBaseline />
      <div className={classes.toolbar} />
      <main className={classes.layout}>
        <Paper className={classes.paper}>
          <Typography variant='h4' align='center'>
            {activeStep === 0 ? '信息确认' : '结算'}
          </Typography>
          <Stepper activeStep={activeStep} className={classes.stepper}>
            {steps.map(label => (
              <Step key={label}>
                <StepLabel>{label}</StepLabel>
              </Step>
            ))}
          </Stepper>
          <Form />
        </Paper>
      </main>
    </>
  )
}

export default Checkout
