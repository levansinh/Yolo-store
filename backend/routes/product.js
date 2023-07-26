import express from 'express'

import { projectController } from '../controllers/productController.js'
import {
    verifyTokenWithAdmin
  } from "../middlewares/verifyToken.js";
const router = express.Router()

router.delete('/:id',verifyTokenWithAdmin,projectController.delete)
router.put('/edit/:id',verifyTokenWithAdmin,projectController.update)
router.post('/',verifyTokenWithAdmin,projectController.create)

router.get('/:slug',projectController.getBySlug)
router.get('/',projectController.getAll)

export default router