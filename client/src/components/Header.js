import { useState } from 'react'
import Logo from '../assets/logos/logo-title.png'

import MenuPopUp from './MenuPopUp'

const Header = () => {

  // Menu Modal (Pop Up)
  const [isOpen, setIsOpen] = useState(false);

  const toggleOpen = () => {
    setIsOpen(!isOpen);
  }

  return (
    <header className='header'>
      <div className='header__left'>
        <img src={Logo} alt='Logo' className='header__logo' />
      </div>
      <div className='header__right'>
        <button className='header__title' onClick={toggleOpen}>
          <h1 className='menu'>Menu</h1>
        </button>
        <div className={isOpen ? 'open menu__info-container' : 'menu__info-container'}>
          <button className='menu__close' onClick={toggleOpen}></button>
          {isOpen && <MenuPopUp />}
        </div>
      </div>
    </header>
  )
}

export default Header






