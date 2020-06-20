import HomeScreen from '../screens/home/HomeScreen';
import ClientList from '../screens/clients/ClientList';
import ClientEdit from '../screens/clients/ClientEdit';

const stack = [
  {
    name: 'Home',
    component: HomeScreen,
    options: {title: 'Página Inicial'},
  },
  {
    name: 'ClientList',
    component: ClientList,
    options: {title: 'Clientes'},
  },
  {
    name: 'ClientEdit',
    component: ClientEdit,
  },
];

export {stack};
