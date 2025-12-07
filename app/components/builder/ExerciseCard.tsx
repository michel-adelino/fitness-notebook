'use client';

import React from 'react';
import { ExerciseOnPage } from '@/app/lib/types';
import { useBuilder } from '@/app/context/BuilderContext';
import { GripVertical, X } from 'lucide-react';
import { Input } from '../ui/Input';

interface ExerciseCardProps {
  exercise: ExerciseOnPage;
  index: number;
  isDragging?: boolean;
  dragHandleProps?: any;
}

export function ExerciseCard({ exercise, index, isDragging, dragHandleProps }: ExerciseCardProps) {
  const { updateExercise, removeExercise } = useBuilder();

  return (
    <div
      className={`bg-white border-2 border-gray-200 rounded-xl p-4 mb-3 transition-all duration-200 ${
        isDragging ? 'opacity-50 shadow-xl border-blue-400' : 'hover:shadow-lg hover:border-blue-300 hover:bg-blue-50/30'
      }`}
    >
      <div className="flex items-start justify-between mb-3">
        <div className="flex items-center gap-2 flex-1">
          <div {...(dragHandleProps || {})} className="cursor-move hover:text-blue-600 transition-colors">
            <GripVertical className="w-5 h-5 text-gray-400" />
          </div>
          <h3 className="font-semibold text-gray-900">{exercise.name}</h3>
          <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium">
            {exercise.category}
          </span>
        </div>
        <button
          onClick={() => removeExercise(exercise.id)}
          className="text-gray-400 hover:text-red-600 hover:bg-red-50 p-1.5 rounded-lg transition-all duration-200 active:opacity-70"
          aria-label="Remove exercise"
        >
          <X className="w-5 h-5" />
        </button>
      </div>

      <div className="grid grid-cols-3 gap-3">
        <Input
          type="number"
          label="Sets"
          value={exercise.sets || ''}
          onChange={(e) => updateExercise(exercise.id, { sets: parseInt(e.target.value) || 0 })}
          min="0"
          className="text-sm"
        />
        <Input
          type="number"
          label="Reps"
          value={exercise.reps || ''}
          onChange={(e) => updateExercise(exercise.id, { reps: parseInt(e.target.value) || 0 })}
          min="0"
          className="text-sm"
        />
        {exercise.category === 'strength' && (
          <Input
            type="number"
            label="Weight (kg)"
            value={exercise.weight || ''}
            onChange={(e) => updateExercise(exercise.id, { weight: parseFloat(e.target.value) || 0 })}
            min="0"
            step="0.5"
            className="text-sm"
          />
        )}
      </div>

      {exercise.category === 'cardio' && (
        <div className="mt-3">
          <Input
            type="text"
            label="Duration/Distance"
            placeholder="e.g., 30 min or 5 km"
            value={exercise.notes || ''}
            onChange={(e) => updateExercise(exercise.id, { notes: e.target.value })}
            className="text-sm"
          />
        </div>
      )}
    </div>
  );
}

