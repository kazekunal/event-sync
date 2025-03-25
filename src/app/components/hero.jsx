'use client'
import React, { useState } from 'react';
import { Calendar } from 'lucide-react';
import { Button } from '@/components/ui/button';
import EventModal from './events';
import EventList from './eventList';
import Link from 'next/link';

const LandingPage = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
      {/* Navigation */}
      <nav className="bg-white shadow-md p-4">
        <div className="container mx-auto flex justify-between items-center">
          <div className="flex items-center space-x-2">
            <Calendar className="text-blue-600" size={32} />
            <h1 className="text-2xl font-bold text-gray-800">EventMaster</h1>
          </div>
          <div className="space-x-4">
            <Button variant="outline">Login</Button>
            <Button>Sign Up</Button>
          </div>
        </div>
      </nav>

      {/* Hero Section */}
      <main className="flex-grow container mx-auto px-4 py-16 grid md:grid-cols-2 gap-12 items-center">
        <div className="space-y-6">
          <h2 className="text-4xl font-extrabold text-gray-900">
            Simplify Your Schedule, Maximize Your Time
          </h2>
          <p className="text-xl text-gray-600">
            EventMaster helps you effortlessly manage your events with smart scheduling and timely reminders.
          </p>
          
          {/* Feature Highlights */}
          <div className="space-y-4">
            <div className="flex items-center space-x-3">
              <div className="bg-blue-100 p-2 rounded-full">
                <Calendar className="text-blue-600" size={24} />
              </div>
              <span className="text-gray-800">Easy Event Scheduling</span>
            </div>
            <div className="flex items-center space-x-3">
              <div className="bg-green-100 p-2 rounded-full">
                <Calendar className="text-green-600" size={24} />
              </div>
              <span className="text-gray-800">Smart Notifications</span>
            </div>
          </div>
            <Link href="/dash">
          <Button 
            size="lg" 
            className="w-full md:w-auto"
          >
            Create Your First Event
          </Button></Link>
        </div>

        {/* Illustration Placeholder */}
        <div className="hidden md:flex justify-center items-center w-2/3 h-fit">
        <img 
            src="/calender.jpg" 
            alt="Event Scheduling Illustration" 
            className="rounded-lg shadow-xl"
        />
        </div>
      </main>

      {/* Event Modal */}
      <EventModal 
        isOpen={isModalOpen} 
        onClose={() => setIsModalOpen(false)} 
      />

      {/* Footer */}
      <footer className="bg-white py-6 border-t">
        <div className="container mx-auto text-center">
          <p className="text-gray-600">
            © 2024 EventMaster. All rights reserved.
          </p>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;