import React from 'react';

export const toastRef = React.createRef();

const show = (title, duration, callback) =>
  toastRef.current?.show(title, duration ? duration : 500, callback);

export default {
  show,
};
