import React from 'react'
import { Typography, Button, Card, CardActions, CardContent, CardMedia } from '@material-ui/core'

import { useContext } from 'react'
import useStyles from './styles'
import { LineItem } from '@chec/commerce.js/types/line-item'
import { Context } from '../../../ContextProvider'

type Props = {
  item: LineItem
}

const CartItem = ({ item }: Props) => {
  const { handleUpdateCartQty, handleRemoveFromCart } = useContext(Context)

  const classes = useStyles()

  return (
    <Card className='cart-item'>
      <CardMedia image={item.media.source} className={classes.media} />
      <CardContent className={classes.cardContent}>
        <Typography variant='h4'>{item.name}</Typography>
        <Typography variant='h5'>{item.line_total.formatted_with_symbol}</Typography>
      </CardContent>
      <CardActions>
        <div className={classes.buttons}>
          <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity - 1)}>
            -
          </Button>
          <Typography>&nbsp;{item.quantity}&nbsp;</Typography>
          <Button type='button' size='small' onClick={() => handleUpdateCartQty(item.id, item.quantity + 1)}>
            +
          </Button>
        </div>
        <Button
          variant='contained'
          type='button'
          color='secondary'
          onClick={() => handleRemoveFromCart(item.id)}
        >
          删除
        </Button>
      </CardActions>
    </Card>
  )
}

export default React.memo(CartItem)
