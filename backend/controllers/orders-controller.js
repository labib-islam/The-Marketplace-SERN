import { db } from "../database/db.js"

export const createOrder = (req, res) => {

  const q = "SELECT c.pid, c.quantity, p.price, c.quantity*p.price as total_price FROM products p, carts c WHERE p.pid = c.pid and c.uid=?"
  db.query(q, [req.uid], (err, data) => {
    if (err) return res.json(err)

    const product_data = data

    const amount = data.reduce((sum, item) => sum + item.total_price, 0);

    const q = "INSERT INTO orders (`amount`, `payment_method`, `phone_number`, `transaction_id`, `uid`) VALUES (?)"

    const values = [
      amount,
      req.body.payment_method,
      req.body.phone_number,
      req.body.transaction_id,
      req.uid
    ]

    db.query(q, [values], (err, data) => {
      if (err) return res.json(err)

      const q = "INSERT INTO purchase (`oid`, `uid`, `pid`, `quantity`, `unit_price`, `total_price`) VALUES ?"

      const data_values = product_data.map(item => [data.insertId, req.uid, item.pid, item.quantity, item.price, item.total_price]);

      // res.json(data_values)
      db.query(q, [data_values], (err, data) => {
        if (err) return res.json(err)

        return res.status(200).json({
          message: 'Order Placed.',
          data: data
        });
      });
    })
  })
}