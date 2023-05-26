// This component page acts as a modal over the homepage to allow for loading of assets

import { useState, useEffect } from 'react'
import giphy from '../../src/assets/loading-giphy.gif'

const LoadingPage = () => {
  // Render loading animation
  // const [isLoading, setIsLoading] = useState(true);
  const [dots, setDots] = useState('');

  useEffect(() => {
    // Start blinking dots after 1 second delay
  //   const timeout = setTimeout(() => {
  //     const interval = setInterval(() => {
  //       setDots(prevDots => (prevDots === '....' ? '' : prevDots + '.'));
  //     }, 500)
  //     return () => clearInterval(interval)
  //   }, 200);
  //   return () => clearTimeout(timeout);
  // }, []);

    const interval = setInterval(() => {
      setDots((prevDots) => (prevDots === '....' ? '' : prevDots + '.'))
    }, 500)
    return () => clearInterval(interval);
  }, [])

  return (
    <div>
      <div className='loading-page'>
        <img src={giphy} alt='amelia-studios-logo-walking-gif' className='loading-gif' />
        <span>Loading {dots} </span>
      </div>
    </div>
  );
};

export default LoadingPage
