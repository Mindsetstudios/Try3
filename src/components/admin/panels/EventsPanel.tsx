import React, { useState } from 'react';
import { Plus } from 'lucide-react';
import type { Event } from '../../../types/events';

const EventsPanel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent: Event = {
      id: crypto.randomUUID(),
      title: formData.get('title') as string,
      date: formData.get('date') as string,
      time: formData.get('time') as string,
      venue: formData.get('venue') as string,
      price: formData.get('price') as string,
    };
    
    setEvents([...events, newEvent]);
    setIsAddingEvent(false);
  };

  return (
    <div className="space-y-6">
      <div className="flex justify-between items-center">
        <h2 className="text-2xl font-bold text-white">Manage Events</h2>
        <button
          onClick={() => setIsAddingEvent(true)}
          className="bg-red-600 hover:bg-red-700 text-white px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {isAddingEvent && (
        <div className="bg-gray-800 rounded-lg p-6">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-white mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium text-white mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-white mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Venue</label>
              <input
                type="text"
                name="venue"
                required
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium text-white mb-1">Ticket Price</label>
              <input
                type="text"
                name="price"
                required
                className="w-full px-3 py-2 bg-gray-700 text-white rounded-lg focus:ring-2 focus:ring-red-500"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingEvent(false)}
                className="px-4 py-2 bg-gray-700 text-white rounded-lg hover:bg-gray-600"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 text-white rounded-lg hover:bg-red-700"
              >
                Add Event
              </button>
            </div>
          </form>
        </div>
      )}

      <div className="bg-gray-800 rounded-lg overflow-hidden">
        <table className="w-full">
          <thead>
            <tr className="bg-gray-700">
              <th className="px-6 py-3 text-left text-white">Title</th>
              <th className="px-6 py-3 text-left text-white">Date</th>
              <th className="px-6 py-3 text-left text-white">Time</th>
              <th className="px-6 py-3 text-left text-white">Venue</th>
              <th className="px-6 py-3 text-left text-white">Price</th>
              <th className="px-6 py-3 text-left text-white">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-gray-700">
                <td className="px-6 py-4 text-white">{event.title}</td>
                <td className="px-6 py-4 text-white">{event.date}</td>
                <td className="px-6 py-4 text-white">{event.time}</td>
                <td className="px-6 py-4 text-white">{event.venue}</td>
                <td className="px-6 py-4 text-white">{event.price}</td>
                <td className="px-6 py-4">
                  <button className="text-red-400 hover:text-red-300">
                    Delete
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EventsPanel;