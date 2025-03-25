import React, { useState } from 'react';
import { 
  Dialog, 
  DialogContent, 
  DialogHeader, 
  DialogTitle, 
  DialogDescription 
} from '@/components/ui/dialog';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';

const EventModal = ({ isOpen, onClose }) => {
  const [eventDetails, setEventDetails] = useState({
    title: '',
    date: '',
    time: '',
    description: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEventDetails(prev => ({
      ...prev,
      [name]: value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // TODO: Implement event creation logic
    console.log('Event Created:', eventDetails);
    onClose();
  };

  return (
    <Dialog open={isOpen} onOpenChange={onClose}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Create New Event</DialogTitle>
          <DialogDescription>
            Add details for your upcoming event
          </DialogDescription>
        </DialogHeader>
        
        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <Label htmlFor="title">Event Title</Label>
            <Input 
              id="title"
              name="title"
              value={eventDetails.title}
              onChange={handleInputChange}
              placeholder="Enter event title"
              required
            />
          </div>
          
          <div className="grid grid-cols-2 gap-4">
            <div>
              <Label htmlFor="date">Date</Label>
              <Input 
                id="date"
                name="date"
                type="date"
                value={eventDetails.date}
                onChange={handleInputChange}
                required
              />
            </div>
            <div>
              <Label htmlFor="time">Time</Label>
              <Input 
                id="time"
                name="time"
                type="time"
                value={eventDetails.time}
                onChange={handleInputChange}
                required
              />
            </div>
          </div>
          
          <div>
            <Label htmlFor="description">Description (Optional)</Label>
            <Input 
              id="description"
              name="description"
              value={eventDetails.description}
              onChange={handleInputChange}
              placeholder="Add event details"
            />
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button type="button" variant="outline" onClick={onClose}>
              Cancel
            </Button>
            <Button type="submit">
              Create Event
            </Button>
          </div>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default EventModal;