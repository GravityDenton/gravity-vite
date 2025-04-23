// ManageEventsPage.jsx
import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from "/firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const ManageEventsPage = ({ events, setEvents }) => {
  const [deleteIndex, setDeleteIndex] = useState(null);
  useEffect(() => {
    const fetchEvents = async () => {
      try {
        const snapshot = await getDocs(collection(db, 'events'));
        const fetchedEvents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        setEvents(fetchedEvents);
      } catch (error) {
        console.error("Error fetching events:", error);
      }
    };
  
    fetchEvents();
  }, []);

  const handleChange = async (index, field, value) => {
    const updatedEvents = [...events];
    updatedEvents[index][field] = value;
    setEvents(updatedEvents);
  
    const event = updatedEvents[index];
    try {
      await updateDoc(doc(db, 'events', event.id), { ...event, [field]: value });
    } catch (error) {
      console.error("Error updating event:", error);
    }
  };

  const handleSave = () => {
    alert('Events updated!');
    // The useEffect in App.jsx will persist the events to localStorage.
  };

  // Function to add a new blank event.
  const addNewEvent = async () => {
    const newEvent = {
      name: "",
      date: "",
      description: "",
      details: "",
      imageUrl: "",
    };
  
    try {
      const docRef = await addDoc(collection(db, 'events'), newEvent);
      setEvents([...events, { id: docRef.id, ...newEvent }]);
    } catch (error) {
      console.error("Error adding event:", error);
    }
  };

  // Set the index of the event we want to delete (to trigger the modal).
  const confirmDeleteEvent = (index) => {
    setDeleteIndex(index);
  };

  // When the user confirms deletion:
  const handleConfirmDelete = async () => {
    try {
      const eventToDelete = events[deleteIndex];
      await deleteDoc(doc(db, 'events', eventToDelete.id));
      const updatedEvents = events.filter((_, i) => i !== deleteIndex);
      setEvents(updatedEvents);
      setDeleteIndex(null);
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  // Cancel the deletion and close the modal.
  const cancelDelete = () => {
    setDeleteIndex(null);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Manage Events</h2>
      <button 
        onClick={addNewEvent} 
        className="mb-4 px-4 py-2 bg-green-500 text-white rounded"
      >
        Add New Event
      </button>
      {events.length === 0 ? (
        <p>No events available. Click "Add New Event" to create one.</p>
      ) : (
        <div className="flex flex-wrap gap-4">
          {events.map((event, index) => (
            <div key={event.id} className="mb-6 p-4 border rounded-md w-full md:w-1/3">
              <label className="block mb-2">
                <strong>Name:</strong>
                <input
                  type="text"
                  value={event.name}
                  onChange={(e) => handleChange(index, 'name', e.target.value)}
                  className="ml-2 border p-1 w-full"
                />
              </label>
              <label className="block mb-2">
                <strong>Date:</strong>
                <input
                  type="text"
                  value={event.date}
                  onChange={(e) => handleChange(index, 'date', e.target.value)}
                  className="ml-2 border p-1 w-full"
                />
              </label>
              <label className="block mb-2">
                <strong>Description:</strong>
                <textarea
                  value={event.description}
                  onChange={(e) => handleChange(index, 'description', e.target.value)}
                  className="ml-2 border p-1 w-full"
                />
              </label>
              <label className="block mb-2">
                <strong>Details:</strong>
                <textarea
                  value={event.details}
                  onChange={(e) => handleChange(index, 'details', e.target.value)}
                  className="ml-2 border p-1 w-full"
                />
              </label>
              <label className="block mb-2">
                <strong>Image URL:</strong>
                <input
                  type="text"
                  value={event.imageUrl}
                  onChange={(e) => handleChange(index, 'imageUrl', e.target.value)}
                  className="ml-2 border p-1 w-full"
                />
              </label>
              <div className="flex justify-between mt-4">
                <button 
                  onClick={() => confirmDeleteEvent(index)}
                  className="px-4 py-2 bg-red-500 text-white rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
      <button 
        onClick={handleSave}
        className="mt-4 px-4 py-2 bg-blue-500 text-white rounded"
      >
        Save Changes
      </button>

      {/* Modal for delete confirmation */}
      {deleteIndex !== null && (
        <div className="modal-overlay" onClick={cancelDelete}>
          <div className="modal-content" onClick={(e) => e.stopPropagation()}>
            <p className="mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-center gap-4">
              <button 
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 text-white rounded"
              >
                Yes, Delete
              </button>
              <button 
                onClick={cancelDelete}
                className="px-4 py-2 bg-gray-500 text-white rounded"
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      )}

      <style>{`
        /* Modal Styles */
        .modal-overlay {
          position: fixed;
          top: 0;
          left: 0;
          right: 0;
          bottom: 0;
          background: rgba(0, 0, 0, 0.5);
          display: flex;
          align-items: center;
          justify-content: center;
          z-index: 1000;
        }
        .modal-content {
          background: #fff;
          padding: 20px;
          border-radius: 8px;
          max-width: 90%;
          box-shadow: 0 4px 6px rgba(0,0,0,0.1);
          text-align: center;
        }
      `}</style>
    </div>
  );
};

export default ManageEventsPage;
