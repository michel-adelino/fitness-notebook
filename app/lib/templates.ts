import { Template } from './types';

export const templates: Template[] = [
  {
    id: 'table',
    name: 'Workout Log Table',
    description: 'Classic table format for tracking exercises',
    layout: 'table',
    sections: [],
    hasTable: true,
    tableColumns: ['Exercise', 'Sets', 'Reps', 'Weight (kg)', 'Notes'],
  },
  {
    id: 'weekly',
    name: 'Weekly Workout Planner',
    description: 'Plan your entire week with day-by-day structure',
    layout: 'weekly',
    sections: ['Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday', 'Sunday'],
    hasTable: true,
    tableColumns: ['Day', 'Exercise', 'Sets', 'Reps', 'Weight'],
  },
  {
    id: 'tracker',
    name: 'Exercise Progress Tracker',
    description: 'Track multiple exercises over time',
    layout: 'tracker',
    sections: [],
    hasTable: true,
    tableColumns: ['Exercise', 'Week 1', 'Week 2', 'Week 3', 'Week 4', 'Progress'],
  },
  {
    id: 'log',
    name: 'Daily Workout Log',
    description: 'Structured daily workout tracking',
    layout: 'log',
    sections: ['Warm-up', 'Main Workout', 'Cool-down', 'Notes'],
  },
  {
    id: 'split',
    name: 'Split Routine Planner',
    description: 'Push/Pull/Legs split with muscle groups',
    layout: 'split',
    sections: ['Push Day', 'Pull Day', 'Legs Day'],
  },
  {
    id: 'progressive',
    name: 'Progressive Overload Table',
    description: 'Track progressive overload with detailed table',
    layout: 'progressive',
    sections: [],
    hasTable: true,
    tableColumns: ['Exercise', 'Set 1', 'Set 2', 'Set 3', 'Set 4', 'Total Volume'],
  },
  {
    id: 'fullbody',
    name: 'Full Body Workout',
    description: 'Complete full body workout session',
    layout: 'fullbody',
    sections: ['Upper Body', 'Lower Body', 'Core'],
  },
  {
    id: 'planner',
    name: 'Workout Planner',
    description: 'Simple workout planning template',
    layout: 'planner',
    sections: [],
  },
];

export const defaultPageSize = {
  width: 210, // A4 width in mm
  height: 297, // A4 height in mm
};

