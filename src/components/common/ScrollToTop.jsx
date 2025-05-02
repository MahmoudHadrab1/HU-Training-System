// src/components/common/ScrollToTop.jsx
import { useEffect } from 'react';

/**
 * ScrollToTop component to automatically scroll to top on page changes
 */
function ScrollToTop() {
  useEffect(() => {
    window.scrollTo(0, 0);
  }, []);

  return null;
}

export default ScrollToTop;