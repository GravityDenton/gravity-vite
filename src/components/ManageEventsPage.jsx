// ManageEventsPage.jsx
import React, { useState, useEffect } from 'react';
import { db } from "/firebase";
import { collection, addDoc, deleteDoc, doc, getDocs, updateDoc } from 'firebase/firestore';

const ManageEventsPage = ({ events, setEvents }) => {
  const [deleteIndex, setDeleteIndex] = useState(null);

  // Fetch events from Firestore
  const fetchEvents = async () => {
    try {
      const snapshot = await getDocs(collection(db, 'events'));
      const fetched = snapshot.docs.map(d => ({ id: d.id, ...d.data() }));
      setEvents(fetched);
    } catch (err) {
      console.error("Error fetching events:", err);
    }
  };

  useEffect(() => {
    fetchEvents();
  }, [setEvents]);

  // Handle field changes and persist
  const handleChange = async (idx, field, val) => {
    const updated = [...events];
    updated[idx][field] = val;
    setEvents(updated);
    try {
      await updateDoc(doc(db, 'events', updated[idx].id), { [field]: val });
    } catch (err) {
      console.error("Error updating event:", err);
    }
  };

  // Save (re-fetch) events
  const handleSave = async () => {
    await fetchEvents();
    alert('Events reloaded!');
  };

  // Add a new blank event
  const addNewEvent = async () => {
    const blank = { name: "", date: "", description: "", details: "", imageUrl: "" };
    try {
      const ref = await addDoc(collection(db, 'events'), blank);
      setEvents([...events, { id: ref.id, ...blank }]);
    } catch (err) {
      console.error("Error adding event:", err);
    }
  };

  // Request deletion
  const confirmDeleteEvent = idx => setDeleteIndex(idx);

  // Confirm and perform deletion
  const handleConfirmDelete = async () => {
    try {
      const toDel = events[deleteIndex];
      await deleteDoc(doc(db, 'events', toDel.id));
      setEvents(events.filter((_, i) => i !== deleteIndex));
      setDeleteIndex(null);
    } catch (err) {
      console.error("Error deleting event:", err);
    }
  };

  return (
    <div className="max-w-7xl mx-auto p-6 pt-20">
      <h2 className="text-3xl font-semibold mb-4">Manage Events</h2>

      {/* Top controls */}
      <div className="flex items-center gap-4 mb-6">
        <button
          onClick={addNewEvent}
          className="px-5 py-3 bg-green-600 hover:bg-green-700 text-white rounded-lg transition"
        >
          + New Event
        </button>
        <button
          onClick={handleSave}
          className="px-5 py-3 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition"
        >
          Save Changes
        </button>
      </div>

      {events.length === 0 ? (
        <p className="text-gray-600">No events yet. Click “+ New Event” to start.</p>
      ) : (
        <div className="grid gap-6 grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4">
          {events.map((event, i) => (
            <div key={event.id} className="bg-white shadow-md rounded-lg p-5 flex flex-col">
              <label className="mb-3">
                <span className="block text-sm font-medium text-gray-700">Name</span>
                <input
                  type="text"
                  value={event.name}
                  onChange={e => handleChange(i, 'name', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>

              <label className="mb-3">
                <span className="block text-sm font-medium text-gray-700">Date</span>
                <input
                  type="date"
                  value={event.date}
                  onChange={e => handleChange(i, 'date', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>

              <label className="mb-3 flex-1 flex flex-col">
                <span className="block text-sm font-medium text-gray-700">Description</span>
                <textarea
                  value={event.description}
                  onChange={e => handleChange(i, 'description', e.target.value)}
                  className="mt-1 block w-full flex-1 px-3 py-2 bg-blue-50 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>

              <label className="mb-3 flex-1 flex flex-col">
                <span className="block text-sm font-medium text-gray-700">Details</span>
                <textarea
                  value={event.details}
                  onChange={e => handleChange(i, 'details', e.target.value)}
                  className="mt-1 block w-full flex-1 px-3 py-2 bg-blue-50 border border-blue-300 rounded-md resize-none focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>

              <label className="mb-4">
                <span className="block text-sm font-medium text-gray-700">Image URL</span>
                <input
                  type="url"
                  value={event.imageUrl}
                  onChange={e => handleChange(i, 'imageUrl', e.target.value)}
                  className="mt-1 block w-full px-3 py-2 bg-blue-50 border border-blue-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-200"
                />
              </label>

              <button
                onClick={() => confirmDeleteEvent(i)}
                className="mt-auto px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md transition"
              >
                Delete Event
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Delete Confirmation Modal */}
      {deleteIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50"
          onClick={() => setDeleteIndex(null)}
        >
          <div
            className="bg-white rounded-lg p-6 w-11/12 max-w-md"
            onClick={e => e.stopPropagation()}
          >
            <p className="text-gray-800 mb-4">Are you sure you want to delete this event?</p>
            <div className="flex justify-end space-x-4">
              <button
                onClick={() => setDeleteIndex(null)}
                className="px-4 py-2 bg-gray-300 hover:bg-gray-400 rounded-md"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirmDelete}
                className="px-4 py-2 bg-red-500 hover:bg-red-600 text-white rounded-md"
              >
                Yes, Delete
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default ManageEventsPage;
