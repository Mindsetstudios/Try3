import React, { useState } from 'react';
import { Plus } from 'lucide-react';

interface Event {
  id: string;
  title: string;
  date: string;
  time: string;
  venue: string;
  price: string;
}

const EventsPanel = () => {
  const [events, setEvents] = useState<Event[]>([]);
  const [isAddingEvent, setIsAddingEvent] = useState(false);

  const handleAddEvent = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const formData = new FormData(e.currentTarget);
    const newEvent = {
      id: Date.now().toString(),
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
    <div>
      <div className="flex justify-between items-center mb-6">
        <h2 className="text-2xl font-bold">Manage Events</h2>
        <button
          onClick={() => setIsAddingEvent(true)}
          className="bg-red-600 hover:bg-red-700 px-4 py-2 rounded-lg flex items-center gap-2"
        >
          <Plus className="w-5 h-5" />
          Add Event
        </button>
      </div>

      {isAddingEvent && (
        <div className="bg-gray-800 rounded-lg p-6 mb-6">
          <form onSubmit={handleAddEvent} className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-1">Event Title</label>
              <input
                type="text"
                name="title"
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              />
            </div>
            
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-medium mb-1">Date</label>
                <input
                  type="date"
                  name="date"
                  required
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium mb-1">Time</label>
                <input
                  type="time"
                  name="time"
                  required
                  className="w-full px-3 py-2 bg-gray-700 rounded-lg"
                />
              </div>
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Venue</label>
              <input
                type="text"
                name="venue"
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              />
            </div>
            
            <div>
              <label className="block text-sm font-medium mb-1">Ticket Price</label>
              <input
                type="text"
                name="price"
                required
                className="w-full px-3 py-2 bg-gray-700 rounded-lg"
              />
            </div>

            <div className="flex justify-end gap-2">
              <button
                type="button"
                onClick={() => setIsAddingEvent(false)}
                className="px-4 py-2 bg-gray-700 rounded-lg"
              >
                Cancel
              </button>
              <button
                type="submit"
                className="px-4 py-2 bg-red-600 rounded-lg"
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
              <th className="px-6 py-3 text-left">Title</th>
              <th className="px-6 py-3 text-left">Date</th>
              <th className="px-6 py-3 text-left">Time</th>
              <th className="px-6 py-3 text-left">Venue</th>
              <th className="px-6 py-3 text-left">Price</th>
              <th className="px-6 py-3 text-left">Actions</th>
            </tr>
          </thead>
          <tbody>
            {events.map((event) => (
              <tr key={event.id} className="border-t border-gray-700">
                <td className="px-6 py-4">{event.title}</td>
                <td className="px-6 py-4">{event.date}</td>
                <td className="px-6 py-4">{event.time}</td>
                <td className="px-6 py-4">{event.venue}</td>
                <td className="px-6 py-4">{event.price}</td>
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