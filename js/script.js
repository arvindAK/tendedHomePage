const hamburger = document.querySelector(".hamburger");
const svgPath = document.querySelector(".hamburger path");
const navLinks = document.querySelector(".nav");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  const hamburgerState = hamburger.getAttribute("aria-expanded") == "true";
  hamburger.setAttribute("aria-expanded", !hamburgerState);
  if (!hamburgerState) {
    svgPath.setAttribute('d', "M1, 1 30, 30 M1, 30 30, 1");
  } else {
    svgPath.setAttribute('d', "M1,10 30,10 M1, 20 30, 20");
  }
});