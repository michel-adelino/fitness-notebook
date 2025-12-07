'use client';

import React from 'react';
import { useBuilder } from '@/app/context/BuilderContext';
import { User, Quote } from 'lucide-react';
import { Input } from '../ui/Input';

export function PersonalizationPanel() {
  const { personalization, updatePersonalization } = useBuilder();

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-purple-100 to-pink-100 rounded-lg flex items-center justify-center">
          <User className="w-4 h-4 text-purple-700" />
        </div>
        <h3 className="font-semibold text-gray-900">Personalization</h3>
      </div>

      <div className="space-y-4">
        <Input
          label="Your Name"
          value={personalization.name}
          onChange={(e) => updatePersonalization({ name: e.target.value })}
          placeholder="Enter your name"
          maxLength={50}
        />

        <Input
          label="Initials"
          value={personalization.initials}
          onChange={(e) => updatePersonalization({ initials: e.target.value.toUpperCase() })}
          placeholder="e.g., JD"
          maxLength={5}
        />

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            <Quote className="w-4 h-4 inline mr-1" />
            Motivational Quote
          </label>
          <textarea
            value={personalization.quote}
            onChange={(e) => updatePersonalization({ quote: e.target.value })}
            placeholder="Enter your motivational quote..."
            maxLength={200}
            rows={3}
            className="w-full px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 hover:border-gray-400 resize-none"
          />
          <p className="mt-1 text-xs text-gray-500 text-right">
            {personalization.quote.length}/200
          </p>
        </div>
      </div>
    </div>
  );
}

