import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';

/**
 * ScrollToTop component to handle scrolling to top when route changes
 * This is important because React Router doesn't automatically scroll
 * the page to the top on navigation like traditional page navigation does
 */
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

export default ScrollToTop;