---
applyTo: '**'
---
Coding standards, domain knowledge, and preferences that AI should follow.
## Overview
An AI-powered project planning application that intelligently analyzes user input to detect technical specifications and dynamically adapts its questioning flow to generate comprehensive project structures.

## Core Functionality

### 1. User Input Phase
- User enters project idea in the main textarea
- User can toggle "Let AI Decide" option to indicate preference for AI-driven technology choices
- Example inputs:
  - "A chatbot system using Next.js"
  - "Build a mobile app for task management"
  - "E-commerce platform with React and Node.js"
  - "Social media dashboard"

### 2. AI Analysis Phase
When user submits their project idea (Enter key or submit button):
- AI parses the text for technical specifications including:
  - **Frameworks**: Next.js, React, Vue.js, Angular, React Native, Flutter
  - **Backend Technologies**: Node.js, Express, Django, FastAPI, Spring Boot
  - **Databases**: MongoDB, PostgreSQL, MySQL, Firebase, Supabase
  - **Languages**: JavaScript, TypeScript, Python, Java, Go, Rust
  - **Platforms**: Web, Mobile, Desktop, Cloud
  - **Tools & Services**: Vercel, AWS, Docker, GraphQL, REST API

### 3. Dynamic Flow Decision
Based on analysis results and user's "Let AI Decide" preference:

#### When "Let AI Decide" is ENABLED:
- **Input**: Any project description (regardless of tech stack mention)
- **AI Response**: "I'll analyze your project and choose the best technology stack. Let me generate a comprehensive project structure for you."
- **Action**: AI selects optimal technologies based on project type and industry best practices, skips all technology selection questions

#### When "Let AI Decide" is DISABLED:

##### Scenario A: Complete Tech Stack Detected
- **Input**: "A chatbot system using Next.js, OpenAI API, and PostgreSQL"
- **AI Response**: "I detected you want to use Next.js, OpenAI API, and PostgreSQL. Let me generate a project structure for you."
- **Action**: Skip technology selection questions, proceed directly to project generation

##### Scenario B: Partial Tech Stack Detected
- **Input**: "A chatbot system using Next.js"
- **AI Response**: "I see you want to use Next.js. What would you like to use for the database? (PostgreSQL, MongoDB, or let me decide)"
- **Action**: Ask only for missing critical components

##### Scenario C: No Tech Stack Detected
- **Input**: "A task management system"
- **AI Response**: "Great idea! Would you like me to suggest the best technology stack, or do you have preferences for:
  - Frontend framework (React, Vue, Angular)
  - Backend technology (Node.js, Python, Java)
  - Database (PostgreSQL, MongoDB, MySQL)"
- **Action**: Guide user through technology selection

### 4. Intelligent Questioning System

#### Question Flow Logic for Manual Selection:

**Universal Question Order:**
1. **Platform Detection** → Web/Mobile/Desktop (auto-skip if detected)
2. **Framework Selection** → Frontend framework choice
3. **Language Choice** → JavaScript/TypeScript (context-dependent)
4. **Backend Setup** → API/Server technology (auto-skip if implied)
5. **Database Choice** → Data storage solution
6. **Project-Specific Requirements** → Domain-specific needs
7. **Authentication** → User management (optional)
8. **Deployment** → Hosting platform (optional)

#### Smart Question Skipping Rules:

**Framework-Based Auto-Skips:**
- **Next.js selected** → Skip "Backend/Runtime" (Node.js API routes implied)
- **React Native selected** → Skip "Platform" question, ask "iOS, Android, or both?"
- **Flutter selected** → Skip "Language" question (Dart implied)
- **Electron selected** → Skip "Platform" question (Cross-platform implied)
- **FastAPI/Django selected** → Skip "Language" question (Python implied)

**Platform-Based Logic:**
- **"Mobile" detected** → Always ask platform specifics (iOS/Android/Cross-platform)
- **"Web" detected** → Skip platform question, focus on web frameworks
- **"Desktop" detected** → Ask framework (Electron, Tauri, native)

#### Project-Type Specific Questions:

**Chatbot Projects:**
- Core: Framework → Language → Database → AI Service
- Optional: Authentication → Deployment
- AI Service: "Which AI provider? (OpenAI, Anthropic, Google AI, or local)"

**E-commerce Projects:**
- Core: Framework → Language → Database → Payment Processing
- Optional: Authentication → Analytics → Email Service
- Payment: "Payment provider? (Stripe, PayPal, Square, or multiple)"

**Dashboard/Analytics Projects:**
- Core: Framework → Language → Data Source → Visualization Library
- Optional: Real-time updates → Authentication
- Data: "Data source? (Database, API, CSV, real-time streams)"

**API/Backend Projects:**
- Core: Runtime → Framework → Database → Authentication Method
- Optional: Documentation → Testing Framework → Containerization
- Auth: "Authentication type? (JWT, OAuth, API Keys, or none)"

**Mobile Apps:**
- Core: Platform → Framework → Backend → Data Storage
- Optional: Push notifications → App store deployment
- Platform: "Target platform? (iOS only, Android only, or cross-platform)"

**Content/Blog Sites:**
- Core: Framework → Content Management → Deployment
- Optional: SEO tools → Analytics
- CMS: "Content management? (Headless CMS, MDX, or database-driven)"

#### Question Priority Matrix:

| Project Type | Critical Questions | Recommended Questions | Optional Questions |
|-------------|-------------------|---------------------|------------------|
| **Chatbot** | Framework, Language, AI Service, Database | Authentication, Deployment | Analytics, Monitoring |
| **E-commerce** | Framework, Database, Payments, Auth | Email service, Analytics | Reviews, Inventory |
| **Dashboard** | Framework, Data source, Charts library | Real-time updates, Auth | Export features, Alerts |
| **API** | Runtime, Framework, Database, Auth | Documentation, Testing | Rate limiting, Caching |
| **Mobile App** | Platform, Framework, Backend, Storage | Push notifications, Auth | App store, Analytics |
| **Blog/CMS** | Framework, Content system, Deployment | SEO tools, Comments | Newsletter, Social |

#### Example Question Flows:

**Example 1: "E-commerce website"**
1. ✅ Platform: "web" (detected) → Skip
2. ❓ Framework: "Frontend framework? (Next.js, React, Vue)"
3. ❓ Language: "JavaScript or TypeScript?" (if Next.js/React)
4. ❓ Database: "Database? (PostgreSQL, MongoDB, MySQL)"
5. ❓ Payments: "Payment processing? (Stripe, PayPal, multiple)"
6. ❓ Auth: "User authentication? (NextAuth, Clerk, custom)"
7. ❓ Deployment: "Deployment? (Vercel, AWS, or let me decide)"

**Example 2: "Mobile task app"**
1. ✅ Platform: "mobile" (detected) → Ask specifics
2. ❓ Platform: "Target platform? (iOS, Android, or cross-platform)"
3. ❓ Framework: "Framework? (React Native, Flutter, native)"
4. ❓ Backend: "Backend? (Firebase, Supabase, custom API)"
5. ❓ Storage: "Data storage? (Cloud database, local storage, hybrid)"
6. ❓ Auth: "User accounts needed?"
7. ❓ Features: "Push notifications needed?"

**Example 3: "Analytics dashboard"**
1. ✅ Platform: "web" (detected) → Skip
2. ❓ Framework: "Frontend framework? (Next.js, React, Vue)"
3. ❓ Data: "Data source? (Database, API, real-time streams)"
4. ❓ Charts: "Visualization library? (Chart.js, D3, Recharts)"
5. ❓ Updates: "Real-time updates needed?"
6. ❓ Auth: "User authentication required?"

The AI will dynamically determine which questions to ask based on:
- **Missing critical components** (if frontend specified but no backend)
- **Project type requirements** (mobile app needs platform choice)
- **Complexity level** (simple vs enterprise-grade features)
- **User expertise level** (inferred from input sophistication)

### 5. Project Generation Phase
Once sufficient information is gathered:
- Generate complete project structure
- Create file/folder hierarchy
- Suggest dependencies and packages
- Provide setup instructions
- Generate initial code templates
- Recommend best practices and patterns

## User Experience Flow

```
User Input → AI Analysis → Decision Tree → Dynamic Questions → Project Generation
     ↓              ↓              ↓              ↓              ↓
   Project      Tech Stack    Complete?     Fill Gaps      Generate
   Description   Detection    Yes/No/Partial   Missing      Structure
                                              Info
```

## Implementation Details

### Technology Detection Patterns
- **Framework Keywords**: "using", "with", "built on", "powered by"
- **Version Specifications**: "Next.js 14", "React 18", "Node.js 20"
- **Integration Mentions**: "integrate with", "connect to", "API from"

### Question Prioritization
1. **Critical Path Items**: Frontend framework, backend technology
2. **Data Layer**: Database choice, data modeling
3. **Authentication**: Auth system requirements
4. **Deployment**: Hosting and deployment preferences
5. **Additional Features**: Third-party integrations, advanced features

### Smart Defaults
When user lets AI decide:
- **Web Apps**: Next.js + TypeScript + PostgreSQL + Vercel
- **Mobile Apps**: React Native + Expo + Firebase
- **APIs**: Node.js + Express + PostgreSQL + Docker
- **Full Stack**: Next.js + tRPC + PostgreSQL + Vercel

## Features to Implement

### Phase 1: Core Analysis
- [x] Basic textarea input
- [ ] Tech stack detection API
- [ ] Dynamic questioning system
- [ ] Flow state management

### Phase 2: Advanced Features
- [ ] Project structure generation
- [ ] Code template creation
- [ ] Dependency management
- [ ] Setup instructions
- [ ] Export capabilities

### Phase 3: Enhanced UX
- [ ] Real-time suggestions
- [ ] Project templates library
- [ ] Collaboration features
- [ ] Version control integration
