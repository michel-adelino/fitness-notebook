'use client';

import React from 'react';
import { useBuilder } from '@/app/context/BuilderContext';
import { Palette } from 'lucide-react';

const presetColors = [
  { name: 'Classic Black', lineColor: '#000000', headingColor: '#1a1a1a', accentColor: '#3b82f6' },
  { name: 'Ocean Blue', lineColor: '#1e40af', headingColor: '#1e3a8a', accentColor: '#3b82f6' },
  { name: 'Forest Green', lineColor: '#166534', headingColor: '#14532d', accentColor: '#22c55e' },
  { name: 'Sunset Orange', lineColor: '#c2410c', headingColor: '#9a3412', accentColor: '#f97316' },
  { name: 'Royal Purple', lineColor: '#6b21a8', headingColor: '#581c87', accentColor: '#a855f7' },
];

export function ColorPicker() {
  const { colors, updateColors } = useBuilder();

  return (
    <div className="p-4 bg-white border-b border-gray-200">
      <div className="flex items-center gap-2 mb-4">
        <div className="w-8 h-8 bg-gradient-to-br from-blue-100 to-purple-100 rounded-lg flex items-center justify-center">
          <Palette className="w-4 h-4 text-blue-700" />
        </div>
        <h3 className="font-semibold text-gray-900">Color Customization</h3>
      </div>

      <div className="space-y-4">
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Line Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors.lineColor}
              onChange={(e) => updateColors({ lineColor: e.target.value })}
              className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={colors.lineColor}
              onChange={(e) => updateColors({ lineColor: e.target.value })}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="#000000"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Heading Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors.headingColor}
              onChange={(e) => updateColors({ headingColor: e.target.value })}
              className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={colors.headingColor}
              onChange={(e) => updateColors({ headingColor: e.target.value })}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="#1a1a1a"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Accent Color
          </label>
          <div className="flex items-center gap-3">
            <input
              type="color"
              value={colors.accentColor}
              onChange={(e) => updateColors({ accentColor: e.target.value })}
              className="w-12 h-12 rounded-xl border-2 border-gray-300 cursor-pointer hover:border-gray-400 transition-colors shadow-sm"
            />
            <input
              type="text"
              value={colors.accentColor}
              onChange={(e) => updateColors({ accentColor: e.target.value })}
              className="flex-1 px-4 py-2.5 border border-gray-300 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-500/50 focus:border-blue-500 transition-all duration-200 hover:border-gray-400"
              placeholder="#3b82f6"
            />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            Preset Color Schemes
          </label>
          <div className="grid grid-cols-2 gap-2">
            {presetColors.map((preset) => (
              <button
                key={preset.name}
                onClick={() => updateColors(preset)}
                className="p-3 border-2 border-gray-300 rounded-xl hover:border-blue-500 hover:bg-gradient-to-br hover:from-blue-50 hover:to-purple-50 hover:shadow-md transition-all duration-200 text-left active:opacity-80"
              >
                <div className="flex items-center gap-2 mb-2">
                  <div
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: preset.lineColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: preset.headingColor }}
                  />
                  <div
                    className="w-5 h-5 rounded-lg border-2 border-gray-300 shadow-sm"
                    style={{ backgroundColor: preset.accentColor }}
                  />
                </div>
                <p className="text-xs font-medium text-gray-700">{preset.name}</p>
              </button>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

