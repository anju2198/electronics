import { createContext, useContext, useMemo, useState } from 'react'

const CartContext = createContext(null)

export function CartProvider({ children }) {
  const [items, setItems] = useState([])
  const addItem = (product) => setItems((current) => {
    const productId = product._id || product.id
    const existing = current.find((item) => (item._id || item.id) === productId)
    if (existing) return current.map((item) => (item._id || item.id) === productId ? { ...item, quantity: (item.quantity || 1) + 1 } : item)
    return [...current, { ...product, quantity: 1 }]
  })
  const removeItem = (id) => setItems((current) => current.filter((item) => item._id !== id && item.id !== id))
  const clearCart = () => setItems([])
  const total = useMemo(() => items.reduce((sum, item) => sum + Number(item.price || 0) * (item.quantity || 1), 0), [items])
  const itemCount = useMemo(() => items.reduce((sum, item) => sum + (item.quantity || 1), 0), [items])
  return <CartContext.Provider value={{ items, addItem, removeItem, clearCart, total, itemCount }}>{children}</CartContext.Provider>
}

export function useCart() {
  const context = useContext(CartContext)
  if (!context) throw new Error('useCart must be used within CartProvider')
  return context
}
