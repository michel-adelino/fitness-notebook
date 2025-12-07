'use client';

import React, { useRef, useState } from 'react';
import { DndContext, DragOverlay, closestCenter, rectIntersection, KeyboardSensor, PointerSensor, useSensor, useSensors } from '@dnd-kit/core';
import { arrayMove, SortableContext, sortableKeyboardCoordinates, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { ExerciseLibrary } from './ExerciseLibrary';
import { Canvas } from './Canvas';
import { TemplateSelector } from './TemplateSelector';
import { ColorPicker } from './ColorPicker';
import { PersonalizationPanel } from './PersonalizationPanel';
import { PreviewPanel } from './PreviewPanel';
import { useBuilder } from '@/app/context/BuilderContext';
import { Exercise, ExerciseOnPage } from '@/app/lib/types';
import { defaultExercises } from '@/app/lib/exercises';
import { generatePDF } from '@/app/lib/pdf-generator';
import { Button } from '../ui/Button';
import { FileDown, ShoppingCart, ChevronLeft, ChevronRight, Palette, User, Eye } from 'lucide-react';
import Link from 'next/link';

export function BuilderLayout() {
  const {
    exercises,
    notebookPage,
    addExercise,
    reorderExercises,
  } = useBuilder();

  const [activeId, setActiveId] = useState<string | null>(null);
  const previewRef = useRef<HTMLDivElement>(null);
  const [isGeneratingPDF, setIsGeneratingPDF] = useState(false);
  const [isRightPanelOpen, setIsRightPanelOpen] = useState(false);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    }),
    useSensor(KeyboardSensor, {
      coordinateGetter: sortableKeyboardCoordinates,
    })
  );

  const handleDragStart = (event: any) => {
    setActiveId(event.active.id);
    // Prevent body scroll during drag to avoid screen shifting
    document.body.style.overflow = 'hidden';
  };

  const handleDragEnd = (event: any) => {
    const { active, over } = event;

    // Restore body scroll first
    document.body.style.overflow = '';

    if (!over) {
      setActiveId(null);
      return;
    }

    // Handle dropping exercise from library to canvas
    // Check if we're dropping a new exercise (from library) onto canvas or any exercise card
    if (active.data.current?.exercise) {
      // If dropping on canvas directly, or on an existing exercise card (which means add to canvas)
      if (over.id === 'canvas' || exercises.some((ex) => ex.id === over.id)) {
        const exercise = active.data.current.exercise as Exercise;
        addExercise(exercise);
        setActiveId(null);
        return;
      }
    }

    // Handle reordering exercises on canvas (only if both are existing exercises)
    if (active.id !== over.id && 
        exercises.some((ex) => ex.id === active.id) && 
        exercises.some((ex) => ex.id === over.id)) {
      const oldIndex = exercises.findIndex((ex) => ex.id === active.id);
      const newIndex = exercises.findIndex((ex) => ex.id === over.id);
      reorderExercises(oldIndex, newIndex);
    }

    setActiveId(null);
    // Restore body scroll
    document.body.style.overflow = '';
  };

  const handleGeneratePDF = async () => {
    if (!previewRef.current) return;

    setIsGeneratingPDF(true);
    try {
      await generatePDF(previewRef.current, notebookPage);
    } catch (error) {
      alert('Failed to generate PDF. Please try again.');
      console.error(error);
    } finally {
      setIsGeneratingPDF(false);
    }
  };

  return (
    <DndContext
      sensors={sensors}
      collisionDetection={rectIntersection}
      onDragStart={handleDragStart}
      onDragEnd={handleDragEnd}
      autoScroll={false}
      modifiers={[]}
    >
      <div className="h-screen flex flex-col">
        {/* Header */}
        <header className="bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <h1 className="text-xl sm:text-2xl font-bold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Fitness Notebook Builder</h1>
          <div className="flex items-center gap-2 sm:gap-3 w-full sm:w-auto">
            <Button
              variant="outline"
              size="sm"
              onClick={handleGeneratePDF}
              disabled={isGeneratingPDF || exercises.length === 0}
              className="flex-1 sm:flex-initial"
            >
              <FileDown className="w-4 h-4 mr-2 inline" />
              <span className="hidden sm:inline">{isGeneratingPDF ? 'Generating...' : 'Generate PDF'}</span>
              <span className="sm:hidden">{isGeneratingPDF ? '...' : 'PDF'}</span>
            </Button>
            <Link href="/checkout" className="flex-1 sm:flex-initial">
              <Button variant="primary" size="sm" disabled={exercises.length === 0} className="w-full sm:w-auto">
                <ShoppingCart className="w-4 h-4 mr-2 inline" />
                <span className="hidden sm:inline">Checkout</span>
                <span className="sm:hidden">Cart</span>
              </Button>
            </Link>
          </div>
        </header>

        <div className="flex-1 flex flex-col lg:flex-row overflow-hidden">
          {/* Left Sidebar - Exercise Library */}
          <div className="w-full lg:w-80 flex-shrink-0 border-b lg:border-b-0 lg:border-r border-gray-200 overflow-hidden">
            <ExerciseLibrary />
          </div>

          {/* Main Canvas Area */}
          <div className="flex-1 flex flex-col min-w-0">
            <TemplateSelector />
            <div className="flex-1 overflow-y-auto">
              <Canvas />
            </div>
          </div>

          {/* Right Sidebar - Customization */}
          <div className="relative">
            {/* Collapsed Panel UI */}
            {!isRightPanelOpen && (
              <div className="fixed right-0 top-1/2 -translate-y-1/2 z-50">
                <div className="bg-white/95 backdrop-blur-sm border-l border-gray-200 shadow-xl rounded-l-xl overflow-hidden">
                  <button
                    onClick={() => setIsRightPanelOpen(true)}
                    className="w-12 h-12 flex items-center justify-center bg-gradient-to-br from-blue-600 to-blue-700 text-white hover:from-blue-700 hover:to-blue-800 hover:shadow-lg hover:shadow-blue-500/40 transition-all duration-200 active:opacity-90"
                    aria-label="Open customization panel"
                  >
                    <ChevronLeft className="w-5 h-5" />
                  </button>
                  <div className="py-2">
                    <div className="px-3 py-2 text-xs text-gray-500 font-semibold border-b border-gray-100 bg-gray-50/50">
                      Customize
                    </div>
                    <div className="flex flex-col">
                      <div className="px-3 py-2.5 text-xs text-gray-600 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                        <Palette className="w-4 h-4" />
                        <span>Colors</span>
                      </div>
                      <div className="px-3 py-2.5 text-xs text-gray-600 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                        <User className="w-4 h-4" />
                        <span>Personal</span>
                      </div>
                      <div className="px-3 py-2.5 text-xs text-gray-600 flex items-center gap-2 hover:bg-blue-50 hover:text-blue-700 transition-colors duration-150 cursor-pointer">
                        <Eye className="w-4 h-4" />
                        <span>Preview</span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}

            {/* Right Panel */}
            <div
              className={`
                fixed lg:absolute
                top-0 right-0
                h-full
                w-[640px]
                bg-white
                border-l border-gray-200
                flex flex-col
                overflow-y-auto
                shadow-xl
                z-40
                transition-transform duration-300 ease-in-out
                ${isRightPanelOpen ? 'translate-x-0' : 'translate-x-full'}
              `}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Panel Header with Close Button */}
              <div className="sticky top-0 bg-gradient-to-r from-white to-gray-50 border-b border-gray-200 shadow-sm px-4 py-3 flex items-center justify-between z-10">
                <h2 className="text-lg font-semibold bg-gradient-to-r from-gray-900 to-gray-700 bg-clip-text text-transparent">Customization</h2>
                <button
                  onClick={(e) => {
                    e.stopPropagation();
                    setIsRightPanelOpen(false);
                  }}
                  className="p-1.5 text-gray-400 hover:text-gray-700 hover:bg-gray-100 rounded-lg transition-all duration-200 hover:shadow-sm active:opacity-70 cursor-pointer"
                  aria-label="Close panel"
                  type="button"
                >
                  <ChevronRight className="w-5 h-5" />
                </button>
              </div>

              {/* Panel Content */}
              <div className="flex-1">
                <ColorPicker />
                <PersonalizationPanel />
                <div className="flex-1">
                  <PreviewPanel ref={previewRef} />
                </div>
              </div>
            </div>

            {/* Overlay when panel is open */}
            {isRightPanelOpen && (
              <div
                className="fixed inset-0 bg-black bg-opacity-20 z-30"
                onClick={() => setIsRightPanelOpen(false)}
                aria-hidden="true"
              />
            )}
          </div>
        </div>
      </div>

      <DragOverlay
        style={{
          cursor: 'grabbing',
        }}
        dropAnimation={null}
      >
        {activeId ? (
          <div 
            className="bg-white border-2 border-blue-500 rounded-xl p-4 shadow-2xl opacity-95 backdrop-blur-sm pointer-events-none"
            style={{
              transform: 'rotate(2deg)',
            }}
          >
            <div className="font-semibold text-gray-900">
              {exercises.find((ex) => ex.id === activeId)?.name || 
               (typeof activeId === 'string' && !activeId.startsWith('custom-') ? 
                defaultExercises.find((ex) => ex.id === activeId)?.name || 'Exercise' : 'Exercise')}
            </div>
          </div>
        ) : null}
      </DragOverlay>
    </DndContext>
  );
}

