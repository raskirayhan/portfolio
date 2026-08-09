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
const modalChallenges = document.getElementById('modalChallenges');
const modalImprovements = document.getElementById('modalImprovements');

const projectApiUrl = window.PORTFOLIO_API_URL || 'http://localhost:4000';

let activeProjectsList = [];

const fallbackProjects = [
  {
    id: 'fixitnow',
    title: 'FixItNow - Full-Stack Service Marketplace',
    description: 'A comprehensive full-stack service booking and repair platform connecting customers with verified technicians. Features role-based dashboards, appointment scheduling, real-time booking tracking, and customer review workflows.',
    tech: ['TypeScript', 'Next.js', 'React', 'Node.js', 'Express', 'MongoDB', 'Prisma'],
    github: 'https://github.com/raskirayhan/FixItNow-',
    demo: 'https://raskirayhan.github.io/FixItNow-/',
    screenshot: '',
    color: 'linear-gradient(135deg, #0ea5e9, #6366f1)',
    challenges: 'Architecting complex multi-role authorization (Customer, Provider, Admin) while preventing conflicting appointment time slot bookings in real-time.',
    improvements: 'Adding online payment gateway integration (Stripe / SSLCommerz), WebSockets live chat between customer & technician, and GPS location tracking.'
  },
  {
    id: 'habit-tracker',
    title: 'Habit Tracker Application',
    description: 'A habit-building full-stack application featuring user authentication, daily streak tracking, completion analytics, and clean dashboard statistics.',
    tech: ['React', 'Firebase Auth', 'MongoDB', 'Node.js', 'Tailwind CSS'],
    github: 'https://github.com/raskirayhan/habit-tracker',
    demo: 'https://habit-tracker-najifjawoad.netlify.app/',
    screenshot: 'image/habbit_trucker/screencapture-habit-tracker-najifjawoad-netlify-app-2026-07-06-01_55_17.png',
    challenges: 'Managing real-time state synchronization for habit completion counters and timezone adjustments across user accounts while ensuring secure Firebase authentication.',
    improvements: 'Implement push notifications for daily habit reminders, social habit challenges among friends, and exported CSV progress reports.'
  },
  {
    id: 'flower-website',
    title: 'Flower Storefront & Workshop',
    description: 'A responsive flower storefront featuring seasonal collection displays, interactive product cards, shopping cart workflow, and smooth micro-animations.',
    tech: ['HTML5', 'CSS3', 'JavaScript (ES6+)', 'Responsive Design'],
    github: 'https://github.com/raskirayhan/flower-website',
    demo: 'https://raskirayhan.github.io/flower-website/',
    screenshot: 'image/flower_workshop/screencapture-raskirayhan-github-io-flower-website-2026-07-06-01_53_14.png',
    challenges: 'Designing a fully responsive grid system across mobile, tablet, and ultra-wide desktops while maintaining visual hierarchy, aspect ratios, and fast image loading speeds.',
    improvements: 'Plan to integrate a full dynamic e-commerce shopping cart backed by Node.js and MongoDB with user authentication and Stripe payment integration.'
  },
  {
    id: 'g3-architects',
    title: 'G3 Architects Studio Portfolio',
    description: 'A modern, high-impact architecture studio landing page focused on bold typography, responsive service showcases, team highlights, and contact integration.',
    tech: ['HTML5', 'Vanilla CSS', 'JavaScript', 'CSS Grid & Flexbox'],
    github: 'https://github.com/raskirayhan/g3-architect-website-repo',
    demo: 'https://raskirayhan.github.io/g3-architect-website-repo/',
    screenshot: 'image/g3 architecture/screencapture-raskirayhan-github-io-g3-architect-website-repo-2026-07-06-01_56_44.png',
    challenges: 'Ensuring seamless cross-browser layout consistency and mobile navigation drawer accessibility without relying on third-party CSS frameworks.',
    improvements: 'Add an interactive 3D architectural project viewer (Three.js), dark/light theme switcher, and automated client inquiry backend API.'
  }
];

const words = ['scalable web applications.', 'full-stack MERN products.', 'interactive user experiences.'];
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
  initAnimations();
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
                   <strong style="color: white; font-size: 1.1rem; margin-top: 0.5rem;">${project.title}</strong>
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

  modalChallenges.textContent = project.challenges || 'Managed UI/UX responsive layouts and seamless client-side state handling.';
  modalImprovements.textContent = project.improvements || 'Adding micro-interactions, dark mode persistence, and automated CI/CD deployment.';

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

function initAnimations() {
  if (window.Swiper) {
    new Swiper('.swiper', {
      loop: true,
      autoplay: {
        delay: 4500,
        disableOnInteraction: false
      },
      pagination: {
        el: '.swiper-pagination',
        clickable: true
      }
    });
  }

  if (window.framerMotion) {
    const { animate, stagger } = window.framerMotion;
    const cards = document.querySelectorAll('.skill-card, .project-card, .service-card, .blog-card');
    animate(
      cards,
      { opacity: [0, 1], y: [12, 0] },
      { duration: 0.5, delay: stagger(0.06) }
    );
  }
}
