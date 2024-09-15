// src/components/Notification.jsx
import React from 'react';

const Notification = ({ message, visible }) => {
  return (
    <div
      className={`fixed bottom-4 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-3 rounded-lg shadow-lg transition-transform duration-300 ${visible ? 'translate-y-0 opacity-100' : 'translate-y-10 opacity-0'}`}
      style={{ transition: 'transform 0.5s ease, opacity 0.5s ease' }}
    >
      {message}
    </div>
  );
};

export default Notification;