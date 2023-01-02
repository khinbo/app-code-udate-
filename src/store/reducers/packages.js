import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import server from '../../server';
import toast from '../../toast';

const initialState = {
  initialLoading: false,
  packages: [],
};

// GET PACKAGES
export const getPackages = createAsyncThunk(
  'packages/getPackages',
  async (_, {dispatch}) => {
    dispatch(setInitialLoading(true));
    server.getPackages().then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data.message : 'network error');
      else dispatch(setPackages(resp.data));
      dispatch(setInitialLoading(false));
    });
  },
);

export const packageSlice = createSlice({
  name: 'packages',
  initialState,
  extraReducers: {},
  reducers: {
    setInitialLoading: (state, {payload}) => {
      state.initialLoading = payload;
    },
    setPackages: (state, {payload}) => {
      const filterData = payload.filter(i => i.is_active);
      state.packages = filterData;
    },
  },
});

export const {setInitialLoading, setPackages} = packageSlice.actions;

export default packageSlice.reducer;
