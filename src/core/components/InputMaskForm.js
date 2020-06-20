import React, {useState, useEffect, useCallback} from 'react';
import {View, Text, StyleSheet, ToastAndroid} from 'react-native';

import {TextInputMask} from 'react-native-masked-text';
import {Icon} from 'native-base';

const InputMaskForm = ({
  type,
  name,
  label,
  handleBlur,
  setFieldValue,
  value,
  error,
  maxLength = 50,
}) => {
  const [focused, setFocused] = useState(false);
  const [state, setState] = useState(undefined);

  useEffect(() => {
    setState(value);
  }, [value]);

  const handleChangeBlur = () => {
    setFocused(false);
    handleBlur(name);
  };

  const handleToast = useCallback(() => {
    ToastAndroid.showWithGravityAndOffset(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      5,
      5,
    );
  }, [error]);

  let {labelFocus, labelBlur, input} = styles;

  input = {...input, borderBottomColor: error ? '#e20000' : '#ccc'};

  return (
    <View style={styles.content}>
      <Text style={focused || state ? labelFocus : labelBlur}>{label}</Text>
      <TextInputMask
        type={type}
        style={input}
        onFocus={() => setFocused(true)}
        onBlur={handleChangeBlur}
        onChangeText={text => setFieldValue(name, text)}
        value={state}
        blurOnSubmit
        maxLength={maxLength}
      />
      {error ? (
        <Icon style={styles.icon} name="ios-alert" onPress={handleToast} />
      ) : null}
    </View>
  );
};

const styles = StyleSheet.create({
  content: {
    marginTop: 10,
    position: 'relative',
  },
  icon: {
    position: 'absolute',
    bottom: 2,
    right: 13,
    color: '#e20000',
    fontSize: 24,
  },
  input: {
    height: 40,
    fontSize: 18,
    color: '#000',
    borderBottomWidth: 0.6,
    paddingBottom: 0,
    paddingLeft: 6,
  },
  labelFocus: {
    position: 'absolute',
    left: 2,
    top: -11,
    fontSize: 15,
    color: '#8d8f90',
  },
  labelBlur: {
    position: 'absolute',
    left: 2,
    top: 12,
    fontSize: 17,
    color: '#686869',
  },
});

export default InputMaskForm;
