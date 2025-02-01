import { db } from "../database/db.js"
import jwt from 'jsonwebtoken'

export const createProduct = (req, res) => {

  db.beginTransaction((err) => {
    if (err) return res.status(500).json({ message: "Failed to start transaction." });

    const q = "INSERT INTO products(`title`, `description`, `price`, `stock`, `uid`) VALUES (?)"
    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.stock,
      req.uid
    ]

    db.query(q, [values], (err, data) => {
      if (err) {
        return db.rollback(() => {
          console.error("Error inserting product:", err);
          res.status(500).json({ message: "Failed to insert product." });
        })
      }

      const productId = data.insertId;

      const imageValues = req.files.map(file => [
        productId, // product_id
        file.path   // image_url
      ]);

      const q = "INSERT INTO product_images(`pid`, `imageUrl`) VALUES ?"

      db.query(q, [imageValues], (err, data) => {
        if (err) {
          return db.rollback(() => {
            console.error("Error inserting images:", err);
            res.status(500).json({ message: "Failed to insert images." });
          });
        }

        db.commit((err) => {
          if (err) {
            return db.rollback(() => {
              console.error("Error committing transaction:", err);
              res.status(500).json({ message: "Failed to commit transaction." });
            });
          }
          return res.status(200).json({
            message: "Product has been created."
          });
        })
      })
    })
  })
}


export const getProducts = (req, res) => {
  const q = "SELECT * FROM products"

  db.query(q, (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json(data);
  })
}


export const getProduct = (req, res) => {
  const q = "SELECT * FROM products WHERE pid=?"

  
}


export const updateProduct = (req, res) => {
  const q = "SELECT * FROM products WHERE pid=?"

  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json('Product not found!')
    const product = data[0]
    if (product.uid !== req.uid) return res.status(401).json('You cannot update the product.')

    const q = "UPDATE products SET title=?, description=?, price=?, stock=? WHERE pid=?"

    const values = [
      req.body.title,
      req.body.description,
      req.body.price,
      req.body.stock,
      req.params.pid
    ]

    db.query(q, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json({
        message: 'Product has been updated.',
        data: data[0]
      });
    })
  })
}


export const deleteProduct = (req, res) => {
  const q = "SELECT * FROM products WHERE pid=?"

  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.json(err)
    if (data.length === 0) return res.status(404).json('Product not found!')
    const product = data[0]
    if (product.uid !== req.uid) return res.status(401).json('You cannot delete the product.')

    const q = "DELETE FROM products WHERE pid=?"

    db.query(q, [req.params.pid], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json('Product has been deleted.');
    })
  })
}