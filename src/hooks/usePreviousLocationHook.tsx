import { useEffect } from 'react';

// Returns the last location. If there is no the last location, returns current one
export default (currentPath: string) => {
  const _window = window as any;
  if (!_window.previousLocations) _window.previousLocations = [];
  const locations = _window.previousLocations;

  useEffect(() => {
    currentPath && currentPath !== locations[locations.length - 1] && locations.push(currentPath);
  }, [currentPath]);

  let page = locations[locations.length - 1];
  if (page === currentPath && locations.length > 1) {
    page = locations[locations.length - 2];
  }

  return page;
};
