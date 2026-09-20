import bcrypt from 'bcryptjs'
import jwt from 'jsonwebtoken'
import { serializeUser, User } from '../models/User.js'

const demoUsers = new Map()

function tokenFor(user) {
  return jwt.sign({ id: String(user._id), role: user.role },
    process.env.JWT_SECRET || 'development-secret',
    { expiresIn: '7d' })
}

export async function register(request, response) {
  const { name, email, password, role } = request.body || {}
  const normalizedEmail = email?.toLowerCase().trim()
  // console.log(role,"rollll...");
  
  // console.log(name, normalizedEmail,password, role, 'checking ');
  if (!name?.trim() || !normalizedEmail || !password || !role)
    
    return response.status(400).json({
      error: 'name, email and password are required'
    })
  const existingUser = User.db.readyState === 1 ? await User.findOne({ email: normalizedEmail }) : demoUsers.get(normalizedEmail)
  if (existingUser)
    return response.status(409).json({ error: 'Email is already registered' })

  const user = {
    name: name.trim(),
    email: normalizedEmail,
    password: await bcrypt.hash(password, 12),
    role: role, 
    createdAt: new Date()
  }
  if (User.db.readyState !== 1) {
    user._id = `demo-${demoUsers.size + 1}`
    demoUsers.set(normalizedEmail, user)
    return response.status(201).json({ user: serializeUser(user), token: tokenFor(user) })
  }
  const savedUser = await User.create(user)
  response.status(201).json({ user: serializeUser(savedUser), token: tokenFor(savedUser) })
}

export async function login(request, response) {
  const { email, password } = request.body || {}
  const user = User.db.readyState === 1 ?
    await User.findOne({ email: email?.toLowerCase().trim() }) : demoUsers.get(email?.toLowerCase().trim())
  if (!user || !(await bcrypt.compare(password || '', user.password)))
    return response.status(401).json(
      { error: 'Invalid email or password' }
    )
  response.json({ user: serializeUser(user), token: tokenFor(user) })
}

export async function me(request, response) {
  if (User.db.readyState !== 1) {
    const user = [...demoUsers.values()].find((candidate) => String(candidate._id) === request.user.id)
    return user ? response.json({ user: serializeUser(user) }) : response.status(404).json({ error: 'User not found' })
  }
  const user = await User.findById(request.user.id)
  response.json({ user: serializeUser(user) })
}
