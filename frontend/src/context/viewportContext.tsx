import { createContext } from 'react';
import { useState } from 'react';
import { useEffect } from 'react';

interface IViewportContext {
  viewportWidth: number;
  vieportHeight: number;
  isMobile: boolean;
  isTablet: boolean;
}

export const viewportContext = createContext({} as IViewportContext);

const ViewportContextProvider = ({ children }: {children: React.ReactNode}) => {
  const [viewportWidth, setVieportWidth] = useState(window.innerWidth);
  const [vieportHeight, setVieportHeight] = useState(window.innerHeight);

  const isMobile = viewportWidth < 640;
  const isTablet = viewportWidth < 1200;

  const handleWindowResize = () => {
    setVieportWidth(window.innerWidth);
    setVieportHeight(window.innerHeight);
  };

  useEffect(() => {
    window.addEventListener('resize', handleWindowResize);
    return () => window.removeEventListener('resize', handleWindowResize);
  }, [viewportWidth, vieportHeight]);

  return (
    <viewportContext.Provider
      value={{ viewportWidth, vieportHeight, isMobile, isTablet }}
    >
      {children}
    </viewportContext.Provider>
  );
};

export default ViewportContextProvider;
