import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toast from '../../toast';
import server from '../../server';

const initialState = {
  initialLoading: true,
  loading: false,
  refresh: false,
  demands: [],
  contents: [],
  featured: null,
  allCategories: [],
  categories: [],
  subCategories: [],
  next_page: null,
  loadMore: false,
  selectedCategory: null,
  selectedSubCategory: null,
};

// GET demands
export const getDemands = createAsyncThunk(
  'demand/getDemands',
  async (_, {dispatch}) => {
    server.getDemands().then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data.message : 'network error');
      else dispatch(setdemandData(resp.data));
      dispatch(setInitialLoading(false));
      dispatch(setRefresh(false));
    });
  },
);

// GET demand index
export const getDemandDefaultIndex = createAsyncThunk(
  'demand/getDemandDefaultIndex',
  async (payload, {dispatch}) => {
    dispatch(setInitialLoading(true));
    server.getDemandDefaultIndex(payload, 1).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data.message : 'network error');
      else {
        dispatch(setdemandContents(resp?.data));
        dispatch(setInitialLoading(false));
        dispatch(setRefresh(false));
      }
    });
  },
);

// LOAD MORE CONTENTS
export const loadMoreDemandContents = createAsyncThunk(
  'demand/loadMoreDemandContents',
  async ({id, type}, {dispatch, getState}) => {
    const {demand} = getState();
    if (!demand?.next_page) return;
    if (demand?.loadMore) return;
    dispatch(setLoadMore(true));
    server.loadMoreDemandContents(id, demand?.next_page, type).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else dispatch(updateContents(resp.data));
      dispatch(setLoadMore(false));
    });
  },
);

// ON SUBCATEGORY SELECT
export const OnSelecteSubCategory = createAsyncThunk(
  'demand/OnSelecteSubCategory',
  async ({id, type}, {dispatch}) => {
    dispatch(setLoading(true));
    server.loadMoreDemandContents(id, 1, type).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else dispatch(setContents(resp.data));
      dispatch(setLoading(false));
    });
  },
);

export const demandSice = createSlice({
  name: 'demand',
  initialState,
  extraReducers: {},
  reducers: {
    setInitialLoading: (state, {payload}) => {
      state.initialLoading = payload;
    },
    setRefresh: (state, {payload}) => {
      state.refresh = payload;
    },
    setdemandData: (state, {payload}) => {
      state.demands = payload;
    },
    setLoadMore: (state, {payload}) => {
      state.loadMore = payload;
    },
    setSelectedCategory: (state, {payload}) => {
      state.selectedCategory = payload;
    },
    setSelectedSubCategory: (state, {payload}) => {
      state.selectedSubCategory = payload;
    },
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    resetData: (state, {payload}) => {
      state.categories = [];
      state.contents = [];
      state.next_page = null;
      state.featured = null;
      state.selectedCategory = null;
      state.selectedSubCategory = null;
    },
    onSelectCategory: (state, {payload}) => {
      state.contents = [];
      state.next_page = null;
      state.selectedSubCategory = null;
      state.subCategories = state.allCategories?.filter(
        item => item?.parent_id === payload,
      );
    },
    setdemandContents: (state, {payload}) => {
      state.contents = payload?.contents?.data;
      state.featured = payload?.featured;
      state.next_page = payload?.contents?.next_page_url
        ? payload?.contents?.current_page + 1
        : null;
      state.allCategories = payload?.categories;
      state.categories = payload?.categories?.filter(
        item => item?.parent_id === null,
      );
      state.subCategories = payload?.categories?.filter(
        item => item?.parent_id !== null,
      );
    },
    setContents: (state, {payload}) => {
      state.contents = payload?.data;
      state.next_page = payload?.next_page_url
        ? payload?.current_page + 1
        : null;
    },

    updateContents: (state, {payload}) => {
      state.contents = [...state.contents, ...payload?.data];
      state.next_page = payload?.next_page_url
        ? payload?.current_page + 1
        : null;
    },
  },
});

export const {
  setInitialLoading,
  setdemandData,
  setRefresh,
  setdemandContents,
  setLoadMore,
  updateContents,
  resetData,
  setSelectedCategory,
  setSelectedSubCategory,
  onSelectCategory,
  setContents,
  setLoading,
} = demandSice.actions;

export default demandSice.reducer;
