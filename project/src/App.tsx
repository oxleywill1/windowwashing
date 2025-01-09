import React, { useState, useEffect } from 'react';
import { ArrowLeft, GraduationCap } from 'lucide-react';
import { modules } from './data/modules';
import { ModuleCard } from './components/ModuleCard';
import { TaskList } from './components/TaskList';
import { AuthForm } from './components/AuthForm';
import { Module } from './types';
import { supabase } from './lib/supabase';
import { Toaster } from 'react-hot-toast';

export default function App() {
  const [selectedModule, setSelectedModule] = useState<Module | null>(null);
  const [moduleList, setModuleList] = useState(modules);
  const [session, setSession] = useState(null);
  const [showRegister, setShowRegister] = useState(false);

  useEffect(() => {
    supabase.auth.getSession().then(({ data: { session } }) => {
      setSession(session);
    });

    const {
      data: { subscription },
    } = supabase.auth.onAuthStateChange((_event, session) => {
      setSession(session);
    });

    return () => subscription.unsubscribe();
  }, []);

  const handleModuleClick = (moduleId: string) => {
    const module = moduleList.find((m) => m.id === moduleId);
    if (module) {
      setSelectedModule(module);
    }
  };

  const handleToggleTask = (taskId: string) => {
    if (!selectedModule) return;

    const updatedModules = moduleList.map((module) => {
      if (module.id === selectedModule.id) {
        const updatedTasks = module.tasks.map((task) =>
          task.id === taskId ? { ...task, completed: !task.completed } : task
        );
        const completedTasks = updatedTasks.filter((task) => task.completed).length;
        const progress = Math.round((completedTasks / updatedTasks.length) * 100);
        
        return {
          ...module,
          tasks: updatedTasks,
          progress,
        };
      }
      return module;
    });

    setModuleList(updatedModules);
    setSelectedModule(updatedModules.find((m) => m.id === selectedModule.id) || null);
  };

  const handleSignOut = async () => {
    await supabase.auth.signOut();
  };

  if (!session) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="max-w-md w-full mx-4">
          <div className="text-center mb-8">
            <GraduationCap className="w-12 h-12 text-blue-600 mx-auto" />
            <h1 className="text-2xl font-bold text-gray-900 mt-4">Learning Platform</h1>
          </div>
          <div className="bg-white p-8 rounded-lg shadow-md">
            <div className="mb-6">
              <h2 className="text-xl font-semibold text-gray-900">
                {showRegister ? 'Create an Account' : 'Welcome Back'}
              </h2>
              <p className="text-sm text-gray-600 mt-1">
                {showRegister
                  ? 'Sign up to start learning'
                  : 'Sign in to access your courses'}
              </p>
            </div>
            <AuthForm
              mode={showRegister ? 'register' : 'login'}
              onSuccess={() => setShowRegister(false)}
            />
            <div className="mt-4 text-center">
              <button
                onClick={() => setShowRegister(!showRegister)}
                className="text-sm text-blue-600 hover:text-blue-800"
              >
                {showRegister
                  ? 'Already have an account? Sign in'
                  : "Don't have an account? Sign up"}
              </button>
            </div>
          </div>
        </div>
        <Toaster position="top-right" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <header className="bg-white shadow-sm">
        <div className="max-w-5xl mx-auto px-4 py-4">
          <div className="flex items-center justify-between">
            <div className="flex items-center space-x-3">
              <GraduationCap className="w-8 h-8 text-blue-600" />
              <h1 className="text-xl font-bold text-gray-900">Learning Platform</h1>
            </div>
            <button
              onClick={handleSignOut}
              className="text-sm text-gray-600 hover:text-gray-900"
            >
              Sign Out
            </button>
          </div>
        </div>
      </header>

      <main className="max-w-5xl mx-auto px-4 py-8">
        {selectedModule ? (
          <div>
            <button
              onClick={() => setSelectedModule(null)}
              className="flex items-center text-sm text-gray-600 hover:text-gray-900 mb-6"
            >
              <ArrowLeft className="w-4 h-4 mr-2" />
              Back to Modules
            </button>
            
            <div className="bg-white rounded-lg shadow-md p-6 mb-6">
              <h2 className="text-2xl font-bold text-gray-900">{selectedModule.title}</h2>
              <p className="text-gray-600 mt-2">{selectedModule.description}</p>
            </div>

            <TaskList 
              tasks={selectedModule.tasks}
              onToggleTask={handleToggleTask}
            />
          </div>
        ) : (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-gray-900">Learning Modules</h2>
            <div className="grid gap-6 md:grid-cols-2">
              {moduleList.map((module) => (
                <ModuleCard
                  key={module.id}
                  module={module}
                  onClick={handleModuleClick}
                />
              ))}
            </div>
          </div>
        )}
      </main>
      <Toaster position="top-right" />
    </div>
  );
}