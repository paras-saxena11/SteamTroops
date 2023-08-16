import React, { useState, useEffect } from "react";
import "./styles.css";
import axios from "axios";
import {
  useSubmitExperimentMutation,
  useGetExperimentsMutation,
} from "./slices/apiSlice";
import { useDispatch } from "react-redux";
import { setExperimentState } from "./slices/ExperimentSlice";
import Cardcomp from "./components/Cardcomp";

const ExperimentForm = () => {
  const dispatch = useDispatch();
  const [data, setData] = useState([]);
  const [experiment, setExperiment] = useState({
    experimentName: "",
    description: "",
    difficultyLevel: 1,
    subject: "",
    mainImage: "",
    materialsList: [{ name: "", quantity: "" }],
    safetyPrecautions: "",
    steps: [],
  });

  const [submitExperiment] = useSubmitExperimentMutation();
  const [getExperiments] = useGetExperimentsMutation();

  const handleInputChange = (index, event) => {
    const { name, value } = event.target;
    const materialsList = [...experiment.materialsList];
    materialsList[index][name] = value;
    setExperiment({ ...experiment, materialsList });
    console.log(data);
  };

  const handleAddMaterial = () => {
    setExperiment({
      ...experiment,
      materialsList: [...experiment.materialsList, { name: "", quantity: "" }],
    });
  };
  const handleStepChange = (index, field, event) => {
    const { value } = event.target;
    const steps = [...experiment.steps];
    steps[index][field] = value;
    steps[index]["number"] = index + 1;
    setExperiment({ ...experiment, steps });
  };

  const handleAddStep = () => {
    const steps = [...experiment.steps, { image: "", description: "" }];
    setExperiment({ ...experiment, steps });
  };

  const handleMainImageUpload = async (file) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ecomabcdef");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv1lnwyos/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      setExperiment({ ...experiment, mainImage: imageUrl });
    } catch (error) {
      console.error("Error uploading main image:", error);
    }
  };

  const handleStepImageUpload = async (file, index) => {
    const formData = new FormData();
    formData.append("file", file);
    formData.append("upload_preset", "Ecomabcdef");

    try {
      const response = await axios.post(
        "https://api.cloudinary.com/v1_1/dv1lnwyos/image/upload",
        formData
      );
      const imageUrl = response.data.secure_url;
      const updatedSteps = [...experiment.steps];
      updatedSteps[index].image = imageUrl;
      setExperiment({ ...experiment, steps: updatedSteps });
    } catch (error) {
      console.error("Error uploading step image:", error);
    }
  };
  useEffect(() => {
    async function fetchData() {
      const res = await getExperiments().unwrap();
      setData(res);
    }
    fetchData();
  }, [setData, data, getExperiments]);

  const handleSubmit = async () => {
    try {
      const response = await submitExperiment({
        experimentName: experiment.experimentName,
        description: experiment.description,
        difficulty: experiment.difficultyLevel,
        subject: experiment.subject,
        mainImage: experiment.mainImage,
        materialsList: experiment.materialsList,
        safetyPrecautions: experiment.safetyPrecautions,
        steps: experiment.steps,
      }).unwrap();

      dispatch(setExperimentState({ ...response }));

      // Clear form after submission
      setExperiment({
        experimentName: "",
        description: "",
        difficultyLevel: 1,
        subject: "",
        mainImage: "",
        materialsList: [{ name: "", quantity: "" }],
        safetyPrecautions: "",
        steps: [],
      });
    } catch (error) {
      console.error("Error submitting experiment:", error);
    }
  };

  return (
    <div>
      <h1>Experiments List:</h1>
      <div className="cards">
        {data.map((item) => (
          <Cardcomp
            Name={item.experimentName}
            description={item.description}
            image={item.mainImage}
            difficulty={item.difficulty}
            materialsList={item.materialsList}
            subject={item.subject}
            steps={item.steps}
            safetyPrecautions={item.safetyPrecautions}
          />
        ))}
      </div>
      <div className="container">
        <h1>Content Creation</h1>
        <h2>Create New Experiment</h2>
        <label>Experiment Name:</label>
        <input
          type="text"
          name="experimentName"
          value={experiment.experimentName}
          onChange={(e) =>
            setExperiment({ ...experiment, experimentName: e.target.value })
          }
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={experiment.description}
          onChange={(e) =>
            setExperiment({ ...experiment, description: e.target.value })
          }
        />

        <label>Difficulty Level:</label>
        <input
          type="number"
          name="difficultyLevel"
          value={experiment.difficultyLevel}
          onChange={(e) =>
            setExperiment({ ...experiment, difficultyLevel: e.target.value })
          }
        />

        <label>Subject:</label>
        <input
          type="text"
          name="subject"
          value={experiment.subject}
          onChange={(e) =>
            setExperiment({ ...experiment, subject: e.target.value })
          }
        />

        <label>Main Image Upload:</label>
        <input
          type="file"
          accept="image/*"
          id="mainImage"
          onChange={(e) => handleMainImageUpload(e.target.files[0])}
        />
        {experiment.mainImage && <img src={experiment.mainImage} alt="LOl" />}

        <h3>Materials List:</h3>
        {experiment.materialsList.map((material, index) => (
          <div key={index}>
            <input
              type="text"
              name="name"
              placeholder="Material Name"
              value={material.name}
              onChange={(e) => handleInputChange(index, e)}
            />
            <input
              type="text"
              name="quantity"
              placeholder="Quantity"
              value={material.quantity}
              onChange={(e) => handleInputChange(index, e)}
            />
          </div>
        ))}
        <button onClick={handleAddMaterial}>Add Material</button>

        <label>Safety Precautions:</label>
        <textarea
          name="safetyPrecautions"
          value={experiment.safetyPrecautions}
          onChange={(e) =>
            setExperiment({ ...experiment, safetyPrecautions: e.target.value })
          }
        />

        <h3>Step-by-step Instructions:</h3>
        {experiment.steps.map((step, index) => (
          <div key={index}>
            <p>Step {index + 1}</p>
            <input
              type="file"
              accept="image/*"
              onChange={(e) => handleStepImageUpload(e.target.files[0], index)}
            />
            {step.image && <img src={step.image} alt={`Step ${index + 1}`} />}
            <textarea
              name="stepDescription"
              placeholder="Step Description"
              value={step.description}
              onChange={(e) => handleStepChange(index, "description", e)}
            />
          </div>
        ))}
        <button onClick={handleAddStep}>Add Next Step</button>

        <button onClick={handleSubmit}>Submit</button>
      </div>
    </div>
  );
};

export default ExperimentForm;
