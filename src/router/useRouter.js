// =========================================================================
// ARRIVE PLATFORM — CLIENT-SIDE SPA ROUTER HOOK
// Intercepts navigation, updates URL history and manages browser back/forward
// =========================================================================

import { useState, useEffect, useCallback } from 'react';
import { parseRoute } from './routes';

export const useRouter = () => {
  const [currentPath, setCurrentPath] = useState(() => {
    if (typeof window !== 'undefined') {
      return window.location.pathname;
    }
    return '/es/';
  });

  // Keep route parsed
  const route = parseRoute(currentPath);

  // Handle browser Back / Forward buttons & scroll restoration
  useEffect(() => {
    if (typeof window !== 'undefined' && 'scrollRestoration' in window.history) {
      window.history.scrollRestoration = 'manual';
    }

    const handlePopState = () => {
      setCurrentPath(window.location.pathname);
      window.scrollTo(0, 0);
    };

    window.addEventListener('popstate', handlePopState);
    return () => window.removeEventListener('popstate', handlePopState);
  }, []);

  // Programmatic navigation
  const navigate = useCallback((toPath, { replace = false, scrollToTop = true } = {}) => {
    if (typeof window === 'undefined') return;

    if (replace) {
      window.history.replaceState(null, '', toPath);
    } else {
      window.history.pushState(null, '', toPath);
    }
    setCurrentPath(toPath);

    // Reset scroll to top instantly to prevent browser landing at previous page offset
    if (scrollToTop) {
      window.scrollTo(0, 0);
    }
  }, []);

  // Global click interceptor for <a href="/..."> links to keep SPA transitions
  useEffect(() => {
    const handleGlobalLinkClick = (e) => {
      const link = e.target.closest('a');
      if (!link) return;

      const href = link.getAttribute('href');
      // Only intercept internal root-relative links without target="_blank"
      if (
        href &&
        href.startsWith('/') &&
        !href.startsWith('//') &&
        !link.getAttribute('target') &&
        !link.getAttribute('download') &&
        !e.metaKey &&
        !e.ctrlKey &&
        !e.shiftKey
      ) {
        e.preventDefault();
        navigate(href);
      }
    };

    document.addEventListener('click', handleGlobalLinkClick);
    return () => document.removeEventListener('click', handleGlobalLinkClick);
  }, [navigate]);

  return {
    currentPath,
    route,
    navigate
  };
};
