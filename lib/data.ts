import { RightsCard, Script, LegalAidOrg } from './types';
import { generateId, generateShareableUrl } from './utils';

// Mock data for development and testing
export const mockRightsCards: RightsCard[] = [
  {
    cardId: '1',
    title: 'Traffic Stop Rights',
    scenario: 'Traffic Stop',
    jurisdiction: 'Federal (US)',
    language: 'English',
    content: `
      <h3>Your Rights During a Traffic Stop</h3>
      <h4>What You Should Do:</h4>
      <ul>
        <li>Pull over safely and turn off your engine</li>
        <li>Keep your hands visible on the steering wheel</li>
        <li>Remain calm and polite</li>
        <li>Provide license, registration, and insurance when asked</li>
        <li>Follow lawful orders from the officer</li>
      </ul>
      
      <h4>What You Can Say:</h4>
      <ul>
        <li>"I am exercising my right to remain silent"</li>
        <li>"I do not consent to any searches"</li>
        <li>"Am I free to go?"</li>
        <li>"I would like to speak with an attorney"</li>
      </ul>
      
      <h4>Important Rights:</h4>
      <ul>
        <li>You have the right to remain silent</li>
        <li>You can refuse consent to search your vehicle</li>
        <li>You can ask if you're free to leave</li>
        <li>You have the right to record the interaction</li>
        <li>You have the right to an attorney</li>
      </ul>
      
      <h4>What NOT to Do:</h4>
      <ul>
        <li>Don't argue or resist, even if you believe the stop is unfair</li>
        <li>Don't make sudden movements</li>
        <li>Don't lie or provide false information</li>
        <li>Don't consent to searches if you don't want to</li>
      </ul>
      
      <p><strong>Remember:</strong> This information is for educational purposes only. Always consult with a qualified attorney for legal advice specific to your situation.</p>
    `,
    pdfUrl: '/pdfs/traffic-stop-rights.pdf',
    shareableLink: generateShareableUrl('1'),
    offlineAccessEnabled: true,
    createdAt: new Date('2024-01-15'),
    updatedAt: new Date('2024-01-15')
  },
  {
    cardId: '2',
    title: 'Workplace Discrimination Rights',
    scenario: 'Workplace Discrimination',
    jurisdiction: 'Federal (US)',
    language: 'English',
    content: `
      <h3>Your Rights Against Workplace Discrimination</h3>
      <h4>Protected Characteristics:</h4>
      <ul>
        <li>Race, color, religion, sex, national origin</li>
        <li>Age (40 years or older)</li>
        <li>Disability</li>
        <li>Pregnancy</li>
        <li>Genetic information</li>
      </ul>
      
      <h4>What Constitutes Discrimination:</h4>
      <ul>
        <li>Hiring, firing, or promotion decisions based on protected characteristics</li>
        <li>Harassment based on protected characteristics</li>
        <li>Unequal pay for equal work</li>
        <li>Retaliation for filing complaints</li>
      </ul>
      
      <h4>Steps to Take:</h4>
      <ul>
        <li>Document all incidents with dates, times, and witnesses</li>
        <li>Report to HR or management in writing</li>
        <li>Keep copies of all communications</li>
        <li>File a complaint with the EEOC within 180-300 days</li>
        <li>Consider consulting with an employment attorney</li>
      </ul>
      
      <p><strong>Important:</strong> You are protected from retaliation for filing discrimination complaints. Contact the EEOC at 1-800-669-4000 or visit eeoc.gov.</p>
    `,
    pdfUrl: '/pdfs/workplace-discrimination-rights.pdf',
    shareableLink: generateShareableUrl('2'),
    offlineAccessEnabled: true,
    createdAt: new Date('2024-01-16'),
    updatedAt: new Date('2024-01-16')
  },
  {
    cardId: '3',
    title: 'Eviction Notice Rights',
    scenario: 'Eviction Notice',
    jurisdiction: 'California',
    language: 'English',
    content: `
      <h3>Your Rights When Facing Eviction in California</h3>
      <h4>Types of Eviction Notices:</h4>
      <ul>
        <li>3-Day Notice to Pay Rent or Quit</li>
        <li>3-Day Notice to Cure or Quit (lease violations)</li>
        <li>30-Day Notice to Quit (month-to-month tenancy)</li>
        <li>60-Day Notice to Quit (tenancy over 1 year)</li>
      </ul>
      
      <h4>Your Rights:</h4>
      <ul>
        <li>Right to receive proper written notice</li>
        <li>Right to cure the violation (if applicable)</li>
        <li>Right to contest the eviction in court</li>
        <li>Right to legal representation</li>
        <li>Right to habitable living conditions</li>
      </ul>
      
      <h4>What to Do:</h4>
      <ul>
        <li>Read the notice carefully and understand the deadline</li>
        <li>Pay rent or cure the violation if possible</li>
        <li>Document any issues with the property</li>
        <li>Seek legal aid immediately</li>
        <li>Respond to any court summons</li>
      </ul>
      
      <p><strong>Emergency Help:</strong> Contact your local legal aid society or tenant rights organization immediately. In California, call 1-800-TENANTS for assistance.</p>
    `,
    pdfUrl: '/pdfs/eviction-rights-california.pdf',
    shareableLink: generateShareableUrl('3'),
    offlineAccessEnabled: true,
    createdAt: new Date('2024-01-17'),
    updatedAt: new Date('2024-01-17')
  },
  {
    cardId: '4',
    title: 'Debt Collection Rights',
    scenario: 'Debt Collection',
    jurisdiction: 'Federal (US)',
    language: 'English',
    content: `
      <h3>Your Rights Under the Fair Debt Collection Practices Act</h3>
      <h4>Debt Collectors Cannot:</h4>
      <ul>
        <li>Call before 8 AM or after 9 PM</li>
        <li>Call you at work if you tell them not to</li>
        <li>Harass, threaten, or abuse you</li>
        <li>Use false or misleading statements</li>
        <li>Contact third parties about your debt</li>
      </ul>
      
      <h4>Your Rights:</h4>
      <ul>
        <li>Right to request debt validation</li>
        <li>Right to dispute the debt</li>
        <li>Right to stop collection calls</li>
        <li>Right to sue for violations</li>
        <li>Right to legal representation</li>
      </ul>
      
      <h4>What to Do:</h4>
      <ul>
        <li>Request debt validation in writing within 30 days</li>
        <li>Keep records of all communications</li>
        <li>Send a cease and desist letter if needed</li>
        <li>Report violations to the CFPB</li>
        <li>Consider consulting with a consumer attorney</li>
      </ul>
      
      <p><strong>Get Help:</strong> File complaints with the Consumer Financial Protection Bureau at consumerfinance.gov or call 1-855-411-2372.</p>
    `,
    pdfUrl: '/pdfs/debt-collection-rights.pdf',
    shareableLink: generateShareableUrl('4'),
    offlineAccessEnabled: true,
    createdAt: new Date('2024-01-18'),
    updatedAt: new Date('2024-01-18')
  },
  {
    cardId: '5',
    title: 'ICE Encounter Rights',
    scenario: 'ICE Encounters',
    jurisdiction: 'Federal (US)',
    language: 'English',
    content: `
      <h3>Your Rights During ICE Encounters</h3>
      <h4>Your Constitutional Rights:</h4>
      <ul>
        <li>Right to remain silent</li>
        <li>Right to refuse to answer questions about immigration status</li>
        <li>Right to refuse consent to search</li>
        <li>Right to an attorney (at your own expense)</li>
        <li>Right to an interpreter</li>
      </ul>
      
      <h4>What You Can Say:</h4>
      <ul>
        <li>"I am exercising my right to remain silent"</li>
        <li>"I do not consent to any search"</li>
        <li>"I want to speak with an attorney"</li>
        <li>"Am I free to go?"</li>
      </ul>
      
      <h4>Important Actions:</h4>
      <ul>
        <li>Stay calm and don't run</li>
        <li>Keep your hands visible</li>
        <li>Don't lie or provide false documents</li>
        <li>Remember officer badge numbers and details</li>
        <li>Contact an immigration attorney immediately</li>
      </ul>
      
      <h4>Know Your Documents:</h4>
      <ul>
        <li>Carry valid immigration documents if you have them</li>
        <li>Never carry documents from another country</li>
        <li>Don't sign anything without an attorney</li>
      </ul>
      
      <p><strong>Emergency:</strong> Contact the National Immigration Law Center at 213-639-3900 or your local immigration attorney immediately.</p>
    `,
    pdfUrl: '/pdfs/ice-encounter-rights.pdf',
    shareableLink: generateShareableUrl('5'),
    offlineAccessEnabled: true,
    createdAt: new Date('2024-01-19'),
    updatedAt: new Date('2024-01-19')
  }
];

export const mockLegalAidOrgs: LegalAidOrg[] = [
  {
    id: '1',
    name: 'Legal Aid Society',
    contactInfo: {
      phone: '1-800-LEGAL-AID (1-800-534-2524)',
      email: 'info@legalaid.org',
      website: 'https://www.legalaid.org',
      address: '199 Water St, New York, NY 10038'
    },
    jurisdiction: 'Federal (US)',
    services: ['Housing', 'Immigration', 'Family Law', 'Benefits'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'Income below 125% of federal poverty level',
    hoursOfOperation: 'Monday-Friday 9AM-5PM',
    isVerified: true
  },
  {
    id: '2',
    name: 'American Civil Liberties Union (ACLU)',
    contactInfo: {
      phone: '212-549-2500',
      email: 'info@aclu.org',
      website: 'https://www.aclu.org',
      address: '125 Broad St, New York, NY 10004'
    },
    jurisdiction: 'Federal (US)',
    services: ['Civil Rights', 'Criminal Justice', 'Privacy Rights', 'Free Speech'],
    languages: ['English'],
    eligibilityRequirements: 'Case-by-case basis',
    hoursOfOperation: 'Monday-Friday 9AM-6PM',
    isVerified: true
  },
  {
    id: '3',
    name: 'National Employment Law Project',
    contactInfo: {
      phone: '212-285-3025',
      email: 'nelp@nelp.org',
      website: 'https://www.nelp.org',
      address: '90 Broad St, Suite 1100, New York, NY 10004'
    },
    jurisdiction: 'Federal (US)',
    services: ['Employment Law', 'Wage Theft', 'Worker Rights'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'Low-wage workers',
    hoursOfOperation: 'Monday-Friday 9AM-5PM',
    isVerified: true
  },
  {
    id: '4',
    name: 'California Rural Legal Assistance',
    contactInfo: {
      phone: '1-800-337-0690',
      email: 'info@crla.org',
      website: 'https://www.crla.org',
      address: '631 Howard St, Suite 300, San Francisco, CA 94105'
    },
    jurisdiction: 'California',
    services: ['Immigration', 'Housing', 'Labor Rights', 'Healthcare'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'Low-income rural residents',
    hoursOfOperation: 'Monday-Friday 8AM-5PM',
    isVerified: true
  },
  {
    id: '5',
    name: 'Tenants Together',
    contactInfo: {
      phone: '415-495-8100',
      email: 'info@tenantstogether.org',
      website: 'https://www.tenantstogether.org',
      address: '474 Valencia St, Suite 230, San Francisco, CA 94103'
    },
    jurisdiction: 'California',
    services: ['Housing Rights', 'Tenant Advocacy', 'Eviction Defense'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'California tenants',
    hoursOfOperation: 'Monday-Friday 9AM-5PM',
    isVerified: true
  },
  {
    id: '6',
    name: 'New York Legal Assistance Group',
    contactInfo: {
      phone: '212-613-5000',
      email: 'info@nylag.org',
      website: 'https://www.nylag.org',
      address: '7 Hanover Square, 18th Floor, New York, NY 10004'
    },
    jurisdiction: 'New York',
    services: ['Immigration', 'Housing', 'Healthcare Access', 'Benefits'],
    languages: ['English', 'Spanish', 'Chinese', 'Arabic'],
    eligibilityRequirements: 'Low-income New York residents',
    hoursOfOperation: 'Monday-Friday 9AM-5PM',
    isVerified: true
  },
  {
    id: '7',
    name: 'Texas RioGrande Legal Aid',
    contactInfo: {
      phone: '1-888-988-9996',
      email: 'info@trla.org',
      website: 'https://www.trla.org',
      address: '4920 N IH-35, Austin, TX 78751'
    },
    jurisdiction: 'Texas',
    services: ['Immigration', 'Housing', 'Family Law', 'Consumer Protection'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'Low-income Texas residents',
    hoursOfOperation: 'Monday-Friday 8AM-5PM',
    isVerified: true
  },
  {
    id: '8',
    name: 'National Immigration Law Center',
    contactInfo: {
      phone: '213-639-3900',
      email: 'info@nilc.org',
      website: 'https://www.nilc.org',
      address: '3435 Wilshire Blvd, Suite 108-62, Los Angeles, CA 90010'
    },
    jurisdiction: 'Federal (US)',
    services: ['Immigration Law', 'Policy Advocacy', 'Know Your Rights'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'All immigrants',
    hoursOfOperation: 'Monday-Friday 9AM-6PM',
    isVerified: true
  },
  {
    id: '9',
    name: 'Consumer Financial Protection Bureau',
    contactInfo: {
      phone: '1-855-411-2372',
      email: 'info@consumerfinance.gov',
      website: 'https://www.consumerfinance.gov',
      address: '1700 G Street NW, Washington, DC 20552'
    },
    jurisdiction: 'Federal (US)',
    services: ['Consumer Protection', 'Financial Complaints', 'Credit Issues'],
    languages: ['English', 'Spanish', 'Chinese', 'Vietnamese', 'Korean', 'Tagalog'],
    eligibilityRequirements: 'All consumers',
    hoursOfOperation: '24/7 online, phone Monday-Friday 8AM-8PM ET',
    isVerified: true
  },
  {
    id: '10',
    name: 'Equal Employment Opportunity Commission',
    contactInfo: {
      phone: '1-800-669-4000',
      email: 'info@eeoc.gov',
      website: 'https://www.eeoc.gov',
      address: '131 M Street, NE, Washington, DC 20507'
    },
    jurisdiction: 'Federal (US)',
    services: ['Employment Discrimination', 'Workplace Rights', 'Equal Pay'],
    languages: ['English', 'Spanish'],
    eligibilityRequirements: 'All workers',
    hoursOfOperation: 'Monday-Friday 8AM-8PM ET',
    isVerified: true
  }
];

export const mockScripts: Script[] = [
  {
    scriptId: '1',
    cardId: '1',
    scenario: 'Traffic Stop',
    type: 'communication',
    content: `
**Traffic Stop Communication Script**

**When pulled over:**
"Good [morning/afternoon/evening], officer."

**If asked for documents:**
"I'll get my license and registration for you." 
*Move slowly and announce your actions*

**If asked questions beyond identification:**
"Officer, I'm exercising my right to remain silent. I don't wish to answer any questions."

**If asked to search your vehicle:**
"Officer, I do not consent to any searches of my vehicle or person."

**If asked to step out:**
*Comply with the request, but say:*
"I'm stepping out as requested, but I do not consent to any searches."

**If you want to leave:**
"Officer, am I free to go?"

**If arrested:**
"I'm invoking my right to remain silent and I want to speak with an attorney."

**Remember:**
- Stay calm and polite
- Keep your hands visible
- Don't argue or resist
- You can record the interaction
    `,
    createdAt: new Date('2024-01-15')
  },
  {
    scriptId: '2',
    cardId: '2',
    scenario: 'Workplace Discrimination',
    type: 'template',
    content: `
**Workplace Discrimination Complaint Template**

Date: [DATE]

To: [HR MANAGER/SUPERVISOR NAME]
[COMPANY NAME]
[ADDRESS]

Subject: Formal Complaint of Workplace Discrimination

Dear [NAME],

I am writing to formally report incidents of discrimination that I have experienced in the workplace based on my [PROTECTED CHARACTERISTIC - race, gender, age, etc.].

**Incident Details:**
Date: [DATE OF INCIDENT]
Time: [TIME]
Location: [LOCATION]
Witnesses: [NAMES OF WITNESSES]

Description of Incident:
[DETAILED DESCRIPTION OF WHAT HAPPENED]

**Impact:**
This discrimination has affected my work environment by [DESCRIBE IMPACT].

**Previous Reports:**
[IF APPLICABLE, DESCRIBE ANY PREVIOUS REPORTS MADE]

I request that this matter be investigated promptly and that appropriate corrective action be taken. I also request protection from any retaliation for filing this complaint.

I am available to discuss this matter further and provide additional information as needed.

Sincerely,
[YOUR NAME]
[YOUR POSITION]
[DATE]

**Attachments:** [LIST ANY SUPPORTING DOCUMENTS]
    `,
    createdAt: new Date('2024-01-16')
  }
];

// Data service functions
export async function getRightsCardsByScenario(scenario: string): Promise<RightsCard[]> {
  // In production, this would call the database
  return mockRightsCards.filter(card => card.scenario === scenario);
}

export async function getRightsCardById(cardId: string): Promise<RightsCard | null> {
  // In production, this would call the database
  return mockRightsCards.find(card => card.cardId === cardId) || null;
}

export async function getLegalAidOrgsByJurisdiction(jurisdiction: string): Promise<LegalAidOrg[]> {
  // In production, this would call the database
  return mockLegalAidOrgs.filter(org => 
    org.jurisdiction === jurisdiction || org.jurisdiction === 'Federal (US)'
  );
}

export async function searchRightsCards(query: string): Promise<RightsCard[]> {
  // In production, this would call the database with full-text search
  const lowercaseQuery = query.toLowerCase();
  return mockRightsCards.filter(card =>
    card.title.toLowerCase().includes(lowercaseQuery) ||
    card.scenario.toLowerCase().includes(lowercaseQuery) ||
    card.content.toLowerCase().includes(lowercaseQuery)
  );
}

export async function getScriptsByCardId(cardId: string): Promise<Script[]> {
  // In production, this would call the database
  return mockScripts.filter(script => script.cardId === cardId);
}

// Utility functions for data management
export function getUniqueJurisdictions(): string[] {
  const jurisdictions = new Set(mockRightsCards.map(card => card.jurisdiction));
  return Array.from(jurisdictions).sort();
}

export function getUniqueLanguages(): string[] {
  const languages = new Set(mockRightsCards.map(card => card.language));
  return Array.from(languages).sort();
}

export function getCardsByCategory(categoryId: string): RightsCard[] {
  // Map category IDs to scenarios
  const categoryScenarios: Record<string, string[]> = {
    'police': ['Traffic Stop', 'Police Search', 'Arrest Situation', 'Police Questioning', 'Home Search Warrant'],
    'workplace': ['Workplace Discrimination', 'Wrongful Termination', 'Wage Theft', 'Unsafe Working Conditions', 'Sexual Harassment'],
    'housing': ['Eviction Notice', 'Security Deposit Issues', 'Housing Discrimination', 'Landlord Entry Rights', 'Rent Increase Disputes'],
    'consumer': ['Debt Collection', 'Credit Report Errors', 'Fraudulent Charges', 'Warranty Issues', 'Identity Theft'],
    'family': ['Child Custody', 'Domestic Violence', 'Divorce Proceedings', 'Child Support', 'Adoption Rights'],
    'immigration': ['ICE Encounters', 'Workplace Raids', 'Border Crossings', 'Detention Rights', 'Asylum Process']
  };

  const scenarios = categoryScenarios[categoryId] || [];
  return mockRightsCards.filter(card => scenarios.includes(card.scenario));
}

export function getPopularCards(limit: number = 5): RightsCard[] {
  // In production, this would be based on actual usage analytics
  return mockRightsCards.slice(0, limit);
}

export function getRecentCards(limit: number = 5): RightsCard[] {
  return mockRightsCards
    .sort((a, b) => b.createdAt.getTime() - a.createdAt.getTime())
    .slice(0, limit);
}
