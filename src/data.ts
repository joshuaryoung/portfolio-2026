// Single source of truth for site content. Edit this file only.
// Source: Joshua_Young_Senior_Software_Engineer_Resume.pdf + LinkedIn.

export const profile = {
  name: 'Joshua Young',
  title: 'Senior Full-Stack Software Developer',
  location: 'Salt Lake City, Utah',
  summary:
    'Senior full-stack developer with 9+ years of experience building web applications and backend services. I specialize in React, Next.js, TypeScript, Node.js and GraphQL, with a focus on application architecture, database performance, and AWS serverless infrastructure. I enjoy leading development efforts and mentoring junior engineers.',
  linkedin: 'https://www.linkedin.com/in/joshua-young-a79108100',
  github: 'https://github.com/joshuaryoung',
  email: 'joshua.r.young1@gmail.com',
}

export const experience = [
  {
    company: 'DealerOps',
    role: 'Senior Software Developer',
    period: '2023 – Present',
    location: 'Roswell, Georgia (remote)',
    bullets: [
      'Led the design and implementation of a large-scale React/Next.js reporting platform, optimizing its architecture to support 1,000+ concurrent users.',
      'Optimized GraphQL resolvers and SQL queries, reducing data retrieval latency by 40% on large datasets.',
      'Architected backend services with NestJS, TypeScript and TypeORM across Microsoft SQL Server and PostgreSQL.',
      'Mentored 3 junior developers on design patterns, full-stack practices and code quality.',
    ],
  },
  {
    company: 'Hexly LLC',
    role: 'Software Developer',
    period: '2019 – 2022',
    location: '',
    bullets: [
      'Built account-administration and client-facing applications with Vue 2/3, implementing complex application state and business logic.',
      'Developed Node.js, TypeScript and GraphQL services within a federated microservices architecture.',
      'Implemented AWS serverless infrastructure with Lambda and CloudWatch for error logging and automated build pipelines.',
      'Built PHP/jQuery plugins and WordPress solutions; designed PostgreSQL schemas and managed relational databases.',
      'Developed Go services for a self-sovereign identity application backend and maintained direct client relationships.',
    ],
  },
  {
    company: 'Freelance',
    role: 'Full-Stack Web Developer',
    period: '2017 – 2019',
    location: '',
    bullets: ['Built full-stack web applications independently, specializing in the MERN stack (MongoDB, Express, React, Node.js).'],
  },
]

export const education = [
  { school: 'Salt Lake Community College', period: '2010' },
  { school: 'University of Utah', period: '2008' },
]

export const certifications = [
  { name: 'Redis for JavaScript Developers', issuer: 'Redis', date: 'May 2023' },
]

export const languages = ['English (Native)', 'Spanish (Fluent)', 'Portuguese (Fluent)', 'Japanese (Conversational)']

export const aiSkills = {
  heading: 'AI-Assisted Engineering',
  blurb:
    'Proficient with Claude and Claude Code in my daily workflow: I use them to explore unfamiliar codebases, scaffold and refactor features, write tests, and ship faster. I treat the model as a collaborator and review its output as I would a teammate’s.',
  tags: ['Claude', 'Claude Code', 'Prompt engineering', 'AI-assisted development', 'Code review with AI', 'Rapid prototyping'],
}

export const skills: Record<string, string[]> = {
  Frontend: ['React', 'Next.js', 'Vue.js (2/3)', 'GraphQL'],
  Backend: ['Node.js', 'NestJS', 'Express', 'REST APIs'],
  Languages: ['TypeScript', 'JavaScript (ES6+)', 'Go', 'PHP', 'C#', 'C/C++'],
  'Databases & Data': ['PostgreSQL', 'Microsoft SQL Server', 'MongoDB', 'TypeORM', 'Redis'],
  'Cloud & DevOps': ['AWS Lambda', 'CloudWatch', 'Serverless', 'CI/CD', 'Grafana', 'Prometheus'],
  'Platforms & Game Dev': ['Unity', 'Linux', 'macOS', 'Windows'],
}
