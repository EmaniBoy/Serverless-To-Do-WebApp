import { useEffect, useState } from "react";
import { signOut } from "firebase/auth";
import { auth } from "../firebase-config";
import { useNavigate } from "react-router-dom";
import { doc, getDoc, collection, query, where, onSnapshot } from "firebase/firestore";
import { db } from "../firebase-config";
import Calendar from "../Components/Calendar";
import EventList from "../Components/EventList";
import AddEventForm from "../Components/AddEventForm";

const Home = () => {
  const [userName, setUserName] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date().toISOString().split('T')[0]);
  const [events, setEvents] = useState([]);
  const [showAddEventForm, setShowAddEventForm] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserName = async () => {
      if (auth.currentUser) {
        const userDoc = doc(db, "users", auth.currentUser.uid);
        const userSnap = await getDoc(userDoc);
        if (userSnap.exists()) {
          setUserName(userSnap.data().name); // Set the user's name from Firestore
        }
      }
    };
    fetchUserName();
  }, []);

  useEffect(() => {
    if (selectedDate && auth.currentUser) {
      const eventQuery = query(
        collection(db, "users", auth.currentUser.uid, "events"),
        where("date", "==", selectedDate)
      );

      const unsubscribe = onSnapshot(eventQuery, (snapshot) => {
        const fetchedEvents = snapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setEvents(fetchedEvents);
      });

      return () => unsubscribe();
    }
  }, [selectedDate]);

  const handleLogout = async () => {
    try {
      await signOut(auth);
      navigate("/login");
    } catch (error) {
      console.error("Error signing out: ", error);
      alert("Error signing out. Please try again.");
    }
  };

  const handleEventAdded = () => {
    setSelectedDate(selectedDate);
  };

  return (
    <div className="flex flex-row min-h-screen bg-gray-100 p-4 relative">
    <div className="w-2/3">
      <h1 className="text-3xl font-bold mb-4 text-gray-900">Welcome, {userName}!</h1>
      <Calendar selectedDate={selectedDate} onDateSelect={setSelectedDate} />
    </div>
    <div className="w-1/3 pl-4 relative">
      <h2 className="text-2xl font-semibold mb-2 text-gray-900">Events on {selectedDate}</h2>
      <EventList events={events} />
      <button
        onClick={() => setShowAddEventForm(true)}
        className="mt-4 w-full bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition"
      >
        Add Event
      </button>
    </div>
    <button
      onClick={handleLogout}
      className="absolute top-4 right-4 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition"
      style={{ marginBottom: "1rem" }} // Add margin to avoid overlap
    >
      Log Out
    </button>
  
    {showAddEventForm && (
      <AddEventForm onClose={() => setShowAddEventForm(false)} onEventAdded={handleEventAdded} />
    )}
  </div>
  );
};

export default Home;