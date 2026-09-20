import 'dotenv/config'
import cors from 'cors'
import express from 'express'
import connectDB from './config/db.js'
import authRoutes from './routes/authRoutes.js'
import productRoutes from './routes/productRoutes.js'
import orderRoutes from './routes/orderRoutes.js'
import userRoutes from './routes/userRoutes.js'

const app = express()
const port = process.env.PORT || 5000;

app.use(cors())
app.use(express.json())


app.get('/', (req, res) => {
    res.send('Welcome to electronics API!');
});

app.get('/', async (_request, response) => {
  const connected = await connectDB()
  const database = { configured: Boolean(process.env.MONGODB_URI), connected }
  const healthy = connected || !database.configured
  response.status(healthy ? 200 : 503).
    json({
      status: healthy ?
        'ok' : 'degraded', database
    })
});

app.use('/api/auth', authRoutes)
app.use('/api/products', productRoutes)
app.use('/api/orders', orderRoutes)
app.use('/api/users', userRoutes)

app.use((error, _request, response, _next) => {
  console.error(error)
  response.status(500).json({ error: 'Internal server error' })
})

try {
  await connectDB()

} catch (error) {
  console.warn('MongoDB unavailable; using fallback product data:', error.message)
}

app.listen(port, () => console.log(`API running on http://localhost:${port}`))
