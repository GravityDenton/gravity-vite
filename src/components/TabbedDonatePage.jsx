import React, { useState } from 'react';
import { useEffect } from 'react';
import { db } from "/firebase";
import { collection, addDoc, getDocs, deleteDoc, doc } from 'firebase/firestore';


const TabbedDonatePage = ({ isAdmin }) => {
  const [activeTab, setActiveTab] = useState('donate');
  const [needsItems, setNeedsItems] = useState([]);
  const [newItem, setNewItem] = useState("");

  useEffect(() => {
    const fetchItems = async () => {
      const snapshot = await getDocs(collection(db, 'needsItems'));
      const items = snapshot.docs.map(doc => ({ id: doc.id, name: doc.data().name }));
      setNeedsItems(items);
    };
    fetchItems();
  }, []);

  const addItem = async () => {
    if (newItem.trim()) {
      try {
        const docRef = await addDoc(collection(db, 'needsItems'), { name: newItem.trim() });
        setNeedsItems([...needsItems, { id: docRef.id, name: newItem.trim() }]);
        setNewItem("");
      } catch (error) {
        console.error("Error adding item:", error);
      }
    }
  };

  const deleteItem = async (id) => {
    try {
      await deleteDoc(doc(db, 'needsItems', id));
      setNeedsItems(needsItems.filter(item => item.id !== id));
    } catch (error) {
      console.error("Error deleting item:", error);
    }
  };

  return (
    <div className="w-screen min-h-screen bg-gradient-to-r from-gray-100 to-gray-200 flex flex-col pt-32 pb-8">
      <div className="w-full max-w-3xl px-4 mx-auto">
        <div className="bg-white rounded-lg shadow-lg overflow-hidden">
          {/* Tab Navigation */}
          <div className="border-b border-gray-200">
            <nav className="flex">
              <button
                onClick={() => setActiveTab('donate')}
                className={`w-1/2 p-4 text-center transition-colors duration-200 ${
                  activeTab === 'donate'
                    ? 'border-b-2 border-blue-500 text-blue-500 font-bold'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                Donate Money
              </button>
              <button 
                onClick={() => setActiveTab('needs')}
                className={`w-1/2 p-4 text-center transition-colors duration-200 ${
                  activeTab === 'needs'
                    ? 'border-b-2 border-blue-500 text-blue-500 font-bold'
                    : 'text-gray-500 hover:text-blue-500'
                }`}
              >
                Our Needs
              </button>
            </nav>
          </div>
          {/* Tab Content */}
          <div className="p-8">
            {activeTab === 'donate' && (
              <div className="text-center">
                <h1 className="text-4xl font-bold text-gray-800 mb-4">Support Our Mission</h1>
                <p className="text-lg text-gray-600 mb-8">
                  We appreciate your interest in supporting our cause. Your financial contribution can make a significant difference.
                </p>
                <a
                  href="https://squareup.com/donate"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <button className="px-8 py-3 bg-blue-500 text-white text-lg font-bold rounded-full shadow-md hover:bg-blue-600 transition duration-200">
                    Donate via Square
                  </button>
                </a>
                <p className="text-gray-500 text-xs mt-4">
                  Your donation is processed securely by our external payment provider.
                </p>
              </div>
            )}
            {activeTab === 'needs' && (
              <div className="text-left">
                <h2 className="text-3xl font-bold text-gray-800 mb-6 text-center">Our Needs</h2>
                {needsItems.length === 0 ? (
                  <p className="text-gray-600 text-center mb-6">No items have been added yet.</p>
                ) : (
                  <ul className="space-y-6">
                    {needsItems.map((item, index) => (
                      <li key={item.id} className="flex items-center justify-between">
                        <div className="flex items-center">
                          <span className="inline-block">
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-3 w-3 text-blue-500" viewBox="0 0 8 8">
                              <circle cx="4" cy="4" r="3" fill="currentColor" />
                            </svg>
                          </span>
                          <h3 className="text-xl font-bold text-blue-500 ml-4">{item.name}</h3>
                        </div>
                        {isAdmin && (
                          <button onClick={() => deleteItem(item.id)} className="text-red-500 hover:text-red-700 text-sm">
                            Delete
                          </button>
                        )}
                      </li>
                    ))}
                  </ul>
                )}
                {isAdmin && (
                  <div className="mt-6 flex items-center">
                    <input
                      type="text"
                      value={newItem}
                      onChange={(e) => setNewItem(e.target.value)}
                      placeholder="Add new item..."
                      className="border border-gray-300 rounded-l px-4 py-2 flex-grow"
                    />
                    <button onClick={addItem} className="bg-blue-500 text-white px-4 py-2 rounded-r hover:bg-blue-600 transition duration-200">
                      Add Item
                    </button>
                  </div>
                )}
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TabbedDonatePage;

