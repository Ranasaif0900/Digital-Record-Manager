import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Sale_Invoice from '../Screens/Sale_Invoice';
import Receivable from '../Screens/Receivable';
import CameraPage from '../Screens/CameraPage';

export default function Sale_Stack() {
   const MyStack = createNativeStackNavigator();
    return (
         <MyStack.Navigator screenOptions={{
             headerShown:false
         }} >
             <MyStack.Screen name="Sale_Invoice" component={Sale_Invoice} />
             <MyStack.Screen name="Receivable" component={Receivable} />
             <MyStack.Screen name = "Camera" component = {CameraPage} />
         </MyStack.Navigator>
    )
}
