import React, { useContext } from 'react'
import { Container, Typography, Button, Grid } from '@material-ui/core'
import { Link } from 'react-router-dom'
import { Context } from '../../ContextProvider'

import CartItem from './CartItem/CartItem'
import useStyles from './styles'

const Cart = () => {
  const { cart, handleEmptyCart } = useContext(Context)
  const classes = useStyles()

  const renderEmptyCart = () => (
    <Typography variant='subtitle1'>
      You have no items in your shopping cart,
      <Link className={classes.link} to='/'>
        start adding some
      </Link>
      !
    </Typography>
  )

  const renderCart = () => (
    <>
      <Grid container spacing={3}>
        {cart.line_items.map(lineItem => (
          <Grid item xs={12} sm={4} key={lineItem.id}>
            <CartItem item={lineItem} />
          </Grid>
        ))}
      </Grid>
      <div className={classes.cardDetails}>
        <Typography variant='h4'>总价: {cart.subtotal.formatted_with_symbol}</Typography>
        <div>
          <Button
            className={classes.emptyButton}
            size='large'
            type='button'
            variant='contained'
            color='secondary'
            onClick={handleEmptyCart}
          >
            清空购物车
          </Button>
          <Button
            className={classes.checkoutButton}
            component={Link}
            to='/checkout'
            size='large'
            type='button'
            variant='contained'
            color='primary'
          >
            去结算
          </Button>
        </div>
      </div>
    </>
  )

  return (
    <>
      {!cart.line_items ? (
        'Loading...'
      ) : (
        <Container>
          <div className={classes.toolbar} />
          <Typography className={classes.title} variant='h3' gutterBottom>
            Your Shopping Cart
          </Typography>
          {!cart.line_items.length ? renderEmptyCart() : renderCart()}
        </Container>
      )}
    </>
  )
}

export default React.memo(Cart)
