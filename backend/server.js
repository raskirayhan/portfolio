const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
    id: 4,
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

app.get('/api/projects', (req, res) => {
  res.json({ projects });
});

app.get('/api/status', (req, res) => {
  res.json({ status: 'ok', message: 'Portfolio backend is live.' });
});

if (require.main === module) {
  app.listen(port, () => {
    console.log(`Portfolio backend running at http://localhost:${port}`);
  });
}

module.exports = { app, projects };
