'use client';

import React, { useState } from 'react';
import { useDraggable } from '@dnd-kit/core';
import { Exercise } from '@/app/lib/types';
import { defaultExercises, exerciseCategories } from '@/app/lib/exercises';
import { useBuilder } from '@/app/context/BuilderContext';
import { Plus } from 'lucide-react';
import { Button } from '../ui/Button';
import { Input } from '../ui/Input';

function DraggableExercise({ exercise }: { exercise: Exercise }) {
  const { attributes, listeners, setNodeRef, transform, isDragging } = useDraggable({
    id: exercise.id,
    data: { exercise },
  });

  const style = transform
    ? {
        transform: `translate3d(${transform.x}px, ${transform.y}px, 0)`,
      }
    : undefined;

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...listeners}
      {...attributes}
      className={`bg-white border-2 border-gray-200 rounded-xl p-3.5 mb-2.5 cursor-move hover:border-blue-500 hover:shadow-lg hover:shadow-blue-500/20 hover:bg-blue-50/50 transition-all duration-200 ${
        isDragging ? 'opacity-50 border-blue-500 shadow-xl' : ''
      }`}
    >
      <div className="flex items-center justify-between">
        <div>
          <h4 className="font-semibold text-gray-900">{exercise.name}</h4>
          <p className="text-xs text-gray-500 capitalize mt-0.5">{exercise.category}</p>
        </div>
        <span className="text-xs px-2.5 py-1 bg-gradient-to-r from-gray-100 to-gray-200 text-gray-700 rounded-lg font-medium">
          {exercise.defaultSets || 0} sets
        </span>
      </div>
    </div>
  );
}

export function ExerciseLibrary() {
  const [selectedCategory, setSelectedCategory] = useState<string>('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [showCustomForm, setShowCustomForm] = useState(false);
  const [customExercise, setCustomExercise] = useState({ name: '', category: 'custom' as const });
  const { addExercise } = useBuilder();

  const filteredExercises = defaultExercises.filter((exercise) => {
    const matchesCategory = selectedCategory === 'all' || exercise.category === selectedCategory;
    const matchesSearch = exercise.name.toLowerCase().includes(searchQuery.toLowerCase());
    return matchesCategory && matchesSearch;
  });

  const handleAddCustomExercise = () => {
    if (customExercise.name.trim()) {
      const newExercise: Exercise = {
        id: `custom-${Date.now()}`,
        name: customExercise.name,
        category: 'custom',
        defaultSets: 3,
        defaultReps: 10,
      };
      addExercise(newExercise);
      setCustomExercise({ name: '', category: 'custom' });
      setShowCustomForm(false);
    }
  };

  return (
    <div className="h-full flex flex-col bg-gradient-to-b from-gray-50 to-white border-r border-gray-200">
      <div className="p-4 border-b border-gray-200 bg-white/80 backdrop-blur-sm">
        <h2 className="text-lg font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent mb-3">Exercise Library</h2>
        
        <Input
          type="text"
          placeholder="Search exercises..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="mb-3"
        />

        <div className="flex flex-wrap gap-2 mb-3">
          <button
            onClick={() => setSelectedCategory('all')}
            className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
              selectedCategory === 'all'
                ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30'
                : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200'
            }`}
          >
            All
          </button>
          {exerciseCategories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setSelectedCategory(cat.id)}
              className={`px-3.5 py-1.5 text-xs font-medium rounded-full transition-all duration-200 ${
                selectedCategory === cat.id
                  ? 'bg-gradient-to-r from-blue-600 to-blue-700 text-white shadow-md shadow-blue-500/30'
                  : 'bg-white text-gray-700 hover:bg-gray-100 hover:shadow-sm border border-gray-200'
              }`}
            >
              {cat.icon} {cat.name}
            </button>
          ))}
        </div>

        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowCustomForm(!showCustomForm)}
          className="w-full"
        >
          <Plus className="w-4 h-4 mr-2 inline" />
          Add Custom Exercise
        </Button>

        {showCustomForm && (
          <div className="mt-3 p-4 bg-white rounded-xl border border-gray-200 shadow-sm">
            <Input
              label="Exercise Name"
              value={customExercise.name}
              onChange={(e) => setCustomExercise({ ...customExercise, name: e.target.value })}
              placeholder="e.g., Custom Exercise"
              className="mb-3"
            />
            <Button
              variant="primary"
              size="sm"
              onClick={handleAddCustomExercise}
              className="w-full"
            >
              Add Exercise
            </Button>
          </div>
        )}
      </div>

      <div className="flex-1 overflow-y-auto p-4">
        {filteredExercises.length === 0 ? (
          <p className="text-center text-gray-500 text-sm mt-8">No exercises found</p>
        ) : (
          filteredExercises.map((exercise) => (
            <DraggableExercise key={exercise.id} exercise={exercise} />
          ))
        )}
      </div>
    </div>
  );
}

