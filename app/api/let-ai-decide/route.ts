import { google } from '@ai-sdk/google';
import { streamObject } from 'ai';
import { NextRequest, NextResponse } from 'next/server';
import { ProjectStructureSchema } from '@/lib/schema/let-ai-decide-schema';


export async function POST(req: NextRequest) {
    try {
        const model = google('gemini-2.0-flash', {
            useSearchGrounding: true,
        });
        const projectIdea = await req.json();
        console.log('Received project idea:', projectIdea);

        const result = streamObject({
            model,
            prompt: `
You are a Senior Software Architect and Technology Advisor. Your primary goal is to help developers choose the RIGHT technology stack and provide a clear roadmap to build their project idea.

Analyze this project idea: "${projectIdea}"

Focus on TECHNOLOGY DECISIONS and IMPLEMENTATION STRATEGY:

**Basic Information:**
- Project name and clear description
- Category: Determine the most appropriate category (e.g., Web App, Mobile App, API, CLI Tool, Desktop App, Game, AI/ML, etc.)
- Complexity: Simple, Moderate, or Complex
- Analyze the project context: team size, developer experience levels, project timeline, and budget constraints

**🎯 TECHNOLOGY STACK DECISIONS (PRIMARY FOCUS):**
For each technology choice, provide detailed analysis:
- Specific name (e.g., "React", "Node.js", "PostgreSQL", "LangChain")
- WHY this technology is the best choice (detailed reasoning)
- Alternative options you considered and why you didn't choose them
- Difficulty level: Beginner-friendly, Intermediate, or Advanced
- Key benefits this technology brings to the project
- Community support and ecosystem health (active development, updates frequency)
- Cost implications (free/open-source, paid licensing, infrastructure costs)

For AI integration specifically:
- If the project explicitly requires AI features, recommend the most suitable AI technology stack
- If AI is not explicitly mentioned, critically evaluate whether AI would truly enhance the project or if simpler solutions would be more appropriate
- Recommend specific AI technologies only if they truly add value (not just because they're trendy)
- Use search grounding to find current, relevant information about AI frameworks like LangGraph, CrewAI, Google AI SDK, LangChain, HuggingFace Transformers, Vercel AI SDK, etc.
- Consider factors like ease of integration, community support, and specific capabilities needed

Required technologies:
- Frontend framework/technology
- Backend technology
- Database solution
- Deployment platform
- AI integration technology (evaluate whether AI is needed for the project, and recommend appropriate AI technologies like LangGraph, CrewAI, Google AI SDK, etc. - leverage search grounding to find up-to-date information on these technologies)

**Architecture:**
- Architecture pattern (e.g., "MVC", "Microservices", "JAMstack")
- Detailed description of system design and components
- Integration strategy with existing systems or third-party services (if applicable)

**Development Phases:**
Provide 3-5 key development phases with:
- Phase name and description of deliverables

**🚀 LEARNING PATH FOR DEVELOPERS:**
- Prerequisites knowledge needed before starting
- Recommended study order for the technologies
- Estimated learning curve based on the team's experience level

**Best Practices & Strategy:**
- Development best practices specific to chosen technologies
- Security considerations with recommended tools (e.g., Helmet, bcrypt, Auth0, OWASP guidelines)
- Testing strategy with specific frameworks (e.g., Jest, Cypress, Playwright, Vitest)
- Performance optimization with detailed implementation strategies:
  * Frontend: Code splitting, lazy loading, image optimization, CDN usage
  * Backend: Database indexing, query optimization, caching strategies (Redis)
  * Infrastructure: Load balancing, horizontal scaling, monitoring tools

**Risk Assessment:**
- Identify 2-3 key technical risks associated with the recommended stack
- For each risk, suggest a practical mitigation strategy
- Consider scalability challenges, performance bottlenecks, security concerns

**📚 OFFICIAL DOCUMENTATION RESOURCES:**
Search for and provide REAL, current URLs from official documentation sources only.

Provide up to 6 official documentation resources:
- Search for official documentation, API references, and getting started guides
- Include ONLY official documentation URLs from the technology's official websites or repositories
- Focus on primary documentation sources that developers need to learn the chosen technologies

For each resource provide:
- Title: Clear, descriptive name of the official documentation
- Description: What the documentation covers and why it's essential for the project
- URL: Real, working URL to official documentation

**🗺️ ENHANCED IMPLEMENTATION ROADMAP:**
- Getting started: Initial setup and first steps with the chosen technologies
- Foundation phase: Basic project structure and core infrastructure setup
- Core development phase: Main feature development using the selected tech stack
- Integration phase: Connecting components and third-party services
- Testing phase: Comprehensive testing strategy implementation
- Deployment phase: Production deployment and monitoring setup
- Common challenges developers face with this tech stack and solutions
- Future enhancement possibilities and scaling considerations

Make this a comprehensive TECHNOLOGY ADVISOR that helps developers make informed decisions and provides a clear path from idea to implementation.`,
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