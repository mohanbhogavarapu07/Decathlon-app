import React from 'react';

const AthleteList = ({ athletes }) => {
  if (!Array.isArray(athletes) || athletes.length === 0) {
    return <div>No athletes to display.</div>;
  }

  return (
    <div>
      <div className="athlete-heading">Athletes</div>
      <div className="athlete-list">
        {athletes.map((athlete) => (
          <div key={athlete._id} className="athlete-card">
            <h3>{athlete.name || "Unnamed Athlete"}</h3>
            <div className="event-scores">
              {athlete.eventScores && Object.entries(athlete.eventScores).length > 0 ? (
                Object.entries(athlete.eventScores).map(([event, score]) => (
                  <div key={event} className="event-score">
                    <strong>{event}:</strong> {score.toFixed(2)} points
                  </div>
                ))
              ) : (
                <div>No event scores available.</div>
              )}
            </div>
            <div className="total-score">
              <strong>Total Score:</strong> {athlete.totalScore ? athlete.totalScore.toFixed(2) : "N/A"} points
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AthleteList;
