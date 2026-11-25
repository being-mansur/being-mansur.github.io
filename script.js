
// Mobile navigation
const menuToggle = document.getElementById("menuToggle");
const navLinks = document.getElementById("navLinks");

menuToggle.addEventListener("click", () => {
  const isOpen = navLinks.classList.toggle("open");
  menuToggle.setAttribute("aria-expanded", String(isOpen));
});

// Close mobile menu after clicking a link
document.querySelectorAll(".nav-links a").forEach(link => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    menuToggle.setAttribute("aria-expanded", "false");
  });
});

// Light and dark theme
const themeToggle = document.getElementById("themeToggle");
const savedTheme = localStorage.getItem("portfolio-theme");

if (savedTheme === "light") {
  document.body.classList.add("light-theme");
}

function updateThemeIcon() {
  themeToggle.textContent =
    document.body.classList.contains("light-theme") ? "☾" : "☀";
}

updateThemeIcon();

themeToggle.addEventListener("click", () => {
  document.body.classList.toggle("light-theme");

  const currentTheme = document.body.classList.contains("light-theme")
    ? "light"
    : "dark";

  localStorage.setItem("portfolio-theme", currentTheme);
  updateThemeIcon();
});

// Back to top button
const backTop = document.getElementById("backTop");

window.addEventListener("scroll", () => {
  if (window.scrollY > 350) {
    backTop.classList.add("show");
  } else {
    backTop.classList.remove("show");
  }
});

backTop.addEventListener("click", () => {
  window.scrollTo({
    top: 0,
    behavior: "smooth"
  });
});

// Automatic footer year
document.getElementById("currentYear").textContent =
  new Date().getFullYear();

// Subtle 3D profile card movement on desktop
const profileCard = document.querySelector(".profile-card");
const heroArt = document.querySelector(".hero-art");

if (window.matchMedia("(pointer: fine)").matches) {
  heroArt.addEventListener("mousemove", (event) => {
    const rect = heroArt.getBoundingClientRect();

    const x = (event.clientX - rect.left) / rect.width - 0.5;
    const y = (event.clientY - rect.top) / rect.height - 0.5;

    profileCard.style.transform =
      `rotateY(${x * 12}deg) rotateX(${-y * 12}deg)`;
  });

  heroArt.addEventListener("mouseleave", () => {
    profileCard.style.transform = "";
  });
    }
