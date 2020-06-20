/* eslint-disable eslint-comments/no-unlimited-disable */
import React, {isValidElement, cloneElement, useEffect} from 'react';
import {Button, Text, View, Spinner} from 'native-base';
import {StyleSheet} from 'react-native';

const injectProps = (children, {values, errors, touched, ...rest}) => {
  return React.Children.map(children, child => {
    if (isValidElement(child)) {
      const {name} = child.props;
      const error = errors[name];
      const value = values[name];
      const isTouched = touched[name];
      return cloneElement(child, {...rest, error, value, touched: isTouched});
    }

    return child;
  });
};

const EditForm = ({children, navigation, form, loading}) => {
  const {
    handleChange,
    handleBlur,
    values,
    handleSubmit,
    setFieldValue,
    setFieldError,
    touched,
    errors,
  } = form;

  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent onPress={handleSubmit}>
          <Text>Salvar</Text>
        </Button>
      ),
    });
  }, [handleSubmit, navigation]);

  useEffect(() => {
    if (loading) {
      navigation.setOptions({
        headerRight: () => <Spinner color="blue" style={{width: 70}} />,
      });
    } else {
      navigation.setOptions({
        headerRight: () => (
          <Button transparent onPress={handleSubmit}>
            <Text>Salvar</Text>
          </Button>
        ),
      });
    }

    // eslint-disable-next-line
  }, [loading, navigation]);

  return (
    <View style={styles.form}>
      {injectProps(children, {
        handleChange,
        handleBlur,
        values,
        setFieldValue,
        setFieldError,
        errors,
        touched,
      })}
    </View>
  );
};

const styles = StyleSheet.create({
  form: {
    flex: 1,
    padding: 10,
  },
});

export default EditForm;
