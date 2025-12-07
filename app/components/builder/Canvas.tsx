'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy, useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { ExerciseCard } from './ExerciseCard';
import { useBuilder } from '@/app/context/BuilderContext';
import { Plus } from 'lucide-react';

export function Canvas() {
  const { exercises, selectedTemplate } = useBuilder();
  const { setNodeRef, isOver } = useDroppable({
    id: 'canvas',
  });

  return (
    <div className="min-h-full flex flex-col bg-gradient-to-br from-gray-50 to-gray-100 p-6">
      <div className="mb-4 flex-shrink-0">
        <h2 className="text-xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">{selectedTemplate.name}</h2>
        <p className="text-sm text-gray-600 mt-1">{selectedTemplate.description}</p>
      </div>

      <div
        ref={setNodeRef}
        className={`flex-1 min-h-0 bg-white rounded-xl border-2 border-dashed p-6 overflow-y-auto transition-all duration-300 min-h-[400px] w-full ${
          isOver ? 'border-blue-500 bg-gradient-to-br from-blue-50 to-blue-100/50 shadow-lg shadow-blue-500/20' : 'border-gray-300 hover:border-gray-400'
        }`}
        style={{ position: 'relative' }}
      >
        {exercises.length === 0 ? (
          <div className="flex flex-col items-center justify-center h-full text-center">
            <div className="w-16 h-16 bg-gradient-to-br from-blue-100 to-blue-200 rounded-2xl flex items-center justify-center mb-4">
              <Plus className="w-8 h-8 text-blue-600" />
            </div>
            <p className="text-gray-700 text-lg font-medium mb-2">Drag exercises here to get started</p>
            <p className="text-gray-500 text-sm">Or select exercises from the library</p>
          </div>
        ) : (
          <>
            <SortableContext items={exercises.map((ex) => ex.id)} strategy={verticalListSortingStrategy}>
              <div className="space-y-3">
                {exercises
                  .sort((a, b) => a.order - b.order)
                  .map((exercise, index) => (
                    <SortableExerciseCard key={exercise.id} exercise={exercise} index={index} />
                  ))}
              </div>
            </SortableContext>
            {/* Drop zone indicator when dragging over canvas with exercises */}
            {isOver && (
              <div className="mt-3 p-4 border-2 border-dashed border-blue-400 bg-blue-50/50 rounded-xl text-center">
                <p className="text-blue-600 font-medium">Drop here to add exercise</p>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
}

function SortableExerciseCard({ exercise, index }: { exercise: any; index: number }) {
  const { attributes, listeners, setNodeRef, transform, transition, isDragging } = useSortable({
    id: exercise.id,
  });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <div ref={setNodeRef} style={style}>
      <ExerciseCard 
        exercise={exercise} 
        index={index} 
        isDragging={isDragging}
        dragHandleProps={{ ...attributes, ...listeners }}
      />
    </div>
  );
}

