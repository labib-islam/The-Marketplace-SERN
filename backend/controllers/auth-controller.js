import { db } from "../database/db.js"
import bcrypt from 'bcrypt'
import jwt from 'jsonwebtoken'

export const register = (req, res) => {
  // Check existing user
  const q = "SELECT * FROM users WHERE email = ? OR username = ?"

  db.query(q, [req.body.email, req.body.username], (err, data) => {
    if (err) return res.json(err)
    if (data.length) return res.status(409).json('User already exists!')

    // Hash password and create user
    bcrypt.hash(req.body.password, 10, (err, hash) => {
      if (err) return res.json(err)

      const q = "INSERT INTO users(`username`, `email`, `password`) VALUES (?)"
      const values = [
        req.body.username,
        req.body.email,
        hash,
      ]

      db.query(q, [values], (err, data) => {
        if (err) return res.json(err)
        return res.status(200).json('User has been created.');
      })
    });
  })

}

export const login = (req, res) => {

  // Check user
  const q = "SELECT * FROM users WHERE username = ?"

  db.query(q, [req.body.username], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json('User not found!')

    // Check password
    bcrypt.compare(req.body.password, data[0].password, (err, result) => {
      if (err) return res.json(err)
      if (!result) return res.status(400).json('Wrong username or password.');

      const token = jwt.sign({ uid: data[0].uid }, process.env.JWT_KEY)
      const { password, ...other } = data[0]
  
      res.cookie('access_token', token, {
        httpOnly: true
      }).status(200).json(other)
    })
  })
}

export const logout = (req, res) => {
  res.clearCookie('access_token', {
    sameSite: 'none',
    secure: true
  }).status(200).json('User has been logged out!')
}