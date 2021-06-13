import { useEffect, useState, useCallback } from 'react'
import { Cart } from '@chec/commerce.js/types/cart'
import { commerce } from '../utils/commerce'

const useCart = () => {
  const [cart, setCart] = useState<Cart>({} as any)

  const fetchCart = useCallback(async () => {
    setCart(await commerce.cart.retrieve())
  }, [])

  useEffect(() => {
    fetchCart()
  }, [fetchCart])

  const handleAddToCart = useCallback(async (productId: string, quantity: number) => {
    const item = await commerce.cart.add(productId, quantity)
    setCart(item.cart)
  }, [])

  const handleUpdateCartQty = useCallback(async (lineItemId: string, quantity: number) => {
    const response = await commerce.cart.update(lineItemId, { quantity })
    setCart(response.cart)
  }, [])

  const handleRemoveFromCart = useCallback(async lineItemId => {
    const response = await commerce.cart.remove(lineItemId)

    setCart(response.cart)
  }, [])

  const handleEmptyCart = useCallback(async () => {
    const response = await commerce.cart.empty()
    setCart(response.cart)
  }, [])

  const refreshCart = useCallback(async () => {
    const newCart = await commerce.cart.refresh()
    setCart(newCart)
  }, [])

  return {
    cart,
    fetchCart,
    handleAddToCart,
    handleUpdateCartQty,
    handleRemoveFromCart,
    handleEmptyCart,
    refreshCart
  }
}

export default useCart
