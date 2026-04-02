// src/utils/smoothScroll.js

export const initSmoothScroll = () => {
  // Scroll to hash on load
  if (window.location.hash) {
    setTimeout(() => {
      scrollToElement(window.location.hash);
    }, 300);
  }

  // Anchor click handler
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

  return () => {
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.removeEventListener('click', handleAnchorClick);
    });
  };
};

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
