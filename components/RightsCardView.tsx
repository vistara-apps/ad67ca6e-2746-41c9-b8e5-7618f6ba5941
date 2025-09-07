'use client';

import { useState } from 'react';
import { RightsCard } from '@/lib/types';
import { Share2, Download, MessageSquare, ExternalLink } from 'lucide-react';

interface RightsCardViewProps {
  card: RightsCard;
  variant?: 'compact' | 'detailed';
  onGenerateScript?: (cardId: string) => void;
  onShare?: (card: RightsCard) => void;
}

export function RightsCardView({ 
  card, 
  variant = 'detailed',
  onGenerateScript,
  onShare 
}: RightsCardViewProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'detailed');

  if (variant === 'compact') {
    return (
      <div className="rights-card cursor-pointer" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <h3 className="text-lg font-semibold text-text mb-2">{card.title}</h3>
            <p className="text-sm text-muted mb-3">{card.scenario}</p>
            <div className="flex items-center space-x-4 text-xs text-muted">
              <span>{card.jurisdiction}</span>
              <span>{card.language}</span>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(card);
                }}
                className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: card.content }} />
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rights-card">
      <div className="flex items-start justify-between mb-4">
        <div className="flex-1">
          <h2 className="text-2xl font-semibold text-text mb-2">{card.title}</h2>
          <p className="text-muted mb-3">{card.scenario}</p>
          <div className="flex items-center space-x-4 text-sm text-muted">
            <span className="px-2 py-1 bg-gray-100 rounded-md">{card.jurisdiction}</span>
            <span className="px-2 py-1 bg-gray-100 rounded-md">{card.language}</span>
          </div>
        </div>
      </div>

      <div className="prose prose-base max-w-none mb-6">
        <div dangerouslySetInnerHTML={{ __html: card.content }} />
      </div>

      <div className="flex flex-wrap gap-3 pt-4 border-t border-gray-200">
        {onGenerateScript && (
          <button
            onClick={() => onGenerateScript(card.cardId)}
            className="btn-primary flex items-center space-x-2"
          >
            <MessageSquare className="h-4 w-4" />
            <span>Get AI Script</span>
          </button>
        )}
        
        {onShare && (
          <button
            onClick={() => onShare(card)}
            className="btn-secondary flex items-center space-x-2"
          >
            <Share2 className="h-4 w-4" />
            <span>Share</span>
          </button>
        )}
        
        {card.pdfUrl && (
          <button
            onClick={() => window.open(card.pdfUrl, '_blank')}
            className="btn-secondary flex items-center space-x-2"
          >
            <Download className="h-4 w-4" />
            <span>Download PDF</span>
          </button>
        )}
        
        <button
          onClick={() => window.open('/legal-aid', '_blank')}
          className="btn-secondary flex items-center space-x-2"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Find Legal Aid</span>
        </button>
      </div>
    </div>
  );
}
