import {useFormikContext} from 'formik';
import React from 'react';
import RadioButtonRN from 'radio-buttons-react-native';
import {View} from 'react-native';

export const AppFormRadio = ({name, ...otherProps}) => {
  const {values, setFieldValue, setFieldTouched} = useFormikContext();
  return (
    <View>
      <RadioButtonRN
        {...otherProps}
        box={false}
        initial={parseInt(values[name])}
        selectedBtn={value => setFieldValue(name, value.accessibilityLabel)}
        onBlur={() => setFieldTouched(name)}
        circleSize={12}
      />
    </View>
  );
};
