import { ScenarioCategory } from './types';

export const SCENARIO_CATEGORIES: ScenarioCategory[] = [
  {
    id: 'police',
    title: 'Police Interactions',
    description: 'Know your rights during traffic stops, searches, and arrests',
    icon: 'Shield',
    scenarios: [
      'Traffic Stop',
      'Police Search',
      'Arrest Situation',
      'Police Questioning',
      'Home Search Warrant'
    ]
  },
  {
    id: 'workplace',
    title: 'Workplace Rights',
    description: 'Understand your employment rights and protections',
    icon: 'Briefcase',
    scenarios: [
      'Workplace Discrimination',
      'Wrongful Termination',
      'Wage Theft',
      'Unsafe Working Conditions',
      'Sexual Harassment'
    ]
  },
  {
    id: 'housing',
    title: 'Housing Rights',
    description: 'Tenant rights, evictions, and housing discrimination',
    icon: 'Home',
    scenarios: [
      'Eviction Notice',
      'Security Deposit Issues',
      'Housing Discrimination',
      'Landlord Entry Rights',
      'Rent Increase Disputes'
    ]
  },
  {
    id: 'consumer',
    title: 'Consumer Rights',
    description: 'Protection against fraud, debt collection, and unfair practices',
    icon: 'ShoppingCart',
    scenarios: [
      'Debt Collection',
      'Credit Report Errors',
      'Fraudulent Charges',
      'Warranty Issues',
      'Identity Theft'
    ]
  },
  {
    id: 'family',
    title: 'Family Law',
    description: 'Rights in family matters, custody, and domestic relations',
    icon: 'Users',
    scenarios: [
      'Child Custody',
      'Domestic Violence',
      'Divorce Proceedings',
      'Child Support',
      'Adoption Rights'
    ]
  },
  {
    id: 'immigration',
    title: 'Immigration Rights',
    description: 'Know your rights regardless of immigration status',
    icon: 'Globe',
    scenarios: [
      'ICE Encounters',
      'Workplace Raids',
      'Border Crossings',
      'Detention Rights',
      'Asylum Process'
    ]
  }
];

export const JURISDICTIONS = [
  'Federal (US)',
  'California',
  'New York',
  'Texas',
  'Florida',
  'Illinois',
  'Pennsylvania',
  'Ohio',
  'Georgia',
  'North Carolina',
  'Michigan'
];

export const LANGUAGES = [
  'English',
  'Spanish',
  'French',
  'Chinese (Simplified)',
  'Chinese (Traditional)',
  'Arabic',
  'Russian',
  'Portuguese',
  'German',
  'Japanese'
];
