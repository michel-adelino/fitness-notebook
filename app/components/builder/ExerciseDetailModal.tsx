'use client';

import React from 'react';
import { Exercise } from '@/app/lib/types';
import { X, Dumbbell, Target, Clock, Info } from 'lucide-react';
import { Button } from '../ui/Button';

interface ExerciseDetailModalProps {
  exercise: Exercise | null;
  isOpen: boolean;
  onClose: () => void;
  onAddToWorkout: (exercise: Exercise) => void;
}

export function ExerciseDetailModal({ exercise, isOpen, onClose, onAddToWorkout }: ExerciseDetailModalProps) {
  if (!isOpen || !exercise) return null;

  const getCategoryIcon = (category: string) => {
    switch (category) {
      case 'strength': return '💪';
      case 'cardio': return '🏃';
      case 'flexibility': return '🧘';
      default: return '📝';
    }
  };

  const getCategoryColor = (category: string) => {
    switch (category) {
      case 'strength': return 'from-red-500 to-orange-500';
      case 'cardio': return 'from-blue-500 to-cyan-500';
      case 'flexibility': return 'from-green-500 to-emerald-500';
      default: return 'from-gray-500 to-gray-600';
    }
  };

  return (
    <div
      className="fixed inset-0 bg-black bg-opacity-50 z-50 flex items-center justify-center p-4"
      onClick={onClose}
    >
      <div
        className="bg-white rounded-2xl shadow-2xl max-w-2xl w-full max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className={`bg-gradient-to-r ${getCategoryColor(exercise.category)} p-6 rounded-t-2xl`}>
          <div className="flex items-start justify-between">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 bg-white/20 backdrop-blur-sm rounded-2xl flex items-center justify-center text-4xl">
                {getCategoryIcon(exercise.category)}
              </div>
              <div>
                <h2 className="text-3xl font-bold text-white mb-2">{exercise.name}</h2>
                <div className="flex items-center gap-2">
                  <span className="px-3 py-1 bg-white/20 backdrop-blur-sm rounded-full text-white text-sm font-medium capitalize">
                    {exercise.category}
                  </span>
                </div>
              </div>
            </div>
            <button
              onClick={onClose}
              className="p-2 text-white hover:bg-white/20 rounded-lg transition-colors"
              aria-label="Close modal"
            >
              <X className="w-6 h-6" />
            </button>
          </div>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Exercise Details */}
          <div className="grid grid-cols-3 gap-4">
            {exercise.defaultSets && (
              <div className="bg-gradient-to-br from-blue-50 to-blue-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Target className="w-5 h-5 text-blue-600" />
                  <span className="text-sm font-medium text-blue-700">Sets</span>
                </div>
                <p className="text-2xl font-bold text-blue-900">{exercise.defaultSets}</p>
              </div>
            )}
            {exercise.defaultReps && (
              <div className="bg-gradient-to-br from-green-50 to-green-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Dumbbell className="w-5 h-5 text-green-600" />
                  <span className="text-sm font-medium text-green-700">Reps</span>
                </div>
                <p className="text-2xl font-bold text-green-900">{exercise.defaultReps}</p>
              </div>
            )}
            {exercise.defaultWeight !== undefined && exercise.defaultWeight > 0 && (
              <div className="bg-gradient-to-br from-purple-50 to-purple-100 rounded-xl p-4">
                <div className="flex items-center gap-2 mb-2">
                  <Clock className="w-5 h-5 text-purple-600" />
                  <span className="text-sm font-medium text-purple-700">Weight</span>
                </div>
                <p className="text-2xl font-bold text-purple-900">{exercise.defaultWeight} kg</p>
              </div>
            )}
          </div>

          {/* Exercise Description */}
          <div className="bg-gray-50 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Info className="w-5 h-5 text-gray-600" />
              <h3 className="font-semibold text-gray-900">About this exercise</h3>
            </div>
            <p className="text-gray-700 leading-relaxed">
              {exercise.category === 'strength' && (
                <>
                  {exercise.name} is a compound strength exercise that targets multiple muscle groups. 
                  Focus on proper form and controlled movements. Start with lighter weights and gradually increase.
                </>
              )}
              {exercise.category === 'cardio' && (
                <>
                  {exercise.name} is an excellent cardiovascular exercise that improves heart health and endurance. 
                  Maintain a steady pace and monitor your heart rate for optimal results.
                </>
              )}
              {exercise.category === 'flexibility' && (
                <>
                  {exercise.name} helps improve flexibility, mobility, and range of motion. 
                  Hold stretches gently and breathe deeply throughout the movement.
                </>
              )}
              {exercise.category === 'custom' && (
                <>
                  This is a custom exercise. Adjust sets, reps, and weight according to your fitness goals.
                </>
              )}
            </p>
          </div>

          {/* Default Parameters */}
          {(exercise.defaultSets || exercise.defaultReps || exercise.defaultWeight) && (
            <div className="border-t border-gray-200 pt-4">
              <h3 className="font-semibold text-gray-900 mb-3">Default Parameters</h3>
              <div className="space-y-2">
                {exercise.defaultSets && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Default Sets:</span>
                    <span className="font-semibold text-gray-900">{exercise.defaultSets}</span>
                  </div>
                )}
                {exercise.defaultReps && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Default Reps:</span>
                    <span className="font-semibold text-gray-900">{exercise.defaultReps}</span>
                  </div>
                )}
                {exercise.defaultWeight !== undefined && exercise.defaultWeight > 0 && (
                  <div className="flex justify-between items-center">
                    <span className="text-gray-600">Default Weight:</span>
                    <span className="font-semibold text-gray-900">{exercise.defaultWeight} kg</span>
                  </div>
                )}
              </div>
            </div>
          )}
        </div>

        {/* Footer Actions */}
        <div className="border-t border-gray-200 p-6 flex gap-3">
          <Button
            variant="outline"
            onClick={onClose}
            className="flex-1"
          >
            Close
          </Button>
          <Button
            variant="primary"
            onClick={() => {
              onAddToWorkout(exercise);
              onClose();
            }}
            className="flex-1"
          >
            Add to Workout
          </Button>
        </div>
      </div>
    </div>
  );
}

