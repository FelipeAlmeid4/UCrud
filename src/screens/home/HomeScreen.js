import React from 'react';
import {View, Text, Button} from 'react-native';
import {Card, CardItem, Body} from 'native-base';

const HomeScreen = ({navigation}) => {
  return (
    <View>
      <Card>
        <CardItem header>
          <Text>React Native Template</Text>
        </CardItem>
        <CardItem>
          <Body>
            <Text>
              Esse template tem uma estrutura de CRUD que usa o realm como banco
              de dados, o objetivo é criar de forma simples e eficiente telas
              com todos os recursos necessários para a persitência de dados seja
              um banco de dados local ou uma api.
            </Text>
          </Body>
        </CardItem>
      </Card>
      <Button
        title="Crud Clientes"
        onPress={() => navigation.navigate('ClientList')}
      />
    </View>
  );
};

export default HomeScreen;
