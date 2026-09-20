import mongoose from 'mongoose'

const orderSchema = new mongoose.Schema({
  userId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
  email: { type: String, required: true, lowercase: true, trim: true },
  items: { type: [mongoose.Schema.Types.Mixed], required: true, validate: (items) => items.length > 0 },
  shippingAddress: { type: mongoose.Schema.Types.Mixed, default: {} },
  status: { type: String, enum: ['pending', 'processing', 'shipped', 'delivered', 'cancelled'], default: 'pending' },
}, { timestamps: { createdAt: 'createdAt', updatedAt: 'updatedAt' } })

export const Order = mongoose.models.Order || mongoose.model('Order', orderSchema)
