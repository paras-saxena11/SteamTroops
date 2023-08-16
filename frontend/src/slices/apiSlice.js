import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const baseQuery = fetchBaseQuery({
  baseUrl: "https://steamtroops.onrender.com",
  // baseUrl: "http://localhost:5000/api",
});

export const apiSlice = createApi({
  baseQuery,
  endpoints: (builder) => ({
    submitExperiment: builder.mutation({
      query: (data) => ({
        url: "/experiments",
        method: "Post",
        body: data,
      }),
    }),
    getExperiments: builder.mutation({
      query: (data) => ({
        url: "/getexperiments",
        method: "get",
        body: data,
      }),
    }),
  }),
});

export const { useSubmitExperimentMutation, useGetExperimentsMutation } =
  apiSlice;
