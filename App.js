import 'react-native-gesture-handler';
import React from 'react';
import {View, Text} from 'react-native';
import Sale_Stack from './Navigator/Sale_Stack';
import Purchase_Stack from './Navigator/Purchase_Stack';
import AppDrawer from './Navigator/AppDrawer';
import Login_Stack from './Navigator/Login_Stack';

export default function App() {
  return (
    <Login_Stack/>
  );
}
