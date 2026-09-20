import { serializeUser, User } from '../models/User.js'

export async function listUsers(_request, response) {
  if (User.db.readyState !== 1)
    return response.json([])

  const users = await User.find({}, { password: 0 }).sort({ createdAt: -1 }).lean()
  response.json(users.map(serializeUser))
}
