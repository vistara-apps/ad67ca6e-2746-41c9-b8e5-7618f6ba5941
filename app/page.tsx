'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { RightsCardView } from '@/components/RightsCardView';
import { AiScriptGenerator } from '@/components/AiScriptGenerator';
import { LegalAidDirectory } from '@/components/LegalAidDirectory';
import { FAB } from '@/components/FAB';
import { SCENARIO_CATEGORIES } from '@/lib/constants';
import { RightsCard } from '@/lib/types';
import { Shield, Briefcase, Home, ShoppingCart, Users, Globe, Plus, MessageSquare } from 'lucide-react';

// Mock rights card data
const mockRightsCards: RightsCard[] = [
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
      </ul>
      
      <h4>What You Can Say:</h4>
      <ul>
        <li>"I am exercising my right to remain silent"</li>
        <li>"I do not consent to any searches"</li>
        <li>"Am I free to go?"</li>
      </ul>
      
      <h4>Important Rights:</h4>
      <ul>
        <li>You have the right to remain silent</li>
        <li>You can refuse consent to search your vehicle</li>
        <li>You can ask if you're free to leave</li>
        <li>You have the right to record the interaction</li>
      </ul>
      
      <p><strong>Remember:</strong> This information is for educational purposes only. Always consult with a qualified attorney for legal advice specific to your situation.</p>
    `,
    pdfUrl: '/pdfs/traffic-stop-rights.pdf',
    shareableLink: '/card/1',
    offlineAccessEnabled: true,
    createdAt: new Date(),
    updatedAt: new Date()
  }
];

const iconMap = {
  Shield,
  Briefcase,
  Home,
  ShoppingCart,
  Users,
  Globe
};

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [selectedScenario, setSelectedScenario] = useState<string | null>(null);
  const [selectedCard, setSelectedCard] = useState<RightsCard | null>(null);
  const [showScriptGenerator, setShowScriptGenerator] = useState(false);
  const [showLegalAid, setShowLegalAid] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    setSelectedScenario(null);
    setSelectedCard(null);
    setShowScriptGenerator(false);
    setShowLegalAid(false);
  };

  const handleScenarioSelect = (scenario: string) => {
    setSelectedScenario(scenario);
    // In a real app, you would fetch the actual card data here
    setSelectedCard(mockRightsCards[0]);
    setShowScriptGenerator(false);
    setShowLegalAid(false);
  };

  const handleGenerateScript = (cardId: string) => {
    setShowScriptGenerator(true);
    setShowLegalAid(false);
  };

  const handleShare = (card: RightsCard) => {
    if (navigator.share) {
      navigator.share({
        title: card.title,
        text: `Know your rights: ${card.scenario}`,
        url: card.shareableLink || window.location.href,
      });
    } else {
      // Fallback for browsers that don't support Web Share API
      navigator.clipboard.writeText(card.shareableLink || window.location.href);
    }
  };

  const handleFABClick = () => {
    setShowLegalAid(!showLegalAid);
    setShowScriptGenerator(false);
  };

  // Home view - category selection
  if (!selectedCategory) {
    return (
      <AppShell>
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-text mb-4">
              Know Your Rights
            </h1>
            <p className="text-lg text-muted">
              Get instant access to clear, actionable legal guidance for common situations
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {SCENARIO_CATEGORIES.map((category) => {
              const IconComponent = iconMap[category.icon as keyof typeof iconMap];
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="scenario-button group"
                >
                  <div className="flex items-start space-x-4">
                    <div className="flex h-12 w-12 items-center justify-center rounded-lg bg-primary text-white group-hover:bg-primary/90 transition-colors duration-200">
                      <IconComponent className="h-6 w-6" />
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-semibold text-text mb-1">{category.title}</h3>
                      <p className="text-sm text-muted">{category.description}</p>
                      <p className="text-xs text-muted mt-2">
                        {category.scenarios.length} scenarios available
                      </p>
                    </div>
                  </div>
                </button>
              );
            })}
          </div>

          <div className="mt-12 text-center">
            <div className="glass-card p-6">
              <h2 className="text-xl font-semibold text-text mb-3">
                Emergency Legal Situations?
              </h2>
              <p className="text-muted mb-4">
                If you're in an immediate legal emergency, contact local legal aid or emergency services.
              </p>
              <button
                onClick={() => setShowLegalAid(true)}
                className="btn-primary"
              >
                Find Legal Aid Now
              </button>
            </div>
          </div>
        </div>

        <FAB onClick={handleFABClick}>
          <MessageSquare className="h-6 w-6" />
        </FAB>

        {showLegalAid && (
          <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
            <div className="bg-surface rounded-lg max-w-2xl w-full max-h-[80vh] overflow-y-auto">
              <div className="p-4 border-b border-gray-200 flex items-center justify-between">
                <h2 className="text-xl font-semibold">Legal Aid Directory</h2>
                <button
                  onClick={() => setShowLegalAid(false)}
                  className="text-muted hover:text-text"
                >
                  ✕
                </button>
              </div>
              <div className="p-4">
                <LegalAidDirectory />
              </div>
            </div>
          </div>
        )}
      </AppShell>
    );
  }

  // Category view - scenario selection
  if (selectedCategory && !selectedScenario) {
    const category = SCENARIO_CATEGORIES.find(c => c.id === selectedCategory);
    if (!category) return null;

    return (
      <AppShell title={category.title}>
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => setSelectedCategory(null)}
              className="text-primary hover:text-primary/80"
            >
              ← Back to Categories
            </button>
          </div>

          <div className="text-center mb-8">
            <h1 className="text-2xl font-semibold text-text mb-2">
              {category.title}
            </h1>
            <p className="text-muted">{category.description}</p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {category.scenarios.map((scenario) => (
              <button
                key={scenario}
                onClick={() => handleScenarioSelect(scenario)}
                className="scenario-button"
              >
                <h3 className="font-medium text-text">{scenario}</h3>
                <p className="text-sm text-muted mt-1">
                  Get your rights card and AI-generated scripts
                </p>
              </button>
            ))}
          </div>
        </div>

        <FAB onClick={handleFABClick}>
          <MessageSquare className="h-6 w-6" />
        </FAB>
      </AppShell>
    );
  }

  // Card view - detailed rights information
  if (selectedCard) {
    return (
      <AppShell 
        title={selectedCard.title}
        showShare={true}
        onShare={() => handleShare(selectedCard)}
      >
        <div className="max-w-4xl mx-auto">
          <div className="flex items-center space-x-4 mb-6">
            <button
              onClick={() => {
                setSelectedScenario(null);
                setSelectedCard(null);
              }}
              className="text-primary hover:text-primary/80"
            >
              ← Back to Scenarios
            </button>
          </div>

          <div className="space-y-6">
            <RightsCardView
              card={selectedCard}
              variant="detailed"
              onGenerateScript={handleGenerateScript}
              onShare={handleShare}
            />

            {showScriptGenerator && (
              <AiScriptGenerator
                variant="withOptions"
                initialRequest={{
                  scenario: selectedCard.scenario,
                  jurisdiction: selectedCard.jurisdiction,
                  language: selectedCard.language
                }}
              />
            )}

            {showLegalAid && (
              <LegalAidDirectory jurisdiction={selectedCard.jurisdiction} />
            )}
          </div>
        </div>

        <FAB onClick={handleFABClick}>
          <Plus className="h-6 w-6" />
        </FAB>
      </AppShell>
    );
  }

  return null;
}
