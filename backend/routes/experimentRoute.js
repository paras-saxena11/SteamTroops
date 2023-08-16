const router = require("express").Router();
const {
  createExperiment,
  getAllExperiments,
} = require("../controllers/experimentControllers");

// Create a new experiment
router.post("/experiments", createExperiment);

// Get all experiments
router.get("/getexperiments", getAllExperiments);

module.exports = router;
