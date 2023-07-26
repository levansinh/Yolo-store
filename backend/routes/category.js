import express from 'express'

import { categoryController } from '../controllers/categoryController.js'
import {
    verifyTokenWithAdmin
  } from "../middlewares/verifyToken.js";

const router = express.Router()

router.delete('/:id',verifyTokenWithAdmin,categoryController.delete)
router.put('/edit/:id',verifyTokenWithAdmin,categoryController.update)
router.post('/',verifyTokenWithAdmin,categoryController.create)

router.get('/:id',categoryController.getOne)
router.get('/',categoryController.getAll)

export default router