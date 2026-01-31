import { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import ReactGA from 'react-ga4';

const GOOGLE_ANALYTICS_ID = import.meta.env.VITE_GOOGLE_ANALYTICS_ID;

export default function GoogleAnalytics() {
  const location = useLocation();

  useEffect(() => {
    if (!GOOGLE_ANALYTICS_ID) return;

    // Initialize GA4 once
    if (!window.gaInitialized) {
      ReactGA.initialize(GOOGLE_ANALYTICS_ID);
      window.gaInitialized = true;
    }

    // Send pageview on route change
    ReactGA.send({ hitType: "pageview", page: location.pathname + location.search });
  }, [location]);

  return null;
}
