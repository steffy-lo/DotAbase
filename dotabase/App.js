import React from 'react';
import Navigation from './src/components/Navigation';
import LoadingScreen from "./src/pages/LoadingScreen";
import LoginScreen from "./src/pages/LoginScreen";

import { Provider } from 'react-redux';
import { applyMiddleware, createStore } from 'redux';
import reducers from './src/reducers';
import thunk from 'redux-thunk';

import { createAppContainer, createSwitchNavigator } from "react-navigation";
import firebase from "firebase";
import { firebaseConfig } from "./src/config";
firebase.initializeApp(firebaseConfig);

export default function App() {
  const store = createStore(reducers, applyMiddleware(thunk));
  return (
    <Provider store={store}>
      <LoginNavigator/>
    </Provider>
  );
}

const LoginSwitchNavigator = createSwitchNavigator(
    {
      Loading: LoadingScreen,
      Login: LoginScreen,
      Dashboard: Navigation
    }
);

const LoginNavigator = createAppContainer(LoginSwitchNavigator);
