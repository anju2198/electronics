import mongoose from 'mongoose'
import { fallbackProducts, Product } from '../models/Product.js'

export async function listProducts(request, response) {
  if (Product.db.readyState !== 1) {
    return response.json(getFallbackProducts(request.query))
  }

  const filter = {}
  if (request.query.category) filter.category = { $regex: `^${escapeRegex(request.query.category.trim())}$`, $options: 'i' }
  if (request.query.search) {
    const search = request.query.search.trim()
    if (search) {
      const safeSearch = escapeRegex(search)
      filter.$or = [
        { name: { $regex: safeSearch, $options: 'i' } },
        { category: { $regex: safeSearch, $options: 'i' } },
        { description: { $regex: safeSearch, $options: 'i' } }
      ]
    }
  }

  const products = await Product.find(filter).sort({ createdAt: -1 }).lean()
  response.json(products.length ? products : getFallbackProducts(request.query))
}

function getFallbackProducts(query = {}) {
  const category = query.category?.trim().toLowerCase()
  const search = query.search?.trim().toLowerCase()
  return fallbackProducts.filter((product) =>
    (!category || product.category.toLowerCase() === category) &&
    (!search || `${product.name} ${product.category} ${product.description || ''}`.toLowerCase().includes(search)))
}

function escapeRegex(value) {
  return value.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')
}

export async function getProduct(request, response) {
  const fallbackProduct = fallbackProducts.find((product) => product.id === request.params.id)
  if (Product.db.readyState !== 1)
    return response.json(fallbackProduct || null)

  if (!mongoose.isObjectIdOrHexString(request.params.id)) {
    if (fallbackProduct) return response.json(fallbackProduct)
    return response.status(404).json({ error: 'Product not found' })
  }
  
  const product = await Product.findById(request.params.id).lean()
  if (!product) return response.status(404).json({ error: 'Product not found' })
  response.json(product)
}

export async function createProduct(request, response) {
  const { name, category, price, stock = 0, description = '', image = '' } = request.body

  if (!name || !category || price == null)
    return response.status(400).json({ error: 'name, category and price are required' })

  if (Product.db.readyState !== 1)
    return response.status(503).json({ error: 'MongoDB is not connected' })

  const product = {
    name,
    category,
    price: Number(price),
    stock: Number(stock),
    description,
    image,
    createdAt: new Date()
  }
  response.status(201).json(await Product.create(product))
}

export async function deleteProduct(request, response) {
  if (Product.db.readyState !== 1 || !mongoose.isObjectIdOrHexString(request.params.id)) return response.status(400).json({ error: 'Valid product id is required' })
  const result = await Product.findByIdAndDelete(request.params.id)
  if (!result) return response.status(404).json({ error: 'Product not found' })
  response.status(204).end()
}

export async function updateProduct(request, response) {
  if (Product.db.readyState !== 1 || !mongoose.isObjectIdOrHexString(request.params.id))
    return response.status(400).json({ error: 'Valid product id is required' })

  const { name, category, price, stock = 0, description = '', image = '', rating = 0, reviews = 0, badge = '' } = request.body
  if (!name || !category || price == null)
    return response.status(400).json({ error: 'name, category and price are required' })

  const product = await Product.findByIdAndUpdate(request.params.id,
    { name, category, price: Number(price), stock: Number(stock), description, image, rating: Number(rating), reviews: Number(reviews), badge },
    { new: true, runValidators: true }).lean()
  if (!product) return response.status(404).json({ error: 'Product not found' })
  response.json(product)
}
