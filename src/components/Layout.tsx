import React from 'react';
import { Home, Search, PlusSquare, MessageCircle, User } from 'lucide-react';
import { cn } from '../lib/utils';

interface LayoutProps {
  children: React.ReactNode;
  activeTab: string;
  onTabChange: (tab: string) => void;
}

export default function Layout({ children, activeTab, onTabChange }: LayoutProps) {
  const tabs = [
    { id: 'home', icon: Home, label: 'Home' },
    { id: 'search', icon: Search, label: 'Search' },
    { id: 'create', icon: PlusSquare, label: 'Create' },
    { id: 'messages', icon: MessageCircle, label: 'Messages' },
    { id: 'profile', icon: User, label: 'Profile' },
  ];

  return (
    <div className="flex flex-col h-screen bg-white text-black font-sans">
      {/* Top Header */}
      <header className="flex items-center justify-between px-4 py-3 border-b border-gray-200 sticky top-0 bg-white z-10">
        <h1 className="text-xl font-bold italic tracking-tight">InstaChat</h1>
        <div className="flex gap-4">
          <MessageCircle className="w-6 h-6 cursor-pointer" onClick={() => onTabChange('messages')} />
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 overflow-y-auto pb-16">
        {children}
      </main>

      {/* Bottom Navigation */}
      <nav className="fixed bottom-0 w-full bg-white border-t border-gray-200 px-4 py-2 flex justify-between items-center z-10">
        {tabs.map((tab) => {
          const Icon = tab.icon;
          const isActive = activeTab === tab.id;
          return (
            <button
              key={tab.id}
              onClick={() => onTabChange(tab.id)}
              className={cn(
                "flex flex-col items-center gap-1 p-2 transition-colors",
                isActive ? "text-black" : "text-gray-400 hover:text-gray-600"
              )}
            >
              <Icon className={cn("w-6 h-6", isActive && "fill-current")} />
            </button>
          );
        })}
      </nav>
    </div>
  );
}
