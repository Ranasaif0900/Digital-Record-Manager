import React from 'react'
import {NavigationContainer} from '@react-navigation/native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Login from '../Screens/Login';
import AppDrawer from './AppDrawer';
import Registration_Account from '../Screens/Registration_Account';

export default function Login_Stack() {
   
    const MyStack=createNativeStackNavigator();
   
    return (
       <NavigationContainer>
           <MyStack.Navigator screenOptions={{headerShown:false}} >
               <MyStack.Screen  name="login" component={Login} />
               <MyStack.Screen name="Drawer" component={AppDrawer} />
               <MyStack.Screen name="Registor Account" component={Registration_Account} />
           </MyStack.Navigator>

       </NavigationContainer>
    )
}
