import React from 'react';

export const videoRef = React.createRef();

const getStatusAsync = () => videoRef?.current?.getStatusAsync();

const unloadAsync = () => stopAsync();

const stopAsync = () => {
  videoRef?.current?.setNativeProps({paused: false});
  seek(0);
};

const loadAsync = () => videoRef?.current?.loadAsync();

const playAsync = () => videoRef?.current?.setNativeProps({paused: false});

const pauseAsync = () => videoRef?.current?.setNativeProps({paused: true});

const seek = val => videoRef?.current?.seek(val);

const seekTo = (val, opt) => videoRef?.current?.seek(val, opt);

export default {
  getStatusAsync,
  unloadAsync,
  stopAsync,
  loadAsync,
  playAsync,
  seek,
  seekTo,
  pauseAsync,
};
