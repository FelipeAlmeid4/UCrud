import React, {useEffect} from 'react';
import {View, StyleSheet, FlatList} from 'react-native';
import {Header, Text, Item, Icon, Input, Button} from 'native-base';

const NoContent = () => {
  return (
    <Item style={styles.noContentContainer}>
      <Icon name="ios-archive" style={styles.noContentIcon} />
      <Text>Nenhum registro encontrado</Text>
    </Item>
  );
};

const ListForm = ({
  navigation,
  items,
  fetch,
  renderItem,
  onSearchQuery = () => undefined,
}) => {
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <Button transparent onPress={() => navigation.navigate('ClientEdit')}>
          <Text>Novo</Text>
        </Button>
      ),
    });
  }, [navigation]);

  useEffect(() => {
    const unsubscribe = navigation.addListener('focus', () => {
      if (fetch) {
        fetch();
      }
    });

    return unsubscribe;
  }, [fetch, navigation]);

  return (
    <View>
      <Header searchBar rounded>
        <Item>
          <Icon name="ios-search" />
          <Input
            placeholder="Pesquisar"
            onChangeText={text => fetch(onSearchQuery(text))}
          />
        </Item>
      </Header>
      {items.length === 0 ? (
        <NoContent />
      ) : (
        <FlatList
          data={items}
          renderItem={renderItem}
          keyExtractor={item => item.id}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  noContentContainer: {flexDirection: 'column', top: 280, borderBottomWidth: 0},
  noContentIcon: {fontSize: 50, color: '#9c9c9c'},
});

export default ListForm;
