export interface User {
  userId: string;
  createdAt: Date;
  updatedAt: Date;
  farcasterId?: string;
  walletAddress?: string;
}

export interface RightsCard {
  cardId: string;
  title: string;
  scenario: string;
  jurisdiction: string;
  language: string;
  content: string;
  pdfUrl?: string;
  shareableLink?: string;
  offlineAccessEnabled: boolean;
  createdAt: Date;
  updatedAt: Date;
}

export interface Script {
  scriptId: string;
  cardId: string;
  scenario: string;
  type: 'communication' | 'checklist' | 'template';
  content: string;
  createdAt: Date;
}

export interface LegalAidOrg {
  orgId: string;
  name: string;
  contactInfo: string;
  jurisdiction: string;
  website?: string;
}

export interface ScenarioCategory {
  id: string;
  title: string;
  description: string;
  icon: string;
  scenarios: string[];
}

export interface AIScriptRequest {
  scenario: string;
  jurisdiction: string;
  language: string;
  type: 'communication' | 'checklist' | 'template';
  context?: string;
}
