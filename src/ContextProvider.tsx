import React from 'react'
import useCart from './hooks/useCart'
import { Cart } from '@chec/commerce.js/types/cart'

export type ContextType = {
  cart: Cart
  fetchCart: () => Promise<void>
  handleAddToCart: (productId: string, quantity: number) => Promise<void>
  handleUpdateCartQty: (lineItemId: string, quantity: number) => Promise<void>
  handleRemoveFromCart: (lineItemId: any) => Promise<void>
  handleEmptyCart: () => Promise<void>
  refreshCart: () => Promise<void>
}

const Context = React.createContext({} as ContextType)

const ContextProvider: React.FC = ({ children }) => {
  const context = useCart()

  return <Context.Provider value={context}>{children}</Context.Provider>
}

export { Context, ContextProvider }
