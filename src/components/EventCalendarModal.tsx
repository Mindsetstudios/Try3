import React from 'react';
import { Calendar, MapPin, Clock, Ticket } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  price: string;
  imageUrl: string;
  ticketLink: string;
}

// Mock data - in a real app, this would come from your backend
const UPCOMING_EVENTS: Event[] = [
  {
    id: '1',
    title: 'Summer Music Festival',
    date: '2024-06-15',
    time: '4:00 PM',
    venue: 'Central Park Amphitheater',
    price: '$45',
    imageUrl: 'https://images.unsplash.com/photo-1533174072545-7a4b6ad7a6c3?w=300&h=200&fit=crop',
    ticketLink: '#'
  },
  {
    id: '2',
    title: 'Jazz Night',
    date: '2024-06-22',
    time: '8:00 PM',
    venue: 'Blue Note Club',
    price: '$30',
    imageUrl: 'https://images.unsplash.com/photo-1511192336575-5a79af67a629?w=300&h=200&fit=crop',
    ticketLink: '#'
  },
  {
    id: '3',
    title: 'Hip Hop Showcase',
    date: '2024-07-01',
    time: '9:00 PM',
    venue: 'Urban Stage',
    price: '$35',
    imageUrl: 'https://images.unsplash.com/photo-1571367533644-70d13d2d0810?w=300&h=200&fit=crop',
    ticketLink: '#'
  }
];

const EventCalendarModal = () => {
  return (
    <div className="space-y-6">
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold text-white">Upcoming Shows</h2>
        <Calendar className="w-6 h-6 text-white" />
      </div>

      <div className="space-y-4">
        {UPCOMING_EVENTS.map((event) => (
          <div 
            key={event.id} 
            className="bg-white/10 rounded-lg overflow-hidden"
          >
            <img 
              src={event.imageUrl} 
              alt={event.title}
              className="w-full h-48 object-cover"
            />
            <div className="p-4">
              <h3 className="text-xl font-semibold text-white mb-2">
                {event.title}
              </h3>
              
              <div className="space-y-2 text-gray-300">
                <div className="flex items-center space-x-2">
                  <Calendar className="w-4 h-4" />
                  <span>
                    {new Date(event.date).toLocaleDateString('en-US', {
                      weekday: 'long',
                      month: 'long',
                      day: 'numeric'
                    })}
                  </span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Clock className="w-4 h-4" />
                  <span>{event.time}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <MapPin className="w-4 h-4" />
                  <span>{event.venue}</span>
                </div>
                
                <div className="flex items-center space-x-2">
                  <Ticket className="w-4 h-4" />
                  <span>{event.price}</span>
                </div>
              </div>

              <button 
                className="mt-4 w-full bg-white text-red-600 font-semibold py-2 rounded-lg hover:bg-gray-100 transition"
                onClick={() => window.open(event.ticketLink, '_blank')}
              >
                Get Tickets
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EventCalendarModal;