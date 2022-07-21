import React from 'react';
import './Header.css';
import SearchIcon from '@mui/icons-material/Search';
import ShoppingCartIcon from '@mui/icons-material/ShoppingCart';
import { Link } from 'react-router-dom';
import { useStateValue } from './StateProvider';
import { auth } from './firebase';

function Header() {
    const [{ cart, user }, dispatch]= useStateValue();

    const handleAuthentication = () => {
        if( user ) {
          auth.signOut();
        }
    }
  return (
    <div className='header'>

        <Link to="/">
            <img className="header-logo" src="http://pngimg.com/uploads/amazon/amazon_PNG11.png" alt="amazon-logo"/>
        </Link>

        <div className="header-search">
            <input type="text" className="header-search-input"/>
            <SearchIcon className="header-search-icon"/>
        </div>

        <div className="header-nav">

            <Link to={ !user && '/login' }>
                <div onClick={ handleAuthentication } className="header-option">
                    <span className="header-option-l1"> Hello { !user ? 'Guest' : user.email } </span>
                    <span className="header-option-l2"> { user ? 'Sign Out' : 'Sign In' } </span>
                </div>
            </Link>

            <Link to='/orders'>
                <div className="header-option">
                    <span className="header-option-l1"> Returns </span>
                    <span className="header-option-l2"> & Orders </span>
                </div>
            </Link>

            <div className="header-option">
                <span className="header-option-l1"> Your </span>
                <span className="header-option-l2"> Prime </span>
            </div>

            <Link to="/checkout">
                <div className="header-checkout">
                    <ShoppingCartIcon />
                    <span className="header-option-l2 header-cart-count"> {cart?.length} </span>
                </div>
            </Link>
            
        </div>
    </div>
  )
}

export default Header