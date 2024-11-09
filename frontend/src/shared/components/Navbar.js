import React, { useContext } from 'react'
import { ReactComponent as Logo} from '../../assets/logo.svg'
import { ReactComponent as Cart} from '../../assets/cart.svg'
import { ReactComponent as Logout} from '../../assets/logout.svg'
import { ReactComponent as User} from '../../assets/user.svg'
import { ReactComponent as Search} from '../../assets/search.svg'





import './Navbar.scss'
import { AuthContext } from '../context/authContext'

const Navbar = () => {

  const { currentUser } = useContext(AuthContext);

  return (
    <div className='navbar'>
      <div className='top'>
        <div className='logo'>
          <Logo />
        </div>
        <div className='cart-box'>
          <p>Cart</p>
          <div className='cart'>
            <Cart />
          </div>
        </div>
      </div>
      <div className='bottom'>
        <div className='left'>
          <form className='search-form'>
            <input type='text' placeholder='search'/>
            <button>
              <p className='item-text'>SERACH</p>
              <div className='item-logo'>
                <Search />
              </div>
            </button>
          </form>
        </div>

        <div className='right'>
          {
            currentUser &&
            <div className='item-box'>
              <p className='item-text'>{currentUser.username}</p>
              <div className='item-logo'>
                <User />
              </div>
            </div>
          }
          
          <div className='item-box'>
            <p className='item-text'>LOGOUT</p>
            <div className='item-logo'>
              <Logout />
            </div>
          </div>
        </div>

        
      </div>
    </div>
  )
}

export default Navbar