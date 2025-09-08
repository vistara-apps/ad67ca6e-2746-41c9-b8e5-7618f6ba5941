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
      <header className="sticky top-0 z-40 w-full border-b border-border/50 bg-surface/80 backdrop-blur-sm">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="flex h-16 items-center justify-between">
            <div className="flex items-center space-x-3">
              <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-primary text-white">
                <Shield className="h-6 w-6" />
              </div>
              <div>
                <h1 className="text-xl font-bold text-foreground">{title}</h1>
                <p className="text-sm text-muted-foreground">Know Your Rights Instantly</p>
              </div>
            </div>
            
            <div className="flex items-center space-x-2">
              {showShare && onShare && (
                <button
                  onClick={onShare}
                  className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/20 text-foreground hover:bg-muted/30 transition-colors duration-200"
                >
                  <Share2 className="h-5 w-5" />
                </button>
              )}
              <button className="flex h-10 w-10 items-center justify-center rounded-lg bg-muted/20 text-foreground hover:bg-muted/30 transition-colors duration-200">
                <Menu className="h-5 w-5" />
              </button>
            </div>
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="w-full px-4 sm:px-6 lg:px-8 py-6">
        {children}
      </main>

      {/* Footer */}
      <footer className="border-t border-border/50 bg-surface/50 py-6 mt-12">
        <div className="w-full px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <p className="text-sm text-muted-foreground">
              © 2024 RightsGuard AI. Legal information for educational purposes only.
            </p>
            <p className="text-xs text-muted-foreground mt-1">
              Always consult with a qualified attorney for legal advice.
            </p>
          </div>
        </div>
      </footer>
    </div>
  );
}
