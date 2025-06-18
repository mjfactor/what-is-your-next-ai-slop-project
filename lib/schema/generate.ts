import { z } from 'zod';

export const ResourceLinkSchema = z.object({
    name: z.string().describe('The display name of the resource that you\'ll bookmark and never actually read (e.g., "Next.js Documentation", "React Tutorial").'),
    url: z.string().describe('The URL link to the resource that will collect digital dust in your bookmarks folder.')
});

export const ProjectMetadataSchema = z.object({
    complexity: z.enum(['Simple', 'Medium', 'Complex', 'Enterprise']).describe('The estimated complexity level that will inevitably be wrong because every "simple" project becomes complex the moment you touch it.'),
    estimatedTimeline: z.string().describe('Hilariously optimistic timeline estimate that you\'ll triple by the time you\'re done (e.g., "2-4 weeks" becomes "3-4 months").'),
    teamSize: z.string().describe('Recommended team size before you realize you\'ll end up doing most of it yourself anyway (e.g., "1-2 developers", "Small team of 5 who will all have different opinions").'),
    budgetConsiderations: z.string().describe('Budget considerations that don\'t include the therapy you\'ll need after dealing with third-party API pricing changes.'),
});

export const ArchitectureSchema = z.object({
    pattern: z.string().describe('The architectural pattern you\'ll choose and then immediately regret (e.g., Monolith that should\'ve been microservices, Microservices that should\'ve been a monolith).'),
    reasoning: z.string().describe('Sophisticated justification for why you totally didn\'t just pick whatever\'s trending on Twitter this week.'),
    alternatives: z.array(z.string()).optional().describe('Other patterns you considered for 30 seconds before getting distracted by a new JavaScript framework.'),
});

export const TechStackSchema = z.object({
    frontend: z.object({
        language: z.string().describe('The programming language you\'ll use before questioning all your life choices (e.g., "TypeScript because apparently JavaScript wasn\'t painful enough").'),
        framework: z.string().describe('The framework that will be deprecated by the time you finish your project (e.g., "Next.js because React alone is too mainstream").'),
        libraries: z.array(z.string()).describe('Essential libraries that will break with every major update and make you question why you didn\'t become a farmer instead.'),
        styling: z.string().describe('The styling approach that seemed like a good idea until you had to center a div (e.g., "Tailwind CSS because writing actual CSS is apparently forbidden").'),
        buildTool: z.string().describe('The build tool that will consume 47GB of your hard drive and take longer to start than your computer (e.g., "Vite because we needed another bundler").'),
    }).describe('Frontend technology choices that will haunt your dreams and your bundle size.'), backend: z.object({
        language: z.string().describe('The backend language that will make you nostalgic for frontend development (e.g., "Node.js because why learn a second language when you can suffer in one").'),
        framework: z.string().describe('The server framework that promises simplicity but delivers complexity (e.g., "Express.js for when you want to build everything from scratch" vs "NestJS for when you miss Java").'),
        apiStyle: z.string().describe('API architecture choice that you\'ll debate with your team for 3 weeks (e.g., "REST because GraphQL is too mainstream" vs "GraphQL because REST is too mainstream").'),
        runtime: z.string().optional().describe('Runtime environment specification that Docker will ignore anyway.'),
    }).describe('Backend choices that will make you question why you didn\'t just use Firebase.'), database: z.object({
        type: z.string().describe('Database type that will spark religious wars in your team meetings (e.g., "SQL because NoSQL is chaos" vs "NoSQL because SQL is ancient").'),
        provider: z.string().describe('Database provider that will definitely not have outages during your demo (e.g., "PostgreSQL for when you want to feel superior to MySQL users").'),
        orm: z.string().optional().describe('ORM choice that will generate more boilerplate than you ever wanted to write (e.g., "Prisma for type safety and existential dread").'),
        backupStrategy: z.string().optional().describe('Backup strategy you\'ll set up after your first data loss incident.'),
    }).describe('Database decisions that will keep you up at night worrying about N+1 queries.'), developmentTools: z.object({
        packageManager: z.string().describe('Package manager that will somehow break your project with every update (e.g., "pnpm because npm is too mainstream and yarn is too Google").'),
        linting: z.string().describe('Code linting setup that will argue with you about semicolons and trailing commas for eternity.'),
        versionControl: z.string().describe('Version control strategy that assumes your team actually writes meaningful commit messages.'),
        ide: z.string().describe('IDE recommendation that comes with 47 extensions and uses 8GB of RAM to edit a text file.'),
    }).describe('Development tools that will spend more time configuring than actually developing.'), testing: z.object({
        unit: z.string().describe('Unit testing framework that you\'ll set up with the best intentions and 23% code coverage (e.g., "Vitest for speed and the illusion of productivity").'),
        integration: z.string().describe('Integration testing that will break every time someone sneezes near the API.'),
        e2e: z.string().describe('End-to-end testing that takes longer to run than your actual application startup time.'),
        coverage: z.string().describe('Code coverage targets that look impressive until you realize most tests just check if functions exist.'),
    }).describe('Testing strategy that everyone agrees is important but somehow never gets prioritized.'), security: z.object({
        authentication: z.string().describe('Authentication system that you\'ll implement after your first security breach (e.g., "NextAuth.js because rolling your own auth is a bad life choice").'),
        authorization: z.string().describe('Authorization system that assumes users won\'t try to break everything immediately.'),
        dataProtection: z.string().describe('Data protection measures you\'ll add after someone tries to inject SQL into your contact form.'),
        vulnerabilityScanning: z.string().optional().describe('Security scanning tools that will find 47 vulnerabilities in your node_modules folder.'),
    }).describe('Security measures that transform from "we\'ll add that later" to "why didn\'t we add that earlier?"'), monitoring: z.object({
        errorTracking: z.string().describe('Error monitoring that will spam your inbox at 3 AM with exceptions you can\'t reproduce locally.'),
        analytics: z.string().describe('User analytics that will tell you nobody is using the feature you spent 3 months building.'),
        performance: z.string().describe('Performance monitoring that confirms your app is indeed slower than you thought.'),
        logging: z.string().describe('Logging strategy that will fill your disk with debug messages you forgot to remove.'),
    }).describe('Monitoring setup that will make you painfully aware of every problem you hoped nobody would notice.'), thirdPartyServices: z.object({
        payment: z.string().optional().describe('Payment service that will definitely not change their API the day before launch (e.g., "Stripe for taking money and your sanity").'),
        email: z.string().optional().describe('Email service for sending messages that will end up in spam folders anyway.'),
        fileStorage: z.string().optional().describe('File storage solution that will somehow cost more than your entire server infrastructure.'),
        search: z.string().optional().describe('Search functionality that users will bypass by using Ctrl+F anyway.'),
    }).describe('Third-party services that will nickel and dime you into bankruptcy.'), deployment: z.object({
        hosting: z.string().describe('Hosting platform that will go down during your important demo (e.g., "Vercel for when you want to pretend you understand serverless").'),
        cicd: z.string().describe('CI/CD pipeline that will fail because someone forgot to update the environment variables.'),
        containerization: z.string().optional().describe('Docker setup that works on your machine but nowhere else.'),
        cdn: z.string().describe('Content delivery network that makes your 5KB app load in 0.3 seconds instead of 0.4.'),
    }).describe('Deployment strategy that will make you nostalgic for FTP uploads.'), performance: z.object({
        caching: z.object({
            strategy: z.string().describe('Caching strategy that will somehow make your app slower until you figure out cache invalidation.'),
            provider: z.string().optional().describe('Caching service that will cost more than your server when you hit their rate limits.'),
        }),
        optimization: z.string().describe('Performance optimizations that will save 50ms but take 50 hours to implement.'),
        monitoring: z.string().describe('Performance monitoring that will confirm your suspicion that everything is slower than it should be.'),
    }).describe('Performance optimization strategies that will consume more resources than the problems they solve.'), aiIntegration: z.object({
        model: z.string().optional().describe('AI model that will definitely not hallucinate important information (e.g., "GPT-4 for when you need expensive wrong answers").'),
        library: z.string().optional().describe('AI integration library that changes its API every other Tuesday.'),
        infrastructure: z.string().optional().describe('AI infrastructure that will consume your entire budget on day one of production.'),
    }).describe('AI integration for when you absolutely need to add "AI-powered" to your marketing copy.'),
});

export const ProjectStructureSchema = z.object({
    id: z.string().describe('A unique identifier for this project that you\'ll definitely remember and not accidentally reuse.'),
    projectName: z.string().describe("A marketable name that sounds way cooler than what you're actually building."),
    projectDescription: z.string().describe('A comprehensive description that makes your simple CRUD app sound like the next unicorn startup.'),
    metadata: ProjectMetadataSchema.describe('Project metadata including wildly optimistic timelines and budget estimates.'),
    architecture: ArchitectureSchema.describe('Architectural decisions that seemed brilliant at 2 AM but questionable in daylight.'),
    techStack: TechStackSchema.describe('Technology choices that will make future you question past you\'s sanity.'),
    developmentPhases: z.array(z.object({
        phase: z.string().describe('Development phase name that sounds professional (e.g., "MVP", "Beta", "Please-just-work").'),
        duration: z.string().describe('Estimated duration that assumes nothing will go wrong (spoiler: everything goes wrong).'),
        features: z.array(z.string()).describe('Features that seemed essential until you realized how hard they are to implement.'),
        priorities: z.array(z.string()).describe('Technical priorities that will change every week based on the latest blog post you read.'),
    })).describe('Development phases with timelines that exist in a parallel universe where CSS behaves logically.'),
    reasoning: z.string().describe('A detailed explanation for why these technology choices are totally not influenced by whatever was trending on Hacker News yesterday.'),
    risks: z.array(z.string()).describe('Technical risks that you\'ll optimistically assume won\'t happen to you.'),
    recommendations: z.array(z.string()).describe('Best practices that you\'ll follow religiously for the first week.'), resources: z.object({
        documentation: z.array(ResourceLinkSchema).describe('Essential documentation that you\'ll bookmark with every intention of reading thoroughly someday.'),
        tutorials: z.array(ResourceLinkSchema).describe('Tutorials you\'ll start enthusiastically and abandon halfway through when you get distracted by a Stack Overflow answer.'),
        communities: z.array(ResourceLinkSchema).describe('Developer communities where you\'ll lurk silently instead of asking the questions you actually need answered.'),
    }).describe('Learning resources that will make you feel productive while procrastinating on actual coding.'),
});