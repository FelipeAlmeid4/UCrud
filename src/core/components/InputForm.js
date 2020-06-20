import React from 'react';
import {Item, Label, Input, Icon} from 'native-base';
import {StyleSheet, ToastAndroid} from 'react-native';

const InputForm = ({name, label, handleChange, handleBlur, value, error}) => {
  const handleToast = () => {
    ToastAndroid.showWithGravityAndOffset(
      error,
      ToastAndroid.SHORT,
      ToastAndroid.BOTTOM,
      5,
      5,
    );
  };

  return (
    <Item floatingLabel style={styles.input} error={!!error}>
      <Label>{label}</Label>
      <Input
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
      />
      {error ? <Icon name="ios-alert" onPress={handleToast} /> : null}
    </Item>
  );
};

const styles = StyleSheet.create({
  input: {
    margin: 5,
  },
});

export default InputForm;
