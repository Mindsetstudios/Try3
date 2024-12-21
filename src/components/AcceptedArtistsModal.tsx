import React, { useEffect, useState } from 'react';
import { Users, Calendar, Link as LinkIcon } from 'lucide-react';
import { fetchApprovedArtists } from '../lib/api/artists';
import type { Submission } from '../types/submissions';

const AcceptedArtistsModal = () => {
  const [artists, setArtists] = useState<Submission[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    loadApprovedArtists();
  }, []);

  const loadApprovedArtists = async () => {
    try {
      setIsLoading(true);
      const data = await fetchApprovedArtists();
      setArtists(data);
      setError(null);
    } catch (err) {
      setError('Failed to load approved artists');
      console.error('Error loading approved artists:', err);
    } finally {
      setIsLoading(false);
    }
  };

  if (isLoading) {
    return (
      <div className="text-center py-8">
        <div className="animate-spin w-8 h-8 border-2 border-red-500 border-t-transparent rounded-full mx-auto mb-4"></div>
        <p className="text-white">Loading artists...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="text-center py-8">
        <p className="text-red-500">{error}</p>
      </div>
    );
  }

  if (artists.length === 0) {
    return (
      <div className="text-center py-8">
        <Users className="w-12 h-12 text-gray-600 mx-auto mb-4" />
        <h2 className="text-2xl font-bold text-white mb-2">No Approved Artists Yet</h2>
        <p className="text-gray-400">Check back later for upcoming performers!</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      <h2 className="text-2xl font-bold text-white mb-6">Approved Artists</h2>
      
      <div className="grid gap-4 md:grid-cols-2">
        {artists.map((artist) => (
          <div 
            key={artist.id} 
            className="bg-white/10 rounded-lg p-4 space-y-3"
          >
            <div>
              <h3 className="text-xl font-semibold text-white">
                {artist.first_name} {artist.last_name}
              </h3>
              <p className="text-gray-400">{artist.role}</p>
            </div>

            <div className="space-y-2">
              {artist.selected_dates.map((date, index) => (
                <div 
                  key={index}
                  className="flex items-center gap-2 text-gray-300"
                >
                  <Calendar className="w-4 h-4" />
                  <span>{date}</span>
                </div>
              ))}
            </div>

            {artist.portfolio && (
              <a
                href={artist.portfolio}
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2 text-blue-400 hover:text-blue-300 transition"
              >
                <LinkIcon className="w-4 h-4" />
                <span>View Portfolio</span>
              </a>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default AcceptedArtistsModal;