import React from 'react';
import {Switch, Item, Label} from 'native-base';
import {StyleSheet} from 'react-native';

const SwitchForm = ({name, label, setFieldValue, handleBlur, value, error}) => {
  return (
    <Item style={styles.container}>
      <Label>{label}</Label>
      <Switch
        trackColor={{false: '#767577', true: '#81b0ff'}}
        thumbColor={value ? '#f5dd4b' : '#f4f3f4'}
        ios_backgroundColor="#3e3e3e"
        onValueChange={data => setFieldValue(name, data)}
        onBlur={handleBlur(name)}
        value={value}
      />
    </Item>
  );
};

const styles = StyleSheet.create({
  container: {justifyContent: 'space-between', height: 45},
});
export default SwitchForm;
