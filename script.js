const typingElement = document.getElementById('typing');
const yearElement = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const loadingScreen = document.querySelector('.loading-screen');
const projectGrid = document.getElementById('projectGrid');
const cursorGlow = document.querySelector('.cursor-glow');
const projectApiUrl = window.PORTFOLIO_API_URL || 'http://localhost:4000';

const fallbackProjects = [
  {
    title: 'Flower Website',
    description: 'A responsive flower storefront with product discovery, seasonal messaging, and a polished visual system.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/raskirayhan/flower-website',
    demo: 'https://raskirayhan.github.io/flower-website/',
    screenshot: 'image/flower_workshop/screencapture-raskirayhan-github-io-flower-website-2026-07-06-01_53_14.png'
  },
  {
    title: 'Habit Tracker',
    description: 'A habit-building experience with authentication, progress tracking, public habits, and responsive interactions.',
    tech: ['React', 'Firebase', 'MongoDB'],
    github: 'https://github.com/raskirayhan/habit-tracker',
    demo: 'https://habit-tracker-najifjawoad.netlify.app/',
    screenshot: 'image/habbit_trucker/screencapture-habit-tracker-najifjawoad-netlify-app-2026-07-06-01_55_17.png'
  },
  {
    title: 'G3 Architects',
    description: 'A responsive architecture studio landing page focused on clear hierarchy, services, and project storytelling.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/raskirayhan/g3-architect-website-repo',
    demo: 'https://raskirayhan.github.io/g3-architect-website-repo/',
    screenshot: 'image/g3 architecture/screencapture-raskirayhan-github-io-g3-architect-website-repo-2026-07-06-01_56_44.png'
  }
];

const words = ['fast, scalable products.', 'beautiful user experiences.', 'modern MERN solutions.'];
let wordIndex = 0;
let charIndex = 0;
let deleting = false;

function typeLoop() {
  const currentWord = words[wordIndex];

  if (!deleting) {
    typingElement.textContent = currentWord.slice(0, ++charIndex);
    if (charIndex === currentWord.length) {
      deleting = true;
      setTimeout(typeLoop, 1100);
      return;
    }
  } else {
    typingElement.textContent = currentWord.slice(0, --charIndex);
    if (charIndex === 0) {
      deleting = false;
      wordIndex = (wordIndex + 1) % words.length;
    }
  }

  setTimeout(typeLoop, deleting ? 55 : 90);
}

window.addEventListener('load', () => {
  setTimeout(() => {
    loadingScreen.classList.add('hidden');
  }, 700);
  typeLoop();
  loadProjectData();
  initAnimations();
});

yearElement.textContent = new Date().getFullYear();

async function loadProjectData() {
  try {
    const response = await fetch(`${projectApiUrl}/api/projects`);
    if (!response.ok) throw new Error('Backend unavailable');
    const data = await response.json();
    renderProjects(data.projects?.length ? data.projects : fallbackProjects);
  } catch (error) {
    console.debug('Backend project API not available; using static catalog:', error.message);
    renderProjects(fallbackProjects);
  }
}

function renderProjects(projects) {
  projectGrid.innerHTML = projects
    .map(
      (project) => `
        <article class="project-card reveal">
          ${project.screenshot ? `<div class="project-visual"><img src="${project.screenshot}" alt="${project.title} screenshot" style="width: 100%; height: 100%; object-fit: cover;"></div>` : `<div class="project-visual" style="background: ${project.color};"></div>`}
          <div class="project-body">
            <h3>${project.title}</h3>
            <p>${project.description}</p>
            <div class="tag-row">
              ${project.tech.map((tag) => `<span>${tag}</span>`).join('')}
            </div>
            <div class="card-actions">
              <a href="${project.github}" class="text-link" target="_blank" rel="noreferrer">GitHub</a>
              <a href="${project.demo}" class="text-link" target="_blank" rel="noreferrer">Live Demo</a>
              ${project.caseStudy && project.caseStudy !== '#' ? `<a href="${project.caseStudy}" class="text-link" target="_blank" rel="noreferrer">Case Study</a>` : ''}
            </div>
          </div>
        </article>
      `
    )
    .join('');
  document.querySelectorAll('#projectGrid .reveal').forEach((item) => observer.observe(item));
}

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((item) => observer.observe(item));

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('visible', window.scrollY > 500);
});

window.addEventListener('mousemove', (event) => {
  cursorGlow.style.opacity = '1';
  cursorGlow.style.left = `${event.clientX}px`;
  cursorGlow.style.top = `${event.clientY}px`;
});

window.addEventListener('mouseleave', () => {
  cursorGlow.style.opacity = '0';
});

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

contactForm.addEventListener('submit', (event) => {
  event.preventDefault();
  formStatus.textContent = 'Thanks for reaching out. This preview form is not connected yet; please email raskirayhan@gmail.com directly.';
  contactForm.reset();
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
