import { IExperiencesInterface } from "@/interfaces/experiences-interface";
import ViviaLogo from "@/assets/images/jpg/societies/vivia.jpeg";
import Branding from "@/assets/images/jpg/societies/branding.png";
import Smoft from "@/assets/images/jpg/societies/smoft.jpg";
import Bill from "@/assets/images/jpg/societies/D2M.png";
import SkillWare from "@/assets/images/jpg/societies/skillware.jpeg";
import Digital from "@/assets/images/jpg/societies/digitalmarket.jpeg";
import Codetime from "@/assets/images/jpg/societies/codetime.jpg";
import MayraLogo from "@/assets/images/jpg/societies/mayra logo.png";

export const experienceData: IExperiencesInterface[] = [
  {
    id: 0,
    logo: MayraLogo,
    societeName: "MAYRA Entertainment",
    type: "Contract",
    presence: "On-site",
    location: "Sousse, Tunisia",
    startDate: "Jan 2026",
    endDate: "Present",
    position: "Software Architect & Lead Engineer",
    description: `<div id="mayra-entertainment">
                    <p><strong>Large-scale real-time financial platform</strong> — Designed and owned the end-to-end system architecture of an enterprise-grade prepaid card and transaction engine built to handle intense concurrent user loads safely.</p>

                    <h3>Architecture & Engineering</h3>
                    <ul>
                      <li>Designed a <strong>4-layer transaction security model</strong> combining idempotency guards, distributed Redis locks, optimistic concurrency versioning, and atomic SQL constraints to completely eliminate balance discrepancies and double-spending.</li>
                      <li>Architected a <strong>multi-tenant data isolation layer</strong> using a schema-per-tenant PostgreSQL strategy, enabling a direct, rewrite-free future migration path to a fully isolated microservices topology.</li>
                      <li>Architected a <strong>zero-trust authentication system</strong> using opaque session tokens stored in Redis, HttpOnly/Secure/Strict cookies, and server-side session invalidation, entirely removing token-theft and XSS attack surfaces.</li>
                      <li>Built an <strong>asynchronous audit pipeline</strong> using BullMQ and Redis, decoupling heavy logging, analytics, and telemetry from the primary request lifecycle without adding latency to client responses.</li>
                      <li>Engineered a high-performance transactional core utilizing <strong>atomic Lua scripts in Redis</strong> to freeze transaction states instantly at payment execution and enforce real-time risk exposure monitoring.</li>
                    </ul>

                    <h3>Team Leadership & Governance</h3>
                    <ul>
                      <li>Led backend and frontend engineering teams across the full stack (NestJS, Next.js, PostgreSQL, Redis, Prisma), enforcing strict module encapsulation and cross-module communication contracts via EventEmitter and BullMQ.</li>
                      <li>Established platform-wide architectural governance: enforced <strong>DTO-only boundaries</strong>, banned direct cross-module database access, and mandated event-driven side effects to drastically reduce system coupling and allow independent team shipping.</li>
                      <li>Produced comprehensive Architectural Decision Records (ADRs) and integration specification documentation to smoothly satisfy strict regulatory and banking compliance workflows.</li>
                    </ul>

                    <h3>Integrations & Testing</h3>
                    <ul>
                      <li>Integrated third-party payment infrastructure, designing a fully traceable deposit flow from frontend initialization through backend confirmation down to atomic account balance mutations.</li>
                      <li>Implemented an extensive automated E2E and unit test suite simulating adversarial conditions to validate concurrent operations, session lifecycles, and edge-case error bounds.</li>
                    </ul>
                  </div>`,
    technologies: [
      "NestJS",
      "Next.js",
      "TypeScript",
      "PostgreSQL",
      "Redis",
      "Prisma",
      "BullMQ",
      "Docker",
      "CI/CD",
      "Zustand",
      "Tanstack",
      "Tailwind CSS",
      "shadcn/ui",
      "Framer Motion",
    ],
  },
  {
    id: 1,
    logo: ViviaLogo,
    societeName: "VIVIA-M",
    type: "Full-time",
    presence: "Hybrid",
    startDate: "Apr 2024",
    endDate: "Present",
    position: "Software Engineer",
    description: `<div id="erp-project">
                    <p><strong>Enterprise Parking ERP Ecosystem (EFFIA Belgium)</strong> — Leading the development and performance optimization of a massive, configuration-driven multi-platform ERP managing <strong>10,000+ active daily users</strong> across European smart parking infrastructure.</p>

                    <h3>Key Architectural Contributions & Achievements</h3>
                    <ul>
                      <li>
                        <strong>IoT & Hardware Orchestration (B2B Jafar):</strong> Developed the edge-integration pipelines linking backend APIs with physical <strong>Skidata and WPS hardware</strong>, translating user reservations into automated license plate recognition data and real-time QR access codes.
                      </li>
                      <li>
                        <strong>FinTech & Compliance (B2B Jasmin):</strong> Built the core financial analytics engine tracking revenue flux, handling automated invoicing, and integrating the <strong>PEPPOL protocol</strong> for direct, compliant reporting to the Belgian government.
                      </li>
                      <li>
                        <strong>Staged Task Scheduling:</strong> Re-engineered a heavy, resource-blocking background scheduling setup into a single, highly optimized midnight <strong>Master Cron engine</strong> that dynamically schedules isolated, single-execution worker jobs for subscription billing and cache management.
                      </li>
                      <li>
                        <strong>Performance Engineering:</strong> Delivered a <strong>+20% speed optimization on initial app boot</strong> across multiple portals by implementing code-splitting, route-level lazy loading, and custom caching layers. Refactored bottlenecked synchronous endpoints into parallel async execution tracks.
                      </li>
                      <li>
                        <strong>Client-Facing Mobility Architecture:</strong> Built the modular B2C interface covering reservation lookups, dynamic pricing grids, and secure payment processing utilizing <strong>Worldline</strong>. Enforced route-level role protection and SEO indexing optimizations with React Helmet.
                      </li>
                      <li>
                        <strong>Technical Governance:</strong> Assumed ownership of product quality by conducting rigorous code reviews, maintaining design systems from Figma inputs, and dockerizing full-stack modules for clean deployment.
                      </li>
                    </ul>
                  </div>`,
    technologies: [
      "React",
      "Typescript",
      "Redux",
      "Material UI",
      "React-i18next",
      "React Form Hook",
      "lodash",
      "Socket.io",
      "Express",
      "Node.js",
      "Javascript",
      "Sequalize",
      "MySQL",
    ],
  },
  {
    id: 2,
    logo: Branding,
    type: "Freelance",
    presence: "Full-remote",
    societeName: "Branding Route",
    startDate: "Feb 2025",
    endDate: "Jul 2025",
    position: "IT Consultant",
    description: `<div id="muscle-meet">
                    <p><strong>Muscle Meet Mobile Ecosystem</strong> — Retained to systematically refactor, modularize, and upgrade the technical footprint of a scaling cross-platform fitness application.</p>

                    <h3>Main Contributions</h3>
                    <ul>
                      <li>Refactored legacy React Native mobile modules to enforce strict architectural typing, boost rendering stability, and support scaling features.</li>
                      <li>Upgraded backend controller methods with Express.js and MongoDB, deploying index optimization patches to accelerate data aggregation response times.</li>
                      <li>Built a dedicated, real-time web administration backoffice dashboard using React and Vite to streamline system configuration and content management.</li>
                      <li>Integrated a unified, secure single-sign-on (SSO) authentication pipeline across both the mobile and web modules using <strong>Keycloak</strong>.</li>
                    </ul>
                  </div>`,
    technologies: [
      "React",
      "React Native",
      "Typescript",
      "Keycloak",
      "Vite",
      "SASS",
      "GraphQL",
      "Apollo",
    ],
  },
  {
    id: 3,
    logo: Smoft,
    type: "Full-time",
    presence: "On-site",
    societeName: "SMOFT ERP",
    startDate: "Feb 2024",
    endDate: "Apr 2024",
    position: "Full-stack Developer",
    description: `<div id="smoft-erp">
                    <p><strong>High-Velocity Enterprise Integration</strong> — Delivered immediate engineering impact under a tight 2-month contract by jumping into a native ecosystem and rapidly shipping integrated client interfaces and ERP core updates.</p>
                    
                    <h3>Key Achievements</h3>
                    <ul>
                      <li>Successfully architected, tested, and shipped <strong>two complete web applications</strong> from scratch, establishing direct data sync frameworks with the centralized core ERP backend.</li>
                      <li>Developed native Content Management System (CMS) modules and dynamic dashboards, enabling clients to natively manage external platform data and assets directly through the ERP core.</li>
                      <li>Audited and refactored legacy client-side routines using asynchronous <strong>AJAX and optimized jQuery</strong> data fetching, dropping server payload weights and enhancing user responsiveness.</li>
                    </ul>
                  </div>`,
    technologies: [
      "HTML",
      "CSS",
      "Javascript",
      "JQuery",
      "AJAX",
      "PHP",
      "MySQL",
    ],
  },
  {
    id: 4,
    logo: Bill,
    type: "Full-time",
    presence: "Hybrid",
    societeName: "Billcom Consulting",
    startDate: "Jan 2023",
    endDate: "Aug 2023",
    position: "Software Engineer (Data Pipelines)",
    description: `<div id="data-migration-morpher">
                    <p><strong>DataMigrationMorpher (D2M) Project</strong> — Led the end-to-end architecture, engine design, and full-stack development of a custom, high-speed, enterprise-grade ETL (Extract, Transform, Load) application.</p>
                    
                    <h3>Notable Performance Architecture Breakthrough</h3>
                    <p>
                      Engineered a custom concurrent processing engine that completely outpaced standard industry alternatives. Migrating a massive relational production database containing <strong>20 million rows and 599 columns (~100 GB of data)</strong> across distinct remote hosts on a limited RedHat Unix environment, performance rates yielded:
                    </p>
                    <ul>
                      <li><strong>Traditional Industry Standard (SSIS, Spark, Talend):</strong> Averaged 2 to 3.5 hours of processing overhead, with physical SSIS tests crashing under out-of-memory (OOM) load constraints.</li>
                      <li><strong>DataMigrationMorpher (D2M):</strong> Completed the entire end-to-end data transfer safely and with full validity in <strong>just 12 minutes</strong>.</li>
                    </ul>

                    <h3>Core Technical Achievements</h3>
                    <ul>
                      <li>Designed a highly concurrent master-worker architecture using a specialized <strong>10-process / 10-thread pipeline topology</strong> in Python to ingest, partition, and bulk-load data in parallel chunks.</li>
                      <li>Overcame host memory starvation crashes by implementing a strategy that offloaded raw data blocks straight to disk storage, preserving system RAM exclusively for fast CPU-bound mathematical operations and transformation mappings.</li>
                      <li>Accelerated injection rates by building scripts to programmatically drop database table indexes pre-load and rebuild them post-load, paired with a self-healing routine to systematically isolate and retry individual row failures.</li>
                      <li>Built an interactive Progressive Web App (PWA) management panel utilizing <strong>WebSockets</strong> to stream real-time telemetry, data ingestion metrics, and live pipeline status straight to user screens.</li>
                    </ul>
                  </div>`,
    technologies: [
      "Python",
      "Cx_Oracle",
      "ETL",
      "Processus",
      "Threads",
      "Signals",
      "Bash",
      "Shell",
      "CSV",
      "Pandas",
      "WebSocket",
      "Typescript",
      "Vite",
      "React",
      "PWA",
    ],
  },
  {
    id: 5,
    logo: SkillWare,
    type: "Part-time",
    presence: "Hybrid",
    societeName: "Skillware Company",
    startDate: "Jan 2022",
    endDate: "Mar 2023",
    position: "Software Engineer (Frontend & Performance)",
    description: `<div id="skillware-betting">
                    <p><strong>Sports & Live Wagering Platforms</strong> — Engineered responsive, highly performant frontend systems for real-time betting platforms, focusing heavily on runtime execution, secure async state, and core web vitals optimization.</p>

                    <h3>Key Achievements</h3>
                    <ul>
                      <li>Boosted platform Google PageSpeed Insights (PSI) KPIs by <strong>17%</strong> and slashed page-load time by over <strong>25%</strong> across all application routes.</li>
                      <li>Achieved performance targets by auditing layout updates and enforcing advanced React optimizations, including <strong>React.memo, useMemo, useCallback, Higher-Order Components (HOCs), and Lazy/Suspense code-splitting</strong>.</li>
                      <li>Eliminated data race conditions and client-side view glitches under rapid real-time updates by implementing custom cursor-based pagination and exponential backoff retry algorithms.</li>
                      <li>Embedded and secured complex third-party interactive gaming iFrames, managing multi-component state sharing natively via centralized React Context.</li>
                      <li>Contributed to full-stack features by optimizing backend data objects, structuring strict TypeScript typings, and configuring secure HttpOnly cookies for session TTL tokens.</li>
                      <li>Translated complex, high-fidelity Figma specifications into pixel-perfect, responsive layouts using Tailwind CSS.</li>
                    </ul>
                  </div>`,
    technologies: [
      "Next.js",
      "React",
      "Typescript",
      "SWR",
      "Tailwind CSS",
      "Daisy UI",
      "GraphQL",
      "Apollo",
    ],
  },
  {
    id: 6,
    logo: Digital,
    type: "Part-time",
    presence: "Hybrid",
    societeName: "Freelance",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    position: "Mobile Developer",
    description: `<div id="store-2000">
                    <p><strong>Store 2000 Field Logistics App</strong> — Conceived and built a custom hybrid mobile ERP extension app to liberate field technician workflows from dense desktop administration portals.</p>

                    <h3>Key Achievements</h3>
                    <ul>
                      <li>Architected and launched a hybrid mobile application utilizing <strong>React, TypeScript, Ionic, and Capacitor</strong>, fully integrated with a backend <strong>Odoo ERP</strong> instance over custom OpenAPI endpoints.</li>
                      <li>Built real-time background location tracking tools allowing automated updates of on-duty status and real-time field navigation paths to client targets.</li>
                      <li>Designed a dynamic field intervention tool enabling workers to build complex custom configurations from live inventory components and instantly generate client invoices.</li>
                      <li>Solved critical cross-origin (CORS) connection bottlenecks during initial server deployments by restructuring and optimizing <strong>Nginx reverse proxy configurations</strong>.</li>
                    </ul>
                  </div>`,
    technologies: ["React", "Ionic", "Capacitor", "CSS", "Typescript"],
  },
  {
    id: 7,
    logo: Codetime,
    type: "Internship",
    presence: "Full-remote",
    societeName: "Code Time",
    startDate: "Jul 2021",
    endDate: "Oct 2021",
    position: "Software Engineering Intern (Automation)",
    description: `<div id="code-time-noe">
                    <p><strong>Project NOE Regression Automation</strong> — Tasked with mapping and automating the quality assurance pipeline for a complex web application with extensive multi-interface user workflows.</p>

                    <h3>Key Achievements</h3>
                    <ul>
                      <li>Overcame massive human test simulation bottlenecks by designing a custom parallel testing engine in Python using a hybrid <strong>Multiprocessing and Multithreading framework</strong>.</li>
                      <li>Successfully optimized execution overhead, crashing regression testing loops down from an initial 30 hours to <strong>just 25 minutes</strong>.</li>
                      <li>Developed dynamic latency-aware test handlers that monitored interface responsiveness via automated background pings, launching thread workers the instant UI visibility was verified.</li>
                      <li>Built an automated endpoint scanner that iterated through application routers to catalog and validate core API server response error codes.</li>
                      <li>Configured scheduled system cron jobs to trigger automated regression passes twice daily, establishing hands-free validation.</li>
                    </ul>
                  </div>`,
    technologies: ["HTML", "Xpath", "Python", "MariaDB", "Selenium"],
  },
];