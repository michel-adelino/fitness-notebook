import { Exercise } from './types';

export const defaultExercises: Exercise[] = [
  // Strength exercises
  { id: 'bench-press', name: 'Bench Press', category: 'strength', defaultSets: 3, defaultReps: 8, defaultWeight: 0 },
  { id: 'squat', name: 'Squat', category: 'strength', defaultSets: 3, defaultReps: 10, defaultWeight: 0 },
  { id: 'deadlift', name: 'Deadlift', category: 'strength', defaultSets: 3, defaultReps: 5, defaultWeight: 0 },
  { id: 'overhead-press', name: 'Overhead Press', category: 'strength', defaultSets: 3, defaultReps: 8, defaultWeight: 0 },
  { id: 'barbell-row', name: 'Barbell Row', category: 'strength', defaultSets: 3, defaultReps: 8, defaultWeight: 0 },
  { id: 'pull-ups', name: 'Pull-ups', category: 'strength', defaultSets: 3, defaultReps: 8 },
  { id: 'dips', name: 'Dips', category: 'strength', defaultSets: 3, defaultReps: 10 },
  { id: 'lunges', name: 'Lunges', category: 'strength', defaultSets: 3, defaultReps: 12 },
  { id: 'bicep-curl', name: 'Bicep Curl', category: 'strength', defaultSets: 3, defaultReps: 12, defaultWeight: 0 },
  { id: 'tricep-extension', name: 'Tricep Extension', category: 'strength', defaultSets: 3, defaultReps: 12, defaultWeight: 0 },
  
  // Cardio exercises
  { id: 'running', name: 'Running', category: 'cardio', defaultSets: 1 },
  { id: 'cycling', name: 'Cycling', category: 'cardio', defaultSets: 1 },
  { id: 'swimming', name: 'Swimming', category: 'cardio', defaultSets: 1 },
  { id: 'rowing', name: 'Rowing', category: 'cardio', defaultSets: 1 },
  { id: 'jump-rope', name: 'Jump Rope', category: 'cardio', defaultSets: 1 },
  { id: 'hiit', name: 'HIIT', category: 'cardio', defaultSets: 1 },
  
  // Flexibility exercises
  { id: 'yoga', name: 'Yoga', category: 'flexibility', defaultSets: 1 },
  { id: 'stretching', name: 'Stretching', category: 'flexibility', defaultSets: 1 },
  { id: 'pilates', name: 'Pilates', category: 'flexibility', defaultSets: 1 },
  { id: 'mobility-work', name: 'Mobility Work', category: 'flexibility', defaultSets: 1 },
];

export const exerciseCategories = [
  { id: 'strength', name: 'Strength', icon: '💪' },
  { id: 'cardio', name: 'Cardio', icon: '🏃' },
  { id: 'flexibility', name: 'Flexibility', icon: '🧘' },
  { id: 'custom', name: 'Custom', icon: '➕' },
];

