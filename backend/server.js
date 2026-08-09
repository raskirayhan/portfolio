const express = require('express');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 4000;

app.use(cors());
app.use(express.json());

const projects = [
  {
    id: 1,
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
    id: 2,
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
    id: 3,
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
