import React, { useState } from 'react';
import { Music, Users, Calendar, Check, PlayCircle } from 'lucide-react';
import Navbar from './components/Navbar';
import Card from './components/Card';
import Modal from './components/Modal';
import PerformanceForm from './components/PerformanceForm';
import AcceptedArtistsModal from './components/AcceptedArtistsModal';
import RecentSongsModal from './components/RecentSongsModal';
import MusicSubmissionForm from './components/MusicSubmissionForm';
import EventCalendarModal from './components/EventCalendarModal';
import AdminDashboard from './components/admin/AdminDashboard';
import LoginForm from './components/admin/LoginForm';

function App() {
  const [isPerformModalOpen, setIsPerformModalOpen] = useState(false);
  const [isRecentSongsModalOpen, setIsRecentSongsModalOpen] = useState(false);
  const [isMusicSubmissionModalOpen, setIsMusicSubmissionModalOpen] = useState(false);
  const [isEventCalendarModalOpen, setIsEventCalendarModalOpen] = useState(false);
  const [isAcceptedArtistsModalOpen, setIsAcceptedArtistsModalOpen] = useState(false);
  const [showAdminPanel, setShowAdminPanel] = useState(false);
  const [showLoginForm, setShowLoginForm] = useState(false);

  const handlePerformSubmit = (formData: FormData) => {
    console.log('Performance form submitted:', Object.fromEntries(formData));
    setIsPerformModalOpen(false);
  };

  const handleMusicSubmit = (formData: FormData) => {
    console.log('Music form submitted:', Object.fromEntries(formData));
    setIsMusicSubmissionModalOpen(false);
  };

  const handleAdminAccess = () => {
    setShowLoginForm(true);
  };

  const handleLoginSuccess = () => {
    setShowLoginForm(false);
    setShowAdminPanel(true);
  };

  if (showAdminPanel) {
    return <AdminDashboard onBackToHome={() => setShowAdminPanel(false)} />;
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-gray-900 to-gray-800">
      <Navbar onAdminClick={handleAdminAccess} />
      <main className="container mx-auto px-4 py-8 pt-32">
        <div className="mb-12 text-center">
          <h1 className="text-4xl md:text-6xl font-bold text-white mb-4">
            THE PATHWAY
          </h1>
          <p className="text-gray-300 text-lg md:text-xl max-w-2xl mx-auto">
            Your gateway to performing, creating, and connecting with the music industry
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          <Card 
            title="Apply To Perform"
            description="Book your spot at upcoming events and showcase your talent"
            icon={<Users className="w-6 h-6" />}
            color="bg-red-600"
            onClick={() => setIsPerformModalOpen(true)}
          />
          
          <Card 
            title="Event Calendar"
            description="Browse and purchase tickets for upcoming performances"
            icon={<Calendar className="w-6 h-6" />}
            color="bg-gray-600"
            onClick={() => setIsEventCalendarModalOpen(true)}
          />
          
          <Card 
            title="Artists Accepted"
            description="Check out our roster of approved performers"
            icon={<Check className="w-6 h-6" />}
            color="bg-green-600"
            onClick={() => setIsAcceptedArtistsModalOpen(true)}
          />
          
          <Card 
            title="Submit Your Music"
            description="Share your tracks with our team and get featured"
            icon={<Music className="w-6 h-6" />}
            color="bg-orange-600"
            onClick={() => setIsMusicSubmissionModalOpen(true)}
          />
          
          <Card 
            title="Music To Check Out"
            description="Listen to the latest approved music submissions"
            icon={<PlayCircle className="w-6 h-6" />}
            color="bg-blue-600"
            onClick={() => setIsRecentSongsModalOpen(true)}
          />
        </div>
      </main>

      {showLoginForm && (
        <LoginForm
          onSuccess={handleLoginSuccess}
          onCancel={() => setShowLoginForm(false)}
        />
      )}

      <Modal isOpen={isPerformModalOpen} onClose={() => setIsPerformModalOpen(false)}>
        <PerformanceForm onSubmit={handlePerformSubmit} />
      </Modal>

      <Modal isOpen={isRecentSongsModalOpen} onClose={() => setIsRecentSongsModalOpen(false)}>
        <RecentSongsModal />
      </Modal>

      <Modal isOpen={isMusicSubmissionModalOpen} onClose={() => setIsMusicSubmissionModalOpen(false)}>
        <MusicSubmissionForm onSubmit={handleMusicSubmit} />
      </Modal>

      <Modal isOpen={isEventCalendarModalOpen} onClose={() => setIsEventCalendarModalOpen(false)}>
        <EventCalendarModal />
      </Modal>

      <Modal isOpen={isAcceptedArtistsModalOpen} onClose={() => setIsAcceptedArtistsModalOpen(false)}>
        <AcceptedArtistsModal />
      </Modal>
    </div>
  );
}

export default App;