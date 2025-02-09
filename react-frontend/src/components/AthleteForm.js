import React, { useState } from "react";
import axios from "axios";
const AthleteForm = ({ fetchAthletes }) => {
  const [name, setName] = useState("");
  const [events, setEvents] = useState({
    "100mRun": "",
    longJump: "",
    shotPutThrow: "",
    highJump: "",
    "400mRun": "",
    "110mHurdles": "",
    discusThrow: "",
    poleVault: "",
    javelinThrow: "",
    "1500mRun": "",
  });
  const [error, setError] = useState("");

  const handleChange = (event, field) => {
    const value = event.target.value;
    setEvents({
      ...events,
      [field]: value === "" ? "" : parseFloat(value),
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!name.trim()) {
      setError("Name is required");
      return;
    }

    for (const key in events) {
      if (events[key] === "" || isNaN(events[key]) || events[key] <= 0) {
        setError(`Please enter a valid value for ${key}`);
        return;
      }
    }

    setError(""); 
    try {
      const response = await axios.post("http://localhost:5000/api/athletes", {
        name,
        events,
      });
      console.log("Athlete added:", response.data);

      setName(""); 
      setEvents({
        "100mRun": "",
        longJump: "",
        shotPutThrow: "",
        highJump: "",
        "400mRun": "",
        "110mHurdles": "",
        discusThrow: "",
        poleVault: "",
        javelinThrow: "",
        "1500mRun": "",
      });

      fetchAthletes(); // Refresh the athlete list
    } catch (error) {
      console.error("Error adding athlete:", error.response?.data || error.message);
      setError("Error adding athlete. Please check your input and try again.");
    }
  };

  return (
    <form onSubmit={handleSubmit} className="athlete-form">
      <h2>Add Athlete</h2>
      {error && <div className="error-message">{error}</div>}
      <div className="form-group">
        <label>Name:</label>
        <input
          type="text"
          value={name}
          onChange={(e) => setName(e.target.value)}
          placeholder="Enter athlete's name"
          required
        />
      </div>
      {Object.keys(events).map((event) => (
        <div className="form-group" key={event}>
          <label>{event.replace(/([a-z])([A-Z])/g, "$1 $2")}:</label>
          <input
            type="number"
            value={events[event]}
            onChange={(e) => handleChange(e, event)}
            placeholder={
              event.includes("Run") || event.includes("Hurdles")
                ? "Time in seconds"
                : event.includes("Jump") || event.includes("Vault")
                ? "Height in centimeters"
                : "Distance in meters"
            }
            required
          />
        </div>
      ))}
      <button type="submit" className="submit-button">
        Add Athlete
      </button>
    </form>
  );
};

export default AthleteForm;
