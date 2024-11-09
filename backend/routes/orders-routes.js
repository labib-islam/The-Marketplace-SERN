import express from 'express'
import { createOrder } from '../controllers/orders-controller.js';
import auth from '../middlewares/auth.js';

const router = express.Router();

router.post('/', auth, createOrder)

export default router