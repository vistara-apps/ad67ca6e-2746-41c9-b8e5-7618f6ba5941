'use client';

import { useState } from 'react';
import { LegalAidOrg } from '@/lib/types';
import { MapPin, Phone, Globe, Search } from 'lucide-react';

interface LegalAidDirectoryProps {
  variant?: 'list' | 'mapView';
  jurisdiction?: string;
}

// Mock data for demonstration
const mockLegalAidOrgs: LegalAidOrg[] = [
  {
    orgId: '1',
    name: 'Legal Aid Society',
    contactInfo: '(555) 123-4567',
    jurisdiction: 'Federal (US)',
    website: 'https://legalaid.org'
  },
  {
    orgId: '2',
    name: 'ACLU',
    contactInfo: '(555) 234-5678',
    jurisdiction: 'Federal (US)',
    website: 'https://aclu.org'
  },
  {
    orgId: '3',
    name: 'National Immigration Law Center',
    contactInfo: '(555) 345-6789',
    jurisdiction: 'Federal (US)',
    website: 'https://nilc.org'
  },
  {
    orgId: '4',
    name: 'Local Legal Aid Clinic',
    contactInfo: '(555) 456-7890',
    jurisdiction: 'California',
    website: 'https://localaid.org'
  }
];

export function LegalAidDirectory({ 
  variant = 'list',
  jurisdiction = 'Federal (US)' 
}: LegalAidDirectoryProps) {
  const [searchTerm, setSearchTerm] = useState('');
  const [filteredOrgs, setFilteredOrgs] = useState(mockLegalAidOrgs);

  const handleSearch = (term: string) => {
    setSearchTerm(term);
    const filtered = mockLegalAidOrgs.filter(org =>
      org.name.toLowerCase().includes(term.toLowerCase()) ||
      org.jurisdiction.toLowerCase().includes(term.toLowerCase())
    );
    setFilteredOrgs(filtered);
  };

  if (variant === 'mapView') {
    return (
      <div className="glass-card p-6">
        <h3 className="text-lg font-semibold text-text mb-4">Legal Aid Near You</h3>
        <div className="bg-gray-100 rounded-lg h-64 flex items-center justify-center">
          <div className="text-center">
            <MapPin className="h-12 w-12 text-muted mx-auto mb-2" />
            <p className="text-muted">Map view coming soon</p>
            <p className="text-sm text-muted">Interactive map with legal aid locations</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-semibold text-text">Legal Aid Directory</h3>
        <span className="text-sm text-muted">{filteredOrgs.length} organizations</span>
      </div>

      <div className="relative mb-6">
        <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 h-4 w-4 text-muted" />
        <input
          type="text"
          placeholder="Search legal aid organizations..."
          value={searchTerm}
          onChange={(e) => handleSearch(e.target.value)}
          className="w-full pl-10 pr-4 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
        />
      </div>

      <div className="space-y-4">
        {filteredOrgs.map((org) => (
          <div key={org.orgId} className="border border-gray-200 rounded-lg p-4 hover:border-primary hover:bg-primary/5 transition-all duration-200">
            <div className="flex items-start justify-between">
              <div className="flex-1">
                <h4 className="font-semibold text-text mb-2">{org.name}</h4>
                <div className="space-y-1">
                  <div className="flex items-center space-x-2 text-sm text-muted">
                    <MapPin className="h-4 w-4" />
                    <span>{org.jurisdiction}</span>
                  </div>
                  <div className="flex items-center space-x-2 text-sm text-muted">
                    <Phone className="h-4 w-4" />
                    <span>{org.contactInfo}</span>
                  </div>
                  {org.website && (
                    <div className="flex items-center space-x-2 text-sm text-muted">
                      <Globe className="h-4 w-4" />
                      <a 
                        href={org.website} 
                        target="_blank" 
                        rel="noopener noreferrer"
                        className="text-primary hover:underline"
                      >
                        Visit Website
                      </a>
                    </div>
                  )}
                </div>
              </div>
              <button className="btn-secondary text-sm px-4 py-2">
                Contact
              </button>
            </div>
          </div>
        ))}
      </div>

      {filteredOrgs.length === 0 && (
        <div className="text-center py-8">
          <p className="text-muted">No legal aid organizations found.</p>
          <p className="text-sm text-muted mt-1">Try adjusting your search terms.</p>
        </div>
      )}
    </div>
  );
}
