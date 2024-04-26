import React, { Component } from 'react'
import { Text, View } from 'react-native'
import {createNativeStackNavigator} from '@react-navigation/native-stack'
import Reports from '../Screens/Reports';
import Sales_Reports from '../Screens/Sales_Reports';
import Receivable_Reports from '../Screens/Receivable_Reports';
import Purchase_Report from '../Screens/Purchase_Report';
import Payable_Reports from '../Screens/Payable_Reports';

const MyStack = createNativeStackNavigator();
export default class Reports_Stack extends Component {
    
    
    render() {
     return(<MyStack.Navigator screenOptions={{headerShown:false}} >
         <MyStack.Screen name="Reports" component={Reports} />
         <MyStack.Screen name= "SaleReports"  component={Sales_Reports} />
         <MyStack.Screen name="ReceivableR" component={Receivable_Reports} />
         <MyStack.Screen name="PurchaseReports" component={Purchase_Report} />
         <MyStack.Screen name="PayableR" component={Payable_Reports} /> 
     </MyStack.Navigator>)
    }
}
