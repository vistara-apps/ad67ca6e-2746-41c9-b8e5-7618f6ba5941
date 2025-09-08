import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AIScriptRequest } from '@/lib/types';

export async function POST(request: NextRequest) {
  try {
    const body: AIScriptRequest = await request.json();
    const { scenario, jurisdiction, language, type, context } = body;

    if (!scenario) {
      return NextResponse.json(
        { error: 'Scenario is required' },
        { status: 400 }
      );
    }

    // Initialize OpenAI client inside the function to avoid build-time errors
    const openai = new OpenAI({
      apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
      baseURL: process.env.OPENAI_API_KEY ? undefined : "https://openrouter.ai/api/v1",
      dangerouslyAllowBrowser: true,
    });

    let prompt = '';
    
    switch (type) {
      case 'communication':
        prompt = `Generate a clear, professional communication script for someone facing: ${scenario}
        
Jurisdiction: ${jurisdiction}
Language: ${language}
Additional context: ${context || 'None provided'}

The script should:
- Be respectful but assertive
- Include specific phrases to assert legal rights
- Provide clear, actionable language
- Be appropriate for the jurisdiction
- Include what NOT to say
- Be concise and memorable

Format as a practical script with clear sections.`;
        break;
        
      case 'checklist':
        prompt = `Create a step-by-step action checklist for someone dealing with: ${scenario}
        
Jurisdiction: ${jurisdiction}
Language: ${language}
Additional context: ${context || 'None provided'}

The checklist should:
- Be chronologically ordered
- Include immediate actions to take
- Specify what documents to gather
- Include who to contact
- Mention deadlines or time-sensitive actions
- Be specific to the jurisdiction

Format as a numbered checklist with clear action items.`;
        break;
        
      case 'template':
        prompt = `Create a document template for someone dealing with: ${scenario}
        
Jurisdiction: ${jurisdiction}
Language: ${language}
Additional context: ${context || 'None provided'}

The template should:
- Include proper legal formatting
- Have clear placeholders for personal information
- Include relevant legal language
- Be appropriate for the jurisdiction
- Include instructions for completion

Format as a fillable template with [PLACEHOLDER] markers.`;
        break;
    }

    const completion = await openai.chat.completions.create({
      model: process.env.OPENAI_API_KEY ? 'gpt-4' : 'google/gemini-2.0-flash-001',
      messages: [
        {
          role: 'system',
          content: 'You are a legal rights assistant. Provide clear, accurate, and actionable legal guidance. Always include disclaimers about consulting with qualified attorneys. Focus on empowering users with knowledge while emphasizing the importance of professional legal advice.'
        },
        {
          role: 'user',
          content: prompt
        }
      ],
      max_tokens: 1000,
      temperature: 0.7,
    });

    const script = completion.choices[0]?.message?.content || 'Unable to generate script at this time.';

    return NextResponse.json({ script });
  } catch (error) {
    console.error('Error generating script:', error);
    return NextResponse.json(
      { error: 'Failed to generate script' },
      { status: 500 }
    );
  }
}
