// EventsSection.jsx
import React, { useState, useEffect } from 'react';
import useFadeInOnScroll from '../useFadeInOnScroll';
import { db } from "/firebase";
import { collection, getDocs } from 'firebase/firestore';

const EventsSection = () => {
  const [events, setEvents] = useState([]);
  const fadeInRef = useFadeInOnScroll();

  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const fetchedEvents = snapshot.docs.map(doc => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };

    fetchEvents();
  }, []);

  return (
    <section ref={fadeInRef} id="events" className="py-16 px-4">
      <h2 className="text-3xl font-bold text-center mb-10">Upcoming Events</h2>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
        {events.map(event => (
          <div 
            key={event.id}
            className="bg-white rounded-lg shadow-md overflow-hidden transform transition duration-200 hover:scale-105 hover:shadow-lg"
          >
            {event.imageUrl && (
              <img src={event.imageUrl} alt={event.name} className="w-full h-48 object-cover" />
            )}
            <div className="p-6">
              <h3 className="text-xl font-semibold mb-2 text-black">{event.name}</h3>
              <p className="text-gray-600 text-sm mb-2">{event.date}</p>
              <p className="text-gray-700 mb-4">{event.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
};

export default EventsSection;
