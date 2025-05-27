import { useEffect, useRef } from 'react';

interface LocomotiveScrollOptions {
  el?: HTMLElement | null;
  smooth?: boolean;
  multiplier?: number;
  class?: string;
  getDirection?: boolean;
  smartphone?: {
    smooth?: boolean;
  };
  tablet?: {
    smooth?: boolean;
  };
}

declare global {
  interface Window {
    LocomotiveScroll: new (options: LocomotiveScrollOptions) => any;
  }
}

export const useLocomotiveScroll = (options: LocomotiveScrollOptions = {}) => {
  const scrollRef = useRef<any>(null);
  const containerRef = useRef<HTMLElement | null>(null);

  useEffect(() => {
    // Don't initialize until the DOM is fully loaded
    if (typeof window === 'undefined' || !window.document) return;

    // Import Locomotive Scroll dynamically
    import('locomotive-scroll').then((LocomotiveScroll) => {
      if (!containerRef.current) return;

      // Merge default options with user options
      const scrollOptions: LocomotiveScrollOptions = {
        el: containerRef.current,
        smooth: true,
        getDirection: true,
        ...options,
        smartphone: {
          smooth: false,
          ...options.smartphone,
        },
        tablet: {
          smooth: false,
          ...options.tablet,
        },
      };
      
      // Initialize Locomotive Scroll
      scrollRef.current = new LocomotiveScroll.default(scrollOptions);
      
      // Add locomotive-scroll class to html element
      document.documentElement.classList.add('has-scroll-init');
      
      // Update scroll on window resize
      const resizeObserver = new ResizeObserver(() => {
        if (scrollRef.current) {
          scrollRef.current.update();
        }
      });
      
      resizeObserver.observe(document.body);
      
      // Cleanup function
      return () => {
        if (scrollRef.current) {
          scrollRef.current.destroy();
          document.documentElement.classList.remove('has-scroll-init');
        }
        resizeObserver.disconnect();
      };
    });
  }, [options]);

  return { containerRef, scrollRef };
};