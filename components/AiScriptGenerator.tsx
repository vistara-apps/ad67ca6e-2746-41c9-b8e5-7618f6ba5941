'use client';

import { useState } from 'react';
import { MessageSquare, Copy, RefreshCw, Settings2 } from 'lucide-react';
import { AIScriptRequest } from '@/lib/types';

interface AiScriptGeneratorProps {
  variant?: 'withOptions' | 'simple';
  initialRequest?: Partial<AIScriptRequest>;
  onGenerate?: (script: string) => void;
}

export function AiScriptGenerator({ 
  variant = 'simple',
  initialRequest = {},
  onGenerate 
}: AiScriptGeneratorProps) {
  const [isGenerating, setIsGenerating] = useState(false);
  const [generatedScript, setGeneratedScript] = useState<string>('');
  const [request, setRequest] = useState<AIScriptRequest>({
    scenario: initialRequest.scenario || '',
    jurisdiction: initialRequest.jurisdiction || 'Federal (US)',
    language: initialRequest.language || 'English',
    type: initialRequest.type || 'communication',
    context: initialRequest.context || ''
  });
  const [showOptions, setShowOptions] = useState(variant === 'withOptions');

  const generateScript = async () => {
    setIsGenerating(true);
    try {
      const response = await fetch('/api/generate-script', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(request),
      });

      if (!response.ok) {
        throw new Error('Failed to generate script');
      }

      const data = await response.json();
      setGeneratedScript(data.script);
      onGenerate?.(data.script);
    } catch (error) {
      console.error('Error generating script:', error);
      setGeneratedScript('Sorry, there was an error generating your script. Please try again.');
    } finally {
      setIsGenerating(false);
    }
  };

  const copyToClipboard = async () => {
    try {
      await navigator.clipboard.writeText(generatedScript);
      // You could add a toast notification here
    } catch (error) {
      console.error('Failed to copy to clipboard:', error);
    }
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center space-x-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-accent text-white">
            <MessageSquare className="h-5 w-5" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-text">AI Script Generator</h3>
            <p className="text-sm text-muted">Get personalized scripts for your situation</p>
          </div>
        </div>
        
        {variant === 'simple' && (
          <button
            onClick={() => setShowOptions(!showOptions)}
            className="p-2 rounded-lg bg-gray-100 hover:bg-gray-200 transition-colors duration-200"
          >
            <Settings2 className="h-4 w-4" />
          </button>
        )}
      </div>

      {showOptions && (
        <div className="space-y-4 mb-6">
          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Script Type
            </label>
            <select
              value={request.type}
              onChange={(e) => setRequest({ ...request, type: e.target.value as any })}
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
            >
              <option value="communication">Communication Script</option>
              <option value="checklist">Action Checklist</option>
              <option value="template">Document Template</option>
            </select>
          </div>

          <div>
            <label className="block text-sm font-medium text-text mb-2">
              Additional Context (Optional)
            </label>
            <textarea
              value={request.context}
              onChange={(e) => setRequest({ ...request, context: e.target.value })}
              placeholder="Provide any additional details about your specific situation..."
              className="w-full px-3 py-2 border border-gray-200 rounded-lg focus:ring-2 focus:ring-primary focus:border-transparent"
              rows={3}
            />
          </div>
        </div>
      )}

      <div className="flex space-x-3 mb-6">
        <button
          onClick={generateScript}
          disabled={isGenerating || !request.scenario}
          className="btn-primary flex items-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {isGenerating ? (
            <RefreshCw className="h-4 w-4 animate-spin" />
          ) : (
            <MessageSquare className="h-4 w-4" />
          )}
          <span>{isGenerating ? 'Generating...' : 'Generate Script'}</span>
        </button>
        
        {generatedScript && (
          <button
            onClick={copyToClipboard}
            className="btn-secondary flex items-center space-x-2"
          >
            <Copy className="h-4 w-4" />
            <span>Copy</span>
          </button>
        )}
      </div>

      {generatedScript && (
        <div className="bg-gray-50 rounded-lg p-4 animate-slide-up">
          <h4 className="font-medium text-text mb-3">Generated Script:</h4>
          <div className="prose prose-sm max-w-none">
            <pre className="whitespace-pre-wrap text-sm text-text font-normal">
              {generatedScript}
            </pre>
          </div>
        </div>
      )}
    </div>
  );
}
