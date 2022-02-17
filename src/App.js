import React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {Provider} from 'react-redux';
import store from './redux/store';

import {SafeAreaView, StatusBar} from 'react-native';
import Router from './Router';
const App = () => {
  return (
    <Provider store={store}>
      <NavigationContainer theme={{colors: {background: 'transparent'}}}>
        <StatusBar
          animated={false}
          backgroundColor="#000"
          barStyle={'light-content'}
          showHideTransition={'fade'}
          hidden={false}
        />
        <SafeAreaView
          forceInset={{horizontal: 'never'}}
          style={{backgroundColor: 'transparent', flex: 1}}>
          <Router />
        </SafeAreaView>
      </NavigationContainer>
    </Provider>
  );
};
export default App;
