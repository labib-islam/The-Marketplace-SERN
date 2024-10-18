import jwt from 'jsonwebtoken'

const auth = (req, res, next) => {
  try {
    const token = req.cookies.access_token
    if (!token) return res.status(401).json('Unauthorized')
    const verifiedToken = jwt.verify(token, process.env.JWT_KEY)
    req.uid = verifiedToken.uid
    next()
  } catch (err) {
    console.log(err)
    res.status(401).json('Unauthorized')
  }
}

export default auth