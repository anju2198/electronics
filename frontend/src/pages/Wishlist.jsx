import { Link } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import { useWishlist } from '../context/WishlistContext.jsx'

export default function Wishlist() {
  const { items } = useWishlist()
  return <section className="catalog"><p className="eyebrow">Your saved edit</p><h2>Wishlist</h2>{items.length ? <div className="product-grid">{items.map((product) => <ProductCard key={product._id || product.id} product={product} />)}</div> : <div className="wishlist-empty"><strong>Your wishlist is empty.</strong><p>Save products you want to revisit later.</p><Link className="primary-button" to="/products">Discover products <span>↗</span></Link></div>}</section>
}
