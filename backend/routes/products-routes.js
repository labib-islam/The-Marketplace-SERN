import express from 'express'
import auth from '../middlewares/auth.js'
import { createProduct, deleteProduct, getProduct, getProducts, updateProduct } from '../controllers/products-controller.js'
import fileUpload from '../middlewares/file-upload.js';

const router = express.Router();

router.post('/new', auth, fileUpload.single('image'), createProduct)

router.get('/', getProducts)
router.get('/:pid', getProduct)
router.put('/:pid', auth, updateProduct)
router.delete('/:pid', auth, deleteProduct)

export default router