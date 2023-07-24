import React,{useState,useEffect} from 'react';
import './App.css';

function App() {
  const [currentTime, setCurrentTime] = useState(new Date());
  useEffect(() => {
    const fetchTime = async () => {
      try {
        const response = await fetch('http://worldtimeapi.org/api/ip');
        const data = await response.json();
        // Extract the current time from the response (data.datetime is in ISO format)
        setCurrentTime(new Date(data.datetime));
      } catch (error) {
        console.error('Error fetching time:', error);
      }
    };

    // Fetch the time when the component mounts
    fetchTime();

    // Update the time every second
    const interval = setInterval(fetchTime, 1000);

    // Clear the interval when the component is unmounted.
    return () => clearInterval(interval);
  }, []);

  const formatTime = (date) => {
    const hours = date.getHours().toString().padStart(2, '0');
    const minutes = date.getMinutes().toString().padStart(2, '0');
    const seconds = date.getSeconds().toString().padStart(2, '0');
    return `${hours}:${minutes}:${seconds}`;
  };
  return (
  <>
  <h2>Current Time Is</h2>
  <h1>{formatTime(currentTime)}</h1>
  </>
  );
}

export default App;
