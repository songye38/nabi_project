import React from 'react';
import AppStack from './screens';
import { Provider as PaperProvider } from 'react-native-paper';

const App = () => {
  return (
  	<PaperProvider>
      <AppStack />
    </PaperProvider>
  );
};


export default App;

