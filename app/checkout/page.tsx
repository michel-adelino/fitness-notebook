'use client';

import React, { useState, useEffect } from 'react';
import { BuilderProvider, useBuilder } from '@/app/context/BuilderContext';
import { CheckoutForm } from '@/app/components/checkout/CheckoutForm';
import { OrderSummary } from '@/app/components/checkout/OrderSummary';
import { Button } from '@/app/components/ui/Button';
import { CheckCircle, ArrowLeft } from 'lucide-react';
import Link from 'next/link';

function CheckoutContent() {
  const { exercises } = useBuilder();
  const [orderPlaced, setOrderPlaced] = useState(false);

  useEffect(() => {
    // Small delay to allow state to load from localStorage
    const timer = setTimeout(() => {
      if (exercises.length === 0) {
        // Redirect to builder if no exercises
        window.location.href = '/builder';
      }
    }, 100);

    return () => clearTimeout(timer);
  }, [exercises]);

  if (exercises.length === 0) {
    return null;
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 p-4">
        <div className="max-w-md w-full bg-white rounded-lg shadow-lg p-8 text-center">
          <CheckCircle className="w-16 h-16 text-green-500 mx-auto mb-4" />
          <h1 className="text-2xl font-bold text-gray-900 mb-2">Order Placed Successfully!</h1>
          <p className="text-gray-600 mb-6">
            Thank you for your order. Your custom fitness notebook will be prepared and shipped soon.
          </p>
          <div className="space-y-3">
            <Link href="/builder">
              <Button variant="primary" className="w-full">
                Create Another Notebook
              </Button>
            </Link>
            <Link href="/">
              <Button variant="outline" className="w-full">
                Back to Home
              </Button>
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <Link href="/builder" className="inline-flex items-center text-gray-600 hover:text-gray-900 mb-6">
          <ArrowLeft className="w-4 h-4 mr-2" />
          Back to Builder
        </Link>

        <h1 className="text-3xl font-bold text-gray-900 mb-8">Checkout</h1>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          <div className="lg:col-span-2">
            <CheckoutForm onSuccess={() => setOrderPlaced(true)} />
          </div>
          <div className="lg:col-span-1">
            <div className="sticky top-8">
              <OrderSummary />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function CheckoutPage() {
  return (
    <BuilderProvider>
      <CheckoutContent />
    </BuilderProvider>
  );
}

