import React, { useState, useEffect } from 'react';
import axios from 'axios';
import AthleteForm from './components/AthleteForm';
import AthleteList from './components/AthleteList';
import './App.css';

function App() {
  const [athletes, setAthletes] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchAthletes = async () => {
    setLoading(true);
    try {
      const response = await axios.get("http://localhost:5000/api/athletes");
      setAthletes(response.data);
    } catch (error) {
      console.error("Error fetching athletes:", error);
    } finally {
      setLoading(false);
    }
  };
  

  useEffect(() => {
    fetchAthletes();
  }, []);

  return (
    <div className="App">
      <h1>Decathlon Scoring App</h1>
      <AthleteForm fetchAthletes={fetchAthletes} />
      {loading ? (
        <div className="loading">Loading athletes...</div>
      ) : (
        <AthleteList athletes={athletes} />
      )}
    </div>
  );
}

export default App;
