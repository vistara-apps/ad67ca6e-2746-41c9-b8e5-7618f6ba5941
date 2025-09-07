'use client';

import { useState, useEffect } from 'react';
import { useQuery } from '@tanstack/react-query';
import { useMiniKit } from '@coinbase/onchainkit/minikit';
import { AppShell } from '@/components/AppShell';
import { RightsCardView } from '@/components/RightsCardView';
import { AiScriptGenerator } from '@/components/AiScriptGenerator';
import { LegalAidDirectory } from '@/components/LegalAidDirectory';
import { FAB } from '@/components/FAB';
import { mockRightsCards, getPopularCards, getRecentCards, getCardsByCategory } from '@/lib/data';
import { RightsCard } from '@/lib/types';
import { Search, Filter, Zap, Shield, Home, Briefcase, Users, Globe, ChevronRight, Star, Clock, TrendingUp, MessageSquare, ArrowUp } from 'lucide-react';
import { toast } from 'react-hot-toast';
import { cn } from '@/lib/utils';

const categories = [
  { id: 'police', name: 'Police Interactions', icon: Shield, color: 'text-blue-600', description: 'Traffic stops, searches, arrests' },
  { id: 'workplace', name: 'Workplace Rights', icon: Briefcase, color: 'text-green-600', description: 'Discrimination, harassment, wages' },
  { id: 'housing', name: 'Housing Rights', icon: Home, color: 'text-purple-600', description: 'Evictions, tenant rights, deposits' },
  { id: 'consumer', name: 'Consumer Rights', icon: Users, color: 'text-orange-600', description: 'Debt collection, fraud, warranties' },
  { id: 'immigration', name: 'Immigration Rights', icon: Globe, color: 'text-red-600', description: 'ICE encounters, deportation, asylum' },
];

export default function HomePage() {
  const { setFrameReady } = useMiniKit();
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showScriptGenerator, setShowScriptGenerator] = useState(false);
  const [showLegalAid, setShowLegalAid] = useState(false);

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  // Fetch popular and recent cards
  const { data: popularCards = [] } = useQuery({
    queryKey: ['popular-cards'],
    queryFn: () => getPopularCards(3),
  });

  const { data: recentCards = [] } = useQuery({
    queryKey: ['recent-cards'],
    queryFn: () => getRecentCards(3),
  });

  const handleGenerateScript = async (cardId: string) => {
    try {
      setShowScriptGenerator(true);
      toast.success('Opening AI script generator...');
    } catch (error) {
      toast.error('Failed to open script generator');
    }
  };

  const handleShareCard = async (card: RightsCard) => {
    try {
      if (navigator.share) {
        await navigator.share({
          title: card.title,
          text: `Check out this rights card: ${card.title}`,
          url: card.shareableLink || window.location.href,
        });
      } else {
        // Fallback to copying to clipboard
        await navigator.clipboard.writeText(card.shareableLink || window.location.href);
        toast.success('Link copied to clipboard!');
      }
    } catch (error) {
      toast.error('Failed to share card');
    }
  };

  const handleDownloadPdf = async (cardId: string) => {
    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ cardId }),
      });

      if (!response.ok) throw new Error('Failed to generate PDF');

      const data = await response.json();
      
      // Create a blob and download
      const blob = new Blob([data.htmlContent], { type: 'text/html' });
      const url = URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = data.filename;
      document.body.appendChild(a);
      a.click();
      document.body.removeChild(a);
      URL.revokeObjectURL(url);
      
      toast.success('PDF generated successfully!');
    } catch (error) {
      toast.error('Failed to generate PDF');
    }
  };

  const handleCategorySelect = (categoryId: string) => {
    setSelectedCategory(categoryId);
    const categoryCards = getCardsByCategory(categoryId);
    toast.success(`Showing ${categories.find(c => c.id === categoryId)?.name} cards`);
  };

  const handleFABClick = () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
    toast.success('Scrolled to top!');
  };

  const featuredCard = popularCards[0] || mockRightsCards[0];

  return (
    <AppShell>
      <div className="space-y-12">
        {/* Hero Section */}
        <div className="text-center py-16 bg-gradient-to-br from-primary/5 to-accent/5 rounded-2xl">
          <div className="max-w-4xl mx-auto px-6">
            <h1 className="text-5xl font-bold text-foreground mb-6">
              Know Your Rights, Assert Your Power
            </h1>
            <p className="text-xl text-muted-foreground mb-8 leading-relaxed">
              Access clear, actionable legal guidance for critical interactions. 
              Get AI-powered scripts and connect with legal aid organizations instantly.
            </p>
            
            {/* Search Bar */}
            <div className="max-w-2xl mx-auto relative">
              <div className="relative">
                <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-muted-foreground h-5 w-5" />
                <input
                  type="text"
                  placeholder="Search rights cards, scenarios, or legal topics..."
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  className="input pl-12 pr-12 py-4 text-lg w-full"
                />
                <button
                  onClick={() => setShowFilters(!showFilters)}
                  className={cn(
                    "absolute right-4 top-1/2 transform -translate-y-1/2 p-2 rounded-lg transition-colors",
                    showFilters ? "bg-primary text-white" : "text-muted-foreground hover:bg-muted/20"
                  )}
                >
                  <Filter className="h-5 w-5" />
                </button>
              </div>
              
              {showFilters && (
                <div className="absolute top-full left-0 right-0 mt-2 p-4 bg-surface border border-border rounded-lg shadow-modal z-10 fade-in">
                  <div className="grid grid-cols-2 md:grid-cols-3 gap-2">
                    <select className="select">
                      <option>All Jurisdictions</option>
                      <option>Federal (US)</option>
                      <option>California</option>
                      <option>New York</option>
                      <option>Texas</option>
                    </select>
                    <select className="select">
                      <option>All Languages</option>
                      <option>English</option>
                      <option>Spanish</option>
                      <option>French</option>
                    </select>
                    <select className="select">
                      <option>All Scenarios</option>
                      <option>Traffic Stop</option>
                      <option>Workplace Issues</option>
                      <option>Housing Rights</option>
                    </select>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Categories Grid */}
        <section>
          <div className="flex items-center justify-between mb-8">
            <h2 className="text-3xl font-bold text-foreground">Browse by Category</h2>
            <div className="flex items-center text-primary">
              <TrendingUp className="h-5 w-5 mr-2" />
              <span className="text-sm font-medium">Most Popular</span>
            </div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {categories.map((category) => {
              const Icon = category.icon;
              return (
                <button
                  key={category.id}
                  onClick={() => handleCategorySelect(category.id)}
                  className="scenario-button group text-left p-6 hover:scale-105 transition-all duration-200"
                >
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn("p-3 rounded-lg bg-muted/20", category.color)}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <ChevronRight className="h-5 w-5 text-muted-foreground group-hover:text-primary transition-colors" />
                  </div>
                  <h3 className="font-semibold text-lg mb-2 group-hover:text-primary transition-colors">
                    {category.name}
                  </h3>
                  <p className="text-sm text-muted-foreground">
                    {category.description}
                  </p>
                </button>
              );
            })}
          </div>
        </section>

        {/* Featured Rights Card */}
        {featuredCard && (
          <section>
            <div className="flex items-center space-x-3 mb-8">
              <Star className="h-6 w-6 text-yellow-500" />
              <h2 className="text-3xl font-bold text-foreground">Featured Rights Card</h2>
            </div>
            <RightsCardView 
              card={featuredCard}
              onGenerateScript={handleGenerateScript}
              onShare={handleShareCard}
              onDownloadPdf={handleDownloadPdf}
            />
          </section>
        )}

        {/* Popular Cards */}
        {popularCards.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-8">
              <TrendingUp className="h-6 w-6 text-green-500" />
              <h2 className="text-3xl font-bold text-foreground">Popular Rights Cards</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {popularCards.slice(1).map((card) => (
                <RightsCardView
                  key={card.cardId}
                  card={card}
                  variant="compact"
                  onGenerateScript={handleGenerateScript}
                  onShare={handleShareCard}
                />
              ))}
            </div>
          </section>
        )}

        {/* Recent Cards */}
        {recentCards.length > 0 && (
          <section>
            <div className="flex items-center space-x-3 mb-8">
              <Clock className="h-6 w-6 text-blue-500" />
              <h2 className="text-3xl font-bold text-foreground">Recently Updated</h2>
            </div>
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
              {recentCards.map((card) => (
                <RightsCardView
                  key={card.cardId}
                  card={card}
                  variant="compact"
                  onGenerateScript={handleGenerateScript}
                  onShare={handleShareCard}
                />
              ))}
            </div>
          </section>
        )}

        {/* AI Script Generator */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <Zap className="h-6 w-6 text-purple-500" />
            <h2 className="text-3xl font-bold text-foreground">AI Script Generator</h2>
          </div>
          <div className="bg-gradient-to-br from-purple-50 to-blue-50 dark:from-purple-950/20 dark:to-blue-950/20 rounded-2xl p-8">
            <AiScriptGenerator />
          </div>
        </section>

        {/* Legal Aid Directory */}
        <section>
          <div className="flex items-center space-x-3 mb-8">
            <Users className="h-6 w-6 text-red-500" />
            <h2 className="text-3xl font-bold text-foreground">Find Legal Aid</h2>
          </div>
          <div className="bg-gradient-to-br from-red-50 to-orange-50 dark:from-red-950/20 dark:to-orange-950/20 rounded-2xl p-8">
            <LegalAidDirectory />
          </div>
        </section>

        {/* Emergency Help Section */}
        <section className="bg-destructive/10 border border-destructive/20 rounded-2xl p-8">
          <div className="text-center">
            <h2 className="text-2xl font-bold text-foreground mb-4">
              🚨 Emergency Legal Situation?
            </h2>
            <p className="text-muted-foreground mb-6 max-w-2xl mx-auto">
              If you're in an immediate legal emergency, don't wait. Contact local legal aid, 
              emergency services, or use our quick access tools below.
            </p>
            <div className="flex flex-wrap justify-center gap-4">
              <button
                onClick={() => setShowLegalAid(true)}
                className="btn-primary"
              >
                Find Legal Aid Now
              </button>
              <button
                onClick={() => setShowScriptGenerator(true)}
                className="btn-secondary"
              >
                <MessageSquare className="h-4 w-4 mr-2" />
                Get Emergency Script
              </button>
            </div>
          </div>
        </section>
      </div>

      <FAB onClick={handleFABClick}>
        <ArrowUp className="h-6 w-6" />
      </FAB>

      {/* Modals */}
      {showScriptGenerator && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold">AI Script Generator</h2>
              <button
                onClick={() => setShowScriptGenerator(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <AiScriptGenerator variant="withOptions" />
            </div>
          </div>
        </div>
      )}

      {showLegalAid && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center p-4 z-50">
          <div className="bg-surface rounded-lg max-w-4xl w-full max-h-[80vh] overflow-y-auto">
            <div className="p-4 border-b border-border flex items-center justify-between">
              <h2 className="text-xl font-semibold">Legal Aid Directory</h2>
              <button
                onClick={() => setShowLegalAid(false)}
                className="text-muted-foreground hover:text-foreground"
              >
                ✕
              </button>
            </div>
            <div className="p-6">
              <LegalAidDirectory />
            </div>
          </div>
        </div>
      )}
    </AppShell>
  );
}
