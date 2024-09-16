import React, {useState} from 'react';
import { useTranslation } from 'react-i18next';
import Cookies from 'js-cookie';
import { useNavigate, Link, useLocation } from 'react-router-dom';

// styles
import "../Style/Components/nav.scss"

// logo
import logo from '../assets/Image/logo.png'

// icons
import {ReactComponent as HomeIcon} from "../assets/Icons/home.svg"
import {ReactComponent as ProductsIcon} from "../assets/Icons/toiletries.svg"
import {ReactComponent as OrdersIcon} from "../assets/Icons/clipboard.svg"
import {ReactComponent as UsersIcon} from "../assets/Icons/user.svg"
import {ReactComponent as LogoutIcon} from "../assets/Icons/logout.svg"
import {ReactComponent as HamburgerIcon} from "../assets/Icons/hamburger.svg"
import {ReactComponent as CloseIcon} from "../assets/Icons/close.svg"


const Navigation: React.FC = () => {
    const pathLinks = {
      products: '/dashboard/products',
      orders: '/dashboard/orders',
      users: '/dashboard/users',
      dashboard: '/dashboard'
    }
    const { t } = useTranslation()
    const navigate = useNavigate()
    const logoutHandler = () => {
        Cookies.remove('token')
        navigate('/login')
    };
    const location = useLocation();
    const closeNav = () => setIsOpen(false)

    const [isOpen, setIsOpen] = useState(false)

  return (
    <>
      <button className='hamburger-icon' onClick={()=> setIsOpen(true)}>
        <HamburgerIcon />
      </button>

      <nav className={`nav${isOpen ? ' nav--open' : '' }`} >
        <img className='nav__logo' src={logo} alt="Logo" />
        <button className='nav__item nav__item--close' onClick={closeNav}>
          <CloseIcon />
        </button>
        <Link className={`nav__item ${location.pathname === pathLinks.dashboard ? 'nav__item--active' : ''}`} to={pathLinks.dashboard} onClick={closeNav}>
          <HomeIcon />
        </Link>
        <Link className={`nav__item ${location.pathname === pathLinks.products ? 'nav__item--active' : ''}`}  to={pathLinks.products} onClick={closeNav}>
          <ProductsIcon />
        </Link>
        <Link className={`nav__item ${location.pathname === pathLinks.orders ? 'nav__item--active' : ''}`}  to={pathLinks.orders} onClick={closeNav}>
          <OrdersIcon />
        </Link>
        <Link className={`nav__item ${location.pathname === pathLinks.users ? 'nav__item--active' : ''}`}  to={pathLinks.users} onClick={closeNav}>
          <UsersIcon />
        </Link>
        <button className='nav__item nav__item--logout' onClick={logoutHandler}>
          <LogoutIcon />
        </button> 
      </nav>

      <div className="backdrop" onClick={closeNav}></div>
    </>
  );
};

export default Navigation;
