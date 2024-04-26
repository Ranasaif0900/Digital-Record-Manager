import React, { Component } from 'react'
import { FlatList, Image, StyleSheet, Text, TouchableOpacity, View } from 'react-native'

export default class Reports extends Component {
    constructor(props)
    {
      super(props);
      this.state={
          navigatebtns:[{name:'Sales Reports',Key:0,pic:require('../assests/sales.png'),page:'SaleReports'},
          {name:'Purchase Reports',Key:1,pic:require('../assests/report.png'),page:'PurchaseReports'},
          {name:'Payables Reports',Key:2,pic:require('../assests/payable.png'),page:'PayableR'},
          {name:'Receivalbes Reports',Key:3,pic:require('../assests/receive.png'),page:'ReceivableR'}
        ]
      }
    }
    render() {
        return (
            <View styles={styles.mainContainer} >
                <Text style={styles.headingtxt} >Reports </Text>
                <FlatList
                data={this.state.navigatebtns}
                renderItem={({item})=>(<TouchableOpacity style={styles.buttons} onPress={()=>this.props.navigation.navigate(item.page)} >
                    <Text style={styles.btntext} >{item.name} </Text>
                    <Image source={item.pic} style={{height:50,width:50,marginLeft:10}} />
                </TouchableOpacity>)}
                />
            </View>
        )
    }
}
const styles=StyleSheet.create(
    {
        headingtxt:
        {
            color:'red',textAlign:'center',marginTop:20,fontSize:29
        },
        mainContainer:
        {
            flex:1,justifyContent:'center',alignItems:'center'
        },
        buttons:
        {
            flexDirection:'row',marginTop:10,justifyContent:'center',backgroundColor:'red',alignItems:'center',paddingTop:10,paddingBottom:10
        },
        btntext:
        {
            color:'white'
        }
    }
)