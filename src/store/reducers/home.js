import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toast from '../../toast';
import server from '../../server';
import helpers from '../../constants/helpers';

const initialState = {
  initialLoading: false,
  refresh: false,
  sliderData: [],
  recentlyWatched: [],
  justForYou: [],
  mightInterestedContent: [],
  popular: [],
  images: [],
  coords: '',
};

// GET HOME CONTENTS

export const getHomeData = createAsyncThunk(
  'genre/getHomeData',
  async (_, {dispatch}) => {
    dispatch(setInitialLoading(true));
    server.getHomeData().then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data.message : 'network error');
      else 
      {
        var newArray = resp.data.slider_data.sort((a, b) =>
        { a.created_at.split('/').reverse().join().localeCompare(b.created_at.split('/').reverse().join())}) 
        // alert(JSON.stringify(resp.data.recently_watched))
      dispatch(sethomeData(resp.data)); // reverse function
      dispatch(setInitialLoading(false));
      dispatch(setRefresh(false));
      }
    });
  },
);

export const homeSice = createSlice({
  name: 'home',
  initialState,
  extraReducers: {},
  reducers: {
    setInitialLoading: (state, {payload}) => {
      state.initialLoading = payload;
    },
    setRefresh: (state, {payload}) => {
      state.refresh = payload;
    },
    setCoords: (state, {payload}) => {
      state.coords = payload;
    },
    sethomeData: (state, {payload}) => {
      const {
        slider_data,
        recently_watched,
        justForYou,
        might_interested_content,
        popular,
      } = payload;
      const covers = slider_data.map(item => helpers.getImage(item.cover));
      state.sliderData = slider_data.reverse();
      state.recentlyWatched = recently_watched.reverse();
      state.justForYou = justForYou.reverse();
      state.popular = popular.reverse();
      state.images = covers.reverse();
      state.mightInterestedContent = might_interested_content.reverse();
    },
  },
});

export const {setInitialLoading, sethomeData, setCoords, setRefresh} =
  homeSice.actions;

export default homeSice.reducer;
