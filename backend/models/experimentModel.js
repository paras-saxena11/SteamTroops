const mongoose = require("mongoose");

const experimentSchema = mongoose.Schema(
  {
    experimentName: {
      type: String,
      required: true,
    },
    description: {
      type: String,
      required: true,
    },
    difficulty: {
      type: Number,
      required: true,
      min: 1,
      max: 5,
    },
    subject: {
      type: String,
      enum: ["Physics", "Chemistry", "Biology", "General Science"],
      required: true,
    },
    mainImage: {
      type: String,
    },
    materialsList: [
      {
        name: {
          type: String,
          required: true,
        },
        quantity: {
          type: String,
          required: true,
        },
      },
    ],
    safetyPrecautions: {
      type: String,
    },
    steps: [
      {
        number: {
          type: Number,
          required: true,
        },
        image: {
          type: String,
        },
        description: {
          type: String,
          required: true,
        },
      },
    ],
  },
  {
    timestamps: true,
  }
);

const Experiments = mongoose.model("Experiments", experimentSchema);
module.exports = Experiments;
