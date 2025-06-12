import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';


export async function POST(req: NextRequest) {
    try {
        const model = google('gemini-1.5-flash');
        const projectIdea = await req.json();
        console.log('Received project idea:', projectIdea);
        const result = streamObject({
            model,
            prompt: `
You are a **Senior Software Architect and Technical Lead** with 15+ years of experience in enterprise software development, startup scaling, and modern web technologies. You have expertise in:

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

Create a plan that demonstrates deep technical expertise while being immediately actionable for a development team. Focus on modern, production-ready solutions that will scale effectively.`,
            schema: ProjectStructureSchema,
            onError({ error }) {
                console.error(error);
            },
        });

        return result.toTextStreamResponse();
    } catch (error) {
        console.error('API Error:', error);
        return NextResponse.json(
            {
                error: 'Failed to generate project structure',
                details: error instanceof Error ? error.message : 'Unknown error',
                timestamp: new Date().toISOString()
            },
            { status: 500 }
        );
    }
}