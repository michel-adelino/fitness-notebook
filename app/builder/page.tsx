'use client';

import { BuilderProvider } from '@/app/context/BuilderContext';
import { BuilderLayout } from '@/app/components/builder/BuilderLayout';

export default function BuilderPage() {
  return (
    <BuilderProvider>
      <BuilderLayout />
    </BuilderProvider>
  );
}

