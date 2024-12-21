import React, { useState } from 'react';
import { Music, Users, Calendar, ArrowLeft } from 'lucide-react';
import MusicPanel from './panels/MusicPanel';
import SubmissionsPanel from './panels/SubmissionsPanel';
import EventsPanel from './panels/EventsPanel';

interface AdminDashboardProps {
  onBackToHome: () => void;
}

type TabType = 'music' | 'submissions' | 'events';

const AdminDashboard: React.FC<AdminDashboardProps> = ({ onBackToHome }) => {
  const [activeTab, setActiveTab] = useState<TabType>('music');

  const tabs = [
    { id: 'music' as TabType, label: 'Music', icon: Music },
    { id: 'submissions' as TabType, label: 'Submissions', icon: Users },
    { id: 'events' as TabType, label: 'Events', icon: Calendar },
  ];

  return (
    <div className="min-h-screen bg-gray-900">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center justify-between mb-8">
          <h1 className="text-2xl font-bold text-white">Admin Dashboard</h1>
          <button
            onClick={onBackToHome}
            className="flex items-center gap-2 text-gray-400 hover:text-white transition"
          >
            <ArrowLeft className="w-5 h-5" />
            Back to Home
          </button>
        </div>

        {/* Tabs */}
        <div className="flex gap-2 mb-8 overflow-x-auto pb-2">
          {tabs.map(({ id, label, icon: Icon }) => (
            <button
              key={id}
              onClick={() => setActiveTab(id)}
              className={`flex items-center gap-2 px-4 py-2 rounded-lg transition whitespace-nowrap ${
                activeTab === id
                  ? 'bg-red-600 text-white'
                  : 'bg-gray-800 text-gray-400 hover:text-white'
              }`}
            >
              <Icon className="w-5 h-5" />
              {label}
            </button>
          ))}
        </div>

        {/* Content */}
        <div>
          {activeTab === 'music' && <MusicPanel />}
          {activeTab === 'submissions' && <SubmissionsPanel />}
          {activeTab === 'events' && <EventsPanel />}
        </div>
      </div>
    </div>
  );
};

export default AdminDashboard;