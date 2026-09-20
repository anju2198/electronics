import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'
import ProductCard from '../components/ProductCard.jsx'
import Loader from '../components/Loader.jsx'
import { api } from '../services/api.js'

const categories = ['All products', 'Audio', 'Computing', 'Wearables']
export default function Products() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [products, setProducts] = useState([])
  const [category, setCategory] = useState(searchParams.get('category') || 'All products')
  const [search, setSearch] = useState(searchParams.get('search') || '')
  const [loading, setLoading] = useState(true)
  useEffect(() => {
    setLoading(true)
    api.getProducts(category === 'All products' ? '' : category, search).then(setProducts).catch(() => setProducts([])).finally(() => setLoading(false))
  }, [category, search])
  const updateCategory = (value) => { setCategory(value); setSearchParams(value === 'All products' ? {} : { category: value }) }
  return <section className="catalog">
    <div className="section-heading"><div>
      <p className="eyebrow">Find your next favorite</p>
      <h2>Explore products</h2>
    </div>
      <p className="catalog-note">Modern essentials and little upgrades that make a difference.</p>
    </div>
    <div className="catalog-tools">
      <div className="category-tabs">{categories.map((item) =>
        <button className={category === item ? 'active' : ''} key={item} onClick={() => updateCategory(item)}>{item}</button>)}
      </div>
      <label className="product-search">Search products<input value={search} onChange={(event) => { setSearch(event.target.value); setSearchParams(event.target.value ? { search: event.target.value } : {}) }} placeholder="Try laptop, Audio, or watch" /></label>
    </div>{loading ? <Loader /> : products.length ? <div className="product-grid">{products.map((product) => <ProductCard key={product._id || product.id} product={product} />)}</div> : <p className="cart-empty">No products found. Try another search.</p>}</section>
}
