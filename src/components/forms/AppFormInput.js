import {useFormikContext} from 'formik';
import React from 'react';
import {View} from 'react-native';
import {AppTextField} from '../base/AppTextField';
import {ErrorMessage} from './ErrorMessage';

export const AppFormInput = ({name, ...otherProps}) => {
  const {
    values,
    errors,
    touched,
    handleChange,
    setFieldValue,
    setFieldTouched,
  } = useFormikContext();
  return (
    <View>
      <AppTextField
        {...otherProps}
        onChangeText={
          name === 'phone'
            ? val => setFieldValue(name, val.trim())
            : handleChange(name)
        }
        onBlur={() => setFieldTouched(name)}
        value={values[name]}
      />
      <ErrorMessage error={errors[name]} visible={touched[name]} />
    </View>
  );
};
