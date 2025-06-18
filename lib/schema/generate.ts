import { z } from 'zod';

export const ResourceLinkSchema = z.object({
    name: z.string().describe('The display name of the resource (e.g., "Next.js Documentation", "React Tutorial").'),
    url: z.string().describe('The URL link to the resource.')
});

export const ProjectMetadataSchema = z.object({
    complexity: z.enum(['Simple', 'Medium', 'Complex', 'Enterprise']).describe('The estimated complexity level of the project based on features, scale, and technical requirements.'),
    estimatedTimeline: z.string().describe('Rough timeline estimate for MVP development (e.g., "2-4 weeks", "3-6 months").'),
    teamSize: z.string().describe('Recommended team size and composition (e.g., "1-2 developers", "Small team: 3-5 developers with 1 designer").'),
    budgetConsiderations: z.string().describe('Budget-related considerations including potential costs for third-party services, hosting, and development tools.'),
});

export const ArchitectureSchema = z.object({
    pattern: z.string().describe('The recommended architectural pattern (e.g., Monolith, Microservices, Serverless, JAMstack, Micro-frontend).'),
    reasoning: z.string().describe('Explanation of why this architecture pattern fits the project requirements, including scalability and complexity considerations.'),
    alternatives: z.array(z.string()).optional().describe('Alternative architectural patterns that could work, with brief pros/cons.'),
});

export const TechStackSchema = z.object({
    frontend: z.object({
        language: z.string().describe('The primary programming language for the frontend with justification for the choice (e.g., "TypeScript for type safety and better developer experience").'),
        framework: z.string().describe('The main framework for building the user interface, explaining why it fits the project needs (e.g., "Next.js for SSR, SEO optimization, and full-stack capabilities").'),
        libraries: z.array(z.string()).describe('Essential libraries for state management, data fetching, UI components, and utilities with specific use cases.'),
        styling: z.string().describe('The styling approach with reasoning (e.g., "Tailwind CSS for rapid development and consistent design system").'),
        buildTool: z.string().describe('The build tool and bundler recommendation (e.g., Vite, Webpack, Turbopack).'),
    }).describe('Comprehensive frontend technology recommendations with justifications.'),
    backend: z.object({
        language: z.string().describe('The primary backend language with performance and ecosystem considerations (e.g., "Node.js for JavaScript ecosystem consistency and rapid development").'),
        framework: z.string().describe('The server-side framework choice with scalability and feature considerations (e.g., "Express.js for simplicity" vs "NestJS for enterprise-grade applications").'),
        apiStyle: z.string().describe('API architecture with trade-offs (e.g., "REST for simplicity and caching" vs "GraphQL for flexible data fetching").'),
        runtime: z.string().optional().describe('Runtime environment if relevant (e.g., Node.js version, Python version, Docker).'),
    }).describe('Backend technology stack with performance and scalability considerations.'),
    database: z.object({
        type: z.string().describe('Database type with data structure and scalability reasoning (e.g., "SQL for ACID compliance and complex relationships" vs "NoSQL for flexible schema and horizontal scaling").'),
        provider: z.string().describe('Specific database provider with features and hosting considerations (e.g., "PostgreSQL for advanced features and reliability" or "MongoDB Atlas for managed NoSQL").'),
        orm: z.string().optional().describe('ORM/ODM choice with type safety and query optimization considerations (e.g., "Prisma for type safety and excellent DX").'),
        backupStrategy: z.string().optional().describe('Recommended backup and disaster recovery approach.'),
    }).describe('Database technology with data modeling and reliability considerations.'),
    developmentTools: z.object({
        packageManager: z.string().describe('Package manager recommendation with workspace and performance considerations (e.g., "pnpm for disk efficiency and monorepo support").'),
        linting: z.string().describe('Code linting setup (e.g., "ESLint with TypeScript rules and Prettier for consistent formatting").'),
        versionControl: z.string().describe('Version control strategy and branch management approach (e.g., "Git with GitFlow for team collaboration").'),
        ide: z.string().describe('Recommended IDE/editor setup with extensions and configurations.'),
    }).describe('Development environment and tooling recommendations.'),
    testing: z.object({
        unit: z.string().describe('Unit testing framework with coverage and performance considerations (e.g., "Vitest for speed and modern features").'),
        integration: z.string().describe('Integration testing approach and tools (e.g., "React Testing Library for component testing").'),
        e2e: z.string().describe('End-to-end testing solution with CI/CD integration (e.g., "Playwright for cross-browser testing").'),
        coverage: z.string().describe('Code coverage tool and target thresholds.'),
    }).describe('Comprehensive testing strategy across all levels.'),
    security: z.object({
        authentication: z.string().describe('Authentication strategy with security considerations (e.g., "NextAuth.js with OAuth providers and JWT tokens").'),
        authorization: z.string().describe('Authorization and access control approach (e.g., "Role-based access control with middleware").'),
        dataProtection: z.string().describe('Data protection measures including encryption, validation, and sanitization.'),
        vulnerabilityScanning: z.string().optional().describe('Security scanning and vulnerability management tools.'),
    }).describe('Security architecture and best practices implementation.'),
    monitoring: z.object({
        errorTracking: z.string().describe('Error monitoring and alerting solution (e.g., "Sentry for error tracking and performance monitoring").'),
        analytics: z.string().describe('User analytics and behavior tracking (e.g., "Google Analytics 4 with privacy compliance").'),
        performance: z.string().describe('Performance monitoring and optimization tools (e.g., "Vercel Analytics for Core Web Vitals").'),
        logging: z.string().describe('Logging strategy and centralized log management.'),
    }).describe('Observability and monitoring infrastructure.'),
    thirdPartyServices: z.object({
        payment: z.string().optional().describe('Payment processing solution if applicable (e.g., "Stripe for comprehensive payment handling").'),
        email: z.string().optional().describe('Email service provider for transactional emails (e.g., "Resend for developer-friendly email API").'),
        fileStorage: z.string().optional().describe('File upload and storage solution (e.g., "Cloudinary for image optimization and CDN").'),
        search: z.string().optional().describe('Search functionality if needed (e.g., "Algolia for fast, typo-tolerant search").'),
    }).describe('Third-party service integrations based on project requirements.'),
    deployment: z.object({
        hosting: z.string().describe('Hosting platform with scalability and cost considerations (e.g., "Vercel for Next.js optimization and edge functions").'),
        cicd: z.string().describe('CI/CD pipeline with automated testing and deployment (e.g., "GitHub Actions for seamless integration with repository").'),
        containerization: z.string().optional().describe('Containerization strategy if applicable (e.g., "Docker for consistent deployment environments").'),
        cdn: z.string().describe('Content delivery network for global performance (e.g., "Cloudflare for global CDN and security").'),
    }).describe('Deployment and infrastructure strategy.'),
    performance: z.object({
        caching: z.object({
            strategy: z.string().describe('Multi-level caching strategy (e.g., "Browser caching, CDN, and Redis for database queries").'),
            provider: z.string().optional().describe('Caching service provider with scalability considerations (e.g., "Redis Cloud for distributed caching").'),
        }),
        optimization: z.string().describe('Performance optimization techniques (e.g., "Code splitting, lazy loading, image optimization, and server-side rendering").'),
        monitoring: z.string().describe('Performance monitoring and Core Web Vitals tracking approach.'),
    }).describe('Performance optimization and caching strategies.'),
    aiIntegration: z.object({
        model: z.string().optional().describe('AI model selection with cost and capability considerations (e.g., "GPT-4 for complex reasoning, GPT-3.5 for cost-effective tasks").'),
        library: z.string().optional().describe('AI integration library with ease of use and flexibility (e.g., "Vercel AI SDK for streaming and multiple provider support").'),
        infrastructure: z.string().optional().describe('AI infrastructure and deployment considerations (e.g., "Edge functions for low latency AI responses").'),
    }).describe('AI integration strategy if applicable to the project.'),
});

export const ProjectStructureSchema = z.object({
    id: z.string().describe('A unique identifier for the generated project plan. This must be the ID provided in the prompt.'),
    projectName: z.string().describe("A suitable, marketable name for the project based on the user's idea."),
    projectDescription: z.string().describe('A comprehensive description of the project including core features, target audience, and value proposition.'),
    metadata: ProjectMetadataSchema.describe('Project metadata including complexity, timeline, and resource requirements.'),
    architecture: ArchitectureSchema.describe('Architectural pattern and structure recommendations.'),
    techStack: TechStackSchema.describe('A comprehensive technology stack recommendation with detailed justifications.'),
    developmentPhases: z.array(z.object({
        phase: z.string().describe('Development phase name (e.g., "MVP", "Beta", "Production").'),
        duration: z.string().describe('Estimated duration for this phase.'),
        features: z.array(z.string()).describe('Key features to be developed in this phase.'),
        priorities: z.array(z.string()).describe('Technical priorities and focus areas for this phase.'),
    })).describe('Recommended development phases with features and timelines.'),
    reasoning: z.string().describe('A detailed, comprehensive explanation for the entire technology stack, including trade-offs, alternatives considered, and why each choice is optimal for this specific project.'),
    risks: z.array(z.string()).describe('Technical risks and challenges that might arise during development.'),
    recommendations: z.array(z.string()).describe('Best practices, tips, and specific recommendations for successful project execution.'), resources: z.object({
        documentation: z.array(ResourceLinkSchema).describe('Essential documentation and learning resources for the chosen technologies with direct links.'),
        tutorials: z.array(ResourceLinkSchema).describe('Recommended tutorials and guides for getting started with direct links.'),
        communities: z.array(ResourceLinkSchema).describe('Developer communities and forums for support and learning with direct links.'),
    }).describe('Learning resources and community support for the recommended technologies. Include structured links with names and URLs to official documentation, tutorials, and community forums.'),
});