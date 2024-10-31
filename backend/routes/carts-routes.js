import express from 'express'
import auth from '../middlewares/auth.js'
import { addToCart, deleteCart, getCart, updateProductCart } from '../controllers/carts-controller.js';

const router = express.Router();

router.post('/add/:pid', auth, addToCart)
router.put('/update/:pid', auth, updateProductCart)
router.delete('/delete', auth, deleteCart)
router.get('/', auth, getCart)

export default router