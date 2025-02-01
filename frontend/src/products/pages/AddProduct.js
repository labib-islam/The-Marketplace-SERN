import React, { useState } from 'react'

import './AddProduct.scss'
import DragDropImageUploader from '../components/DragDropImageUploader'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'

const AddProduct = () => {
  const [inputs, setInputs] = useState({
    title: "",
    description: "",
    price: "",
    stock: "",
  })
  const [images, setImages] = useState([])

  const navigate = useNavigate();

  const handleChange = e => {
    setInputs(prev => ({...prev, [e.target.name]: e.target.value}))
  }

  const handleSubmit = async e => {
    e.preventDefault()
    try {
      const formData = new FormData();
      formData.append("title", inputs.title);
      formData.append("description", inputs.description);
      formData.append("price", inputs.price);
      formData.append("stock", inputs.stock);
      images.forEach((image) => {
        formData.append(`images`, image.file); // Append the file object
      });
      for (let pair of formData.entries()) {
        console.log(`${pair[0]}:`, pair[1]);
      }
      
      await axios.post("/products/new", formData);
      navigate('/dashboard')
    } catch (err) {
      console.error(err);
    }
  }

  return (
    <div className='add-product-page'>
      <form onSubmit={handleSubmit}>
        <DragDropImageUploader images={images} setImages={setImages}/>
        <div className='input-area'>
          <label htmlFor='title'>Title</label>
          <input type='text' id='title' name='title' onChange={handleChange}/>
        </div>
        <div className='input-area'>
          <label htmlFor='description'>Description</label>
          <textarea type='textarea' id='description' name='description' rows='4' onChange={handleChange}/>
        </div>
        <div className='input-area'>
          <label htmlFor='price'>Price</label>
          <input type='number' id='price' name='price' onChange={handleChange}/>
        </div>
        <div className='input-area'>
          <label htmlFor='stock'>Stock</label>
          <input type='number' id='stock' name='stock' onChange={handleChange}/>
        </div>
        <button>Add Product</button>
      </form>
    </div>
  )
}

export default AddProduct