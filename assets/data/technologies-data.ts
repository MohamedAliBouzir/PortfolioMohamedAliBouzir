import { ITechnologiesInterface } from "@/interfaces/technologies-interface";
import ReactLogo from "@/assets/images/svg/ReactLogo.svg";
import NextLogo from "@/assets/images/svg/NextLogo.svg";
import TypeScriptLogo from "@/assets/images/svg/TSLogo.svg";
import JavaScriptLogo from "@/assets/images/svg/JSLogo.svg";
import TailwindCSSLogo from "@/assets/images/svg/TailwindLogo.svg";
import BootstrapLogo from "@/assets/images/svg/BootstrapLogo.svg";
import FramerLogo from "@/assets/images/svg/framerMotionLogo.svg";
import CSSLogo from "@/assets/images/svg/CSS3Logo.svg";
import HTMLLogo from "@/assets/images/svg/HTML5Logo.svg";
import MUILogo from "@/assets/images/svg/MUILogo.svg";
import NodeLogo from "@/assets/images/svg/Node.svg";
import ExpressLogo from "@/assets/images/svg/Express.svg";
import NestLogo from "@/assets/images/svg/Nest.svg";
import FastAPILogo from "@/assets/images/svg/FastAPI.svg";
import PythonLogo from "@/assets/images/svg/Python.svg";
import SocketIOLogo from "@/assets/images/svg/Socket.svg";
import IonicLogo from "@/assets/images/svg/Ionic.svg";
import CapacitorLogo from "@/assets/images/svg/Capacitor.svg";
import MongoDBLogo from "@/assets/images/svg/MongoDB.svg";
import PostgreSQLLogo from "@/assets/images/svg/PostgresSQL.svg";
import MySQLLogo from "@/assets/images/svg/MySQL.svg";
import OracleLogo from "@/assets/images/svg/Oracle.svg";
import GitLogo from "@/assets/images/svg/Git.svg";
import DockerLogo from "@/assets/images/svg/Docker.svg";
import JiraLogo from "@/assets/images/svg/Jira.svg";

export const FrontEndTechnologiesData: ITechnologiesInterface[] = [
  {
    index: 1, Icon: ReactLogo, Title: "React",
    years: 4,
    projects: ["Effia Be", "Effia Dashboard", "DataMigrationMorpher", "Elissa Bet", "Carthagobet"],
    experiences: ["VIVIA-M", "Skillware", "Billcom Consulting", "SMOFT ERP"],
    facts: ["Advanced hooks & custom hook patterns", "HOC & render-prop patterns", "React.lazy + Suspense code-splitting", "Performance tuning with memo/useCallback"],
  },
  {
    index: 2, Icon: NextLogo, Title: "Next.js",
    years: 3,
    projects: ["National Digital Transformation Platform", "Carthagobet"],
    experiences: ["MAYRA Entertainment", "VIVIA-M"],
    facts: ["App router & server components", "SSR / SSG / ISR strategies", "API routes & middleware", "Image optimization pipeline"],
  },
  {
    index: 3, Icon: FramerLogo, Title: "Framer Motion",
    years: 2,
    projects: ["National Digital Transformation Platform", "This portfolio"],
    experiences: ["MAYRA Entertainment"],
    facts: ["Layout animations & shared layoutId", "useSpring / useTransform", "AnimatePresence exit animations", "Gesture-driven interactions"],
  },
  {
    index: 4, Icon: TailwindCSSLogo, Title: "Tailwind CSS",
    years: 3,
    projects: ["National Digital Transformation Platform", "Elissa Bet", "This portfolio"],
    experiences: ["MAYRA Entertainment", "Skillware"],
    facts: ["Custom design tokens & themes", "Dark mode strategies", "Responsive utility patterns", "JIT & arbitrary values"],
  },
  {
    index: 5, Icon: MUILogo, Title: "Material UI",
    years: 3,
    projects: ["Effia Be", "Effia Dashboard"],
    experiences: ["VIVIA-M"],
    facts: ["Custom theming & palette overrides", "sx prop & styled API", "DataGrid advanced usage", "Component composition patterns"],
  },
  {
    index: 6, Icon: BootstrapLogo, Title: "Bootstrap",
    years: 2,
    projects: ["IEEE ISSATSo SB", "Store 2000"],
    experiences: ["Digital Market"],
    facts: ["Responsive grid system", "Component customisation via SASS variables", "Utility class composition"],
  },
  {
    index: 7, Icon: TypeScriptLogo, Title: "TypeScript",
    years: 4,
    projects: ["Effia Be", "DataMigrationMorpher", "National Digital Transformation Platform"],
    experiences: ["MAYRA Entertainment", "VIVIA-M", "Skillware", "Billcom Consulting"],
    facts: ["Strict mode, generics & utility types", "Discriminated unions & type guards", "Declaration merging & module augmentation", "Type-safe API contracts with Zod/Orval"],
  },
  {
    index: 8, Icon: JavaScriptLogo, Title: "JavaScript",
    years: 5,
    projects: ["Effia Be", "Sodecor", "Expert Auto", "Carthagobet"],
    experiences: ["VIVIA-M", "SMOFT ERP", "Skillware"],
    facts: ["ES2022+ features", "Event loop & async patterns", "Closure & prototype deep knowledge", "Web APIs & performance profiling"],
  },
  {
    index: 10, Icon: CSSLogo, Title: "CSS3",
    years: 5,
    projects: ["Sodecor", "Expert Auto", "IEEE ISSATSo SB"],
    experiences: ["SMOFT ERP", "Digital Market"],
    facts: ["CSS custom properties & cascade layers", "Grid & flexbox mastery", "Animations & transitions", "BEM + SASS architecture"],
  },
  {
    index: 11, Icon: HTMLLogo, Title: "HTML5",
    years: 5,
    projects: ["Sodecor", "Expert Auto", "IEEE ISSATSo SB"],
    experiences: ["SMOFT ERP"],
    facts: ["Semantic markup & accessibility", "Canvas & SVG", "Web components", "SEO-optimised structure"],
  },
];

export const BackEndTechnologiesData: ITechnologiesInterface[] = [
  {
    index: 1, Icon: NodeLogo, Title: "Node.js",
    years: 4,
    projects: ["Effia Be", "Effia Dashboard", "DataMigrationMorpher"],
    experiences: ["VIVIA-M", "Billcom Consulting"],
    facts: ["Event-driven non-blocking I/O", "Streams & buffer handling", "Worker threads & clustering", "Performance profiling with clinic.js"],
  },
  {
    index: 2, Icon: ExpressLogo, Title: "Express.js",
    years: 4,
    projects: ["Effia Be", "Effia Dashboard", "DataMigrationMorpher"],
    experiences: ["VIVIA-M", "Billcom Consulting"],
    facts: ["RESTful API design", "Middleware chains & error handling", "JWT & session auth", "Rate limiting & security headers"],
  },
  {
    index: 3, Icon: NestLogo, Title: "Nest.js",
    years: 2,
    projects: ["National Digital Transformation Platform", "MAYRA Platform"],
    experiences: ["MAYRA Entertainment"],
    facts: ["Module-based architecture", "Guards, interceptors & pipes", "BullMQ queue integration", "Prisma ORM integration"],
  },
  {
    index: 4, Icon: FastAPILogo, Title: "FastAPI",
    years: 2,
    projects: ["DataMigrationMorpher"],
    experiences: ["Billcom Consulting"],
    facts: ["Async endpoints & dependency injection", "Pydantic models for validation", "WebSocket support", "Auto OpenAPI docs generation"],
  },
  {
    index: 5, Icon: PythonLogo, Title: "Python",
    years: 3,
    projects: ["DataMigrationMorpher", "Store 2000"],
    experiences: ["Billcom Consulting", "Code Time", "Digital Market"],
    facts: ["MultiProcessing & MultiThreading", "Pandas for data transformation", "Selenium automation", "ETL pipeline design"],
  },
  {
    index: 6, Icon: SocketIOLogo, Title: "Socket.io",
    years: 3,
    projects: ["Effia Be", "DataMigrationMorpher"],
    experiences: ["VIVIA-M"],
    facts: ["Real-time bidirectional events", "Room & namespace management", "Reconnection strategies", "Redis adapter for horizontal scaling"],
  },
];

export const MobileTechnologiesData: ITechnologiesInterface[] = [
  {
    index: 1, Icon: ReactLogo, Title: "React Native",
    years: 2,
    projects: ["Fermli", "Muscle Meet"],
    experiences: ["Branding Route"],
    facts: ["Expo & bare workflow", "Navigation with React Navigation", "Native module bridging", "Performance with Hermes engine"],
  },
  {
    index: 2, Icon: IonicLogo, Title: "Ionic",
    years: 2,
    projects: ["Store 2000"],
    experiences: ["Digital Market"],
    facts: ["Capacitor native bridge", "iOS & Android deployment", "Native device API access", "PWA + native hybrid strategy"],
  },
  {
    index: 3, Icon: CapacitorLogo, Title: "Capacitor",
    years: 2,
    projects: ["Store 2000"],
    experiences: ["Digital Market"],
    facts: ["Native plugin ecosystem", "Live reload on device", "Camera, filesystem & push notifications", "Cross-platform deployment pipeline"],
  },
];

export const DataBaseData: ITechnologiesInterface[] = [
  {
    index: 1, Icon: MongoDBLogo, Title: "MongoDB",
    years: 2,
    projects: ["Muscle Meet", "Carthagobet"],
    experiences: ["Branding Route"],
    facts: ["Aggregation pipelines", "Atlas search & indexing", "Schema design & validation", "Change streams for real-time sync"],
  },
  {
    index: 2, Icon: PostgreSQLLogo, Title: "PostgreSQL",
    years: 2,
    projects: ["National Digital Transformation Platform", "MAYRA Platform"],
    experiences: ["MAYRA Entertainment"],
    facts: ["Schema-per-tenant multi-tenancy", "JSONB & full-text search", "Advanced indexing strategies", "Prisma ORM integration"],
  },
  {
    index: 3, Icon: MySQLLogo, Title: "MySQL",
    years: 3,
    projects: ["Effia Be", "Effia Dashboard"],
    experiences: ["VIVIA-M", "SMOFT ERP"],
    facts: ["Query optimisation & EXPLAIN", "Indexing strategies", "Sequelize & raw queries", "Parallel execution for bulk ops"],
  },
  {
    index: 4, Icon: OracleLogo, Title: "Oracle",
    years: 2,
    projects: ["DataMigrationMorpher"],
    experiences: ["Billcom Consulting"],
    facts: ["cx_Oracle Python driver", "Complex SQL for large datasets", "BSCS RTX table migrations", "20M+ row performance benchmarks"],
  },
  {
    index: 5, Icon: GitLogo, Title: "Git",
    years: 5,
    projects: ["All projects"],
    experiences: ["All experiences"],
    facts: ["Branching strategies (GitFlow, trunk-based)", "Rebase & interactive history rewriting", "Hooks & CI integration", "Conflict resolution & bisect"],
  },
  {
    index: 6, Icon: DockerLogo, Title: "Docker",
    years: 3,
    projects: ["National Digital Transformation Platform", "Effia Be"],
    experiences: ["MAYRA Entertainment", "VIVIA-M"],
    facts: ["Multi-stage builds for lean images", "Docker Compose orchestration", "Volume & network management", "CI/CD pipeline integration"],
  },
  {
    index: 7, Icon: JiraLogo, Title: "Jira",
    years: 3,
    projects: ["Effia Be", "National Digital Transformation Platform"],
    experiences: ["MAYRA Entertainment", "VIVIA-M"],
    facts: ["Scrum & Kanban boards", "Epic/story/task hierarchy", "Sprint planning & velocity tracking", "Integration with GitLab CI"],
  },
];
