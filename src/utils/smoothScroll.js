/**
 * Clean Smooth Scrolling Utility (WORKING)
 */

import { easings } from './easings';

let animationFrameId = null;

/**
 * Init
 */
export const initSmoothScroll = () => {
  setupScrollProgressIndicator();
  const observer = setupIntersectionObserver();

  // Handle URL hash on load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash);
    }, 300);
  }

  // Anchor clicks
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#')) {
      e.preventDefault();
      scrollToElement(href);
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleAnchorClick); // ✅ no passive
  });

  return {
    destroy: () => {
      observer?.disconnect();
      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });
    },
  };
};

/**
 * Progress Bar
 */
export const setupScrollProgressIndicator = () => {
  const bar = document.querySelector('.scroll-progress-bar');
  if (!bar) return;

  const update = () => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const percent = height > 0 ? (scrollTop / height) * 100 : 0;
    bar.style.width = percent + '%';
  };

  window.addEventListener('scroll', update, { passive: true });
  update();
};

/**
 * Reveal Animation
 */
export const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
        }
      });
    },
    { threshold: 0.1 }
  );

  document.querySelectorAll('.reveal-on-scroll').forEach((el) => {
    observer.observe(el);
  });

  return observer;
};

/**
 * Smooth Scroll (FIXED)
 */
export const scrollToElement = (selector, offset = 60) => {
  const target = document.querySelector(selector);
  if (!target) return;

  // Cancel previous animation
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const start = window.scrollY;
  const targetY =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  const distance = targetY - start;
  let startTime = null;
  const duration = 600;

  const animate = (time) => {
    if (!startTime) startTime = time;

    const progress = Math.min((time - startTime) / duration, 1);
    const ease = easings.easeOutCubic(progress);

    window.scrollTo(0, start + distance * ease);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};
