import express from 'express'
import usersRoutes from './routes/users-routes.js'
import authRoutes from './routes/auth-routes.js'
import cookieParser from 'cookie-parser'

const app = express()

// Middleware
app.use(express.json())
app.use(cookieParser())

app.use('/api/auth', authRoutes)
app.use('/api/users', usersRoutes)

app.listen(3000, () => {
  console.log('Connected!')
})