const Athlete = require('../models/Athlete');

// Function to calculate Decathlon Scores
const calculateScore = (event, performance) => {
    console.log(`Calculating score for ${event}:`, performance);
  
    const formulas = {
      // Running events (time in seconds)
      "100mRun": (t) => 25.4347 * Math.pow(18 - t, 1.81),
      "400mRun": (t) => 1.53775 * Math.pow(82 - t, 1.81),
      "110mHurdles": (t) => 5.74352 * Math.pow(28.5 - t, 1.92),
      "1500mRun": (t) => 0.03768 * Math.pow(480 - t, 1.85),

      longJump: (d) => 0.14354 * Math.pow(d - 220, 1.4),
      highJump: (h) => 0.8465 * Math.pow(h - 75, 1.42),  
      poleVault: (h) => 0.2797 * Math.pow(h - 100, 1.35),
  
      // Throwing events (distance in meters)
      shotPutThrow: (d) => 51.39 * Math.pow(d - 1.5, 1.05),
      discusThrow: (d) => 12.91 * Math.pow(d - 4, 1.1),
      javelinThrow: (d) => 10.14 * Math.pow(d - 7, 1.08),
    };
  
    try {
      const score = formulas[event](performance);
      console.log(`Score for ${event}:`, score);
      return isNaN(score) ? 0 : score;
    } catch (err) {
      console.error(`Error calculating score for ${event}:`, err);
      return 0;
    }
  };
  

// Add Athlete and Calculate Scores
exports.addAthlete = async (req, res) => {
  const { name, events } = req.body;

  console.log("Received data:", { name, events });

  if (!name || !events) {
    return res.status(400).json({ error: "Name and events are required" });
  }

  try {

    const existingAthlete = await Athlete.findOne({ name });
    if (existingAthlete) {
      return res.status(400).json({ error: "An athlete with this name already exists" });
    }
    // Validate event values
    const validatedEvents = {};
    const eventScores = {};
    let totalScore = 0;

    for (const event in events) {
      const value = parseFloat(events[event]);
      if (isNaN(value) || value <= 0) {
        return res.status(400).json({ error: `Invalid value for ${event}` });
      }
      validatedEvents[event] = value;

      // Calculate individual event score
      const score = calculateScore(event, value);
      eventScores[event] = score;
      totalScore += score;
    }

    // Save athlete to database
    const athlete = new Athlete({
      name,
      events: validatedEvents,
      eventScores,
      totalScore,
    });

    const savedAthlete = await athlete.save();

    // Return full athlete data, including event scores and total score
    return res.status(201).json(savedAthlete);
  } catch (err) {
    console.error("Error saving athlete:", err);
    return res.status(500).json({ error: "Server error while adding athlete" });
  }
};

// Get All Athletes
exports.getAllAthletes = async (req, res) => {
  try {
    const athletes = await Athlete.find().lean(); // Use lean() for plain JavaScript objects
    res.status(200).json(athletes);
  } catch (err) {
    console.error("Error fetching athletes:", err);
    res.status(500).json({ error: "Server error while fetching athletes" });
  }
};
