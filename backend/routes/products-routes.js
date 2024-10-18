import express from 'express'
import auth from '../middlewares/auth.js'
import { createProduct } from '../controllers/products-controller.js'
import fileUpload from '../middlewares/file-upload.js';

const router = express.Router();

router.post('/new', auth, fileUpload.single('image'), createProduct)

export default router