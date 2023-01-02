import {useFormikContext} from 'formik';
import React from 'react';
import {AppButton} from '../base/AppButton';

export const SubmitButton = ({...otherProps}) => {
  const {handleSubmit} = useFormikContext();
  return <AppButton {...otherProps} onPress={handleSubmit} />;
};
