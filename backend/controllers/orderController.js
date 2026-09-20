import mongoose from 'mongoose'
import { Order } from '../models/Order.js'

export async function listOrders(request, response) {
  if (Order.db.readyState !== 1) return response.json([])
  const filter = request.user.role === 'admin' ? {} : { userId: request.user.id }
  response.json(await Order.find(filter).sort({ createdAt: -1 }).lean())
}

export async function createOrder(request, response) {
  const { items, email, shippingAddress = {} } = request.body
  if (!Array.isArray(items) || !items.length || !email) return response.status(400).json({ error: 'items and email are required' })
  if (Order.db.readyState !== 1) return response.status(503).json({ error: 'MongoDB is not connected' })
  const order = await Order.create({ userId: request.user.id, email, items, shippingAddress, status: 'pending' })
  response.status(201).json(order)
}

export async function updateOrderStatus(request, response) {
  if (Order.db.readyState !== 1 || !mongoose.isObjectIdOrHexString(request.params.id)) return response.status(400).json({ error: 'Valid order id is required' })
  const result = await Order.findByIdAndUpdate(request.params.id, { status: request.body.status }, { new: true, runValidators: true }).lean()
  if (!result) return response.status(404).json({ error: 'Order not found' })
  response.json(result)
}
