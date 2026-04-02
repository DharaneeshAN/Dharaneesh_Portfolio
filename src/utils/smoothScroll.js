/**
 * Smooth Scrolling Utility - FIXED VERSION
 */

import { easings } from './easings';

let animationFrameId = null;

/**
 * Initialize smooth scrolling
 */
export const initSmoothScroll = () => {
  // Mobile → use native smooth scroll
  if (window.innerWidth < 640) {
    document.documentElement.style.scrollBehavior = 'smooth';
    setupScrollProgressIndicator();
    return { destroy: () => {} };
  }

  const progressBar = setupScrollProgressIndicator();
  const observer = setupIntersectionObserver();

  // Handle page load with hash
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash);
    }, 300);
  }

  // Anchor click handler
  const handleAnchorClick = (e) => {
    const href = e.currentTarget.getAttribute('href');

    if (href && href.startsWith('#') && href.length > 1) {
      e.preventDefault();
      scrollToElement(href);
    }
  };

  document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
    anchor.addEventListener('click', handleAnchorClick); // ✅ FIXED (no passive)
  });

  return {
    destroy: () => {
      observer?.disconnect();

      document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
        anchor.removeEventListener('click', handleAnchorClick);
      });

      if (progressBar) {
        window.removeEventListener('scroll', progressBar.update);
      }
    },
  };
};

/**
 * Scroll Progress Bar
 */
export const setupScrollProgressIndicator = () => {
  const progressBar = document.querySelector('.scroll-progress-bar');
  if (!progressBar) return null;

  let ticking = false;

  const update = () => {
    const scrollTop = window.scrollY;
    const height =
      document.documentElement.scrollHeight - window.innerHeight;

    const percentage = height > 0 ? (scrollTop / height) * 100 : 0;

    progressBar.style.width = percentage + '%';
    ticking = false;
  };

  const onScroll = () => {
    if (!ticking) {
      requestAnimationFrame(update);
      ticking = true;
    }
  };

  window.addEventListener('scroll', onScroll, { passive: true });
  update();

  return { update };
};

/**
 * Reveal Animations
 */
export const setupIntersectionObserver = () => {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');

          if (entry.target.dataset.once !== 'false') {
            observer.unobserve(entry.target);
          }
        } else if (entry.target.dataset.once === 'false') {
          entry.target.classList.remove('active');
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
 * Smooth Scroll Function (FIXED)
 */
export const scrollToElement = (
  selector,
  offset = 60,
  duration = 600
) => {
  let target;

  try {
    target = document.querySelector(selector);
  } catch {
    return;
  }

  if (!target) return;

  // Cancel previous animation
  if (animationFrameId) {
    cancelAnimationFrame(animationFrameId);
  }

  const prefersReducedMotion = window.matchMedia(
    '(prefers-reduced-motion: reduce)'
  ).matches;

  const start = window.scrollY;
  const targetY =
    target.getBoundingClientRect().top + start - offset;

  const distance = targetY - start;

  // No animation if user prefers reduced motion
  if (prefersReducedMotion) {
    window.scrollTo(0, targetY);
    return;
  }

  let startTime = null;

  const animate = (currentTime) => {
    if (!startTime) startTime = currentTime;

    const elapsed = currentTime - startTime;
    const progress = Math.min(elapsed / duration, 1);

    // ✅ Correct easing usage
    const ease = easings.easeOutCubic(progress);
    const scrollY = start + distance * ease;

    window.scrollTo(0, scrollY);

    if (progress < 1) {
      animationFrameId = requestAnimationFrame(animate);
    } else {
      window.location.hash = selector;
    }
  };

  animationFrameId = requestAnimationFrame(animate);
};
