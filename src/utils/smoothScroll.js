/**
 * CLEAN Smooth Scroll (FINAL WORKING VERSION)
 */

let animationFrameId = null;

/**
 * INIT
 */
export const initSmoothScroll = () => {
  setupScrollProgressIndicator();
  const observer = setupIntersectionObserver();

  // Scroll to hash on load
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
    anchor.addEventListener('click', handleAnchorClick);
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
 * SIMPLE SMOOTH SCROLL (NO BUGS)
 */
export const scrollToElement = (selector, offset = 70) => {
  const target = document.querySelector(selector);
  if (!target) return;

  const y =
    target.getBoundingClientRect().top +
    window.pageYOffset -
    offset;

  window.scrollTo({
    top: y,
    behavior: 'smooth',
  });
};

/**
 * PROGRESS BAR
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
 * REVEAL ANIMATION
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
