const mongoose = require("mongoose");

const athleteSchema = new mongoose.Schema({
  name: { type: String, required: true,unique:true },
  events: {
    "100mRun": { type: Number, required: true },
    longJump: { type: Number, required: true },
    shotPutThrow: { type: Number, required: true },
    highJump: { type: Number, required: true },
    "400mRun": { type: Number, required: true },
    "110mHurdles": { type: Number, required: true },
    discusThrow: { type: Number, required: true },
    poleVault: { type: Number, required: true },
    javelinThrow: { type: Number, required: true },
    "1500mRun": { type: Number, required: true },
  },
  eventScores: {
    type: Map,
    of: Number,
    required: true,
  },
  totalScore: { type: Number, required: true },
});
module.exports = mongoose.model("Athlete", athleteSchema);
