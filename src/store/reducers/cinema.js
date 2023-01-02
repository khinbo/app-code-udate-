import {createSlice} from '@reduxjs/toolkit';

const initialState = {
  initialLoading: false,
  refresh: false,
  brandNewMovies: [],
  upcomingMovies: [],
  movieDetails: null,
};

export const cinemaSlice = createSlice({
  name: 'cinema',
  initialState,
  extraReducers: {},
  reducers: {
    setInitialLoading: (state, {payload}) => {
      state.initialLoading = payload;
    },
    setRefresh: (state, {payload}) => {
      state.refresh = payload;
    },
    setBrandNewMovies: (state, {payload}) => {
      state.brandNewMovies = payload;
    },
    setUpcomingMovies: (state, {payload}) => {
      state.upcomingMovies = payload;
    },
    setMovieDetails: (state, {payload}) => {
      state.movieDetails = payload;
    },
  },
});

export const {
  setInitialLoading,
  setBrandNewMovies,
  setUpcomingMovies,
  setCoords,
  setRefresh,
  setMovieDetails,
} = cinemaSlice.actions;

export default cinemaSlice.reducer;
