import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import toast from '../../toast';
import server from '../../server';

const initialState = {
  initialLoading: true,
  loading: false,
  refresh: false,
  loader: false,
  loadMore: false,
  genres: [],
  contents: [],
  next_page: null,
  content_details: null,
  featured: null,
};

// GET GENRES
export const getGenres = createAsyncThunk(
  'genre/getGenres',
  async (_, {dispatch}) => {
    server.getGenres().then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data.message : 'network error');
      else dispatch(setGenres(resp.data));
      dispatch(setInitialLoading(false));
    });
  },
);

// GET GENRE CONTENTS
export const getGenreContents = createAsyncThunk(
  'genre/getGenreContents',
  async (payload, {dispatch}) => {
    dispatch(setLoading(true));
    dispatch(
      setContents({
        contents: {
          data: [],
          next_page_url: null,
        },
        featured: null,
      }),
    );
    server.getGenreContents(payload, 1).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else dispatch(setContents(resp.data));
      dispatch(setIsRefresh(false));
      dispatch(setLoading(false));
    });
  },
);

// LOAD MORE CONTENTS
export const loadMoreContents = createAsyncThunk(
  'genre/loadMoreContents',
  async (payload, {dispatch, getState}) => {
    const {genre} = getState();
    if (!genre?.next_page) return;
    if (genre?.loadMore) return;
    dispatch(setLoadMore(true));
    server.getGenreContents(payload, genre?.next_page).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else dispatch(updateContents(resp.data));
      dispatch(setLoadMore(false));
    });
  },
);

// GET CONTENT DETAILS
export const getContentDetails = createAsyncThunk(
  'genre/getContentDetails',
  async (payload, {dispatch}) => {
    dispatch(setLoading(true));
    server.getContentDetails(payload).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else dispatch(setContentDetails(resp.data));
      dispatch(setLoading(false));
    });
  },
);

export const genreSice = createSlice({
  name: 'genre',
  initialState,
  extraReducers: {},
  reducers: {
    setGenres: (state, {payload}) => {
      state.genres = payload;
    },
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setInitialLoading: (state, {payload}) => {
      state.initialLoading = payload;
      state.refresh = payload;
    },
    setIsRefresh: (state, {payload}) => {
      state.refresh = payload;
    },
    setLoader: (state, {payload}) => {
      state.loader = payload;
    },
    setLoadMore: (state, {payload}) => {
      state.loadMore = payload;
    },
    setContents: (state, {payload}) => {
      state.contents = payload.contents.data;
      state.featured =
        payload.contents.data.length > 2 ? payload.featured : null;
      state.next_page = payload?.contents.next_page_url
        ? payload?.contents.current_page + 1
        : null;
    },
    setContentDetails: (state, {payload}) => {
      state.content_details = payload;
    },
    updateContentLikes: (state, {payload}) => {
      const {id, data} = payload;
      state.contents.map((item, i) =>
        item.id === id ? (state.contents[i].likes = data) : null,
      );
    },
    updateContents: (state, {payload}) => {
      state.contents = [...state.contents, ...payload.data];
      state.next_page = payload.next_page_url
        ? payload?.current_page + 1
        : null;
    },
  },
});

export const {
  setGenres,
  setLoading,
  setIsRefresh,
  setLoader,
  setContents,
  updateContents,
  updateContentLikes,
  setInitialLoading,
  setLoadMore,
  setContentDetails,
} = genreSice.actions;

export default genreSice.reducer;
