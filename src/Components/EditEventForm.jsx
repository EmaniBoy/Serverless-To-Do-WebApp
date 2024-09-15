import { useState, useEffect } from "react";
import { doc, updateDoc } from "firebase/firestore";
import { db, auth } from "../firebase-config";
import { motion } from "framer-motion"; // Import framer-motion for animations

const EditEventForm = ({ event, onClose, onEventUpdated }) => {
  const [title, setTitle] = useState(event.title);
  const [date, setDate] = useState(event.date);
  const [time, setTime] = useState(event.time);
  const [details, setDetails] = useState(event.details);

  useEffect(() => {
    setTitle(event.title);
    setDate(event.date);
    setTime(event.time);
    setDetails(event.details);
  }, [event]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const eventDoc = doc(db, "users", auth.currentUser.uid, "events", event.id);
      await updateDoc(eventDoc, { title, date, time, details });
      onEventUpdated();
      onClose();
    } catch (error) {
      console.error("Error updating event: ", error);
    }
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <motion.form
        initial={{ opacity: 0, y: 50 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: -50 }}
        onSubmit={handleSubmit}
        className="bg-gradient-to-r from-blue-500 to-indigo-600 p-8 rounded-lg shadow-2xl w-full max-w-lg"
      >
        <h2 className="text-2xl font-bold text-white mb-6">Edit Event</h2>
        <div className="mb-4">
          <label className="block text-white mb-2">Event Title</label>
          <input
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Date</label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Time</label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <div className="mb-4">
          <label className="block text-white mb-2">Details</label>
          <textarea
            value={details}
            onChange={(e) => setDetails(e.target.value)}
            className="w-full px-4 py-2 border border-gray-300 rounded-lg transition duration-200 focus:ring-2 focus:ring-indigo-300"
            required
          />
        </div>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="submit"
          className="w-full bg-green-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-green-600 transition-all duration-300"
        >
          Update Event
        </motion.button>
        <motion.button
          whileHover={{ scale: 1.05 }}
          type="button"
          onClick={onClose}
          className="mt-4 w-full bg-red-500 text-white py-2 px-4 rounded-lg shadow-lg hover:bg-red-600 transition-all duration-300"
        >
          Close
        </motion.button>
      </motion.form>
    </div>
  );
};

export default EditEventForm;