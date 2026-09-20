import { Router } from 'express'
import { createOrder, listOrders, updateOrderStatus } from '../controllers/orderController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/adminMiddleware.js'

const router = Router()
router.use(requireAuth)
router.get('/', listOrders)
router.post('/', createOrder)
router.patch('/:id/status', requireAdmin, updateOrderStatus)
export default router
