import { Router } from 'express'
import { listUsers } from '../controllers/userController.js'
import { requireAuth } from '../middleware/authMiddleware.js'
import { requireAdmin } from '../middleware/adminMiddleware.js'

const router = Router()
router.use(requireAuth, requireAdmin)
router.get('/', listUsers)

export default router
