import React from 'react'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Purchase_Invoice from '../Screens/Purchase_Invoice';
import Payable from '../Screens/Payable';
export default function Purchase_Stack() {
    const MyStack= createNativeStackNavigator();
    return (
            <MyStack.Navigator screenOptions={{
                headerShown:false
            }} >
                <MyStack.Screen name="Purchase_Invoice" component={Purchase_Invoice} />
                <MyStack.Screen name="Payables" component={Payable} />
            </MyStack.Navigator>
    )
}
