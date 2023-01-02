import React from 'react';

export const sheetRef = React.createRef();

const snapToIndex = index => {
  sheetRef.current?.snapToIndex(index);
};
const expand = () => {
  sheetRef.current?.expand();
};
const close = () => {
  sheetRef.current?.close();
};

const forceClose = () => {
  sheetRef.current?.forceClose();
};

export default {
  snapToIndex,
  close,
  expand,
  forceClose,
};
