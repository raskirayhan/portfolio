const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
    title: 'Flower Website',
    description: 'A beautiful e-commerce platform for fresh flowers with elegant product showcase and seamless checkout experience.',
    tech: ['React', 'CSS', 'JavaScript'],
    github: 'https://github.com/raskirayhan/flower-website.git',
    demo: 'https://raskirayhan.github.io/flower-website/',
    screenshot: '/image/flower_workshop/screencapture-raskirayhan-github-io-flower-website-2026-07-06-01_53_14.png',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #f97316, #ea580c)'
  },
  {
    id: 2,
    title: 'Habit Tracker',
    description: 'A powerful habit tracking application to visualize progress, stay motivated, and build consistent routines.',
    tech: ['React', 'TypeScript', 'Tailwind'],
    github: 'https://github.com/raskirayhan/habit-tracker.git',
    demo: 'https://habit-tracker-najifjawoad.netlify.app/',
    screenshot: '/image/habbit_trucker/screencapture-habit-tracker-najifjawoad-netlify-app-2026-07-06-01_55_17.png',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #6366f1, #8b5cf6)'
  },
  {
    id: 3,
    title: 'G3 Architects',
    description: 'A professional architecture firm website showcasing portfolio, team, and services with modern design.',
    tech: ['HTML', 'CSS', 'JavaScript'],
    github: 'https://github.com/raskirayhan/g3-architect-website-repo',
    demo: 'https://raskirayhan.github.io/g3-architect-website-repo/',
    screenshot: '/image/g3 architecture/screencapture-raskirayhan-github-io-g3-architect-website-repo-2026-07-06-01_56_44.png',
    caseStudy: '#',
    color: 'linear-gradient(135deg, #f59e0b, #fbbf24)'
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
