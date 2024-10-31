import { db } from "../database/db.js"

export const addToCart = (req, res) => {

  const q = "SELECT stock FROM products WHERE pid=?"
  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.json(err)
    if (data[0].stock < req.body.quantity) return res.status(403).json({
      message: 'Stock is limited.',
      data: data[0]
    })
  
    const q = "INSERT INTO carts(`uid`, `pid`, `quantity`) VALUES (?)"
    const values = [
      req.uid,
      req.params.pid,
      req.body.quantity
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json({
        message: 'Product added to cart.',
        data: data[0]
      });
    })
  })
}

export const updateProductCart = (req, res) => {

  const q = "SELECT stock FROM products WHERE pid=?"
  db.query(q, [req.params.pid], (err, data) => {
    if (err) return res.json(err)
    if (data[0].stock < req.body.quantity) return res.status(403).json({
      message: 'Cannot update. Stock is limited.',
      data: data[0]
    })

    const q = "UPDATE carts SET quantity=? WHERE pid=? and uid=?"
    const values = [
      req.body.quantity,
      req.params.pid,
      req.uid
    ]

    db.query(q, values, (err, data) => {
      if (err) return res.json(err)
      return res.status(200).json({
        message: 'Cart updated.',
        data: data[0]
      });
    })
  })
}

export const deleteCart = (req, res) => {

  const q = "DELETE FROM carts WHERE uid=?"

  db.query(q, [req.uid], (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json({
      message: 'Cart deleted.',
      data: data[0]
    });
  })
}

export const getCart = (req, res) => {

  const q = "SELECT * FROM products p, carts c WHERE p.pid=c.pid and c.uid=?"

  db.query(q, [req.uid], (err, data) => {
    if (err) return res.json(err)
    return res.status(200).json({
      message: 'Cart fetched.',
      data: data
    });
  })
}