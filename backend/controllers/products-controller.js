import { db } from "../database/db.js"
import jwt from 'jsonwebtoken'

export const createProduct = (req, res) => {
  const q = "INSERT INTO products(`title`, `description`, `price`, `stock`, `image-url`, `uid`) VALUES (?)"
  const values = [
    req.body.title,
    req.body.description,
    req.body.price,
    req.body.stock,
    req.file.path,
    req.uid
  ]

  db.query(q, [values], (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json({ 
      message: 'Product has been created.', 
      data: data[0]
    });
  })
}