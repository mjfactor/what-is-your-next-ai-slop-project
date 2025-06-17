import { NextRequest, NextResponse } from 'next/server';
import { google } from '@ai-sdk/google';
import { generateText } from 'ai';

export async function POST(request: NextRequest) {
    try {
        const { projectIdea } = await request.json();

        if (!projectIdea || typeof projectIdea !== 'string') {
            return NextResponse.json(
                { valid: false, message: 'Project idea is required.' },
                { status: 400 }
            );
        }

        const trimmedIdea = projectIdea.trim();

        if (trimmedIdea.length === 0) {
            return NextResponse.json(
                { valid: false, message: 'Project idea cannot be empty.' },
                { status: 400 }
            );
        }

        // Use AI to validate the project idea
        const model = google('gemini-2.5-flash-preview-04-17');

        const { text } = await generateText({
            model,
            prompt: `Analyze the following text to determine if it represents a meaningful project idea or if it's just random characters, gibberish, or meaningless text.

Text to analyze: "${trimmedIdea}"

Respond with exactly "yes" if this is a valid, meaningful project idea that could be developed into a software project.
Respond with exactly "no" followed by a brief explanation if this is random text, gibberish, or not a meaningful project description.

Examples of valid project ideas:
- "A social media dashboard using React"
- "Mobile app for fitness tracking"
- "E-commerce website with payment integration"
- "Task management tool for teams"

Examples of invalid input:
- "sadsadaw"
- "asdfasdf"
- "random text here"
- "aaaaaaa"
- Single words or nonsensical phrases

Response:`,
        });

        const response = text.trim().toLowerCase();

        if (response.startsWith('yes')) {
            return NextResponse.json(
                { valid: true, message: 'Project idea is valid.' },
                { status: 200 }
            );
        } else {
            // Extract the explanation after "no"
            const explanation = text.replace(/^no\s*/i, '').trim();
            const message = explanation || 'Please provide a meaningful project description instead of random characters.';

            return NextResponse.json(
                { valid: false, message },
                { status: 400 }
            );
        }

    } catch (error) {
        console.error('Validation error:', error);
        return NextResponse.json(
            { valid: false, message: 'An error occurred while validating the project idea.' },
            { status: 500 }
        );
    }
}