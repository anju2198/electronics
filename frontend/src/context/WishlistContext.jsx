import { createContext, useContext, useState } from 'react'

const WishlistContext = createContext(null)

function readWishlist() {
  try {
    const saved = JSON.parse(localStorage.getItem('volt_wishlist') || '[]')
    return Array.isArray(saved) ? saved : []
  } catch {
    return []
  }
}

export function WishlistProvider({ children }) {
  const [items, setItems] = useState(readWishlist)

  const updateItems = (nextItems) => {
    setItems(nextItems)
    localStorage.setItem('volt_wishlist', JSON.stringify(nextItems))
  }

  const toggleItem = (product) => {
    const id = product._id || product.id
    const exists = items.some((item) => (item._id || item.id) === id)
    updateItems(exists ? items.filter((item) => (item._id || item.id) !== id) : [...items, product])
  }

  const removeItem = (id) => updateItems(items.filter((item) => (item._id || item.id) !== id))
  const hasItem = (id) => items.some((item) => (item._id || item.id) === id)

  return <WishlistContext.Provider value={{ items, toggleItem, removeItem, hasItem }}>
    {children}
  </WishlistContext.Provider>
}

export function useWishlist() {
  const context = useContext(WishlistContext)
  if (!context) throw new Error('useWishlist must be used within WishlistProvider')
  return context
}
