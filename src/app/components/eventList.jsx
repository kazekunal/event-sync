import React, { useState } from 'react';
import { 
  Card, 
  CardContent, 
  CardHeader, 
  CardTitle 
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Trash2, Edit } from 'lucide-react';

const EventList = () => {
  const [events, setEvents] = useState([
    {
      id: 1,
      title: 'Team Meeting',
      date: '2024-03-26',
      time: '14:00',
      description: 'Weekly team sync-up'
    },
    {
      id: 2,
      title: 'Client Presentation',
      date: '2024-03-28',
      time: '10:30',
      description: 'Q1 project review'
    }
  ]);

  const handleDeleteEvent = (id) => {
    setEvents(events.filter(event => event.id !== id));
  };

  const handleEditEvent = (id) => {
    // TODO: Implement edit functionality
    console.log('Editing event:', id);
  };

  return (
    <Card className="w-full max-w-2xl mx-auto mt-6">
      <CardHeader>
        <CardTitle>Upcoming Events</CardTitle>
      </CardHeader>
      <CardContent>
        {events.length === 0 ? (
          <p className="text-center text-gray-500">
            No events scheduled. Create your first event!
          </p>
        ) : (
          <div className="space-y-4">
            {events.map((event) => (
              <div 
                key={event.id} 
                className="flex justify-between items-center p-4 bg-gray-50 rounded-lg shadow-sm"
              >
                <div>
                  <h3 className="font-semibold text-lg">{event.title}</h3>
                  <p className="text-gray-600">
                    {event.date} at {event.time}
                  </p>
                  {event.description && (
                    <p className="text-gray-500 text-sm mt-1">
                      {event.description}
                    </p>
                  )}
                </div>
                <div className="flex space-x-2">
                  <Button 
                    variant="outline" 
                    size="icon" 
                    onClick={() => handleEditEvent(event.id)}
                  >
                    <Edit className="h-4 w-4" />
                  </Button>
                  <Button 
                    variant="destructive" 
                    size="icon" 
                    onClick={() => handleDeleteEvent(event.id)}
                  >
                    <Trash2 className="h-4 w-4" />
                  </Button>
                </div>
              </div>
            ))}
          </div>
        )}
      </CardContent>
    </Card>
  );
};

export default EventList;