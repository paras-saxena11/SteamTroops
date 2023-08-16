// import Experiments from "../models/experimentModel";
const Experiments = require("../models/experimentModel");

const createExperiment = async (req, res) => {
  const {
    experimentName,
    description,
    difficulty,
    subject,
    mainImage,
    materialsList,
    safetyPrecautions,
    steps,
  } = req.body;

  const newExperiment = await Experiments.create({
    experimentName,
    description,
    difficulty,
    subject,
    mainImage,
    materialsList,
    safetyPrecautions,
    steps,
  });
  // console.log(newExperiment);
  if (newExperiment)
    res.status(201).json({
      experimentName,
      description,
      difficulty,
      subject,
      mainImage,
      materialsList,
      safetyPrecautions,
      steps,
    });
  else {
    res
      .status(400)
      .json({ error: "An error occurred while creating the experiment." });
  }
};

// Controller to get all experiments
const getAllExperiments = async (req, res) => {
  try {
    const experiments = await Experiments.find();
    res.status(200).json(experiments);
  } catch (error) {
    res
      .status(500)
      .json({ error: "An error occurred while fetching experiments." });
  }
};

module.exports = {
  createExperiment,
  getAllExperiments,
};
