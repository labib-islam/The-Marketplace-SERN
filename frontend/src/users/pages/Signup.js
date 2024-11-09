import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./auth.scss"

const Signup = () => {
  const [inputs, setInputs] = useState({
    username: "",
    email: "",
    password: "",
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const res = await axios.post('/auth/register', inputs)
      navigate('/login')
    } catch (err) {
      setError(err.response.data)
    }
  }

  console.log(inputs)

  return (
    <div className='auth'>
      <h1>SIGNUP</h1>
      <form>
        <input type='email' name="email" placeholder='email' onChange={handleChange}/>
        <input type='text' name="username" placeholder='username' onChange={handleChange}/>
        <input type='password' name="password" placeholder='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>SIGNUP</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      <span>
        Already a member? <Link to="/login">LOGIN</Link>
      </span>
    </div>
  )
}

export default Signup