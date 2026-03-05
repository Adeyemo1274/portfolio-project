const hamburger = document.getElementById("hamburger");
const navLinks = document.getElementById("nav-links");
const navItems = document.querySelectorAll(".nav-links a");

hamburger.addEventListener("click", () => {
  navLinks.classList.toggle("open");
  hamburger.classList.toggle("active");
});

navItems.forEach((link) => {
  link.addEventListener("click", () => {
    navLinks.classList.remove("open");
    hamburger.classList.remove("active");
  });
});

const sections = document.querySelectorAll("section[id]");

const observerOptions = {
  root: null,
  rootMargin: "-40% 0px -55% 0px",
  threshold: 0
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      navItems.forEach((link) => link.classList.remove("active"));
      const activeLink = document.querySelector(
        `.nav-links a[href="#${entry.target.id}"]`
      );
      if (activeLink) activeLink.classList.add("active");
    }
  });
}, observerOptions);

sections.forEach((section) => observer.observe(section));

const projectsGrid = document.getElementById("projects-grid");

function renderProjects(projectsArray) {
  projectsGrid.innerHTML = projectsArray
    .map(
      (project) => `
    <div class="project-card" data-id="${project.id}">
      <div class="card-image-wrapper">
        <img src="${project.image}" alt="${project.name}" loading="lazy" />
        <div class="card-overlay">
          <a href="${project.liveLink}" target="_blank" rel="noopener noreferrer" class="view-btn">
            View Project <span>↗</span>
          </a>
        </div>
      </div>
      <div class="card-body">
        <h3>${project.name}</h3>
        <p>${project.description}</p>
      </div>
    </div>
  `
    )
    .join("");

  const cards = document.querySelectorAll(".project-card");
  cards.forEach((card, i) => {
    card.style.animationDelay = `${i * 0.1}s`;
    card.classList.add("card-animate");
  });
}

renderProjects(projects);

const fadeEls = document.querySelectorAll(".fade-in");

const fadeObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        fadeObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

fadeEls.forEach((el) => fadeObserver.observe(el));

const navbar = document.getElementById("navbar");

window.addEventListener("scroll", () => {
  if (window.scrollY > 20) {
    navbar.classList.add("scrolled");
  } else {
    navbar.classList.remove("scrolled");
  }
});

const roles = ["Frontend Developer", "UI/UX Enthusiast", "JavaScript Lover", "Creative Coder"];
let roleIndex = 0;
let charIndex = 0;
let isDeleting = false;
const typedEl = document.getElementById("typed-role");

function typeEffect() {
  const current = roles[roleIndex];
  if (isDeleting) {
    typedEl.textContent = current.substring(0, charIndex--);
    if (charIndex < 0) {
      isDeleting = false;
      roleIndex = (roleIndex + 1) % roles.length;
      setTimeout(typeEffect, 500);
      return;
    }
  } else {
    typedEl.textContent = current.substring(0, charIndex++);
    if (charIndex > current.length) {
      isDeleting = true;
      setTimeout(typeEffect, 1800);
      return;
    }
  }
  setTimeout(typeEffect, isDeleting ? 60 : 100);
}

typeEffect();

const form = document.getElementById("contact-form");
const formMsg = document.getElementById("form-message");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();
    formMsg.textContent = "✓ Message sent! I'll get back to you soon.";
    formMsg.classList.add("show");
    form.reset();
    setTimeout(() => formMsg.classList.remove("show"), 4000);
  });
}
