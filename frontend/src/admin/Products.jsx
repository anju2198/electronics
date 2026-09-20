import { useEffect, useState } from 'react'
import ProductCard from '../components/ProductCard.jsx'
import { api } from '../services/api.js'

export default function AdminProducts() {
    const emptyProduct = { name: '', category: '', price: '', stock: '', rating: '', reviews: '', badge: '', image: '' }
    const [products, setProducts] = useState([])
    const [form, setForm] = useState(emptyProduct)
    const [editingId, setEditingId] = useState(null)
    const [error, setError] = useState('')
    const [saving, setSaving] = useState(false)

    const loadProducts = () => api.getProducts().then(setProducts).catch(() => setProducts([]))
    useEffect(() => { loadProducts() }, [])

    const handleChange = (event) => {
        setForm((current) => ({ ...current, [event.target.name]: event.target.value }))
    }

    const handleSubmit = async (event) => {
        event.preventDefault()
        setError('')
        setSaving(true)
        try {
            const payload = {
                ...form,
                price: Number(form.price),
                stock: Number(form.stock || 0),
                rating: Number(form.rating || 0),
                reviews: Number(form.reviews || 0)
            }
            if (editingId) await api.updateProduct(editingId, payload)
            else await api.createProduct(payload)
            setForm(emptyProduct)
            setEditingId(null)
            await loadProducts()
        } catch (requestError) {
            setError(requestError.message)
        } finally {
            setSaving(false)
        }
    }

    const editProduct = (product) => {
        setEditingId(product._id || product.id)
        setForm({ ...emptyProduct, ...product })
        window.scrollTo({ top: 0, behavior: 'smooth' })
    }

    const deleteProduct = async (product) => {
        if (!window.confirm(`Delete ${product.name}?`)) return
        setError('')
        try {
            await api.deleteProduct(product._id || product.id)
            await loadProducts()
        } catch (requestError) {
            setError(requestError.message)
        }
    }

    const cancelEdit = () => {
        setEditingId(null)
        setForm(emptyProduct)
    }

    return <section className="catalog">
        <p className="eyebrow">Admin inventory</p>
        <h2>Products</h2>
        <form className="admin-product-form" onSubmit={handleSubmit}>
            <h3>{editingId ? 'Edit product' : 'Add product'}</h3>
            <div className="admin-product-fields">
                <label>Name
                    <input name="name" value={form.name} onChange={handleChange} placeholder="iPhone 18" required />
                </label>
                <label>Category
                    <input name="category" value={form.category} onChange={handleChange} placeholder="Phones" required />
                </label>
                <label>Price
                    <input name="price" type="number" min="0" step="0.01" value={form.price} onChange={handleChange} placeholder="999" required />
                </label>
                <label>Stock
                    <input name="stock" type="number" min="0" value={form.stock} onChange={handleChange} placeholder="10" />
                </label>
                <label>Rating
                    <input name="rating" type="number" min="0" max="5" step="0.1" value={form.rating} onChange={handleChange} placeholder="4.8" />
                </label>
                <label>Reviews
                    <input name="reviews" type="number" min="0" value={form.reviews} onChange={handleChange} placeholder="0" />
                </label>
                <label>Badge
                    <input name="badge" value={form.badge} onChange={handleChange} placeholder="New arrival" />
                </label>
                <label>Image URL
                    <input name="image" type="url" value={form.image} onChange={handleChange} placeholder="https://..." />
                </label>
            </div>
            {error && <p className="error">{error}</p>}
            <div className="admin-form-actions"><button className="primary-button" type="submit" disabled={saving}>{saving ? 'Saving...' : editingId ? 'Save changes' : 'Add product'}</button>{editingId && <button className="secondary-button" type="button" onClick={cancelEdit}>Cancel</button>}</div>
        </form>
        <div className="product-grid">{products.map((product) => <div className="admin-product-card" key={product._id || product.id}><ProductCard product={product} /><div className="admin-card-actions"><button className="secondary-button" onClick={() => editProduct(product)}>Edit</button><button className="danger-button" onClick={() => deleteProduct(product)}>Delete</button></div></div>)}
        </div>
    </section>
}
