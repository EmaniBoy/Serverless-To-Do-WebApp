import { useState, useEffect } from "react";
import FullCalendar from "@fullcalendar/react";
import dayGridPlugin from "@fullcalendar/daygrid";
import timeGridPlugin from "@fullcalendar/timegrid";
import interactionPlugin from "@fullcalendar/interaction";
import { collection, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import { auth } from "../firebase-config";
import './Calendar.css';  // Make sure to import the CSS file

const Calendar = ({ selectedDate, onDateSelect }) => {
  const [events, setEvents] = useState([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const user = auth.currentUser;
      if (user) {
        const eventsCollection = collection(db, "users", user.uid, "events");

        const unsubscribe = onSnapshot(eventsCollection, (snapshot) => {
          const eventList = snapshot.docs.map((doc) => ({
            id: doc.id,
            title: doc.data().title,
            start: `${doc.data().date}T${doc.data().time}`,
            extendedProps: { details: doc.data().details },
            completed: doc.data().completed || false, // Ensure completed field is considered
          }));
          setEvents(eventList);
        });

        return () => unsubscribe(); // Cleanup on unmount
      }
    };
    fetchEvents();
  }, []);

  return (
    <div className="calendar-container p-6 bg-blue-300 rounded-lg shadow-lg animate-fade-in">
      <FullCalendar
        plugins={[dayGridPlugin, timeGridPlugin, interactionPlugin]}
        initialView="dayGridMonth"
        events={events}
        headerToolbar={{
          left: "prev,next today",
          center: "title",
          right: "dayGridMonth,timeGridWeek,timeGridDay",
        }}
        eventClick={(info) => {
          alert(`Event: ${info.event.title}\nDetails: ${info.event.extendedProps.details}`);
        }}
        dateClick={(info) => {
          if (onDateSelect) onDateSelect(info.dateStr); // Notify parent about date selection
        }}
        editable={true}
        selectable={true}
        eventColor="rgba(52, 211, 153, 0.8)" // Custom event color
        eventBackgroundColor="rgba(16, 185, 129, 0.8)" // Custom background color
        eventTextColor="#ffffff" // White text for events
        eventMouseEnter={(info) => {
          info.el.style.transition = "transform 0.2s ease, box-shadow 0.2s ease";
          info.el.style.transform = "scale(1.05)";
          info.el.style.boxShadow = "0px 4px 15px rgba(0, 0, 0, 0.3)";
        }}
        eventMouseLeave={(info) => {
          info.el.style.transform = "scale(1)";
          info.el.style.boxShadow = "none";
        }}
        className="text-white"
      />
    </div>
  );
};

export default Calendar;