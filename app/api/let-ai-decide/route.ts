import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';

// Rate limiting map (in production, use Redis or a proper rate limiting service)
const rateLimitMap = new Map<string, { count: number; resetTime: number }>();

// Input validation and sanitization
const validateAndSanitizeInput = (body: any): { isValid: boolean; error?: string; sanitizedInput?: any } => {
    if (!body || typeof body !== 'object') {
        return { isValid: false, error: 'Request body must be a valid JSON object' };
    }

    const { projectIdea } = body;

    // Validate project idea
    if (!projectIdea || typeof projectIdea !== 'string') {
        return { isValid: false, error: 'Project idea is required and must be a string' };
    }

    const trimmedIdea = projectIdea.trim();

    if (trimmedIdea.length < 10) {
        return { isValid: false, error: 'Project idea must be at least 10 characters long' };
    }

    if (trimmedIdea.length > 2000) {
        return { isValid: false, error: 'Project idea must be less than 2000 characters' };
    }

    // Sanitize input - remove potentially harmful content
    const sanitizedIdea = trimmedIdea
        .replace(/<script\b[^<]*(?:(?!<\/script>)<[^<]*)*<\/script>/gi, '') // Remove script tags
        .replace(/javascript:/gi, '') // Remove javascript: protocol
        .replace(/on\w+\s*=/gi, '') // Remove event handlers
        .trim();

    return {
        isValid: true,
        sanitizedInput: { projectIdea: sanitizedIdea }
    };
};

// Rate limiting function
const checkRateLimit = (clientId: string): { allowed: boolean; resetTime?: number } => {
    const now = Date.now();
    const windowMs = 60000; // 1 minute window
    const maxRequests = 10; // Max 10 requests per minute

    const clientData = rateLimitMap.get(clientId);

    if (!clientData || now > clientData.resetTime) {
        // Reset or initialize
        rateLimitMap.set(clientId, { count: 1, resetTime: now + windowMs });
        return { allowed: true };
    }

    if (clientData.count >= maxRequests) {
        return { allowed: false, resetTime: clientData.resetTime };
    }

    clientData.count++;
    return { allowed: true };
};

// Get client identifier for rate limiting
const getClientId = (req: NextRequest): string => {
    const forwarded = req.headers.get('x-forwarded-for');
    const realIp = req.headers.get('x-real-ip');
    const remoteAddr = req.headers.get('remote-addr');

    return forwarded?.split(',')[0] || realIp || remoteAddr || 'unknown';
};

// Log request for monitoring
const logRequest = (req: NextRequest, clientId: string, projectIdea: string) => {
    const timestamp = new Date().toISOString();
    const userAgent = req.headers.get('user-agent') || 'unknown';
    const referer = req.headers.get('referer') || 'direct';

    console.log('📊 API Request:', {
        timestamp,
        clientId,
        userAgent,
        referer,
        projectIdeaLength: projectIdea.length,
        requestId: crypto.randomUUID()
    });
};

export async function POST(req: NextRequest) {
    const startTime = Date.now();
    let clientId = 'unknown';

    try {
        // Get client identifier
        clientId = getClientId(req);

        // Check rate limiting
        const rateLimitCheck = checkRateLimit(clientId);
        if (!rateLimitCheck.allowed) {
            return NextResponse.json(
                {
                    error: 'Rate limit exceeded',
                    details: 'Too many requests. Please try again later.',
                    code: 'RATE_LIMIT_EXCEEDED',
                    resetTime: rateLimitCheck.resetTime
                },
                {
                    status: 429,
                    headers: {
                        'Retry-After': '60',
                        'X-RateLimit-Limit': '10',
                        'X-RateLimit-Remaining': '0',
                        'X-RateLimit-Reset': rateLimitCheck.resetTime?.toString() || ''
                    }
                }
            );
        }

        // Parse and validate request body
        const body = await req.json();
        const validation = validateAndSanitizeInput(body);

        if (!validation.isValid) {
            return NextResponse.json(
                {
                    error: 'Invalid input',
                    details: validation.error,
                    code: 'VALIDATION_ERROR'
                },
                { status: 400 }
            );
        }

        const { projectIdea } = validation.sanitizedInput!;

        // Log request for monitoring
        logRequest(req, clientId, projectIdea);

        const model = google('gemini-2.0-flash-exp');

        console.log('🚀 Starting comprehensive project analysis for:', projectIdea.substring(0, 100) + '...');

        const result = streamObject({
            model,
            prompt: `You are a **Senior Software Architect and Technical Lead** with 15+ years of experience in enterprise software development, startup scaling, and modern web technologies. You have expertise in:

- Full-stack development (React, Next.js, Node.js, TypeScript, Python)
- Cloud architecture (AWS, Azure, GCP, Vercel, Netlify)
- Database design (PostgreSQL, MongoDB, Redis, Elasticsearch)
- DevOps and CI/CD (Docker, Kubernetes, GitHub Actions, Jenkins)
- Security best practices and compliance
- Performance optimization and scalability
- Team leadership and project management

**PROJECT TO ANALYZE:**
"${projectIdea}"

**YOUR MISSION:**
Create a comprehensive, production-ready project plan that includes detailed technical specifications, implementation roadmap, and best practices. This should be a complete guide that a development team can follow from conception to deployment.

**ANALYSIS FRAMEWORK:**

## 1. PROJECT UNDERSTANDING & CATEGORIZATION
- Analyze the core problem and value proposition
- Determine project category (Web App, Mobile App, API, etc.)
- Assess complexity level (Simple, Moderate, Complex, Enterprise)
- Identify target audience and business requirements
- Define success metrics and KPIs

## 2. TECHNOLOGY STACK DECISIONS
For each technology choice, provide:
- **Name & Version**: Specific technology with version when relevant
- **Reasoning**: Why this technology is the best fit (2-3 sentences)
- **Alternatives**: 2-3 alternatives that were considered
- **Learning Curve**: Easy/Moderate/Steep
- **Popularity**: Low/Medium/High
- **Setup Instructions**: Step-by-step setup commands
- **Pros & Cons**: Honest assessment of advantages and disadvantages

**Technology Categories to Address:**
- **Frontend**: Framework/library for user interface
- **Backend**: Server technology and runtime
- **Database**: Primary data storage solution
- **Authentication**: User authentication and authorization
- **Deployment**: Hosting and deployment platform
- **Testing**: Testing frameworks and tools
- **Monitoring**: Application monitoring and analytics
- **CI/CD**: Continuous integration and deployment
- **Additional**: Supporting tools and services

**Technology Selection Guidelines:**
- Prioritize proven, well-maintained technologies
- Consider ecosystem compatibility and community support
- Balance cutting-edge features with stability
- Factor in team expertise and learning curve
- Consider long-term maintenance and scalability

## 3. ARCHITECTURE & DESIGN PATTERNS
- Define overall architecture pattern (MVC, Microservices, JAMstack, etc.)
- Describe system components and their interactions
- Plan data flow and API structure
- Design for scalability and maintainability
- Consider security architecture from the ground up

## 4. PROJECT STRUCTURE & SETUP
Provide detailed file structure including:
- **Root Files**: package.json, README.md, configuration files
- **Directories**: src/, components/, pages/, api/, etc.
- **Key Files**: Important files with their purpose
- **Setup Commands**: Step-by-step initialization
- **Environment Variables**: Required env vars with examples

## 5. DEVELOPMENT PHASES
Break down into logical phases with:
- **Phase Name & Description**: Clear phase objectives
- **Estimated Hours & Days**: Realistic time estimates
- **Deliverables**: Specific outputs for each phase
- **Dependencies**: Prerequisites and blockers
- **Risks**: Potential challenges and mitigation strategies
- **Milestones**: Key checkpoints and achievements

**Typical phases**: Setup & Foundation, Core Features, UI/UX, Testing, Deployment, Optimization

## 6. SECURITY IMPLEMENTATION
For each security aspect, provide:
- **Category**: Authentication, Data Protection, API Security, etc.
- **Requirements**: Specific security requirements
- **Tools**: Recommended security tools and libraries
- **Implementation**: Step-by-step implementation guide
- **Priority**: Critical/High/Medium/Low

**Security areas to cover:**
- Input validation and sanitization
- Authentication and authorization
- Data encryption and protection
- API security and rate limiting
- Infrastructure security
- Compliance considerations

## 7. TESTING STRATEGY
For each testing type:
- **Type**: Unit, Integration, E2E, Performance, Security
- **Tools**: Specific testing frameworks and tools
- **Coverage**: Target coverage percentages
- **Strategy**: Testing approach and methodology
- **Examples**: Sample test cases or scenarios

## 8. PERFORMANCE OPTIMIZATION
- **Category**: Frontend, Backend, Database, CDN, etc.
- **Techniques**: Specific optimization techniques
- **Tools**: Performance monitoring and optimization tools
- **Metrics**: Key performance indicators to track
- **Implementation**: How to implement optimizations

## 9. DEPLOYMENT CONFIGURATION
- **Platform**: Specific deployment platform
- **Type**: Static/Server/Serverless/Container
- **Requirements**: System and infrastructure requirements
- **Steps**: Detailed deployment steps
- **Environment**: Environment-specific configurations
- **Monitoring**: Deployment monitoring and rollback strategies

## 10. LEARNING RESOURCES
Organize resources by difficulty and type:
- **Essential**: Must-have resources for getting started
- **Recommended**: Additional helpful resources
- **Advanced**: Deep-dive materials for mastery
- **Tools**: Development tools and utilities

For each resource:
- **Title**: Resource name
- **Type**: Documentation/Tutorial/Course/Book/Video/Article/Tool
- **URL**: Direct link when available
- **Description**: What the resource covers
- **Difficulty**: Beginner/Intermediate/Advanced
- **Estimated Time**: Time investment required
- **Is Free**: Whether the resource is free

## 11. IMPLEMENTATION ROADMAP
- **Prerequisites**: What needs to be in place before starting
- **Quick Start**: Steps to get a basic version running quickly
- **Milestones**: Major project milestones with timeframes
- **Future Enhancements**: Ideas for future iterations and improvements

**OUTPUT REQUIREMENTS:**

1. **Be Specific and Actionable**: Provide exact commands, file names, and configurations
2. **Include Real-World Considerations**: Factor in team size, budget, timeline constraints
3. **Provide Comprehensive Coverage**: Address all aspects of software development lifecycle
4. **Use Current Best Practices**: Reference 2024-2025 standards and technologies
5. **Include Quantitative Data**: Specific hours, percentages, metrics where relevant
6. **Consider Scalability**: Plan for growth from MVP to enterprise scale

**EXAMPLE TECHNOLOGY CHOICE FORMAT:**
{
  "name": "Next.js",
  "version": "14.x",
  "reasoning": "Chosen for its excellent developer experience, built-in optimizations, and seamless full-stack capabilities. Provides server-side rendering, static generation, and API routes in one framework, perfect for modern web applications.",
  "alternatives": ["Vite + React", "Remix", "SvelteKit"],
  "learningCurve": "Moderate",
  "popularity": "High",
  "setupInstructions": ["npx create-next-app@latest my-app", "cd my-app", "npm run dev"],
  "pros": ["Excellent performance", "Great developer experience", "Built-in optimizations", "Strong ecosystem"],
  "cons": ["Can be overkill for simple sites", "Learning curve for advanced features"]
}

Create a plan that demonstrates deep technical expertise while being immediately actionable for a development team. Focus on modern, production-ready solutions that will scale effectively.`,
            schema: ProjectStructureSchema,
            maxRetries: 3,
            temperature: 0.2, // Low temperature for consistent, professional output
        });

        const processingTime = Date.now() - startTime;
        console.log('✅ Successfully generated comprehensive project structure', {
            processingTime: `${processingTime}ms`,
            clientId
        });

        // Add security and caching headers
        const response = result.toTextStreamResponse();
        response.headers.set('X-Content-Type-Options', 'nosniff');
        response.headers.set('X-Frame-Options', 'DENY');
        response.headers.set('X-XSS-Protection', '1; mode=block');
        response.headers.set('Cache-Control', 'private, no-cache, no-store, must-revalidate');
        response.headers.set('X-Processing-Time', `${processingTime}ms`);

        return response; return response;

    } catch (error) {
        const processingTime = Date.now() - startTime;

        console.error('🔥 API Route - Error occurred:', {
            error: error instanceof Error ? error.message : 'Unknown error',
            stack: error instanceof Error ? error.stack : undefined,
            timestamp: new Date().toISOString(),
            requestId: crypto.randomUUID(),
            clientId: clientId || 'unknown',
            processingTime: `${processingTime}ms`
        });

        // Structured error responses with specific error codes
        if (error instanceof Error) {
            if (error.message.includes('API key') || error.message.includes('authentication')) {
                return NextResponse.json(
                    {
                        error: 'Authentication error',
                        details: 'AI service authentication failed. Please check configuration.',
                        code: 'AUTH_ERROR',
                        timestamp: new Date().toISOString()
                    },
                    {
                        status: 401,
                        headers: {
                            'X-Error-Code': 'AUTH_ERROR',
                            'X-Processing-Time': `${processingTime}ms`
                        }
                    }
                );
            }

            if (error.message.includes('rate limit') || error.message.includes('quota')) {
                return NextResponse.json(
                    {
                        error: 'Service rate limit exceeded',
                        details: 'AI service quota exceeded. Please try again later.',
                        code: 'SERVICE_RATE_LIMIT',
                        timestamp: new Date().toISOString()
                    },
                    {
                        status: 429,
                        headers: {
                            'X-Error-Code': 'SERVICE_RATE_LIMIT',
                            'X-Processing-Time': `${processingTime}ms`,
                            'Retry-After': '300'
                        }
                    }
                );
            }

            if (error.message.includes('timeout')) {
                return NextResponse.json(
                    {
                        error: 'Request timeout',
                        details: 'Request took too long to process. Please try again.',
                        code: 'TIMEOUT_ERROR',
                        timestamp: new Date().toISOString()
                    },
                    {
                        status: 504,
                        headers: {
                            'X-Error-Code': 'TIMEOUT_ERROR',
                            'X-Processing-Time': `${processingTime}ms`
                        }
                    }
                );
            }
        }

        return NextResponse.json(
            {
                error: 'Failed to generate project structure',
                details: error instanceof Error ? error.message : 'An unexpected error occurred during project analysis',
                code: 'GENERATION_ERROR',
                timestamp: new Date().toISOString()
            },
            {
                status: 500,
                headers: {
                    'X-Error-Code': 'GENERATION_ERROR',
                    'X-Processing-Time': `${processingTime}ms`
                }
            }
        );
    }
}