import React from 'react'
import {createDrawerNavigator} from '@react-navigation/drawer'
import Sale_Stack from './Sale_Stack';
import Home from '../Screens/Home';
import Purchase_Stack from './Purchase_Stack';
import Login from '../Screens/Login';
import { Image } from 'react-native';
import { TouchableOpacity } from 'react-native-gesture-handler';
import Reports_Stack from './Reports_Stack';

export default function AppDrawer({navigation}) {
    
    const MyDrawer=createDrawerNavigator();

    return (
           <MyDrawer.Navigator screenOptions={{
               headerRight:()=><TouchableOpacity style={{paddingRight:10}} onPress={()=>navigation.navigate('Reports')} ><Image source={require('../assests/statistics.png')} style={{height:40,width:40,paddingRight:10}} /></TouchableOpacity>
           }} >
               <MyDrawer.Screen name="Home" component={Home} />
               <MyDrawer.Screen name="Sale Invoice" component={Sale_Stack} />
               <MyDrawer.Screen name="Purchase Invoice" component={Purchase_Stack} />
               <MyDrawer.Screen name="Login" component={Login} />
               <MyDrawer.Screen name="Reports" component={Reports_Stack} />
           </MyDrawer.Navigator>
    )
}
