import mongoose from 'mongoose'

const productSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  category: { type: String, required: true, trim: true },
  price: { type: Number, required: true, min: 0 },
  stock: { type: Number, default: 0, min: 0 },
  description: { type: String, default: '' },
  image: { type: String, default: '' },
  rating: { type: Number, default: 0 },
  reviews: { type: Number, default: 0 },
  badge: { type: String, default: '' },
},
  { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

productSchema.index({ category: 1, createdAt: -1 })

export const Product = mongoose.models.Product || mongoose.model('Product', productSchema)

export const fallbackProducts = [
  {
    id: 'demo-1',
    name: 'Studio Pro Max',
    category: 'Audio',
    price: 349,
    stock: 12,
    rating: 4.9,
    reviews: 128,
    badge: 'Best seller',
    image: 'https://images.unsplash.com/photo-1546435770-a3e426bf472b?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'demo-2',
    name: 'AeroBook 14',
    category: 'Computing',
    price: 1299,
    stock: 7,
    rating: 4.8,
    reviews: 84,
    badge: 'New arrival',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'demo-3',
    name: 'Pixel Watch S2',
    category: 'Wearables',
    price: 279,
    stock: 18,
    rating: 4.7,
    reviews: 61,
    badge: '20% off',
    image: 'https://images.unsplash.com/photo-1544117519-31a4b719223d?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'demo-4',
    name: 'VoltBook Air Laptop',
    category: 'Computing',
    price: 999,
    stock: 9,
    rating: 4.8,
    reviews: 42,
    badge: 'Work anywhere',
    image: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'demo-5',
    name: 'Pocket Audio Mini',
    category: 'Audio',
    price: 129,
    stock: 24,
    rating: 4.6,
    reviews: 37,
    badge: 'New arrival',
    image: 'https://images.unsplash.com/photo-1505740420928-5e560c06d30e?auto=format&fit=crop&w=900&q=85'
  },
  {
    id: 'demo-6',
    name: 'Pulse Smart Watch',
    category: 'Wearables',
    price: 229,
    stock: 15,
    rating: 4.7,
    reviews: 29,
    badge: 'Everyday essential',
    image: 'https://images.unsplash.com/photo-1523275335684-37898b6baf30?auto=format&fit=crop&w=900&q=85'
  },
]
