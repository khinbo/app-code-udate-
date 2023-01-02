import React from 'react';

export const videoRef = React.createRef();

const getStatusAsync = () => videoRef?.current?.getStatusAsync();

const unloadAsync = () => videoRef?.current?.unloadAsync();

const stopAsync = () => videoRef?.current?.stop();

const loadAsync = () => videoRef?.current?.loadAsync();

const playAsync = () => videoRef?.current?.resume();

export default {
  getStatusAsync,
  unloadAsync,
  stopAsync,
  loadAsync,
  playAsync,
};
