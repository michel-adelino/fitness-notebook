'use client';

import React from 'react';
import { useBuilder } from '@/app/context/BuilderContext';

export function OrderSummary() {
  const { notebookPage, selectedTemplate } = useBuilder();

  const calculatePrice = () => {
    const basePrice = 29.99;
    const exerciseCount = notebookPage.exercises.length;
    const personalizationBonus = notebookPage.personalization.name ? 5 : 0;
    return basePrice + (exerciseCount * 0.5) + personalizationBonus;
  };

  const price = calculatePrice();

  return (
    <div className="bg-white rounded-lg border border-gray-200 p-6">
      <h2 className="text-xl font-semibold text-gray-900 mb-4">Order Summary</h2>
      
      <div className="space-y-4 mb-6">
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Custom Notebook</span>
          <span className="font-medium">${price.toFixed(2)}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Template: {selectedTemplate.name}</span>
        </div>
        <div className="flex justify-between text-sm">
          <span className="text-gray-600">Exercises: {notebookPage.exercises.length}</span>
        </div>
        {notebookPage.personalization.name && (
          <div className="flex justify-between text-sm">
            <span className="text-gray-600">Personalization</span>
            <span className="text-green-600">+$5.00</span>
          </div>
        )}
      </div>

      <div className="border-t border-gray-200 pt-4">
        <div className="flex justify-between items-center">
          <span className="text-lg font-semibold text-gray-900">Total</span>
          <span className="text-2xl font-bold text-gray-900">${price.toFixed(2)}</span>
        </div>
      </div>

      <div className="mt-6 p-4 bg-gray-50 rounded-lg">
        <h3 className="text-sm font-semibold text-gray-900 mb-2">Your Customization</h3>
        <ul className="text-xs text-gray-600 space-y-1">
          <li>• {selectedTemplate.name} template</li>
          <li>• {notebookPage.exercises.length} exercises</li>
          <li>• Custom colors: {notebookPage.colors.accentColor}</li>
          {notebookPage.personalization.name && (
            <li>• Personalized for: {notebookPage.personalization.name}</li>
          )}
        </ul>
      </div>
    </div>
  );
}

