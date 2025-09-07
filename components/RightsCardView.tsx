'use client';

import { useState } from 'react';
import { RightsCard } from '@/lib/types';
import { Share2, Download, MessageSquare, ExternalLink, Clock, Globe, MapPin, ChevronDown, ChevronUp, Copy, Check } from 'lucide-react';
import { formatRelativeTime, copyToClipboard, getLanguageFlag } from '@/lib/utils';
import { toast } from 'react-hot-toast';

interface RightsCardViewProps {
  card: RightsCard;
  variant?: 'compact' | 'detailed';
  onGenerateScript?: (cardId: string) => void;
  onShare?: (card: RightsCard) => void;
  onDownloadPdf?: (cardId: string) => void;
}

export function RightsCardView({ 
  card, 
  variant = 'detailed',
  onGenerateScript,
  onShare,
  onDownloadPdf
}: RightsCardViewProps) {
  const [isExpanded, setIsExpanded] = useState(variant === 'detailed');
  const [isLoading, setIsLoading] = useState(false);
  const [copied, setCopied] = useState(false);

  const handleCopyLink = async () => {
    const success = await copyToClipboard(card.shareableLink || window.location.href);
    if (success) {
      setCopied(true);
      toast.success('Link copied to clipboard!');
      setTimeout(() => setCopied(false), 2000);
    } else {
      toast.error('Failed to copy link');
    }
  };

  const handleDownloadPdf = async () => {
    if (!onDownloadPdf) return;
    
    setIsLoading(true);
    try {
      await onDownloadPdf(card.cardId);
      toast.success('PDF download started');
    } catch (error) {
      toast.error('Failed to download PDF');
    } finally {
      setIsLoading(false);
    }
  };

  if (variant === 'compact') {
    return (
      <div className="rights-card cursor-pointer fade-in" onClick={() => setIsExpanded(!isExpanded)}>
        <div className="flex items-start justify-between">
          <div className="flex-1">
            <div className="flex items-center space-x-2 mb-2">
              <h3 className="text-lg font-semibold text-foreground">{card.title}</h3>
              {card.offlineAccessEnabled && (
                <span className="badge badge-secondary text-xs">Offline</span>
              )}
            </div>
            <p className="text-sm text-muted-foreground mb-3">{card.scenario}</p>
            <div className="flex items-center space-x-4 text-xs text-muted-foreground">
              <div className="flex items-center space-x-1">
                <MapPin className="h-3 w-3" />
                <span>{card.jurisdiction}</span>
              </div>
              <div className="flex items-center space-x-1">
                <span>{getLanguageFlag(card.language)}</span>
                <span>{card.language}</span>
              </div>
              <div className="flex items-center space-x-1">
                <Clock className="h-3 w-3" />
                <span>{formatRelativeTime(card.updatedAt)}</span>
              </div>
            </div>
          </div>
          <div className="flex items-center space-x-2">
            {onShare && (
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  onShare(card);
                }}
                className="p-2 rounded-lg bg-muted/20 hover:bg-muted/30 transition-colors duration-200"
                title="Share this card"
              >
                <Share2 className="h-4 w-4" />
              </button>
            )}
            <div className="text-muted-foreground">
              {isExpanded ? <ChevronUp className="h-4 w-4" /> : <ChevronDown className="h-4 w-4" />}
            </div>
          </div>
        </div>
        
        {isExpanded && (
          <div className="mt-4 pt-4 border-t border-border slide-up">
            <div className="prose prose-sm max-w-none">
              <div dangerouslySetInnerHTML={{ __html: card.content }} />
            </div>
            <div className="flex flex-wrap gap-2 mt-4">
              {onGenerateScript && (
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    onGenerateScript(card.cardId);
                  }}
                  className="btn-primary text-sm px-4 py-2"
                >
                  <MessageSquare className="h-3 w-3 mr-1" />
                  Get Script
                </button>
              )}
              <button
                onClick={(e) => {
                  e.stopPropagation();
                  handleCopyLink();
                }}
                className="btn-secondary text-sm px-4 py-2"
              >
                {copied ? <Check className="h-3 w-3 mr-1" /> : <Copy className="h-3 w-3 mr-1" />}
                {copied ? 'Copied!' : 'Copy Link'}
              </button>
            </div>
          </div>
        )}
      </div>
    );
  }

  return (
    <div className="rights-card fade-in">
      <div className="flex items-start justify-between mb-6">
        <div className="flex-1">
          <div className="flex items-center space-x-3 mb-3">
            <h1 className="text-3xl font-bold text-foreground">{card.title}</h1>
            {card.offlineAccessEnabled && (
              <span className="badge badge-default">Offline Available</span>
            )}
          </div>
          <p className="text-lg text-muted-foreground mb-4">{card.scenario}</p>
          <div className="flex flex-wrap items-center gap-4 text-sm">
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted/20 rounded-full">
              <MapPin className="h-4 w-4 text-primary" />
              <span className="font-medium">{card.jurisdiction}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted/20 rounded-full">
              <Globe className="h-4 w-4 text-primary" />
              <span>{getLanguageFlag(card.language)}</span>
              <span className="font-medium">{card.language}</span>
            </div>
            <div className="flex items-center space-x-2 px-3 py-1 bg-muted/20 rounded-full">
              <Clock className="h-4 w-4 text-primary" />
              <span className="font-medium">Updated {formatRelativeTime(card.updatedAt)}</span>
            </div>
          </div>
        </div>
      </div>

      <div className="prose prose-lg max-w-none mb-8">
        <div dangerouslySetInnerHTML={{ __html: card.content }} />
      </div>

      <div className="flex flex-wrap gap-3 pt-6 border-t border-border">
        {onGenerateScript && (
          <button
            onClick={() => onGenerateScript(card.cardId)}
            className="btn-primary flex items-center space-x-2"
            disabled={isLoading}
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
            <span>Share Card</span>
          </button>
        )}

        <button
          onClick={handleCopyLink}
          className="btn-secondary flex items-center space-x-2"
          disabled={isLoading}
        >
          {copied ? <Check className="h-4 w-4" /> : <Copy className="h-4 w-4" />}
          <span>{copied ? 'Copied!' : 'Copy Link'}</span>
        </button>
        
        {(card.pdfUrl || onDownloadPdf) && (
          <button
            onClick={handleDownloadPdf}
            className="btn-secondary flex items-center space-x-2"
            disabled={isLoading}
          >
            <Download className="h-4 w-4" />
            <span>{isLoading ? 'Generating...' : 'Download PDF'}</span>
          </button>
        )}
        
        <button
          onClick={() => window.open('/legal-aid', '_blank')}
          className="btn-outline flex items-center space-x-2"
        >
          <ExternalLink className="h-4 w-4" />
          <span>Find Legal Aid</span>
        </button>
      </div>

      <div className="mt-6 p-4 bg-muted/10 rounded-lg border border-border">
        <p className="text-sm text-muted-foreground">
          <strong>Disclaimer:</strong> This information is for educational purposes only and does not constitute legal advice. 
          Always consult with a qualified attorney for legal advice specific to your situation.
        </p>
      </div>
    </div>
  );
}
