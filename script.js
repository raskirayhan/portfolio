const typingElement = document.getElementById('typing');
const yearElement = document.getElementById('year');
const backToTop = document.getElementById('backToTop');
const contactForm = document.getElementById('contactForm');
const formStatus = document.getElementById('form-status');
const loadingScreen = document.querySelector('.loading-screen');
const projectGrid = document.getElementById('projectGrid');
const cursorGlow = document.querySelector('.cursor-glow');

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
    const response = await fetch('http://localhost:4000/api/projects');
    if (!response.ok) throw new Error('Backend unavailable');
    const data = await response.json();
    if (data.projects?.length) {
      projectGrid.innerHTML = data.projects
        .map(
          (project) => `
            <article class="project-card reveal">
              <div class="project-visual" style="background: ${project.color};"></div>
              <div class="project-body">
                <h3>${project.title}</h3>
                <p>${project.description}</p>
                <div class="tag-row">
                  ${project.tech.map((tag) => `<span>${tag}</span>`).join('')}
                </div>
                <div class="card-actions">
                  <a href="${project.github}" class="text-link" target="_blank" rel="noreferrer">GitHub</a>
                  <a href="${project.demo}" class="text-link" target="_blank" rel="noreferrer">Live Demo</a>
                  <a href="${project.caseStudy}" class="text-link" target="_blank" rel="noreferrer">Case Study</a>
                </div>
              </div>
            </article>
          `
        )
        .join('');
      document.querySelectorAll('#projectGrid .reveal').forEach((item) => observer.observe(item));
    }
  } catch (error) {
    console.debug('Backend project API not available:', error.message);
  }
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
  formStatus.textContent = 'Thanks for reaching out. I will be in touch soon.';
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
