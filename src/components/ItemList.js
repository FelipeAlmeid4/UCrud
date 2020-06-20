import React from 'react';
import {StyleSheet, View, TouchableOpacity, Text} from 'react-native';
import {Icon} from 'native-base';

const ItemList = ({onRemove, onPress, title, subTitle}) => {
  return (
    <View style={styles.item}>
      <TouchableOpacity style={styles.itemEdit} onPress={onPress}>
        <Text style={styles.name}>{title}</Text>
        <Text style={styles.text}>{subTitle}</Text>
      </TouchableOpacity>

      <Icon name="trash" style={styles.icon} onPress={onRemove} />
    </View>
  );
};

const styles = StyleSheet.create({
  item: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginLeft: 10,
    marginRight: 10,
    height: 50,
    marginBottom: 5,
  },
  itemEdit: {
    flexDirection: 'column',
    flex: 1,
  },
  name: {
    fontSize: 20,
    color: '#525252',
  },
  text: {
    fontSize: 12,
    color: '#717171',
  },
  icon: {
    color: '#3f51b5',
    padding: 10,
  },
});

export default ItemList;
