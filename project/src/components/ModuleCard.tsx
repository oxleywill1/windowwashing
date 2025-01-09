import React from 'react';
import { ChevronRight, BookOpen } from 'lucide-react';
import { Module } from '../types';

interface ModuleCardProps {
  module: Module;
  onClick: (moduleId: string) => void;
}

export function ModuleCard({ module, onClick }: ModuleCardProps) {
  return (
    <div 
      className="bg-white rounded-lg shadow-md p-6 cursor-pointer hover:shadow-lg transition-shadow"
      onClick={() => onClick(module.id)}
    >
      <div className="flex items-start justify-between">
        <div className="flex items-center space-x-3">
          <div className="p-2 bg-blue-100 rounded-lg">
            <BookOpen className="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <h3 className="text-lg font-semibold text-gray-900">{module.title}</h3>
            <p className="text-sm text-gray-600 mt-1">{module.description}</p>
          </div>
        </div>
        <ChevronRight className="w-5 h-5 text-gray-400" />
      </div>
      <div className="mt-4">
        <div className="flex justify-between text-sm text-gray-600 mb-2">
          <span>{module.tasks.length} Tasks</span>
          <span>{module.progress}% Complete</span>
        </div>
        <div className="w-full bg-gray-200 rounded-full h-2">
          <div 
            className="bg-blue-600 h-2 rounded-full transition-all duration-300"
            style={{ width: `${module.progress}%` }}
          />
        </div>
      </div>
    </div>
  );
}