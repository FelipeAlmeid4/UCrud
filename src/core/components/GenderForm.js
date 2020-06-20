import React from 'react';
import {Icon, Button, Text, Form} from 'native-base';
import {StyleSheet} from 'react-native';

const GenderForm = ({name, setFieldValue, handleBlur, value, error}) => {
  const {container, buttonSelected, button} = styles;
  return (
    <Form style={container}>
      <Button
        primary
        style={value === 'male' ? buttonSelected : button}
        onBlur={handleBlur(name)}
        onPress={() => setFieldValue(name, 'male')}>
        <Icon name="md-man" />
        <Text>Masculino</Text>
      </Button>
      <Button
        primary
        style={value === 'female' ? buttonSelected : button}
        onBlur={handleBlur(name)}
        onPress={() => setFieldValue(name, 'female')}>
        <Icon name="ios-woman" />
        <Text>Feminino</Text>
      </Button>
    </Form>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginTop: 5,
    marginBottom: 5,
  },
  buttonSelected: {
    width: 150,
    borderRadius: 10,
  },
  button: {
    width: 150,
    borderRadius: 10,
    backgroundColor: '#ccc',
  },
});

export default GenderForm;
