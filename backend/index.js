import express from 'express'
import usersRoutes from './routes/users-routes.js'
import authRoutes from './routes/auth-routes.js'
import productsRoutes from './routes/products-routes.js'
import cartsRoutes from './routes/carts-routes.js'
import ordersRoutes from './routes/orders-routes.js'
import cookieParser from 'cookie-parser'
import dotenv from 'dotenv'

const app = express()

dotenv.config()

// Middleware
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)
app.use('/api/products', productsRoutes)
app.use('/api/carts', cartsRoutes)
app.use('/api/orders', ordersRoutes)


app.listen(process.env.PORT, () => {
  console.log('Connected!')
})