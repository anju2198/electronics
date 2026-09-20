import mongoose from 'mongoose'

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    enum: ['customer', 'admin'],
    default: 'customer'
  },
}, {
  timestamps:
  {
    createdAt: 'createdAt',
    updatedAt: 'updatedAt'
  }
})

export const User = mongoose.models.User || mongoose.model('User', userSchema)

export function serializeUser(user) {
  if (!user) return null
  return { id: String(user._id), name: user.name, email: user.email, role: user.role, createdAt: user.createdAt }
}
