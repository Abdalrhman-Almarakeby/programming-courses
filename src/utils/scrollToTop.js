export default function scrollToTop() {
  const preferReducedMotion = window.matchMedia("(prefers-reduced-motion)").matches;
  const behavior = preferReducedMotion ? "auto" : "smooth";

  window.scrollTo({
    top: 0,
    left: 0,
    behavior: behavior,
  });
}
