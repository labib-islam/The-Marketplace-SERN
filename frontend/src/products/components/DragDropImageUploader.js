import React, { useRef, useState } from 'react'

import './DragDropImageUploader.scss'

const DragDropImageUploader = ({ images, setImages}) => {
  
  const [isDragging, setIsDragging] = useState(false)
  const fileInputRef = useRef(null);

  const selectFiles = () => {
    fileInputRef.current.click()
  }

  const onFileSelect = (e) => {
    const files = e.target.files
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;
      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            file: files[i]
          }
        ])
      }
    }
  }

  const deleteImage = (index) => {
    setImages((prevImages) =>
      prevImages.filter((_, i) => i !== index)
    )
    if (fileInputRef.current) {
      fileInputRef.current.value = '';
    }
  }

  const onDragOver = (e) => {
    e.preventDefault()
    setIsDragging(true)
    e.dataTransfer.dropEffect = 'copy'
  }

  const onDragLeave = (e) => {
    e.preventDefault()
    setIsDragging(false)
  }

  const onDrop = (e) => {
    e.preventDefault()
    setIsDragging(false)
    const files = e.dataTransfer.files
    if (files.length === 0) return;
    for (let i = 0; i < files.length; i++) {
      if (files[i].type.split('/')[0] !== 'image') continue;

      if (!images.some((e) => e.name === files[i].name)) {
        setImages((prevImages) => [
          ...prevImages,
          {
            name: files[i].name,
            url: URL.createObjectURL(files[i]),
            file: files[i]
          }
        ])
      }
    }
  }

  return (
    <div className='drag-drop-image-card'>
      <div>
        <p>Drag & Drop Product Images</p>
      </div>
      <div className='drag-area' onDragOver={onDragOver} onDragLeave={onDragLeave} onDrop={onDrop}>
        {isDragging ?
          <span className='select'>Drop Images Here</span> :
          <>
            {"Drag & Drop Image here or "}
            <span className='select' onClick={selectFiles}> Browse</span>
          </>}

        <input type='file' multiple onChange={onFileSelect} ref={fileInputRef} />
      </div>
      <div className='image-container'>
        {images.map((image, index) => (
          <div className='image' key={index}>
            <span className='delete' onClick={() => deleteImage(index)}>&times;</span>
            <img src={image.url} alt={image.name} />
          </div>
        ))}
      </div>

    </div>
  )
}

export default DragDropImageUploader