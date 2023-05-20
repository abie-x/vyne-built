import express from 'express'
import {getMenuList} from '../controllers/restaurentController.js'

const router = express.Router()

router.get('/:restaurantId', getMenuList)

export default router