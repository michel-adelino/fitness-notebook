'use client';

import React from 'react';
import { templates } from '@/app/lib/templates';
import { useBuilder } from '@/app/context/BuilderContext';
import { Select } from '../ui/Select';

export function TemplateSelector() {
  const { selectedTemplate, setSelectedTemplate } = useBuilder();

  const templateOptions = templates.map((template) => ({
    value: template.id,
    label: template.name,
  }));

  const handleTemplateChange = (templateId: string) => {
    const template = templates.find((t) => t.id === templateId);
    if (template) {
      setSelectedTemplate(template);
    }
  };

  return (
    <div className="p-4 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm">
      <Select
        label="Page Template"
        value={selectedTemplate.id}
        onChange={(e) => handleTemplateChange(e.target.value)}
        options={templateOptions}
      />
      <p className="mt-2 text-sm text-gray-600">{selectedTemplate.description}</p>
    </div>
  );
}

