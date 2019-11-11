import React from 'react';
import AppStack from './screens';
import { Provider as PaperProvider } from 'react-native-paper';
import { Provider } from 'react-redux';
import { createStore } from 'redux';
import allReducers from './reducer';
const store = createStore(allReducers);



const App = () => {
  return (
  	<Provider store={store}>
	  	<PaperProvider>
	      <AppStack />
	    </PaperProvider>
	</Provider>
  );
};


export default App;

