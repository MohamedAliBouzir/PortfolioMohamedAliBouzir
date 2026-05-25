import Fermli from "@/assets/images/jpg/fermli.png"
import Ieee from "@/assets/images/jpg/ieee.jpeg"
import IeeeMa from "@/assets/images/jpg/ieeema.png"
import Store2000 from "@/assets/images/jpg/store2000.svg";
import Sodecor from "@/assets/images/jpg/sodecor.jpg"
import Elissabet from "@/assets/images/jpg/elissabet.jpg"
import Effia from "@/assets/images/jpg/Effia.png"
import Expert from "@/assets/images/jpg/expert.png"
import D2M from "@/assets/images/jpg/D2M.png"
export const projectsData = [
  {
    id: 0,
    name: "Classified National Project",
    link: null,
    type: ["web", "mobile", "pwa", "cli", "desktop"],
    logo: null,
    restricted: true,
    description: "Restricted under national confidentiality directives. Sole architect and lead engineer of a high-concurrency, enterprise-grade distributed platform. Engineered a 4-layer data integrity model combining idempotency guards, distributed Redis locks, optimistic concurrency versioning, and atomic SQL constraints. Designed a multi-tenant PostgreSQL isolation layer with a schema-per-tenant strategy and a zero-trust authentication system using opaque Redis session tokens with HttpOnly/Secure cookies. Built an asynchronous event pipeline via BullMQ decoupling all side-effects from the critical request path. Real-time risk exposure enforced via atomic Lua scripts in Redis. Led cross-functional teams enforcing strict DTO-only module boundaries and ADR-driven architectural governance.",
    technologies: ["NestJS", "Next.js", "Flutter", "PostgreSQL", "Redis", "Prisma", "BullMQ", "Docker", "CI/CD", "TypeScript"],
  },
  {
    id: 1,
    name: "IEEE ISSATSo SB Web Site",
    link: "https://issatso.ieee.tn/",
    type: ["web"],
    logo: Ieee,
    description: "Official website for the IEEE ISSATSo Student Branch. Built a fully responsive platform to showcase events, news, and chapter activities for the engineering student community. Integrated Apollo GraphQL for data fetching and used SASS for a maintainable, modular styling architecture.",
    technologies: ["React", "SASS", "Apollo", "GraphQL", "Git"],
  },
  {
    id: 2,
    name: "IEEE ISSATSo MA",
    link: "https://issatso.ieee.tn/ma",
    type: ["web"],
    logo: IeeeMa,
    description: "Sub-portal for the IEEE ISSATSo Membership & Affinity group. Handles member registration flows, event listings, and dynamic content management for the affinity chapter.",
    technologies: ["React", "GraphQL", "Apollo", "SASS"],
  },
  {
    id: 3,
    name: "Fermli",
    link: null,
    type: ["mobile"],
    logo: Fermli,
    description: "Family healthcare and medical inventory tracker. Engineered dynamic dosage synchronization calendars and background tracking loops that fire local push alarms when medication supplies hit critical thresholds. Designed to keep the whole family's health schedule under one unified dashboard.",
    technologies: ["React Native", "Firebase", "Local Notifications", "TypeScript"],
  },
  {
    id: 4,
    name: "Store 2000",
    link: null,
    type: ["mobile"],
    logo: Store2000,
    description: "Hybrid mobile ERP app built for the Store 2000 technical team. Empowers field staff to check tool availability, report tasks, create quotations on the spot, and sync everything back to Odoo v14 in real time. Supports iOS and Android via Ionic Capacitor.",
    technologies: ["React", "Ionic", "Capacitor", "TypeScript", "Odoo", "Python", "OpenAPI"],
  },
  {
    id: 5,
    name: "Elissa Bet",
    link: null,
    type: ["web"],
    logo: Elissabet,
    description: "Online sports betting and casino web application. Delivers real-time odds, live match tracking, casino game interfaces, and a full authentication flow. Optimised for performance under high concurrent traffic with SWR-based data synchronisation.",
    technologies: ["React", "TypeScript", "SWR", "Tailwind CSS", "Daisy UI", "GraphQL", "Apollo"],
  },
  {
    id: 6,
    name: "Data Migration Morpher",
    link: null,
    type: ["web", "cli", "mobile", "desktop"],
    logo: D2M,
    description: "Comprehensive high-performance data migration platform with web, CLI, mobile, and desktop interfaces. Automated the full ETL pipeline — eliminating manual intervention, providing real-time progress tracking, and generating detailed migration reports. Outperformed all major market solutions: migrated a 20M-row, 588-column (~100 GB) Oracle table in just 12 minutes vs 2–3.5 hours for Talend, Spark, and ODI.",
    technologies: ["Python", "Pandas", "Cx_Oracle", "FastAPI", "WebSocket", "React", "TypeScript", "PWA", "MultiProcessing", "MultiThreading"],
  },
  {
    id: 7,
    name: "Sodecor",
    link: "https://www.sodecor-tunisie.com/",
    type: ["web"],
    logo: Sodecor,
    description: "Corporate website for Sodecor Tunisia, a decoration and interior design company. Built a pixel-perfect, fully responsive showcase site with CMS integration via SMOFT ERP, allowing the client to manage content, products, and pages without developer intervention.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "SMOFT ERP"],
  },
  {
    id: 8,
    name: "Expert Auto",
    link: "https://www.auto-expert.tn/",
    type: ["web"],
    logo: Expert,
    description: "Automotive marketplace and service platform for Expert Auto Tunisia. Features vehicle listings, service booking, and a CMS-backed admin panel. Integrated with SMOFT ERP for content and inventory management.",
    technologies: ["HTML", "CSS", "JavaScript", "jQuery", "PHP", "MySQL", "SMOFT ERP"],
  },
  {
    id: 9,
    name: "Effia Be",
    link: "https://www.effia.be/",
    type: ["web"],
    logo: Effia,
    description: "High-traffic parking management platform serving 1000+ active users with real-time space reservations, online payments, and live availability tracking. Built a fully responsive React frontend backed by a scalable Express/Node.js API with MySQL, Socket.io for real-time updates, and Redux for state management.",
    technologies: ["React", "TypeScript", "Material-UI", "Redux", "Socket.io", "Express.js", "Node.js", "MySQL", "Lodash"],
  },
  {
    id: 11,
    name: "Palmyra",
    link: null,
    type: ["web"],
    logo: null,
    description: "Netflix-inspired educational streaming platform for kids. Built a robust parent-child relational schema allowing one parent account to manage 4 strictly isolated, stateful child viewing sessions. Integrated interactive quizzes directly into the video streaming state. Deployed on a self-hosted VPS with a full CI/CD pipeline.",
    technologies: ["NestJS", "Next.js", "PostgreSQL", "TanStack Query", "Framer Motion", "Docker", "CI/CD"],
  },
  {
    id: 12,
    name: "InStock ERP",
    link: null,
    type: ["web"],
    logo: null,
    description: "Dynamic B2C e-commerce engine and CMS dashboard. Engineered a recursive relational catalog schema in PostgreSQL enabling unlimited nested category depth. Leveraged Zustand for high-performance state management, allowing admins to dynamically generate and reorder frontend web content layout slots without any code changes.",
    technologies: ["NestJS", "Next.js", "PostgreSQL", "Zustand", "Tailwind CSS"],
  },
  {
    id: 10,
    name: "Effia Be Dashboard",
    link: "https://ppms-aladin-test.azurewebsites.net/",
    type: ["web"],
    logo: Effia,
    description: "Staff-only restricted portal for managing the Effia Be platform. Covers the full parking space lifecycle (insertion, updates, deletions), user role management, pricing configuration across logical and legal entities, billing, offers, reservations, and subscription tracking. Includes Jasmin (invoice management) and Jafar (PMS hardware integration) sub-modules.",
    technologies: ["React", "TypeScript", "Material-UI", "Redux", "Express.js", "Node.js", "MySQL", "Git", "GitLab"],
  }
];
