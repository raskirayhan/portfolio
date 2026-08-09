const typingElement = document.getElementById('typing');
const yearElement = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const loadingScreen = document.querySelector('.loading-screen');
const projectGrid = document.getElementById('projectGrid');
const cursorGlow = document.querySelector('.cursor-glow');

// Mobile Menu Elements
const mobileMenuBtn = document.getElementById('mobileMenuBtn');
const mobileDrawer = document.getElementById('mobileDrawer');
const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');

// Modal Elements
const projectModal = document.getElementById('projectModal');
const modalCloseBtn = document.getElementById('modalCloseBtn');
const modalImgWrap = document.getElementById('modalImgWrap');
const modalTitle = document.getElementById('modalTitle');
const modalTechList = document.getElementById('modalTechList');
const modalDescription = document.getElementById('modalDescription');
const modalLiveLink = document.getElementById('modalLiveLink');
const modalGithubLink = document.getElementById('modalGithubLink');
const modalServerLink = document.getElementById('modalServerLink');
const modalChallenges = document.getElementById('modalChallenges');
const modalImprovements = document.getElementById('modalImprovements');

const projectApiUrl = window.PORTFOLIO_API_URL || 'http://localhost:4000';

let activeProjectsList = [];

const fallbackProjects = [
  {
    id: 'fixitnow',
    title: 'FixItNow – On-Demand Service & Repair Platform',
    description: 'A full-stack MERN application enabling seamless discovery, booking, and management of local home repair and technical services.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/raskirayhan/FixItNow-',
    serverGithub: 'https://github.com/raskirayhan/fixitnow',
    demo: 'https://raskirayhan.github.io/FixItNow-/',
    screenshot: '',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    challenges: '• Role-based JWT & Firebase authentication securing user and service provider dashboards.\n• Real-time service search, multi-category filtering, and interactive booking workflows.\n• Express.js REST API and MongoDB backend with complete CRUD data management.\n• Fast, mobile-responsive UI built with React.js, React Hooks, and Tailwind CSS.',
    improvements: 'Adding Stripe / SSLCommerz online payments, WebSockets live customer-technician chat, and technician GPS tracking.'
  },
  {
    id: 'g3-architects',
    title: 'G3 Architects – Architectural Portfolio & Services Platform',
    description: 'A modern, responsive web application designed for architectural firms to showcase featured projects, client testimonials, and service offerings.',
    tech: ['HTML5', 'CSS Grid', 'Flexbox', 'JavaScript', 'Modal Overlays', 'Micro-interactions'],
    github: 'https://github.com/raskirayhan/g3-architect-website-repo',
    demo: 'https://raskirayhan.github.io/g3-architect-website-repo/',
    screenshot: 'image/g3 architecture/screencapture-raskirayhan-github-io-g3-architect-website-repo-2026-07-06-01_56_44.png',
    challenges: '• Interactive projects showcase galleries built with CSS Grid, Flexbox, and modal overlays.\n• Mobile-first responsive architecture ensures seamless layout adaptation across viewports.\n• Smooth scroll navigation, visual hero sections, and dynamic UI micro-interactions.\n• Optimized asset delivery maintaining fast page load speeds and cross-browser accuracy.',
    improvements: 'Integrating an interactive 3D architectural viewer (Three.js), client inquiry API, and theme switcher.'
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker Application',
    description: 'A habit-building full-stack application featuring user authentication, daily streak tracking, completion analytics, and clean dashboard statistics.',
    tech: ['React.js', 'Firebase Auth', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/raskirayhan/habit-tracker',
    demo: 'https://habit-tracker-najifjawoad.netlify.app/',
    screenshot: 'image/habbit_trucker/screencapture-habit-tracker-najifjawoad-netlify-app-2026-07-06-01_55_17.png',
    challenges: '• Timezone-aware habit completion tracking and streak calculations.\n• Secure user session handling with Firebase Authentication.\n• Interactive progress visualization dashboard.',
    improvements: 'Push notifications for daily habit reminders and social habit challenge leaderboards.'
  },
  {
    id: 'flower-website',
    title: 'Flower Storefront & Workshop',
    description: 'A responsive flower storefront featuring seasonal collection displays, interactive product cards, shopping cart workflow, and smooth micro-animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive CSS Grid'],
    github: 'https://github.com/raskirayhan/flower-website',
    demo: 'https://raskirayhan.github.io/flower-website/',
    screenshot: 'image/flower_workshop/screencapture-raskirayhan-github-io-flower-website-2026-07-06-01_53_14.png',
    challenges: '• Aspect ratio consistency and fast asset loading across all viewport sizes.\n• Interactive shopping discovery UI without third-party frameworks.\n• Clean semantic HTML structure.',
    improvements: 'Full dynamic backend e-commerce integration with Node.js, Express, and payment gateways.'
  }
];

const words = ['high-performance platforms.', 'scalable MERN applications.', 'responsive user interfaces.'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1300);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 50 : 85);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 500);
  typeLoop();
  loadProjectData();
});

yearElement.textContent = new Date().getFullYear();

// Mobile Navigation Toggle
if (mobileMenuBtn) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('active');
  });
}

mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    mobileDrawer.classList.remove('active');
  });
});

async function loadProjectData() {
  try {
    const response = await fetch(`${projectApiUrl}/api/projects`);
    if (!response.ok) throw new Error('Backend unavailable');
    const data = await response.json();
    activeProjectsList = data.projects?.length ? data.projects : fallbackProjects;
  } catch (error) {
    console.debug('Backend project API not active; using showcase catalog:', error.message);
    activeProjectsList = fallbackProjects;
  }
  renderProjects(activeProjectsList);
}

function renderProjects(projects) {
  projectGrid.innerHTML = projects
    .map(
      (project, index) => `
        <article class="project-card reveal">
          ${
            project.screenshot
              ? `<div class="project-visual"><img src="${project.screenshot}" alt="${project.title} screenshot" style="width: 100%; height: 100%; object-fit: cover;"></div>`
              : `<div class="project-visual" style="background: ${project.color || 'linear-gradient(135deg, var(--accent), var(--accent-2))'}; display: grid; place-items: center; padding: 1.5rem; text-align: center;">
                   <div style="font-size: 2.5rem;">🛠️</div>
                   <strong style="color: white; font-size: 1.15rem; margin-top: 0.5rem;">${project.title}</strong>
                 </div>`
          }
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-row">
              ${project.tech.map((tag) => `<span>${tag}</span>`).join('')}
            </div>
            <div class="card-actions" style="margin-top: 1rem; display: flex; gap: 0.5rem; flex-wrap: wrap;">
              <button class="btn btn-primary btn-sm" onclick="openProjectModal(${index})">View More / Details</button>
              <a href="${project.demo}" class="btn btn-secondary btn-sm" target="_blank" rel="noreferrer">Live Demo</a>
            </div>
          </div>
        </article>
      `
    )
    .join('');

  document.querySelectorAll('#projectGrid .reveal').forEach((item) => observer.observe(item));
}

// Project Modal Logic
window.openProjectModal = function (index) {
  const project = activeProjectsList[index];
  if (!project) return;

  modalImgWrap.innerHTML = project.screenshot
    ? `<img src="${project.screenshot}" alt="${project.title} full preview">`
    : `<div style="height: 220px; background: ${project.color || 'linear-gradient(135deg, var(--accent), var(--accent-2))'}; display: grid; place-items: center; color: white; padding: 1.5rem; text-align: center;">
         <div>
           <div style="font-size: 3rem; margin-bottom: 0.5rem;">🛠️</div>
           <h2>${project.title}</h2>
         </div>
       </div>`;

  modalTitle.textContent = project.title;
  modalTechList.innerHTML = project.tech.map((t) => `<span class="skill-chip">${t}</span>`).join('');
  modalDescription.textContent = project.description;

  modalLiveLink.href = project.demo || '#';
  modalGithubLink.href = project.github || '#';

  if (project.serverGithub) {
    modalServerLink.href = project.serverGithub;
    modalServerLink.style.display = 'inline-flex';
  } else {
    modalServerLink.style.display = 'none';
  }

  modalChallenges.innerText = project.challenges || 'Managed UI/UX responsive layouts and seamless client-side state handling.';
  modalImprovements.innerText = project.improvements || 'Adding micro-interactions, dark mode persistence, and automated CI/CD deployment.';

  projectModal.classList.add('active');
  projectModal.setAttribute('aria-hidden', 'false');
  document.body.style.overflow = 'hidden';
};

function closeProjectModal() {
  projectModal.classList.remove('active');
  projectModal.setAttribute('aria-hidden', 'true');
  document.body.style.overflow = '';
}

if (modalCloseBtn) {
  modalCloseBtn.addEventListener('click', closeProjectModal);
}

if (projectModal) {
  projectModal.addEventListener('click', (event) => {
    if (event.target === projectModal) {
      closeProjectModal();
    }
  });
}

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Scroll Observer for Reveal Animations
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.1 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

// Cursor Glow Effect
window.addEventListener('mousemove', (event) => {
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

// Magnetic Buttons Effect
document.querySelectorAll('.magnetic').forEach((button) => {
  button.addEventListener('mousemove', (event) => {
    const rect = button.getBoundingClientRect();
    const offsetX = event.clientX - rect.left;
    const offsetY = event.clientY - rect.top;
    button.style.transform = `translate(${(offsetX - rect.width / 2) / 20}px, ${(offsetY - rect.height / 2) / 20}px)`;
  });

  button.addEventListener('mouseleave', () => {
    button.style.transform = '';
  });
});

// Profile Card 3D Tilt
const profileCard = document.getElementById('profileCard');
if (profileCard) {
  profileCard.addEventListener('mousemove', (event) => {
    const rect = profileCard.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 10;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -10;
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = '';
  });
}

// Contact Form Handler
contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Thank you for reaching out, Sheikh Raski Rayhan will get back to you shortly!';
  contactForm.reset();
  setTimeout(() => {
    formStatus.textContent = '';
  }, 5000);
});
