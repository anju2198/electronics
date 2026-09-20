import { Router } from 'express'
import { createProduct, deleteProduct, getProduct, listProducts, updateProduct } from '../controllers/productController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/adminMiddleware.js'

const router = Router()
router.get('/', listProducts)
router.get('/:id', getProduct)
router.post('/', requireAuth, requireAdmin, createProduct)
router.patch('/:id', requireAuth, requireAdmin, updateProduct)
router.delete('/:id', requireAuth, requireAdmin, deleteProduct)
export default router
