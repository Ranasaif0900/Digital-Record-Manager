import React, { Component } from 'react'
import { Image, StyleSheet, Text, View } from 'react-native'
import IPaddress from './IPaddress'

export default class Home extends Component {
    componentDidMount()
    {
        
    }
    render() {
        return (
            <View style={styles.maincontainer} >
                {/* REport View */}
                <View style={styles.reportview} >
                    {/* Receivalbe View */}
                <View style={styles.viewr} >
                    <Image source={require('../assests/receive.png')} style={styles.img} />
                    <Text style={styles.text} >
                        Receivables{'\n'}0
                    </Text>
                    </View>
                    {/* Payable View */}
                    <View style={styles.viewp} >
                    <Image source={require('../assests/payable.png')} style={styles.img} />
                    <Text style={styles.text} >
                        Payables{'\n'}0
                    </Text>
                    </View>
                </View>
                <View style={{flex:3,backgroundColor:'white',width:'100%',alignItems:'center'}} >
                    <Text>New View</Text>
                </View>
            </View>
        )
    }
}
const styles=StyleSheet.create(
    {
        maincontainer:
        {
            flex:1,alignItems:'center',backgroundColor:'red'
        },
        img:
        {
            height:60,width:60
        },
        reportview:
        {
            backgroundColor:'red',flexDirection:'row',paddingTop:10,paddingBottom:10
        },
        text:
        {
            color:'white'
        },
        viewp:
        {
            marginLeft:30
        },
        viewr:
        {
            marginRight:30
        }
    }
)