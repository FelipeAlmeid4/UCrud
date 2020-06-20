import React from 'react';
import {Item, Icon, Textarea, Form, Label} from 'native-base';
import {StyleSheet, ToastAndroid} from 'react-native';

const TextAreaForm = ({
  name,
  label,
  handleChange,
  handleBlur,
  value,
  error,
}) => {
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
    <Form style={styles.form}>
      <Textarea
        rowSpan={5}
        bordered
        placeholder={label}
        onChangeText={handleChange(name)}
        onBlur={handleBlur(name)}
        value={value}
      />

      {error ? <Icon name="ios-alert" onPress={handleToast} /> : null}
    </Form>
  );
};

const styles = StyleSheet.create({
  form: {
    margin: 3,
  },
});

export default TextAreaForm;
