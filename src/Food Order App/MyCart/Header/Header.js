import React from 'react';
import './Header.css';
import SearchIcon from '@material-ui/icons/Search';
import ShoppingBasketIcon from '@material-ui/icons/ShoppingBasket';
import { Link } from 'react-router-dom';
import { useStateValue } from '../StateProvider';
import { auth } from '../Firebase';
import { NavLogo, NavIcon } from '../../components/Navbar/Navbar.elements';

function Header() {
  const [{ basket, user }, dispatch] = useStateValue();

  const handleAuthenticaton = () => {
    if (user) {
      auth.signOut();
    }
  };

  return (
    <div className='header'>
      {/* <Link to='/'>FOODHUB</Link> */}
      <NavLogo to='/'>
        <NavIcon />
        HamroFood
      </NavLogo>
      <div className='header__search'>
        <input
          className='header__searchInput'
          placeholder='Enter Item name'
          type='text'
        />
        <SearchIcon className='header__searchIcon' />
      </div>

      <div className='header__nav'>
        <Link to={!user && '/login'}>
          <div onClick={handleAuthenticaton} className='header__option'>
            <span className='header__optionLineOne'>
              Hello {!user ? 'Guest' : user.email}
            </span>
            <span className='header__optionLineTwo'>
              {user ? 'Sign Out' : 'Sign In'}
            </span>
          </div>
        </Link>

        {/* <Link to='/orders'>
          <div className='header__option'>
            <span className='header__optionLineOne'>My Order</span>
            <span className='header__optionLineTwo'>History</span>
          </div>
        </Link> */}

        {/* <div className='header__option'>
          <span className='header__optionLineOne'>Your</span>
          <span className='header__optionLineTwo'>Prime</span>
        </div> */}

        <Link to='/checkout'>
          <div className='header__optionBasket'>
            <ShoppingBasketIcon />
            <span className='header__optionLineTwo header__basketCount'>
              {basket?.length}
            </span>
          </div>
        </Link>
      </div>
    </div>
  );
}

export default Header;