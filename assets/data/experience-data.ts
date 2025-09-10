import { IExperiencesInterface } from "@/interfaces/experiences-interface";
import ViviaLogo from "@/assets/images/jpg/societies/vivia.jpeg";
import Branding from "@/assets/images/jpg/societies/branding.png";
import Smoft from "@/assets/images/jpg/societies/smoft.jpg";
import Bill from "@/assets/images/jpg/societies/D2M.png";
import SkillWare from "@/assets/images/jpg/societies/skillware.jpeg";
import Digital from "@/assets/images/jpg/societies/digitalmarket.jpeg";
import Codetime from "@/assets/images/jpg/societies/codetime.jpg";
export const experienceData: IExperiencesInterface[] = [
  {
    id: 1,
    logo: ViviaLogo,
    societeName: "VIVIA-M",
    type: "Full-time",
    presence: "Hybrid",
    startDate: "Apr 2024",
    endDate: "Present",
    position: "Full-stack JS Engineer",
    description: `<div id="erp-project">
                    <p><strong>Client:</strong> Leading European Stationing Company</p>
                    <p><strong>Tech Stack:</strong> React.js, Express.js, MySQL, Docker</p>

                    <p>
                      I am actively contributing to the development of a highly flexible, configuration-driven ERP platform tailored for a major European stationing company. The system is designed to empower business teams to customize workflows and features without requiring changes to the underlying codebase.
                    </p>

                    <h3>Key Responsibilities & Achievements</h3>
                    <ul>
                      <li>
                        <strong>Client Communication & Requirements Gathering:</strong>
                        Maintained direct communication with the client and stakeholders to gather, refine, and validate functional and technical requirements. This ensured strong alignment with business needs and allowed for rapid feedback loops.
                      </li>
                      <li>
                        <strong>Frontend Development:</strong>
                        Built scalable, reusable, and modular UI components using React.js, structured around a dynamic configuration layer for high adaptability across different business modules.
                      </li>
                      <li>
                        <strong>Design-to-Code Collaboration:</strong>
                        Worked closely with the design team to migrate Figma-based UI/UX templates into fully responsive and pixel-perfect frontend components.
                      </li>
                      <li>
                        <strong>Backend API Development:</strong>
                        Developed robust and scalable RESTful APIs with Express.js, leveraging MySQL for structured and efficient data storage.
                      </li>
                      <li>
                        <strong>Third-Party Service Integrations:</strong>
                        Integrated various external services including:
                        <ul>
                          <li><strong>Brevo (formerly Sendinblue):</strong> For dynamic email workflows</li>
                          <li><strong>Wordline:</strong> For secure and compliant online payments</li>
                          <li><strong>Auth0:</strong> For authentication and role-based access control</li>
                          <li><strong>Google Maps API:</strong> For station geolocation and visualization</li>
                        </ul>
                      </li>
                      <li>
                        <strong>Internal Library Development:</strong>
                        Contributed to the development and maintenance of proprietary, closed-source libraries used across the ERP platform, encapsulating shared logic, components, and utilities.
                      </li>
                      <li>
                        <strong>System Architecture & Optimization:</strong>
                        Dockerized the entire application for consistent deployment. Improved performance with caching, query optimization, and frontend lazy loading techniques.
                      </li>
                      <li>
                        <strong>Security & Compliance:</strong>
                        Ensured secure handling of personal data and full adherence to modern privacy and security standards.
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
    position: "Front-end Engineer",
    description: `<div id="muscle-meet">
                    <h2>Muscle Meet – Mobile App Refactor & Backoffice</h2>

                    <p>
                      Contributed to refactoring and upgrading the codebase of <strong>Muscle Meet</strong>, a mobile fitness app, with a focus on improving code quality, performance, and maintainability.
                    </p>

                    <h3>Main Contributions</h3>
                    <ul>
                      <li>Refactored the existing React Native app to enhance structure, readability, and long-term scalability</li>
                      <li>Upgraded backend logic using Express.js and MongoDB to improve data handling and performance</li>
                      <li>Built a custom web-based backoffice using React to manage app content and user-related data</li>
                      <li>Implemented authentication using <strong>Keycloak</strong> for secure login across both mobile and web platforms</li>
                      <li>Improved developer experience with cleaner architecture and reusable components</li>
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
    description: `<div>
                    <p>
                      I contributed to the projects <strong>Sodecor</strong>, <strong>La Galerie Ben Zineb</strong>, and <strong>Auto Expert</strong>.
                    </p>
                    <p>
                      I also developed the content management system (CMS) portion of <strong>SMOFT ERP</strong>, integrating websites developed with the ERP.
                    </p>
                    <p>
                      Most of my work focused on front-end development, where I built intuitive user interfaces and created features that allow users to consult, add, update, and remove website content directly from SMOFT ERP.
                    </p>
                    <p>
                      Additionally, I ensured the CMS dashboard functionalities were stable and user-friendly, enabling web app managers to quickly update and modify their websites with ease.
                    </p>
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
    position: "Data Engineer",
    description: `<div>
                    <h2>DataMigrationMorpher (D2M) Project</h2>
                    <p>
                      As the sole developer of DataMigrationMorpher (D2M), I led the design and implementation of the application's architecture. Using PyDash, I optimized all methods to enhance performance and deliver the best results for clients.
                    </p>
                    <strong>Key Achievements: </strong>
                    <ul>
                      <li>Conceptualized and developed D2M from inception to deployment, incorporating custom data mappings, transformation rules, and error handling mechanisms.</li>
                      <li>Implemented a robust and scalable architecture ensuring optimal performance and flexibility for users.</li>
                      <li>Provided technical guidance and support to stakeholders, demonstrating expertise in data migration best practices.</li>
                    </ul>
                    <p>I am proud of the performance improvements achieved:</p>
                    <strong>Notable Performance Achievement: </strong>
                    <p>
                      D2M outperforms all major solutions in the market. For example, migrating BSCS RTX Table with 20 million rows and 588 columns (~100 GB of data) on a Red Hat UNIX server with 32GB RAM, 100GB Hard Disk, and 14 physical cores, D2M execution times were:
                    </p>
                    <ul>
                      <li>Talend Open Studio: 2 hours 30 minutes (AI-generated estimation)</li>
                      <li>Apache Spark: 2 hours (AI-generated estimation)</li>
                      <li>Oracle Data Integrator: 3 hours 30 minutes (AI-generated estimation)</li>
                      <li>Microsoft SSIS: 3 hours (AI-generated estimation)</li>
                      <li>Microsoft SSIS (real test): failed after 1 hour due to RAM issues</li>
                      <li>DataMigrationMorpher (real test): completed migration in just 12 minutes</li>
                    </ul>
                    <strong>Project Overview: </strong>
                    <p>
                      DataMigrationMorpher is a revolutionary application that simplifies data migration. Built with Python, Pandas, Cx_Oracle, Oracle, TypeScript, and React.js, it ensures unmatched efficiency and accuracy in migrating data across sources and destinations.
                    </p>
                    <strong>Key Features: </strong>
                    <ul>
                      <li><strong>Automated Migration:</strong> Automates the full migration process, reducing manual intervention, speeding up migrations, and minimizing errors.</li>
                      <li><strong>Compatibility:</strong> Supports multiple operating systems for seamless cross-platform data migration.</li>
                      <li><strong>Data Transformation:</strong> Powerful tools to manipulate and format data for destination systems during migration.</li>
                      <li><strong>Scalability:</strong> Designed to handle migrations small and large with a robust architecture for complex tasks.</li>
                      <li><strong>Real-time Monitoring:</strong> Tracks migration progress live, enabling quick identification of issues to ensure on-time completion.</li>
                      <li><strong>Reporting:</strong> Generates detailed reports on migration success, errors, and record counts.</li>
                    </ul>
                    <p>
                      Overall, DataMigrationMorpher is a versatile and powerful tool that simplifies the complex data migration process.
                    </p>
                  </div>
`,
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
    position: "Front-end Developer",
    description: `<div>
                    <strong>Sports and Betting Web Applications</strong>
                    <p>
                      I developed user-friendly and responsive web applications for sports and betting, combining React, TypeScript, and clean architecture principles to create solid foundations. It was exciting to tackle challenges of performance and responsiveness to deliver seamless experiences. 🏀🏈
                    </p>
                    <p>
                      To keep data fresh and efficient, I integrated SWR and other libraries to smoothly consume REST APIs from our backend team, ensuring users always had the latest information at their fingertips. 🔄📡
                    </p>
                    <p>
                      I made use of advanced React techniques like higher-order components, lazy loading, suspense, memos, and callbacks. These helped me boost performance and smooth out the user journey, making every interaction feel fast and intuitive. 🛠️🚀
                    </p>
                    <p>
                      One of the most rewarding parts was designing and building diverse, real-time interfaces — from authentication and betting to casinos, invoices, and live match tracking. Creating these helped bring energy and immediacy to the apps. 🎰💳📊
                    </p>
                    <p>
                      Throughout, my focus remained on crafting smooth, inviting designs that were both visually appealing and optimized for peak performance, ensuring every user could enjoy the experience effortlessly. 🎨💻
                    </p>
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
    type: "Internship",
    presence: "Hybrid",
    societeName: "Digital Market",
    startDate: "Jun 2022",
    endDate: "Aug 2022",
    position: "Mobile Developer",
    description: `<section>
                    <strong>Store 2000 Hybrid Mobile App for Technical Team</strong>
                    <p>
                      The technical team at Store 2000 faced challenges using the Odoo interface on their mobiles during work. To make their lives easier, I developed a hybrid mobile app that empowered them to check available tools, report tasks, and create quotations on the spot.
                    </p>
                    <p>
                      Using Ionic v6, Capacitor, React, TypeScript, Odoo v14, OpenAPI, and Python, I built a mini ERP app tailored specifically to the team's needs, putting the power of efficient task management and client interaction right in their hands. 📱💻
                    </p>
                    <p>
                      A key feature was a user-friendly menu that allowed immediate quotation creation for clients, making it easy to assemble window blinds from available parts and keep the technical staff calendars up to date. 📆
                    </p>
                    <p>
                      Real-time task management was implemented to track active, completed, and in-progress jobs, keeping the team organized and productive throughout their busy days. 🔄
                    </p>
                    <p>
                      The app seamlessly integrated with the administration ERP (Odoo), ensuring all data stayed in sync and management had up-to-date information. 🔄
                    </p>
                    <p>
                      I also developed a detailed client data page with contact info, requests, and house specifics, enabling better service delivery. 🏠 The billing system allowed clients to sign off on quotations, automatically generating invoices in PDF format directly in Odoo. 📝🧾
                    </p>
                    <p>
                      This project truly transformed how the technical team worked, helping them be more efficient and responsive every day.
                    </p>
                  </section>
`,
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
    position: "QA Engineer",
    description: `<div>
                    <p><strong>Project:</strong> NOE</p>
                    <p>
                      During my internship, I took on the challenge of automating the testing process for a platform with over 2000 pages. Using Selenium, I developed a comprehensive script that automatically tested all buttons, fields, pages, and filters to ensure flawless functionality. 🤖
                    </p>
                    <p>
                      To make bug tracking efficient, I implemented automated bug reporting that included code status, error location (capturing the XPath in HTML5), and detailed reports for rapid issue resolution. 🐞📋
                    </p>
                    <p>
                      The script tested for page opening errors, non-functional filters, incorrect results, status code errors, redirections, and wrong paths, covering all critical aspects to maintain platform quality. 🛠️
                    </p>
                    <p>
                      Performance optimization was a priority. By implementing multithreading, I reduced the testing time from 30 hours to 19 hours. Then, through multiprocessing, I further cut down the time to complete all tests to just 25 minutes, significantly accelerating the release cycle. ⏱️🚀
                    </p>
                    <p>
                      To ensure consistent testing, I set up a cron job to automatically run these tests twice daily, at 7 am and 6 pm, providing ongoing quality assurance without manual intervention. 🔄
                    </p>
                  </div>
`,
    technologies: ["HTML", "Xpath", "Python", "MariaDB", "Selenium"],
  },
];
