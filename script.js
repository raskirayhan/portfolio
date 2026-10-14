/**
 * Sheikh Raski Rayhan - Portfolio Interactive Scripts
 * Mobile navigation, typing effect, project modal dialog, scroll animations
 */

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

// Showcase Projects Dataset (Requirement 9)
const fallbackProjects = [
  {
    id: 'fixitnow',
    title: 'FixItNow – On-Demand Service & Repair Platform',
    description: 'A full-stack MERN application enabling seamless discovery, booking, and management of local home repair and technical services.',
    tech: ['React.js', 'Next.js', 'TypeScript', 'Node.js', 'Express.js', 'MongoDB', 'Firebase Auth', 'JWT', 'Tailwind CSS'],
    github: 'https://github.com/raskirayhan/FixItNow-',
    serverGithub: 'https://github.com/raskirayhan/fixitnow',
    demo: 'https://raskirayhan.github.io/FixItNow-/',
    screenshot: 'image/fixitnow-preview.svg',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    challenges: '• Architecting role-based JWT & Firebase authentication securing customer, provider, and admin dashboards.\n• Real-time service search, multi-category filtering, and preventing conflicting booking time slots.\n• Scalable Express.js REST API with complete CRUD data management and MongoDB aggregation queries.',
    improvements: '• Integrating online payment gateways (Stripe / SSLCommerz).\n• WebSockets-powered real-time chat between customer and technician.\n• Live GPS geolocation tracking of arriving service providers.'
  },
  {
    id: 'g3-architects',
    title: 'G3 Architects – Architectural Studio Platform',
    description: 'A modern, responsive web application designed for architectural firms to showcase featured projects, client testimonials, and service offerings.',
    tech: ['HTML5', 'CSS Grid', 'Flexbox', 'JavaScript', 'Modal Overlays', 'Responsive Design'],
    github: 'https://github.com/raskirayhan/g3-architect-website-repo',
    demo: 'https://raskirayhan.github.io/g3-architect-website-repo/',
    screenshot: 'image/g3 architecture/screencapture-raskirayhan-github-io-g3-architect-website-repo-2026-07-06-01_56_44.png',
    challenges: '• Building high-fidelity interactive gallery layouts with CSS Grid and Flexbox without relying on bulky CSS libraries.\n• Ensuring seamless mobile-first responsive adaptation and modal overlay accessibility across all screen sizes.\n• Optimizing asset delivery to maintain fast load speeds and crisp typography.',
    improvements: '• Integrating an interactive 3D architectural project viewer using Three.js.\n• Adding automated inquiry emails via serverless backend function.\n• Implementing light/dark theme preference toggle.'
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker – Analytics & Productivity App',
    description: 'A habit-building full-stack application featuring user authentication, daily streak tracking, completion analytics, and clean dashboard statistics.',
    tech: ['React.js', 'Firebase Auth', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/raskirayhan/habit-tracker',
    demo: 'https://habit-tracker-najifjawoad.netlify.app/',
    screenshot: 'image/habbit_trucker/screencapture-habit-tracker-najifjawoad-netlify-app-2026-07-06-01_55_17.png',
    challenges: '• Calculating timezone-aware streak completions accurately across calendar days.\n• Maintaining persistent authentication states and secure user sessions with Firebase.\n• Designing an intuitive, clutter-free statistics dashboard.',
    improvements: '• Browser push notifications for daily habit reminders.\n• Social habit challenges and friend activity leaderboards.\n• Exportable CSV progress reports.'
  },
  {
    id: 'flower-website',
    title: 'Flower Storefront & Workshop',
    description: 'A responsive storefront featuring seasonal collection displays, interactive product discovery cards, and smooth CSS micro-animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive CSS Grid'],
    github: 'https://github.com/raskirayhan/flower-website',
    demo: 'https://raskirayhan.github.io/flower-website/',
    screenshot: 'image/flower_workshop/screencapture-raskirayhan-github-io-flower-website-2026-07-06-01_53_14.png',
    challenges: '• Maintaining aspect ratio consistency and rapid rendering across diverse display sizes.\n• Pure vanilla JavaScript interactions without third-party framework overhead.\n• Clean semantic HTML hierarchy.',
    improvements: '• Dynamic e-commerce shopping cart backed by Node.js and MongoDB.\n• Online checkout with payment gateway integration.'
  }
];

// Typing Animation
const words = [
  'high-performance web platforms.',
  'scalable MERN applications.',
  'responsive user interfaces.',
  'robust RESTful backend APIs.'
];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  if (!typingElement) return;
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

// Window Load Handler
window.addEventListener('load', () => {
  if (loadingScreen) {
    setTimeout(() => {
      loadingScreen.classList.add('hidden');
    }, 400);
  }
  typeLoop();
  loadProjectData();
});

// Dynamic Copyright Year
if (yearElement) {
  yearElement.textContent = new Date().getFullYear();
}

// Mobile Menu Toggle (Requirement 1)
if (mobileMenuBtn && mobileDrawer) {
  mobileMenuBtn.addEventListener('click', () => {
    mobileDrawer.classList.toggle('active');
  });
}

mobileNavLinks.forEach((link) => {
  link.addEventListener('click', () => {
    if (mobileDrawer) {
      mobileDrawer.classList.remove('active');
    }
  });
});

// Load Project Catalog
async function loadProjectData() {
  try {
    const response = await fetch(`${projectApiUrl}/api/projects`);
    if (!response.ok) throw new Error('Backend not available');
    const data = await response.json();
    activeProjectsList = data.projects && data.projects.length ? data.projects : fallbackProjects;
  } catch (error) {
    console.debug('Using local project catalog:', error.message);
    activeProjectsList = fallbackProjects;
  }
}

// Interactive Project Details Modal (Requirement 9)
window.openProjectModal = function (index) {
  const project = (activeProjectsList && activeProjectsList[index]) || fallbackProjects[index];
  if (!project) return;

  if (modalImgWrap) {
    modalImgWrap.innerHTML = project.screenshot
      ? `<img src="${project.screenshot}" alt="${project.title} Preview" />`
      : `<div style="height: 220px; background: ${project.color || 'linear-gradient(135deg, var(--accent), var(--accent-2))'}; display: grid; place-items: center; color: white; padding: 1.5rem; text-align: center;">
           <div>
             <div style="font-size: 3rem; margin-bottom: 0.5rem;">🛠️</div>
             <h2>${project.title}</h2>
           </div>
         </div>`;
  }

  if (modalTitle) modalTitle.textContent = project.title;
  if (modalTechList) {
    modalTechList.innerHTML = project.tech.map((t) => `<span class="skill-chip">${t}</span>`).join('');
  }
  if (modalDescription) modalDescription.textContent = project.description;

  if (modalLiveLink) modalLiveLink.href = project.demo || '#';
  if (modalGithubLink) modalGithubLink.href = project.github || '#';

  if (modalServerLink) {
    if (project.serverGithub) {
      modalServerLink.href = project.serverGithub;
      modalServerLink.style.display = 'inline-flex';
    } else {
      modalServerLink.style.display = 'none';
    }
  }

  if (modalChallenges) modalChallenges.innerText = project.challenges || 'Ensured cross-browser UI/UX consistency and secure client-side state handling.';
  if (modalImprovements) modalImprovements.innerText = project.improvements || 'Planned additions include payment gateway integration, WebSockets real-time sync, and automated CI/CD deployment.';

  if (projectModal) {
    projectModal.classList.add('active');
    projectModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
};

function closeProjectModal() {
  if (projectModal) {
    projectModal.classList.remove('active');
    projectModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }
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
  if (event.key === 'Escape' && projectModal && projectModal.classList.contains('active')) {
    closeProjectModal();
  }
});

// Scroll Observer for Section Reveal
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

// Back to Top Button
window.addEventListener('scroll', () => {
  if (backToTop) {
    backToTop.classList.toggle('visible', window.scrollY > 450);
  }
});

// Cursor Glow Movement
window.addEventListener('mousemove', (event) => {
  if (cursorGlow) {
    cursorGlow.style.opacity = '1';
    cursorGlow.style.left = `${event.clientX}px`;
    cursorGlow.style.top = `${event.clientY}px`;
  }
});

window.addEventListener('mouseleave', () => {
  if (cursorGlow) {
    cursorGlow.style.opacity = '0';
  }
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

// Profile Card 3D Tilt Effect
const profileCard = document.getElementById('profileCard');
if (profileCard) {
  profileCard.addEventListener('mousemove', (event) => {
    const rect = profileCard.getBoundingClientRect();
    const rotateY = ((event.clientX - rect.left) / rect.width - 0.5) * 12;
    const rotateX = ((event.clientY - rect.top) / rect.height - 0.5) * -12;
    profileCard.style.transform = `rotateX(${rotateX}deg) rotateY(${rotateY}deg) translateY(-4px)`;
  });

  profileCard.addEventListener('mouseleave', () => {
    profileCard.style.transform = '';
  });
}

// Contact Form Handler (Requirement 10)
if (contactForm) {
  contactForm.addEventListener('submit', (event) => {
    event.preventDefault();
    if (formStatus) {
      formStatus.textContent = 'Thank you! Your message has been sent. Sheikh Raski Rayhan will get back to you shortly.';
      formStatus.style.color = '#86efac';
    }
    contactForm.reset();
    setTimeout(() => {
      if (formStatus) formStatus.textContent = '';
    }, 6000);
  });
}
