import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  experimentInfo: localStorage.getItem("experimentInfo")
    ? JSON.parse(localStorage.getItem("experimentInfo"))
    : null,
};

const experimentSlice = createSlice({
  name: "experimentSlice",
  initialState,
  reducers: {
    setExperimentState: (state, action) => {
      state.experimentInfo = action.payload;
      localStorage.setItem("experimentInfo", JSON.stringify(action.payload));
    },
  },
});

export const { setExperimentState } = experimentSlice.actions;
export default experimentSlice.reducer;
