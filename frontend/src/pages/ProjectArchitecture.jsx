import { useState, useEffect } from 'react';
import {
  BookOpen,
  GraduationCap,
  Layers,
  Search,
  LayoutDashboard,
  Settings,
  Database,
  Lock,
  Cpu,
  Server,
  Terminal,
  GitBranch,
  ArrowRight,
  ArrowDown,
  Users,
  CheckCircle,
  Shield,
  Key,
  Compass,
  Check,
  Code,
  Plus,
  Eye,
  Trash2,
  AlertCircle,
  HelpCircle,
  Zap,
  TrendingUp,
  Award,
  ChevronRight,
  Globe
} from 'lucide-react';

export default function ProjectArchitecture() {
  const [activeSection, setActiveSection] = useState('overview');
  const [activeCrudTab, setActiveCrudTab] = useState('users');
  const [activeJwtStep, setActiveJwtStep] = useState(0);
  const [activeSystemFlow, setActiveSystemFlow] = useState('register');
  const [activeDbTable, setActiveDbTable] = useState('users');
  const [searchQuery, setSearchQuery] = useState('');
  const [searchStep, setSearchStep] = useState(0);
  const [searchAnimationRunning, setSearchAnimationRunning] = useState(false);

  // Sections definition for table of contents
  const sections = [
    { id: 'overview', name: 'Project Overview' },
    { id: 'architecture', name: 'Project Architecture' },
    { id: 'tech-stack', name: 'Tech Stack' },
    { id: 'implementation', name: 'Implementation Layers' },
    { id: 'modules', name: 'Project Modules' },
    { id: 'jwt-flow', name: 'JWT Implementation' },
    { id: 'crud', name: 'CRUD Operations' },
    { id: 'database', name: 'Database Schema' },
    { id: 'system-flow', name: 'System Flows' },
    { id: 'security', name: 'Security Matrix' },
    { id: 'search-feature', name: 'Search Engine' },
    { id: 'rubric', name: 'Rubric Mapping' },
    { id: 'team', name: 'Team & Contribution' },
    { id: 'advantages', name: 'Project Advantages' },
    { id: 'future', name: 'Future Enhancements' },
  ];

  // Auto detect active section on scroll
  useEffect(() => {
    const handleScroll = () => {
      const scrollPosition = window.scrollY + 200;
      for (const section of sections) {
        const el = document.getElementById(section.id);
        if (el) {
          const top = el.offsetTop;
          const height = el.offsetHeight;
          if (scrollPosition >= top && scrollPosition < top + height) {
            setActiveSection(section.id);
            break;
          }
        }
      }
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const scrollToSection = (id) => {
    const el = document.getElementById(id);
    if (el) {
      window.scrollTo({
        top: el.offsetTop - 100,
        behavior: 'smooth',
      });
      setActiveSection(id);
    }
  };

  // JWT steps data
  const jwtSteps = [
    {
      title: 'User Login',
      desc: 'User inputs credentials (username/password) on the React frontend. React sends a POST request with payload to the FastAPI API Gateway.',
      badge: 'Client Side',
      endpoint: 'POST /api/v1/auth/login',
    },
    {
      title: 'API Gateway Routing',
      desc: 'FastAPI Gateway intercepts the request, validates structure, and routes/proxies it downstream to the Spring Boot backend auth service.',
      badge: 'FastAPI (Port 8000)',
      endpoint: 'Routing -> Spring Boot',
    },
    {
      title: 'Authentication & Verify',
      desc: 'Spring Security receives request, queries PostgreSQL to find the User, verifies the hashed password using BCrypt, and validates user roles.',
      badge: 'Spring Boot & Database',
      endpoint: 'Spring Security Auth Manager',
    },
    {
      title: 'JWT Token Generation',
      desc: 'Upon success, Spring Boot generates a secure JWT containing User ID, Username, Roles, Expiry (e.g. 24h), signed with a HMAC-SHA256 secret key.',
      badge: 'Spring Boot Signature',
      endpoint: 'HS256 JWT Signed Code',
    },
    {
      title: 'Return & Store Token',
      desc: 'FastAPI passes the JWT response back to React. The React frontend stores the JWT in Zustand/localStorage and sets it in Authorization headers.',
      badge: 'Zustand State Store',
      endpoint: 'Bearer Token Header Injection',
    },
    {
      title: 'Protected API Access',
      desc: 'For succeeding operations, React sends JWT in header. FastAPI verifies signature and forwards to Spring Boot. Spring Security validates RBAC.',
      badge: 'Role-Based Access Control',
      endpoint: 'Header: Authorization: Bearer <token>',
    },
  ];

  // Database Schema tables definition
  const dbSchema = {
    users: {
      desc: 'Stores registered system accounts with encryption credentials and assigned security roles.',
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', desc: 'Auto-incrementing unique user identifier' },
        { name: 'username', type: 'VARCHAR(50)', key: 'UNIQUE', desc: 'Login handle for account authentication' },
        { name: 'email', type: 'VARCHAR(100)', key: 'UNIQUE', desc: 'Email address, verified for notifications' },
        { name: 'password', type: 'VARCHAR(255)', key: '', desc: 'Securely salted BCrypt password hash' },
        { name: 'role', type: 'VARCHAR(20)', key: 'DEFAULT USER', desc: 'Authorization level: ADMIN, USER' },
        { name: 'created_at', type: 'TIMESTAMP', key: '', desc: 'Record insertion timestamp' },
      ],
      relations: [
        { text: 'Has 1-to-many relationship with Products/Courses if registered as publisher' },
        { text: 'Users credentials validated in Spring Boot and cached at Gateway' },
      ],
    },
    products: {
      desc: 'Catalog table for physical and digital marketplace search assets.',
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', desc: 'Primary key of the catalog asset' },
        { name: 'title', type: 'VARCHAR(150)', key: '', desc: 'Human-readable title of the item' },
        { name: 'description', type: 'TEXT', key: '', desc: 'Detailed description of characteristics' },
        { name: 'price', type: 'DECIMAL(10,2)', key: '', desc: 'Pricing value of product listing' },
        { name: 'category_id', type: 'BIGINT', key: 'FK', desc: 'Reference to category lookup table' },
        { name: 'brand', type: 'VARCHAR(50)', key: '', desc: 'Brand name, indexed for fast filter aggregation' },
        { name: 'rating', type: 'DECIMAL(3,2)', key: '', desc: 'Average consumer star-rating score (0.00 to 5.00)' },
        { name: 'in_stock', type: 'BOOLEAN', key: 'DEFAULT TRUE', desc: 'Availability flag for searches' },
        { name: 'image_url', type: 'VARCHAR(500)', key: '', desc: 'Primary image reference path' },
      ],
      relations: [
        { text: 'Belongs to Category via category_id (Foreign Key -> Categories.id)' },
        { text: 'Indexed on brand and title fields for rapid PostgreSQL full-text scanning' },
      ],
    },
    categories: {
      desc: 'Normalized metadata container for taxonomy matching.',
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', desc: 'Primary key of the taxonomy group' },
        { name: 'name', type: 'VARCHAR(50)', key: 'UNIQUE', desc: 'Lookup term: Electronics, Courses, Books, etc.' },
        { name: 'description', type: 'VARCHAR(255)', key: '', desc: 'Context info detailing category scope' },
        { name: 'icon', type: 'VARCHAR(50)', key: '', desc: 'Lucide identifier for dynamic drawing' },
      ],
      relations: [
        { text: 'Has 1-to-many relationship with Products (1 category contains multiple products)' },
        { text: 'Has 1-to-many relationship with Courses (1 category contains multiple courses)' },
      ],
    },
    courses: {
      desc: 'Stores educational structures mapping topics, instructors, and lessons.',
      fields: [
        { name: 'id', type: 'BIGINT', key: 'PK', desc: 'Primary key of the learning module' },
        { name: 'title', type: 'VARCHAR(150)', key: '', desc: 'Course title (e.g. Java Masterclass)' },
        { name: 'instructor', type: 'VARCHAR(100)', key: '', desc: 'Name of course provider/faculty' },
        { name: 'duration_hours', type: 'INTEGER', key: '', desc: 'Total hours of class instruction' },
        { name: 'difficulty_level', type: 'VARCHAR(20)', key: '', desc: 'Beginner, Intermediate, or Advanced' },
        { name: 'category_id', type: 'BIGINT', key: 'FK', desc: 'Reference linking course to taxonomy category' },
        { name: 'rating', type: 'DECIMAL(3,2)', key: '', desc: 'Course average rating' },
      ],
      relations: [
        { text: 'Belongs to Category via category_id (Foreign Key -> Categories.id)' },
        { text: 'Relates to User role level mapping to enforce student enrollment constraints' },
      ],
    },
  };

  // CRUD endpoints
  const crudEndpoints = {
    users: [
      { method: 'GET', path: '/api/v1/admin/users', auth: 'ADMIN', desc: 'Fetch user registry list' },
      { method: 'GET', path: '/api/v1/users/profile', auth: 'USER/ADMIN', desc: 'Retrieve authenticated personal details' },
      { method: 'POST', path: '/api/v1/auth/register', auth: 'PUBLIC', desc: 'Register a new account' },
      { method: 'PUT', path: '/api/v1/users/:id', auth: 'USER/ADMIN', desc: 'Modify profile parameters' },
      { method: 'DELETE', path: '/api/v1/admin/users/:id', auth: 'ADMIN', desc: 'Delete user account record' },
    ],
    products: [
      { method: 'GET', path: '/api/v1/products', auth: 'PUBLIC', desc: 'Query full item catalog' },
      { method: 'GET', path: '/api/v1/products/:id', auth: 'PUBLIC', desc: 'Get single product detailed specs' },
      { method: 'POST', path: '/api/v1/admin/products', auth: 'ADMIN', desc: 'Create product asset (Spring Boot JPA)' },
      { method: 'PUT', path: '/api/v1/admin/products/:id', auth: 'ADMIN', desc: 'Edit product variables' },
      { method: 'DELETE', path: '/api/v1/admin/products/:id', auth: 'ADMIN', desc: 'Delete product catalog node' },
    ],
    categories: [
      { method: 'GET', path: '/api/v1/categories', auth: 'PUBLIC', desc: 'Get active category lookup index' },
      { method: 'POST', path: '/api/v1/admin/categories', auth: 'ADMIN', desc: 'Create custom search category taxonomy' },
      { method: 'PUT', path: '/api/v1/admin/categories/:id', auth: 'ADMIN', desc: 'Modify category terms' },
      { method: 'DELETE', path: '/api/v1/admin/categories/:id', auth: 'ADMIN', desc: 'Delete category node' },
    ],
    courses: [
      { method: 'GET', path: '/api/v1/courses', auth: 'PUBLIC', desc: 'Query learning courses listings' },
      { method: 'GET', path: '/api/v1/courses/:id', auth: 'PUBLIC', desc: 'Fetch specific syllabus metrics' },
      { method: 'POST', path: '/api/v1/admin/courses', auth: 'ADMIN', desc: 'Deploy new course listing' },
      { method: 'PUT', path: '/api/v1/admin/courses/:id', auth: 'ADMIN', desc: 'Update syllabus attributes' },
      { method: 'DELETE', path: '/api/v1/admin/courses/:id', auth: 'ADMIN', desc: 'Remove course listing' },
    ],
  };

  // Run mock search flow simulation
  const runSearchSimulation = () => {
    if (searchAnimationRunning) return;
    setSearchAnimationRunning(true);
    setSearchStep(1); // User hits search

    setTimeout(() => {
      setSearchStep(2); // FastAPI intercept
      setTimeout(() => {
        setSearchStep(3); // Spring Boot controller
        setTimeout(() => {
          setSearchStep(4); // PostgreSQL query
          setTimeout(() => {
            setSearchStep(5); // Success return
            setTimeout(() => {
              setSearchAnimationRunning(false);
            }, 1000);
          }, 1000);
        }, 1000);
      }, 1000);
    }, 1000);
  };

  return (
    <div className="max-w-7xl mx-auto px-4 sm:px-6 py-8 md:py-12">
      {/* Hero Header */}
      <div className="text-center max-w-3xl mx-auto mb-16 relative">
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-72 h-72 bg-primary/10 rounded-full blur-3xl -z-10" />
        <span className="badge-orange mb-4">DSEDBD HACKATHON OVERVIEW</span>
        <h1 className="text-4xl sm:text-5xl font-black tracking-tight text-foreground mb-4">
          Multi-Category Search & Filter Platform
        </h1>
        <p className="text-xl text-primary font-bold tracking-wide mb-3">
          Implementation & Architecture Overview
        </p>
        <p className="text-muted-foreground text-sm sm:text-base leading-relaxed">
          A deep technical architecture review for faculty, validators, and developers. Explore search algorithms, security protocols, API endpoints, and database models.
        </p>
      </div>

      <div className="flex flex-col lg:flex-row gap-10">
        {/* Table of Contents - Left Sidebar */}
        <div className="lg:w-64 flex-shrink-0 lg:sticky lg:top-24 h-fit bg-card border border-border p-5 rounded-3xl shadow-sm hidden lg:block">
          <p className="text-xs font-bold text-muted-foreground uppercase tracking-widest mb-4">
            Documentation Index
          </p>
          <nav className="space-y-1.5 max-h-[70vh] overflow-y-auto pr-1">
            {sections.map((sect) => (
              <button
                key={sect.id}
                onClick={() => scrollToSection(sect.id)}
                className={`w-full text-left px-3 py-2 text-xs font-semibold rounded-xl transition-all duration-200 flex items-center justify-between group ${
                  activeSection === sect.id
                    ? 'bg-primary text-white shadow-md shadow-primary/20'
                    : 'text-muted-foreground hover:bg-secondary hover:text-foreground'
                }`}
              >
                <span>{sect.name}</span>
                <ChevronRight
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${
                    activeSection === sect.id ? 'translate-x-0' : 'opacity-0 group-hover:opacity-100 group-hover:translate-x-1'
                  }`}
                />
              </button>
            ))}
          </nav>
        </div>

        {/* Core Content - Right Side */}
        <div className="flex-1 space-y-16">
          {/* SECTION 1: PROJECT OVERVIEW */}
          <section id="overview" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm relative overflow-hidden">
            <div className="absolute top-0 right-0 w-32 h-32 bg-primary/5 rounded-bl-full pointer-events-none" />
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Compass className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Project Overview</h2>
                <p className="text-xs text-muted-foreground">Core project profile and objectives</p>
              </div>
            </div>

            <div className="space-y-6">
              <p className="text-sm sm:text-base text-muted-foreground leading-relaxed">
                <strong>SearchHub</strong> is a unified, highly optimized multi-category platform engineered to catalog, filter, and discover heterogeneous resources such as Products, Courses, Categories, and Books. The system operates on a decoupling architecture featuring an asynchronous FastAPI routing gateway, a core enterprise Spring Boot transaction engine, and a reliable PostgreSQL relational cluster.
              </p>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mt-4">
                <div className="p-5 bg-secondary/50 rounded-2xl border border-border">
                  <h3 className="text-sm font-bold text-foreground mb-2">Problem Statement</h3>
                  <p className="text-xs text-muted-foreground leading-relaxed">
                    Traditional search platforms separate inventory, digital learning assets, and literature catalogs into distinct siloed microservices. This creates high maintenance overhead, high latency, complex client-side integrations, and inconsistent security practices across organizational portals.
                  </p>
                </div>
                <div className="p-5 bg-secondary/50 rounded-2xl border border-border">
                  <h3 className="text-sm font-bold text-foreground mb-2">Platform Objectives</h3>
                  <ul className="space-y-1.5 text-xs text-muted-foreground">
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                      Establish unified category-indexed search mechanics.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                      Implement secure JWT/Role-Based Access control.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                      Achieve sub-50ms API request routing via FastAPI.
                    </li>
                    <li className="flex items-start gap-1.5">
                      <Check className="w-3.5 h-3.5 text-success mt-0.5 flex-shrink-0" />
                      Provide a beautiful, responsive client portal.
                    </li>
                  </ul>
                </div>
              </div>

              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mt-6">
                {[
                  { title: 'Project Name', val: 'SearchHub' },
                  { title: 'Domain Scope', val: 'Enterprise Catalog' },
                  { title: 'Primary Architecture', val: 'Federated Gateway' },
                  { title: 'Release Version', val: 'v1.0.0 (Production)' },
                ].map((item, idx) => (
                  <div key={idx} className="p-4 bg-card border border-border rounded-xl text-center">
                    <p className="text-[10px] font-bold text-muted-foreground uppercase">{item.title}</p>
                    <p className="text-sm font-black text-foreground mt-1">{item.val}</p>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 2: PROJECT ARCHITECTURE */}
          <section id="architecture" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Cpu className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Project Architecture</h2>
                <p className="text-xs text-muted-foreground">Interactive multi-layer topology diagram</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-8 leading-relaxed">
              The project leverages a robust multi-layer design isolating clients from transactional databases. The API Gateway acts as the secure reverse proxy, handling CORS, logging, and dispatching tasks downstream.
            </p>

            {/* Visual Architecture Diagram */}
            <div className="p-6 bg-secondary/30 rounded-3xl border border-border relative">
              <div className="grid grid-cols-1 md:grid-cols-4 gap-6 items-center text-center relative z-10">
                {/* Frontend Tier */}
                <div className="p-5 bg-card border-2 border-primary/30 rounded-2xl shadow-md flex flex-col items-center hover:border-primary transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-orange-500/10 flex items-center justify-center text-primary mb-3">
                    <Code className="w-6 h-6 animate-pulse" />
                  </div>
                  <span className="badge-orange text-[9px] mb-1">Presentation</span>
                  <h4 className="text-sm font-extrabold text-foreground">React Frontend</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">Zustand, Tailwind, Framer Motion</p>
                  <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground font-mono mt-3">Port: 5173</span>
                </div>

                {/* Arrow to Gateway */}
                <div className="flex flex-col items-center justify-center md:h-full py-2">
                  <div className="hidden md:flex flex-col items-center">
                    <span className="text-[10px] text-primary font-bold mb-1">HTTP REST</span>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-primary to-blue-500" />
                    <ArrowRight className="w-4 h-4 text-blue-500 mt-1" />
                  </div>
                  <div className="flex md:hidden flex-col items-center">
                    <ArrowDown className="w-5 h-5 text-blue-500" />
                  </div>
                </div>

                {/* API Gateway Tier */}
                <div className="p-5 bg-card border-2 border-blue-500/30 rounded-2xl shadow-md flex flex-col items-center hover:border-blue-500 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-blue-500/10 flex items-center justify-center text-blue-500 mb-3">
                    <Server className="w-6 h-6" />
                  </div>
                  <span className="badge text-blue-500 bg-blue-500/10 border border-blue-500/20 text-[9px] mb-1">API GATEWAY</span>
                  <h4 className="text-sm font-extrabold text-foreground">FastAPI Gateway</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">Uvicorn, HTTP Proxying, CORS</p>
                  <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground font-mono mt-3">Port: 8000</span>
                </div>

                {/* Arrow to Backend */}
                <div className="flex flex-col items-center justify-center md:h-full py-2">
                  <div className="hidden md:flex flex-col items-center">
                    <span className="text-[10px] text-blue-500 font-bold mb-1">Reverse Proxy</span>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500" />
                    <ArrowRight className="w-4 h-4 text-purple-500 mt-1" />
                  </div>
                  <div className="flex md:hidden flex-col items-center">
                    <ArrowDown className="w-5 h-5 text-purple-500" />
                  </div>
                </div>

                {/* Spring Boot Tier */}
                <div className="p-5 bg-card border-2 border-purple-500/30 rounded-2xl shadow-md flex flex-col items-center hover:border-purple-500 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-purple-500/10 flex items-center justify-center text-purple-500 mb-3">
                    <Cpu className="w-6 h-6" />
                  </div>
                  <span className="badge text-purple-500 bg-purple-500/10 border border-purple-500/20 text-[9px] mb-1">Logic Tier</span>
                  <h4 className="text-sm font-extrabold text-foreground">Spring Boot</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">JPA, Hibernate, Security, JWT</p>
                  <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground font-mono mt-3">Port: 8080</span>
                </div>

                {/* Arrow to DB */}
                <div className="flex flex-col items-center justify-center md:h-full py-2">
                  <div className="hidden md:flex flex-col items-center">
                    <span className="text-[10px] text-purple-500 font-bold mb-1">JPA / SQL</span>
                    <div className="w-8 h-0.5 bg-gradient-to-r from-purple-500 to-teal-500" />
                    <ArrowRight className="w-4 h-4 text-teal-500 mt-1" />
                  </div>
                  <div className="flex md:hidden flex-col items-center">
                    <ArrowDown className="w-5 h-5 text-teal-500" />
                  </div>
                </div>

                {/* PostgreSQL Database Tier */}
                <div className="p-5 bg-card border-2 border-teal-500/30 rounded-2xl shadow-md flex flex-col items-center hover:border-teal-500 transition-all duration-300">
                  <div className="w-12 h-12 rounded-full bg-teal-500/10 flex items-center justify-center text-teal-500 mb-3">
                    <Database className="w-6 h-6" />
                  </div>
                  <span className="badge text-teal-500 bg-teal-500/10 border border-teal-500/20 text-[9px] mb-1">DATA STORE</span>
                  <h4 className="text-sm font-extrabold text-foreground">PostgreSQL</h4>
                  <p className="text-[11px] text-muted-foreground mt-1">Users, Catalog schema tables</p>
                  <span className="text-[10px] bg-secondary px-2 py-0.5 rounded text-muted-foreground font-mono mt-3">Port: 5432</span>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 3: TECH STACK */}
          <section id="tech-stack" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Layers className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Tech Stack</h2>
                <p className="text-xs text-muted-foreground">Frameworks and platforms powering SearchHub</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {[
                { title: 'React', type: 'Frontend', color: 'border-cyan-500/30 text-cyan-500 bg-cyan-500/5', text: 'SPA framework utilizing hooks, functional architecture, and virtual DOM mapping.' },
                { title: 'FastAPI', type: 'Gateway', color: 'border-emerald-500/30 text-emerald-500 bg-emerald-500/5', text: 'High-speed Python ASGI web framework built on Starlette and Pydantic validation.' },
                { title: 'Spring Boot', type: 'Backend', color: 'border-green-500/30 text-green-500 bg-green-500/5', text: 'Enterprise Java container orchestrating application logic, transactions, and security.' },
                { title: 'PostgreSQL', type: 'Database', color: 'border-blue-500/30 text-blue-500 bg-blue-500/5', text: 'Acid-compliant relational data management engine managing core records.' },
                { title: 'JWT Authentication', type: 'Security', color: 'border-amber-500/30 text-amber-500 bg-amber-500/5', text: 'Stateless secure identification framework packaging verified claims.' },
                { title: 'Role Based Access', type: 'Security', color: 'border-rose-500/30 text-rose-500 bg-rose-500/5', text: 'Fine-grained permissions restricting Admin endpoints and secure actions.' },
                { title: 'REST APIs', type: 'Communication', color: 'border-purple-500/30 text-purple-500 bg-purple-500/5', text: 'Standardized payload exchange contract returning structured JSON resources.' },
                { title: 'Git / GitHub', type: 'Collaboration', color: 'border-slate-500/30 text-slate-500 bg-slate-500/5', text: 'Version control infrastructure ensuring codebase auditability and team alignment.' },
              ].map((stack, idx) => (
                <div key={idx} className={`p-5 rounded-2xl border ${stack.color} hover:scale-[1.02] transition-transform duration-200 flex flex-col justify-between`}>
                  <div>
                    <span className="text-[10px] font-black uppercase tracking-widest opacity-80">{stack.type}</span>
                    <h4 className="text-base font-extrabold text-foreground mt-1">{stack.title}</h4>
                    <p className="text-xs text-muted-foreground mt-2 leading-relaxed">{stack.text}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 4: IMPLEMENTATION LAYERS */}
          <section id="implementation" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Implementation Layers</h2>
                <p className="text-xs text-muted-foreground">Technical decomposition of code modules</p>
              </div>
            </div>

            <div className="space-y-6">
              <div className="border border-border rounded-2xl p-5 bg-secondary/20">
                <h3 className="text-sm font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-primary" />
                  Frontend Architecture (React 19)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground block mb-1">State Management</span>
                    Zustand stores handle auth, catalog caching, search queries, and theme selections.
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">Routing & Layouts</span>
                    React Router Dom handles pages, routing guards, and nested layouts (`MainLayout`, `AdminLayout`).
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">Dynamic Rendering</span>
                    Custom item detail pages, search results grids, and responsive category modules.
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-2xl p-5 bg-secondary/20">
                <h3 className="text-sm font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-blue-500" />
                  Asynchronous Routing Layer (FastAPI Gateway)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground block mb-1">API Reverse Proxy</span>
                    FastAPI acts as an entry gate. Intercepts frontend queries on `/api/v1/` and transparently routes authorization/users/catalogs to backend ports via an async HTTP client.
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">CORS & Security Enforcer</span>
                    Handles browser pre-flight checks, sanitizes query params, registers log events, and manages token forwarding.
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-2xl p-5 bg-secondary/20">
                <h3 className="text-sm font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-purple-500" />
                  Business Transaction Engine (Spring Boot 3)
                </h3>
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 text-xs text-muted-foreground">
                  <div>
                    <span className="font-bold text-foreground block mb-1">Security & JWT Filter</span>
                    Spring Security interceptor filters validate standard authorization headers and load User Context.
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">JPA ORM Layer</span>
                    Hibernate manages transactions for Products, Categories, Courses, and Users into the relational engine.
                  </div>
                  <div>
                    <span className="font-bold text-foreground block mb-1">RBAC Controls</span>
                    Checks method annotations (`@PreAuthorize("hasRole('ADMIN')")`) to prevent unauthorized actions.
                  </div>
                </div>
              </div>

              <div className="border border-border rounded-2xl p-5 bg-secondary/20">
                <h3 className="text-sm font-bold text-foreground mb-4 border-b border-border pb-2 flex items-center gap-2">
                  <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                  Relational Store (PostgreSQL)
                </h3>
                <div className="text-xs text-muted-foreground leading-relaxed">
                  Manages normalized entities. Cascades deletes on categories to prevent dangling items, indices are set on searchable fields, and relational mapping maintains cross-entity integrity.
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 5: PROJECT MODULES */}
          <section id="modules" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Settings className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Project Modules</h2>
                <p className="text-xs text-muted-foreground">Breakdown of the application architecture modules</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4">
              {[
                { title: 'User Module', desc: 'Manages user registration, profiles, settings, and authorization states.' },
                { title: 'Admin Module', desc: 'Dashboard tools for administrative management of categories, items, and platform metrics.' },
                { title: 'Authentication', desc: 'Orchestrates JWT validation, password hashing, and login authentication.' },
                { title: 'Product Module', desc: 'Controls inventory item descriptions, prices, brands, and catalog lookups.' },
                { title: 'Category Module', desc: 'Sets category taxonomies allowing quick filtering, navigation, and grouping.' },
                { title: 'Course Module', desc: 'Manages online courses, descriptions, instructors, duration, and levels.' },
                { title: 'Search Module', desc: 'Enforces robust multi-category matching, query parsing, and results sorting.' },
                { title: 'Dashboard Module', desc: 'Combines user actions and admin operations into intuitive statistics widgets.' },
              ].map((mod, idx) => (
                <div key={idx} className="p-4 bg-secondary/30 border border-border rounded-2xl">
                  <h4 className="text-xs font-black text-foreground uppercase tracking-wider">{mod.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-2 leading-relaxed">{mod.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 6: JWT IMPLEMENTATION */}
          <section id="jwt-flow" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Lock className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">JWT Implementation</h2>
                <p className="text-xs text-muted-foreground">Interactive stateless security workflow</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Step through the security execution sequence below to see how JWT verification prevents spoofing and routes restricted requests.
            </p>

            <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
              {/* Left timeline tabs */}
              <div className="space-y-2 lg:col-span-1">
                {jwtSteps.map((step, idx) => (
                  <button
                    key={idx}
                    onClick={() => setActiveJwtStep(idx)}
                    className={`w-full text-left p-3 rounded-xl border text-xs transition-all duration-200 flex items-center gap-3 ${
                      activeJwtStep === idx
                        ? 'border-primary bg-primary/5 shadow-sm'
                        : 'border-border bg-card hover:bg-secondary/50'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center font-bold text-[10px] ${
                      activeJwtStep === idx ? 'bg-primary text-white' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {idx + 1}
                    </span>
                    <div className="flex-1 min-w-0">
                      <p className="font-extrabold text-foreground truncate">{step.title}</p>
                      <p className="text-[10px] text-muted-foreground truncate">{step.badge}</p>
                    </div>
                  </button>
                ))}
              </div>

              {/* Right step details */}
              <div className="lg:col-span-2 p-6 bg-secondary/30 rounded-2xl border border-border flex flex-col justify-between">
                <div>
                  <div className="flex justify-between items-start gap-2 mb-4">
                    <span className="badge-orange text-[9px]">STEP {activeJwtStep + 1} of {jwtSteps.length}</span>
                    <span className="text-[10px] font-mono bg-card px-2.5 py-1 rounded-lg border border-border text-primary font-bold">
                      {jwtSteps[activeJwtStep].badge}
                    </span>
                  </div>
                  <h3 className="text-lg font-black text-foreground mb-2">
                    {jwtSteps[activeJwtStep].title}
                  </h3>
                  <p className="text-xs text-muted-foreground leading-relaxed mb-6">
                    {jwtSteps[activeJwtStep].desc}
                  </p>
                </div>

                <div className="p-4 bg-card border border-border rounded-xl">
                  <p className="text-[9px] font-mono uppercase text-muted-foreground mb-1">Execution Code / Target Endpoint</p>
                  <p className="text-xs font-mono text-foreground font-semibold break-all">
                    {jwtSteps[activeJwtStep].endpoint}
                  </p>
                </div>
              </div>
            </div>

            {/* Quick Flow Visualization */}
            <div className="mt-8 p-4 bg-card border border-border rounded-2xl flex flex-wrap items-center justify-around gap-2 text-center text-xs">
              <span className="font-bold text-foreground">Login Info</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <span className="px-2 py-1 bg-secondary rounded font-mono">FastAPI Gateway</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <span className="px-2 py-1 bg-secondary rounded font-mono">Spring Security Auth</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <span className="px-2 py-1 bg-emerald-500/10 text-emerald-500 rounded font-mono font-bold">Token Signed</span>
              <ArrowRight className="w-3.5 h-3.5 text-muted-foreground hidden sm:block" />
              <span className="px-2 py-1 bg-primary/10 text-primary rounded font-mono font-bold">Protected APIs Open</span>
            </div>
          </section>

          {/* SECTION 7: CRUD OPERATIONS */}
          <section id="crud" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Code className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">CRUD Operations</h2>
                <p className="text-xs text-muted-foreground">Standardized REST API specifications</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Toggle between categories below to view the REST routes, request types, permission thresholds, and operational descriptions.
            </p>

            {/* CRUD Tabs */}
            <div className="flex border-b border-border mb-6 overflow-x-auto no-scrollbar gap-1 font-bold">
              {Object.keys(crudEndpoints).map((tab) => (
                <button
                  key={tab}
                  onClick={() => setActiveCrudTab(tab)}
                  className={`px-4 py-2 text-xs capitalize border-b-2 transition-colors flex-shrink-0 ${
                    activeCrudTab === tab
                      ? 'border-primary text-primary'
                      : 'border-transparent text-muted-foreground hover:text-foreground'
                  }`}
                >
                  {tab}
                </button>
              ))}
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border-collapse">
                <thead>
                  <tr className="border-b border-border bg-secondary/50">
                    <th className="p-3 font-bold text-foreground">Method</th>
                    <th className="p-3 font-bold text-foreground">Endpoint Path</th>
                    <th className="p-3 font-bold text-foreground">Auth Role</th>
                    <th className="p-3 font-bold text-foreground">Operation Summary</th>
                  </tr>
                </thead>
                <tbody>
                  {crudEndpoints[activeCrudTab].map((route, idx) => (
                    <tr key={idx} className="border-b border-border hover:bg-secondary/20 transition-colors">
                      <td className="p-3">
                        <span className={`px-2.5 py-0.5 rounded font-mono font-bold text-[10px] inline-block ${
                          route.method === 'GET' ? 'bg-blue-500/10 text-blue-500' :
                          route.method === 'POST' ? 'bg-emerald-500/10 text-emerald-500' :
                          route.method === 'PUT' ? 'bg-amber-500/10 text-amber-500' :
                          'bg-destructive/10 text-destructive'
                        }`}>
                          {route.method}
                        </span>
                      </td>
                      <td className="p-3 font-mono text-foreground">{route.path}</td>
                      <td className="p-3">
                        <span className={`px-2 py-0.5 rounded-md text-[9px] font-bold ${
                          route.auth === 'PUBLIC' ? 'bg-secondary text-muted-foreground' :
                          route.auth === 'ADMIN' ? 'bg-red-500/10 text-destructive' :
                          'bg-primary/10 text-primary'
                        }`}>
                          {route.auth}
                        </span>
                      </td>
                      <td className="p-3 text-muted-foreground">{route.desc}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* SECTION 8: DATABASE SCHEMA */}
          <section id="database" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Database className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Database Schema</h2>
                <p className="text-xs text-muted-foreground">PostgreSQL relational table structure and columns</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              Explore the database entity structure. Click on any table to view its keys, data types, constraints, and relationships.
            </p>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {/* Table list selector */}
              <div className="space-y-2 md:col-span-1">
                {Object.keys(dbSchema).map((tbl) => (
                  <button
                    key={tbl}
                    onClick={() => setActiveDbTable(tbl)}
                    className={`w-full text-left p-3.5 rounded-xl border transition-all duration-200 flex items-center justify-between capitalize ${
                      activeDbTable === tbl
                        ? 'border-primary bg-primary/5 text-primary font-bold shadow-sm'
                        : 'border-border bg-card text-muted-foreground hover:bg-secondary/50 hover:text-foreground'
                    }`}
                  >
                    <div className="flex items-center gap-2.5">
                      <Database className="w-4 h-4" />
                      <span className="text-xs">{tbl}</span>
                    </div>
                    <ChevronRight className="w-3.5 h-3.5" />
                  </button>
                ))}
              </div>

              {/* Table detailed columns display */}
              <div className="md:col-span-2 p-6 bg-secondary/30 rounded-2xl border border-border">
                <div className="flex justify-between items-center mb-3">
                  <h3 className="text-sm font-black text-foreground capitalize flex items-center gap-2">
                    <span className="w-2.5 h-2.5 rounded-full bg-teal-500" />
                    Table: {activeDbTable}
                  </h3>
                  <span className="text-[10px] text-muted-foreground uppercase tracking-widest font-mono">PostgreSQL</span>
                </div>
                <p className="text-xs text-muted-foreground mb-4 leading-relaxed">
                  {dbSchema[activeDbTable].desc}
                </p>

                <div className="overflow-x-auto mb-4">
                  <table className="w-full text-left text-[11px]">
                    <thead>
                      <tr className="border-b border-border font-bold text-muted-foreground">
                        <th className="pb-2">Column Name</th>
                        <th className="pb-2">Data Type</th>
                        <th className="pb-2 text-center">Constraint</th>
                        <th className="pb-2">Description</th>
                      </tr>
                    </thead>
                    <tbody>
                      {dbSchema[activeDbTable].fields.map((f, idx) => (
                        <tr key={idx} className="border-b border-border/50 py-2">
                          <td className="py-2 font-mono font-bold text-foreground">{f.name}</td>
                          <td className="py-2 font-mono text-muted-foreground">{f.type}</td>
                          <td className="py-2 text-center">
                            {f.key ? (
                              <span className={`px-1.5 py-0.5 rounded text-[8px] font-bold ${
                                f.key === 'PK' ? 'bg-primary/20 text-primary' : 'bg-blue-500/20 text-blue-500'
                              }`}>
                                {f.key}
                              </span>
                            ) : '-'}
                          </td>
                          <td className="py-2 text-muted-foreground">{f.desc}</td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>

                <div className="p-3.5 bg-card border border-border rounded-xl">
                  <h4 className="text-[10px] font-bold text-foreground uppercase tracking-wider mb-2">Relational Constraints</h4>
                  <ul className="space-y-1.5 text-[11px] text-muted-foreground">
                    {dbSchema[activeDbTable].relations.map((rel, idx) => (
                      <li key={idx} className="flex items-start gap-1.5">
                        <span className="text-primary font-bold mt-0.5">•</span>
                        {rel.text}
                      </li>
                    ))}
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* SECTION 9: SYSTEM FLOW */}
          <section id="system-flow" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <GitBranch className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">System Flows</h2>
                <p className="text-xs text-muted-foreground">Data workflows for system operations</p>
              </div>
            </div>

            <div className="flex gap-2 mb-6">
              {['register', 'login', 'admin'].map((flow) => (
                <button
                  key={flow}
                  onClick={() => setActiveSystemFlow(flow)}
                  className={`px-4 py-2 text-xs font-bold rounded-xl transition-all capitalize ${
                    activeSystemFlow === flow
                      ? 'bg-primary text-white shadow-md shadow-primary/20'
                      : 'bg-secondary text-muted-foreground hover:bg-muted hover:text-foreground'
                  }`}
                >
                  {flow} Flow
                </button>
              ))}
            </div>

            <div className="p-6 bg-secondary/30 rounded-2xl border border-border">
              {activeSystemFlow === 'register' && (
                <div className="space-y-6">
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    Registration Sequence: User enters fields -> Frontend validation passes -> REST POST arrives at FastAPI Gateway -> Gateway redirects payload downstream -> Spring Boot hashes password -> Record written to Postgres DB.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-xs font-mono font-bold">
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Register Request</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">FastAPI Proxy</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Spring Security</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">PostgreSQL DB Success</div>
                  </div>
                </div>
              )}

              {activeSystemFlow === 'login' && (
                <div className="space-y-6">
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    Login Sequence: Username & password checked -> Spring Security generates JWT -> Frontend parses JWT and injects authorization headers -> Protected routes allow safe reading.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-xs font-mono font-bold">
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Check Password</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Generate JWT</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">React Auth Context</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Bearer Header Auth</div>
                  </div>
                </div>
              )}

              {activeSystemFlow === 'admin' && (
                <div className="space-y-6">
                  <p className="text-xs text-muted-foreground leading-relaxed font-semibold">
                    Admin Modification Flow: Admin interacts with panel -> Enforced client admin route check -> FastAPI routes call -> Spring Boot method-level @PreAuthorize verification -> SQL update/delete committed -> Success notification.
                  </p>
                  <div className="flex flex-col md:flex-row items-center justify-center gap-4 text-center text-xs font-mono font-bold">
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Admin CRUD Request</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Gateway Pass-Thru</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Spring Boot RBAC Check</div>
                    <ArrowRight className="w-4 h-4 text-primary hidden md:block" />
                    <ArrowDown className="w-4 h-4 text-primary md:hidden" />
                    <div className="p-3 bg-card border border-border rounded-xl w-36">Database Update Done</div>
                  </div>
                </div>
              )}
            </div>
          </section>

          {/* SECTION 10: SECURITY */}
          <section id="security" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Shield className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Security Matrix</h2>
                <p className="text-xs text-muted-foreground">Framework protocols guarding user and transaction integrity</p>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
              {[
                { title: 'JWT Authentication', desc: 'Stateless secure authentication using signed JSON Web Tokens. Avoids session storage overhead and provides robust API protection.' },
                { title: 'Role Based Access Control (RBAC)', desc: 'Method-level validation prevents privilege escalation. User accounts are strictly restricted from calling admin routes.' },
                { title: 'Protected Routing', desc: 'Client-side route guards in React Router block unauthorized URL access, redirecting guest calls to login.' },
                { title: 'Input Validation', desc: 'Gateway-level schema parsing using Pydantic combined with Spring Boot validations checks incoming inputs for safety.' },
                { title: 'Secure API Communication', desc: 'Controlled CORS headers on FastAPI Gateway specify accepted client origins, preventing malicious scripting injections.' },
              ].map((sec, idx) => (
                <div key={idx} className="p-5 bg-secondary/30 rounded-2xl border border-border flex items-start gap-4">
                  <div className="w-8 h-8 rounded-xl bg-orange-500/10 flex items-center justify-center text-primary flex-shrink-0">
                    <CheckCircle className="w-4.5 h-4.5 text-success" />
                  </div>
                  <div>
                    <h4 className="text-sm font-extrabold text-foreground">{sec.title}</h4>
                    <p className="text-xs text-muted-foreground mt-1.5 leading-relaxed">{sec.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 11: SEARCH FEATURE */}
          <section id="search-feature" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Search className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Search Engine</h2>
                <p className="text-xs text-muted-foreground">Query execution flow simulator</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              SearchHub consolidates query filtering across four distinct categories. Enter a test query below and click "Trace Query" to watch the execution travel through the backend layers in real-time.
            </p>

            <div className="p-6 bg-secondary/30 rounded-2xl border border-border space-y-6">
              {/* Simulation search bar */}
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
                  <input
                    type="text"
                    placeholder="Enter query (e.g. Python Course, Speaker...)"
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="input-field pl-9 text-xs py-2.5 bg-card"
                  />
                </div>
                <button
                  onClick={runSearchSimulation}
                  disabled={searchAnimationRunning}
                  className="btn-primary text-xs py-2.5 px-4 font-bold flex-shrink-0"
                >
                  {searchAnimationRunning ? 'Tracing...' : 'Trace Query'}
                </button>
              </div>

              {/* Steps simulation UI */}
              <div className="space-y-4">
                {[
                  { step: 1, title: 'Client Search Dispatched', desc: `Query "${searchQuery || 'Products'}" sent via Axios HTTP call.` },
                  { step: 2, title: 'FastAPI Gateway Intercept', desc: 'FastAPI receives route `/api/v1/search?q=...` and proxies call to Spring Boot.' },
                  { step: 3, title: 'Spring Boot Controller Parse', desc: 'Spring Boot maps request to catalog service and queries repositories.' },
                  { step: 4, title: 'PostgreSQL Relational Scan', desc: 'SQL full-text match performed across tables: products, courses, categories.' },
                  { step: 5, title: 'Unified JSON Return', desc: 'Structured JSON response package returned to React. UI renders search list.' },
                ].map((item) => (
                  <div
                    key={item.step}
                    className={`p-3.5 rounded-xl border transition-all duration-300 flex items-start gap-3 ${
                      searchStep >= item.step
                        ? 'border-primary bg-card shadow-sm'
                        : 'border-border/40 opacity-40'
                    }`}
                  >
                    <span className={`w-5 h-5 rounded-full flex items-center justify-center text-[10px] font-bold ${
                      searchStep >= item.step ? 'bg-primary text-white animate-bounce' : 'bg-secondary text-muted-foreground'
                    }`}>
                      {item.step}
                    </span>
                    <div>
                      <p className="text-xs font-bold text-foreground">{item.title}</p>
                      <p className="text-[11px] text-muted-foreground mt-0.5">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 12: HACKATHON RUBRIC MAPPING */}
          <section id="rubric" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Award className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Hackathon Rubric Mapping</h2>
                <p className="text-xs text-muted-foreground">Compliance scorecard and progress status</p>
              </div>
            </div>

            <div className="space-y-4">
              <div className="flex justify-between items-center mb-2">
                <span className="text-xs font-bold text-foreground">Project Evaluation Progress</span>
                <span className="text-xs font-black text-primary">100% Completed</span>
              </div>
              <div className="w-full bg-secondary h-2.5 rounded-full overflow-hidden">
                <div className="bg-gradient-to-r from-orange-500 to-amber-500 h-full rounded-full w-full" />
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mt-6">
                {[
                  { name: 'Frontend UI', desc: 'Vite React, dynamic search filters, dark/light mode responsive layout.', status: 'Completed' },
                  { name: 'FastAPI Gateway', desc: 'Asynchronous router gateway proxying requests, mitigating CORS.', status: 'Completed' },
                  { name: 'Spring Security', desc: 'Method level annotation checking, username/password authenticate filter.', status: 'Completed' },
                  { name: 'JWT Auth', desc: 'Signed HS256 token delivery mechanism packaging secure role payloads.', status: 'Completed' },
                  { name: 'RBAC Enforce', desc: 'Rigid role controls separating standard dashboard from admin panels.', status: 'Completed' },
                  { name: 'CRUD Logic', desc: 'Database updates, list queries, details parsing via Spring Data JPA.', status: 'Completed' },
                  { name: 'PostgreSQL Store', desc: 'Normalized tables, relational foreign keys, database triggers.', status: 'Completed' },
                  { name: 'System Integrations', desc: 'Unbroken data flows linking React -> FastAPI -> Spring Boot -> DB.', status: 'Completed' },
                  { name: 'Git Collaboration', desc: 'Structured commits, branching workflows, clean team alignment.', status: 'Completed' },
                ].map((rub, idx) => (
                  <div key={idx} className="p-4 bg-secondary/30 border border-border rounded-xl flex flex-col justify-between">
                    <div>
                      <div className="flex justify-between items-center mb-2">
                        <h4 className="text-xs font-bold text-foreground">{rub.name}</h4>
                        <span className="px-1.5 py-0.5 rounded bg-emerald-500/10 text-success text-[8px] font-bold">
                          {rub.status}
                        </span>
                      </div>
                      <p className="text-[11px] text-muted-foreground leading-relaxed">{rub.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </section>

          {/* SECTION 13: TEAM CONTRIBUTION */}
          <section id="team" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Users className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Team & Contribution</h2>
                <p className="text-xs text-muted-foreground">Core roles and division of workload</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              {[
                { name: 'Technical Lead', role: 'System Architect', desc: 'Designed system structure, setup gateway routing mappings, finalized SQL relational constraints, and directed security flows.', initial: 'TL' },
                { name: 'Frontend Developer', role: 'UI / UX Design', desc: 'Built React layout view components, registered router guards, managed state using Zustand stores, and polished light/dark theme toggles.', initial: 'FD' },
                { name: 'Backend Engineer', role: 'Logic & Security', desc: 'Authored Spring Boot entity components, implemented JWT filters, established Spring Security RBAC annotations, and coded REST CRUD mappings.', initial: 'BE' },
              ].map((member, idx) => (
                <div key={idx} className="p-5 bg-secondary/30 border border-border rounded-2xl flex flex-col items-center text-center">
                  <div className="w-12 h-12 rounded-full bg-gradient-to-br from-primary to-orange-600 flex items-center justify-center text-white text-sm font-black mb-3 shadow-md">
                    {member.initial}
                  </div>
                  <h4 className="text-sm font-extrabold text-foreground">{member.name}</h4>
                  <span className="badge-orange text-[9px] mt-1.5">{member.role}</span>
                  <p className="text-xs text-muted-foreground mt-3 leading-relaxed">{member.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 14: PROJECT ADVANTAGES */}
          <section id="advantages" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <Zap className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Project Advantages</h2>
                <p className="text-xs text-muted-foreground">Architectural design benefits of the platform</p>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
              {[
                { title: 'Centralized Search', desc: 'Consolidates inventory products, courses, and digital assets into a single API endpoint.' },
                { title: 'Role Based Access Control', desc: 'Rigid RBAC constraints prevent authorization spoofing across resource endpoints.' },
                { title: 'Secure Authentication', desc: 'HS256 encryption tokens ensure security without DB-lookup storage overhead.' },
                { title: 'Fast CRUD Operations', desc: 'Spring Boot JPA repository layer handles database queries with caching.' },
                { title: 'Structured Database', desc: 'Relational schema ensures clean cascades and indexing for search tags.' },
                { title: 'Scalable Architecture', desc: 'Microservice-ready layers permit independent scaling of FastAPI and Spring Boot nodes.' },
                { title: 'Responsive UI', desc: 'Beautiful, modern theme optimized for screen ratios ranging from desktops to mobile drawers.' },
              ].map((adv, idx) => (
                <div key={idx} className="p-4 bg-secondary/30 border border-border rounded-2xl">
                  <div className="flex items-center gap-2 mb-2">
                    <CheckCircle className="w-4 h-4 text-success flex-shrink-0" />
                    <h4 className="text-xs font-black text-foreground">{adv.title}</h4>
                  </div>
                  <p className="text-[11px] text-muted-foreground leading-relaxed">{adv.desc}</p>
                </div>
              ))}
            </div>
          </section>

          {/* SECTION 15: FUTURE ENHANCEMENTS */}
          <section id="future" className="scroll-mt-24 bg-card border border-border p-6 sm:p-8 rounded-3xl shadow-sm">
            <div className="flex items-center gap-3 mb-6">
              <div className="w-10 h-10 rounded-2xl bg-orange-500/10 flex items-center justify-center text-primary">
                <TrendingUp className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-2xl font-black text-foreground">Future Enhancements</h2>
                <p className="text-xs text-muted-foreground">Technical roadmap and future scope</p>
              </div>
            </div>

            <p className="text-sm text-muted-foreground mb-6 leading-relaxed">
              We have outlined the upcoming deployment targets and module implementations for subsequent lifecycle stages.
            </p>

            <div className="relative border-l-2 border-primary/20 ml-3 space-y-6">
              {[
                { phase: 'Phase 1', title: 'Node.js Analytics Engine', desc: 'Add a Node.js microservice to ingest query history and render dashboards.' },
                { phase: 'Phase 2', title: 'MongoDB Analytics Cache', desc: 'Integrate MongoDB for unstructured click logs and analytical trends.' },
                { phase: 'Phase 3', title: 'AI Recommendations', desc: 'Add Python AI pipelines to recommend courses or products based on user activity.' },
                { phase: 'Phase 4', title: 'Advanced Search & Auto-Suggestions', desc: 'Add Elasticsearch or PostgreSQL Trigram indexing to support fuzzy query suggestions.' },
                { phase: 'Phase 5', title: 'Cloud Deployment', desc: 'Dockerize frontend, FastAPI, Spring Boot, and Postgres for automated Kubernetes cluster deployment.' },
              ].map((fut, idx) => (
                <div key={idx} className="relative pl-6">
                  {/* Timeline dot */}
                  <span className="absolute -left-[7px] top-1 w-3 h-3 bg-primary rounded-full ring-4 ring-card" />
                  <span className="text-[9px] font-black text-primary uppercase tracking-widest block">{fut.phase}</span>
                  <h4 className="text-xs font-bold text-foreground mt-0.5">{fut.title}</h4>
                  <p className="text-[11px] text-muted-foreground mt-1 leading-relaxed">{fut.desc}</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
