import { NextRequest, NextResponse } from 'next/server';
import OpenAI from 'openai';
import { AIScriptRequest } from '@/lib/types';

// Initialize OpenAI client only when API key is available
let openai: OpenAI | null = null;

if (process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY) {
  openai = new OpenAI({
    apiKey: process.env.OPENAI_API_KEY || process.env.OPENROUTER_API_KEY,
    baseURL: process.env.OPENAI_API_KEY ? undefined : "https://openrouter.ai/api/v1",
    dangerouslyAllowBrowser: true,
  });
}

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

    // Check if OpenAI client is available
    if (!openai) {
      // Return a mock response when no API key is available
      const mockScript = `
**${type === 'communication' ? 'Communication Script' : type === 'checklist' ? 'Action Checklist' : 'Document Template'}**

**Scenario:** ${scenario}
**Jurisdiction:** ${jurisdiction}
**Language:** ${language}

${type === 'communication' ? `
**What to Say:**
• "I am exercising my right to remain silent."
• "I do not consent to any searches."
• "Am I free to go?"
• "I would like to speak with an attorney."

**What NOT to Say:**
• Do not volunteer information
• Do not argue or resist
• Do not lie or provide false information

**Remember:** Stay calm, be respectful, and document everything.
` : type === 'checklist' ? `
**Immediate Actions:**
1. Document the incident with date, time, and location
2. Gather any witnesses and their contact information
3. Take photos or videos if safe to do so
4. Keep all relevant documents and communications
5. Contact appropriate authorities or organizations
6. Seek legal advice within applicable time limits

**Important:** Time limits may apply. Consult with an attorney promptly.
` : `
**[DOCUMENT TITLE]**

Date: [DATE]
To: [RECIPIENT NAME]
From: [YOUR NAME]
Re: [SUBJECT MATTER]

[MAIN CONTENT - Replace with your specific situation details]

[YOUR SIGNATURE]
[YOUR PRINTED NAME]
[DATE]

**Instructions:** Fill in all [PLACEHOLDER] fields with your specific information.
`}

**Disclaimer:** This is for educational purposes only and does not constitute legal advice. Always consult with a qualified attorney for advice specific to your situation.
      `;

      return NextResponse.json({ script: mockScript });
    }
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
