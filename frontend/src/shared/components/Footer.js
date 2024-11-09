import React from 'react'
import { Link } from 'react-router-dom'
import {ReactComponent as Facebook} from '../../assets/facebook.svg'
import {ReactComponent as Instagram} from '../../assets/instagram.svg'
import {ReactComponent as X} from '../../assets/x.svg'
import {ReactComponent as Discord} from '../../assets/discord.svg'



import './Footer.scss'

const Footer = () => {
  return (
    <div className='footer'>
      <div className='left'>
        <Link>ABOUT US</Link>
      </div>
      <div className='divider'></div>
      <div className='right'>
        <div className='social-logo'>
          <Facebook />
        </div>
        <div className='social-logo'>
          <Instagram />
        </div>
        <div className='social-logo'>
          <X />
        </div>
        <div className='social-logo'>
          <Discord />
        </div>
        
      </div>

    </div>
  )
}

export default Footer