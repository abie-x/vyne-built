import express from 'express'
import {login, verifyOtp} from '../controllers/userController.js'

const router = express.Router()

router.post('/login', login)
router.post('/verify', verifyOtp)

export default router