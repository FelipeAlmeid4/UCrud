import React from 'react';
import ContainerRoutes from './src/core/routes/ContainerRoutes';

console.disableYellowBox = true;

if (__DEV__) {
  import('./src/config/ReactotronConfig').then(() =>
    console.log('Reactotron Configured'),
  );
}

const App = () => {
  return <ContainerRoutes />;
};

export default App;
