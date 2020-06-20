import React from 'react';
import {List as ListCore, ListForm} from '../../core/components';
import {Alert} from 'react-native';
import {formatFederalTaxNumber} from '../../core/utils';
import {ItemList} from '../../components';

const getButtonsAlert = ({textOk, onOk, onCancel, textCancel}) => {
  return [
    {
      text: textCancel,
      style: 'cancel',
      onPress: onCancel,
    },
    {text: textOk, onPress: onOk},
  ];
};

const ClientList = props => {
  const {navigation, remove} = props;

  const handleRemove = id => {
    Alert.alert(
      'Deseja Excluir ?',
      'A exclusão é permanente e não haverá retorno.',
      getButtonsAlert({
        textOk: 'Excluir',
        onOk: () => remove(id),
        textCancel: 'Voltar',
        onCancel: () => {},
      }),
      {cancelable: false},
    );
  };

  const handlePress = id => {
    navigation.navigate('ClientEdit', {
      id,
    });
  };

  return (
    <ListForm
      {...props}
      onSearchQuery={text =>
        `name BEGINSWITH '${text}' OR federalTaxIdentificationNumber BEGINSWITH '${text}'`
      }
      renderItem={({item: {federalTaxIdentificationNumber, name, id}}) => (
        <ItemList
          title={name}
          subTitle={`CPF ${formatFederalTaxNumber(
            federalTaxIdentificationNumber,
          )}`}
          onPress={() => handlePress(id)}
          onRemove={() => handleRemove(id)}
        />
      )}
    />
  );
};

export default ListCore.create(ClientList, {resource: 'people'});
