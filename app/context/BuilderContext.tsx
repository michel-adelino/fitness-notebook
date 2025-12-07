'use client';

import React, { createContext, useContext, useState, useCallback, useEffect, ReactNode } from 'react';
import { Exercise, ExerciseOnPage, Template, ColorScheme, Personalization, NotebookPage } from '@/app/lib/types';
import { templates } from '@/app/lib/templates';
import { defaultPageSize } from '@/app/lib/templates';

const STORAGE_KEY = 'fitness-notebook-builder-state';

interface BuilderContextType {
  // State
  selectedTemplate: Template;
  exercises: ExerciseOnPage[];
  colors: ColorScheme;
  personalization: Personalization;
  notebookPage: NotebookPage;
  
  // Actions
  setSelectedTemplate: (template: Template) => void;
  addExercise: (exercise: Exercise) => void;
  removeExercise: (exerciseId: string) => void;
  updateExercise: (exerciseId: string, updates: Partial<ExerciseOnPage>) => void;
  reorderExercises: (startIndex: number, endIndex: number) => void;
  updateColors: (colors: Partial<ColorScheme>) => void;
  updatePersonalization: (personalization: Partial<Personalization>) => void;
  resetBuilder: () => void;
}

const defaultColors: ColorScheme = {
  lineColor: '#000000',
  headingColor: '#1a1a1a',
  accentColor: '#3b82f6',
};

const defaultPersonalization: Personalization = {
  name: '',
  initials: '',
  quote: '',
};

const BuilderContext = createContext<BuilderContextType | undefined>(undefined);

export function BuilderProvider({ children }: { children: ReactNode }) {
  // Load from localStorage on mount
  const loadState = useCallback(() => {
    if (typeof window === 'undefined') {
      return {
        template: templates[0],
        exercises: [],
        colors: defaultColors,
        personalization: defaultPersonalization,
      };
    }

    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) {
        const parsed = JSON.parse(saved);
        const template = templates.find((t) => t.id === parsed.templateId) || templates[0];
        return {
          template,
          exercises: parsed.exercises || [],
          colors: parsed.colors || defaultColors,
          personalization: parsed.personalization || defaultPersonalization,
        };
      }
    } catch (error) {
      console.error('Error loading state from localStorage:', error);
    }

    return {
      template: templates[0],
      exercises: [],
      colors: defaultColors,
      personalization: defaultPersonalization,
    };
  }, []);

  const initialState = loadState();
  // Ensure we have a valid template (fallback to first template if loaded template doesn't exist)
  const defaultTemplate = templates.find(t => t.id === initialState.template.id) || templates[0];
  const [selectedTemplate, setSelectedTemplate] = useState<Template>(defaultTemplate);
  const [exercises, setExercises] = useState<ExerciseOnPage[]>(initialState.exercises);
  const [colors, setColors] = useState<ColorScheme>(initialState.colors);
  const [personalization, setPersonalization] = useState<Personalization>(initialState.personalization);

  // Save to localStorage whenever state changes
  useEffect(() => {
    if (typeof window === 'undefined') return;

    try {
      const stateToSave = {
        templateId: selectedTemplate.id,
        exercises,
        colors,
        personalization,
      };
      localStorage.setItem(STORAGE_KEY, JSON.stringify(stateToSave));
    } catch (error) {
      console.error('Error saving state to localStorage:', error);
    }
  }, [selectedTemplate.id, exercises, colors, personalization]);

  const addExercise = useCallback((exercise: Exercise) => {
    const exerciseOnPage: ExerciseOnPage = {
      ...exercise,
      sets: exercise.defaultSets || 3,
      reps: exercise.defaultReps || 10,
      weight: exercise.defaultWeight || 0,
      order: exercises.length,
    };
    setExercises((prev) => [...prev, exerciseOnPage]);
  }, [exercises.length]);

  const removeExercise = useCallback((exerciseId: string) => {
    setExercises((prev) => {
      const filtered = prev.filter((ex) => ex.id !== exerciseId);
      return filtered.map((ex, index) => ({ ...ex, order: index }));
    });
  }, []);

  const updateExercise = useCallback((exerciseId: string, updates: Partial<ExerciseOnPage>) => {
    setExercises((prev) =>
      prev.map((ex) => (ex.id === exerciseId ? { ...ex, ...updates } : ex))
    );
  }, []);

  const reorderExercises = useCallback((startIndex: number, endIndex: number) => {
    setExercises((prev) => {
      const result = Array.from(prev);
      const [removed] = result.splice(startIndex, 1);
      result.splice(endIndex, 0, removed);
      return result.map((ex, index) => ({ ...ex, order: index }));
    });
  }, []);

  const updateColors = useCallback((newColors: Partial<ColorScheme>) => {
    setColors((prev) => ({ ...prev, ...newColors }));
  }, []);

  const updatePersonalization = useCallback((newPersonalization: Partial<Personalization>) => {
    setPersonalization((prev) => ({ ...prev, ...newPersonalization }));
  }, []);

  const resetBuilder = useCallback(() => {
    setSelectedTemplate(templates[0]);
    setExercises([]);
    setColors(defaultColors);
    setPersonalization(defaultPersonalization);
  }, []);

  const notebookPage: NotebookPage = {
    templateId: selectedTemplate.id,
    exercises,
    colors,
    personalization,
    pageSize: defaultPageSize,
  };

  return (
    <BuilderContext.Provider
      value={{
        selectedTemplate,
        exercises,
        colors,
        personalization,
        notebookPage,
        setSelectedTemplate,
        addExercise,
        removeExercise,
        updateExercise,
        reorderExercises,
        updateColors,
        updatePersonalization,
        resetBuilder,
      }}
    >
      {children}
    </BuilderContext.Provider>
  );
}

export function useBuilder() {
  const context = useContext(BuilderContext);
  if (context === undefined) {
    throw new Error('useBuilder must be used within a BuilderProvider');
  }
  return context;
}

