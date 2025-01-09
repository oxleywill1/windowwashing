import { Module } from '../types';

export const modules: Module[] = [
  {
    id: '1',
    title: 'Introduction to Web Development',
    description: 'Learn the basics of HTML, CSS, and JavaScript',
    progress: 0,
    tasks: [
      {
        id: '1-1',
        title: 'HTML Fundamentals',
        description: 'Learn basic HTML tags and document structure',
        completed: false,
      },
      {
        id: '1-2',
        title: 'CSS Styling',
        description: 'Master CSS selectors and properties',
        completed: false,
      },
      {
        id: '1-3',
        title: 'JavaScript Basics',
        description: 'Understand variables, functions, and control flow',
        completed: false,
      },
    ],
  },
  {
    id: '2',
    title: 'React Fundamentals',
    description: 'Master the basics of React development',
    progress: 0,
    tasks: [
      {
        id: '2-1',
        title: 'Components and Props',
        description: 'Learn about React components and props',
        completed: false,
      },
      {
        id: '2-2',
        title: 'State Management',
        description: 'Understanding React state and hooks',
        completed: false,
      },
    ],
  },
];