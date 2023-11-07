import { Link } from 'react-router-dom';
import { useState } from 'react';
import { useEffect } from 'react';
import MobileNav from './MobileNav';
import { useLocation } from 'react-router-dom';
import { useContext } from 'react';
import { viewportContext } from '../../../context/viewportContext';


const MobileHeader = () => {
  const [prevScrollPos, setPrevScrollPos] = useState(0);
  const [visible, setVisible] = useState(true);
  const [navOpen, setNavOpen] = useState(false);
  const location = useLocation();
  const { isMobile } = useContext(viewportContext);

  const handleScroll = () => {
    const currentScrollPos = window.scrollY;

    if (currentScrollPos > prevScrollPos) {
      setVisible(false);
      setNavOpen(false);
    } else {
      setVisible(true);
    }

    setPrevScrollPos(currentScrollPos);
  };

  useEffect(() => {
    window.addEventListener('scroll', handleScroll);

    return () => window.removeEventListener('scroll', handleScroll);
  });

  useEffect(() => {
    setNavOpen(false);
  }, [location]);

  if (!isMobile) return null;

  return (
    <header
      className={`flex items-center z-50 bg-white sticky py-3 px-4 border-b border-gray-200 ${
        visible ? 'top-[-1px]' : ''
      }`}
    >
      <Link to="/" className="w-8 h-8">
        <img src="/icons/logo.png" alt="logo" />
      </Link>
      <button className="ml-auto" onClick={() => setNavOpen(!navOpen)}>
        <svg className="w-8 h-8 fill-primary">
          <use href="/icons/sprite.svg#icon-menu" />
        </svg>
      </button>
      {navOpen && <MobileNav />}
    </header>
  );
};

export default MobileHeader;
