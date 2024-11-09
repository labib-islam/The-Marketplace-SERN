import React, { useContext, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

import "./auth.scss"
import { AuthContext } from '../../shared/context/authContext'

const Login = () => {
  const [inputs, setInputs] = useState({
    username: "",
    password: "",
  })

  const [error, setError] = useState(null)

  const navigate = useNavigate();

  const {currentUser, login} = useContext(AuthContext);

  console.log(currentUser)

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      setError(null)
      await login(inputs)
      navigate("/")
    } catch (err) {
      setError(err.response.data)
    }
  }

  return (
    <div className='auth'>
      <h1>LOGIN</h1>
      <form>
        <input type='text' name="username" placeholder='username' onChange={handleChange}/>
        <input type='password' name="password" placeholder='password' onChange={handleChange}/>
        <button onClick={handleSubmit}>LOGIN</button>
      </form>
      {error && <p className='error-message'>{error}</p>}
      <span>
        Not a member? <Link to="/signup">SIGNUP</Link>
      </span>
    </div>
  )
}

export default Login