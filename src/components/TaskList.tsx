import React from 'react';
import { CheckCircle, Circle } from 'lucide-react';
import { Task } from '../types';

interface TaskListProps {
  tasks: Task[];
  onToggleTask: (taskId: string) => void;
}

export function TaskList({ tasks, onToggleTask }: TaskListProps) {
  return (
    <div className="space-y-4">
      {tasks.map((task) => (
        <div 
          key={task.id}
          className="flex items-start space-x-4 bg-white p-4 rounded-lg shadow-sm"
        >
          <button
            onClick={() => onToggleTask(task.id)}
            className="mt-1 focus:outline-none"
          >
            {task.completed ? (
              <CheckCircle className="w-5 h-5 text-green-500" />
            ) : (
              <Circle className="w-5 h-5 text-gray-400" />
            )}
          </button>
          <div>
            <h4 className="text-base font-medium text-gray-900">{task.title}</h4>
            <p className="text-sm text-gray-600 mt-1">{task.description}</p>
          </div>
        </div>
      ))}
    </div>
  );
}