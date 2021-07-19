import { useEffect } from 'react';

export function useOnScrollNearBottom(action: () => void, pxToBottom = 0) {
  const handleScroll = () => {
    if (window.innerHeight + window.pageYOffset >= document.body.offsetHeight - pxToBottom) {
      action();
    }
  };

  useEffect(() => {
    document.addEventListener('scroll', handleScroll);
    return () => {
      document.removeEventListener('scroll', handleScroll);
    };
  }, []);
}
