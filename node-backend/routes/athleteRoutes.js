const express = require('express');
const { addAthlete, getAllAthletes } = require('../controllers/athleteController');

const router = express.Router();

router.post('/', addAthlete);
router.get('/', getAllAthletes);

module.exports = router;