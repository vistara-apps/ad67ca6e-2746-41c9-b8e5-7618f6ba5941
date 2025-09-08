'use client';

import { useState, useEffect } from 'react';
import { useMiniKit } from '@coinbase/onchainkit/minikit';

export default function HomePage() {
  const { setFrameReady } = useMiniKit();

  useEffect(() => {
    setFrameReady();
  }, [setFrameReady]);

  return (
    <div className="min-h-screen bg-background p-8">
      <div className="max-w-4xl mx-auto">
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            RightsGuard AI
          </h1>
          <p className="text-lg text-muted-foreground">
            Know Your Rights Instantly - Legal guidance for common situations
          </p>
        </div>
        
        <div className="glass-card p-6">
          <h2 className="text-xl font-semibold text-foreground mb-3">
            Welcome to RightsGuard AI
          </h2>
          <p className="text-muted-foreground mb-4">
            This is a Next.js Base Mini App that provides instant access to legal rights information.
          </p>
          <button className="btn-primary">
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

