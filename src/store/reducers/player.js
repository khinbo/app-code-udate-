/* eslint-disable curly */
import {createAsyncThunk, createSlice} from '@reduxjs/toolkit';
import navigation from '../../navigations/rootNavigation';
import video from '../../refs/video';
import server from '../../server';
import toast from '../../toast';

const initialState = {
  content_details: null,
  loading: false,
  contents: [],
  next_page: null,
  loadMore: false,
  liked: true,
  hasLiked: false,
  likes: 0,
  progress: 0,
  filePath: null,
  isDownloaded: false,
};

// GET RECOMMENDED CONTENT
export const getRecommmendedContents = createAsyncThunk(
  'player/getRecommmendedContents',
  async (payload, {dispatch}) => {
    dispatch(setLoading(true));
    dispatch(setContents([]));
    console.log(payload);
    server.getRecommmendedContents(payload).then(resp => {
      if (!resp.ok)
        toast.show(resp.data?.message ? resp.data?.message : 'network error');
      else {
        dispatch(setContents(resp?.data));
        dispatch(setLoading(false));
      }
    });
  },
);

// ON PRESS CONTENT
export const onContentViewHandler = createAsyncThunk(
  'player/onContentViewHandler',
  async ({item, type}, {dispatch}) => {
    dispatch(setContentDetails(item));
    dispatch(resetRecomended());
    setTimeout(() => {
      navigation.navigate('genreContentDetails', {type});
    }, 300);
  },
);

// PLAY ANOTHER VIDEO
export const onPlayVideo = createAsyncThunk(
  'player/onPlayVideo',
  async (payload, {dispatch}) => {
    // await video.stopAsync();
    dispatch(setContentDetails(payload));
    await video.playAsync();
  },
);

// LIKE OR UNLIKE VIEDO
export const ContentLikeHandler = createAsyncThunk(
  'player/ContentLikeHandler',
  async (payload, {dispatch, getState}) => {
    const {player} = getState();
    let resp = null;
    if (player.liked) {
      dispatch(updateLikes({id: payload?.id, isLiked: false}));
      dispatch(setLiked(false));
      resp = await server.unlike(payload);
    } else {
      dispatch(updateLikes({id: payload?.id, isLiked: true}));
      dispatch(setLiked(true));
      resp = await server.like(payload);
    }
    !resp.ok
      ? toast.show(resp?.data?.message ? resp.data?.message : 'network error')
      : null;
  },
);

export const playerSice = createSlice({
  name: 'player',
  initialState,
  extraReducers: {},
  reducers: {
    setContentDetails: (state, {payload}) => {
      state.content_details = payload;
      state.liked = payload?.hasLiked;
      state.hasLiked = payload?.hasLiked;
      state.likes = payload?.likes;
    },
    setLoading: (state, {payload}) => {
      state.loading = payload;
    },
    setLiked: (state, {payload}) => {
      state.liked = payload;
    },
    setContents: (state, {payload}) => {
      state.contents = payload;
    },
    resetRecomended: state => {
      state.contents = [];
    },
    setProgress: (state, {payload}) => {
      state.progress = payload;
    },
    setFilePath: (state, {payload}) => {
      state.filePath = payload;
    },
    setIsDownloded: (state, {payload}) => {
      state.isDownloaded = payload;
    },
    updateLikes: (state, {payload}) => {
      const {id, isLiked} = payload;
      state.hasLiked = isLiked;
      state.likes = isLiked ? state.likes + 1 : state.likes - 1;
    },
  },
});

export const {
  setContentDetails,
  setLoading,
  setContents,
  resetRecomended,
  setLiked,
  updateLikes,
  setProgress,
  setFilePath,
  setIsDownloded,
} = playerSice.actions;

export default playerSice.reducer;
