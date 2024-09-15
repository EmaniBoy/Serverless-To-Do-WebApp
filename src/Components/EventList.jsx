import React, { useState } from "react";
import { doc, deleteDoc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import EditEventForm from "./EditEventForm";
import { motion } from "framer-motion"; // Import framer motion

const EventList = ({ events }) => {
  const [editingEvent, setEditingEvent] = useState(null);

  const handleDelete = async (eventId) => {
    try {
      await deleteDoc(doc(db, "users", auth.currentUser.uid, "events", eventId));
    } catch (error) {
      console.error("Error deleting event:", error);
    }
  };

  const handleEdit = (event) => {
    setEditingEvent(event);
  };

  const handleUpdate = () => {
    setEditingEvent(null);
  };

  const handleCheckOff = async (eventId, isCompleted) => {
    try {
      const eventDoc = doc(db, "users", auth.currentUser.uid, "events", eventId);
      await updateDoc(eventDoc, { completed: isCompleted });
    } catch (error) {
      console.error("Error marking event as completed:", error);
    }
  };

  return (
    <div className="event-list transition-all duration-300 mt-8 space-y-4">
      {editingEvent && (
        <EditEventForm
          event={editingEvent}
          onClose={() => setEditingEvent(null)}
          onEventUpdated={handleUpdate}
        />
      )}
      {events.length > 0 ? (
        events.map((event) => (
          <motion.div
            key={event.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            whileHover={{ scale: 1.05 }}
            transition={{ duration: 0.3 }}
            className="bg-gradient-to-r from-indigo-600 to-purple-600 p-4 mb-4 rounded-lg shadow-lg"
          >
            <h3 className="text-xl font-bold text-white">{event.title}</h3>
            <p className="text-gray-300">{event.details}</p>
            <p className="text-gray-300">{event.time}</p>
            <div className="flex justify-between mt-4">
              <button
                onClick={() => handleEdit(event)}
                className="bg-yellow-500 text-white py-2 px-4 rounded-lg hover:bg-yellow-600 shadow-lg transition-all duration-200"
              >
                Edit
              </button>
              <button
                onClick={() => handleCheckOff(event.id, !event.completed)}
                className={`py-2 px-4 rounded-lg transition-all duration-200 shadow-lg ${
                  event.completed
                    ? "bg-green-600 hover:bg-green-700"
                    : "bg-green-500 hover:bg-green-600"
                } text-white`}
              >
                {event.completed ? "Checked Off" : "Check Off"}
              </button>
              <button
                onClick={() => handleDelete(event.id)}
                className="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 shadow-lg transition-all duration-200"
              >
                Delete
              </button>
            </div>
          </motion.div>
        ))
      ) : (
        <p className="text-gray-600">You have no events for this day.</p>
      )}
    </div>
  );
};

export default EventList;