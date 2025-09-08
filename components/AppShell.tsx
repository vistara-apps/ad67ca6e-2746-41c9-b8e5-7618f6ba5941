'use client';

import { ReactNode } from 'react';
import { Shield, Menu, Share2 } from 'lucide-react';

interface AppShellProps {
  children: ReactNode;
  title?: string;
  showShare?: boolean;
  onShare?: () => void;
}

export function AppShell({ 
  children, 
  title = 'RightsGuard AI',
  showShare = false,
  onShare 
}: AppShellProps) {
  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 w-full border-b border-gray-200/50 bg-white/80 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Shield className="h-6 w-6" />
              </div>
              <h1 className="text-xl font-bold text-foreground">{title}</h1>
            </div>
            
            <div className="flex items-center space-x-2">
              {showShare && onShare && (
                <button
                  onClick={onShare}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                  aria-label="Share"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              )}
              
              <button
                className="flex h-10 w-10 items-center justify-center rounded-lg bg-secondary text-secondary-foreground hover:bg-secondary/80 transition-colors"
                aria-label="Menu"
              >
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {children}
      </main>
    </div>
  );
}

