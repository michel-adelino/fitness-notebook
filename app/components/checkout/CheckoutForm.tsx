'use client';

import React, { useState } from 'react';
import { Input } from '../ui/Input';
import { Button } from '../ui/Button';
import { Select } from '../ui/Select';
import { CreditCard, MapPin, User } from 'lucide-react';

interface CheckoutFormData {
  email: string;
  firstName: string;
  lastName: string;
  address: string;
  city: string;
  state: string;
  zipCode: string;
  country: string;
  paymentMethod: string;
  cardNumber: string;
  expiryDate: string;
  cvv: string;
}

export function CheckoutForm({ onSuccess }: { onSuccess: () => void }) {
  const [formData, setFormData] = useState<CheckoutFormData>({
    email: '',
    firstName: '',
    lastName: '',
    address: '',
    city: '',
    state: '',
    zipCode: '',
    country: 'US',
    paymentMethod: 'card',
    cardNumber: '',
    expiryDate: '',
    cvv: '',
  });

  const [errors, setErrors] = useState<Partial<Record<keyof CheckoutFormData, string>>>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (field: keyof CheckoutFormData, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const validate = (): boolean => {
    const newErrors: Partial<Record<keyof CheckoutFormData, string>> = {};

    if (!formData.email) newErrors.email = 'Email is required';
    if (!formData.firstName) newErrors.firstName = 'First name is required';
    if (!formData.lastName) newErrors.lastName = 'Last name is required';
    if (!formData.address) newErrors.address = 'Address is required';
    if (!formData.city) newErrors.city = 'City is required';
    if (!formData.state) newErrors.state = 'State is required';
    if (!formData.zipCode) newErrors.zipCode = 'Zip code is required';
    if (formData.paymentMethod === 'card') {
      if (!formData.cardNumber) newErrors.cardNumber = 'Card number is required';
      if (!formData.expiryDate) newErrors.expiryDate = 'Expiry date is required';
      if (!formData.cvv) newErrors.cvv = 'CVV is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    setIsSubmitting(true);
    
    // Simulate API call
    await new Promise((resolve) => setTimeout(resolve, 2000));
    
    setIsSubmitting(false);
    onSuccess();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      {/* Contact Information */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <User className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Contact Information</h3>
        </div>
        <div className="space-y-4">
          <Input
            type="email"
            label="Email"
            value={formData.email}
            onChange={(e) => handleChange('email', e.target.value)}
            error={errors.email}
            placeholder="your@email.com"
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="First Name"
              value={formData.firstName}
              onChange={(e) => handleChange('firstName', e.target.value)}
              error={errors.firstName}
              required
            />
            <Input
              label="Last Name"
              value={formData.lastName}
              onChange={(e) => handleChange('lastName', e.target.value)}
              error={errors.lastName}
              required
            />
          </div>
        </div>
      </div>

      {/* Shipping Address */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <MapPin className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Shipping Address</h3>
        </div>
        <div className="space-y-4">
          <Input
            label="Address"
            value={formData.address}
            onChange={(e) => handleChange('address', e.target.value)}
            error={errors.address}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="City"
              value={formData.city}
              onChange={(e) => handleChange('city', e.target.value)}
              error={errors.city}
              required
            />
            <Input
              label="State"
              value={formData.state}
              onChange={(e) => handleChange('state', e.target.value)}
              error={errors.state}
              required
            />
          </div>
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Zip Code"
              value={formData.zipCode}
              onChange={(e) => handleChange('zipCode', e.target.value)}
              error={errors.zipCode}
              required
            />
            <Select
              label="Country"
              value={formData.country}
              onChange={(e) => handleChange('country', e.target.value)}
              options={[
                { value: 'US', label: 'United States' },
                { value: 'CA', label: 'Canada' },
                { value: 'UK', label: 'United Kingdom' },
                { value: 'AU', label: 'Australia' },
              ]}
            />
          </div>
        </div>
      </div>

      {/* Payment Information */}
      <div>
        <div className="flex items-center gap-2 mb-4">
          <CreditCard className="w-5 h-5 text-gray-700" />
          <h3 className="text-lg font-semibold text-gray-900">Payment Information</h3>
        </div>
        <div className="p-4 bg-yellow-50 border border-yellow-200 rounded-lg mb-4">
          <p className="text-sm text-yellow-800">
            <strong>Note:</strong> This is a mock checkout. No real payment will be processed.
          </p>
        </div>
        <div className="space-y-4">
          <Input
            label="Card Number"
            value={formData.cardNumber}
            onChange={(e) => handleChange('cardNumber', e.target.value.replace(/\s/g, ''))}
            error={errors.cardNumber}
            placeholder="1234 5678 9012 3456"
            maxLength={16}
            required
          />
          <div className="grid grid-cols-2 gap-4">
            <Input
              label="Expiry Date"
              value={formData.expiryDate}
              onChange={(e) => handleChange('expiryDate', e.target.value)}
              error={errors.expiryDate}
              placeholder="MM/YY"
              maxLength={5}
              required
            />
            <Input
              label="CVV"
              value={formData.cvv}
              onChange={(e) => handleChange('cvv', e.target.value)}
              error={errors.cvv}
              placeholder="123"
              maxLength={3}
              required
            />
          </div>
        </div>
      </div>

      <Button
        type="submit"
        variant="primary"
        size="lg"
        className="w-full"
        disabled={isSubmitting}
      >
        {isSubmitting ? 'Processing...' : 'Place Order'}
      </Button>
    </form>
  );
}

