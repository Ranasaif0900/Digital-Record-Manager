import React, { Component } from 'react';
import { Text, View,StyleSheet,Image,TouchableOpacity,TextInput } from 'react-native'
import IPaddress from './IPaddress'
export default class Login extends Component {
  constructor(props)
  {
     super(props);
     this.state={
        chkconnection:'Not connected',
        User_Name:'',
        U_Password:'',
     }
  }
    ChkAuthen=(response)=>
    {
        if(response=='"OK"')
        {
            this.props.navigation.navigate('Drawer') 
            IPaddress.nameu=this.state.User_Name
            
        }
        else
         alert("Incorrect User-Name or Password")
    }

    Log_in = async ()=>
    {
      await fetch(IPaddress.dbaddress+"Authen.php",{
        method:'Post',
        headers:{'Accept':'application/json',
        'Content-Type':'application/json'
    },
        body:JSON.stringify({
            UName:this.state.User_Name,
            UPass:this.state.U_Password,
        })
      })
      .then((response)=>response.json())
      .then((response)=>this.ChkAuthen(JSON.stringify(response)))
      .catch((error)=>console.log(error))
    }

    componentDidMount()
    {
        fetch(IPaddress.dbaddress+'DRMConnection.php')
        .then((response)=>response.json())
        .then((jsresponse)=>this.setState({chkconnection:JSON.stringify(jsresponse)}))
        .catch((error)=>console.log(error))
        if(this.state.chkconnection=='"Connected"')
            this.setState({textcolor:'green'})
    }
    render() {
        return (
            <View style={styles.mainContainer}>
                <Text style={{color:'red',fontSize:29,marginBottom:20}} >
                    Digital Record Manager
                </Text>
                {/* User Name Text Div */}
                <View style={styles.txusernamediv} >
               <Image source={require('../assests/id-card.png')} style={styles.comonimg} />
                <TextInput
                placeholder="Enter User Name"
                placeholderTextColor="black"
                onChangeText={(text)=>this.setState({User_Name:text})}
                style={styles.txusername}
                />
                </View>
                {/* Password  Div */}
                <View style={styles.txusernamediv}>
                    <TouchableOpacity>
                    <Image source={require('../assests/hidden.png')} style={styles.comonimg} />
                        </TouchableOpacity>
                    <TextInput 
                    placeholder="Enter Password"
                    placeholderTextColor="black"
                    onChangeText={(text)=>this.setState({U_Password:text})}
                    secureTextEntry={true}
                    style={styles.txusername}
                    />
                </View>
                {/* Login Btn */}
                     <TouchableOpacity style={styles.loginbtn} onPress={()=>this.Log_in()}  >
                         <Image source={require('../assests/login.png')} style={styles.loginimg} />
                         <Text style={styles.logtxt} > Log In </Text>
                     </TouchableOpacity>
                     <TouchableOpacity style={styles.loginbtn} onPress={()=>this.props.navigation.navigate('Registor Account')} >
                     <Image source={require('../assests/online-registration.png')} style={styles.loginimg} />
                         <Text style={styles.logtxt} > Registeration </Text>
    
                     </TouchableOpacity>
                     <Text style={styles.txConn} onPress={()=>this.props.navigation.navigate('Drawer')} >
                        {this.state.chkconnection}
                     </Text>
            </View>
        )
    }
}


const styles = StyleSheet.create({
    mainContainer:{
        flex:1,justifyContent:'center',alignItems:'center',
    },
    txusernamediv:
    {
        borderWidth:1,width:'70%',flexDirection:'row',paddingLeft:10,marginBottom:20,height:50,borderColor:'red'
    },
    txusername:
    {
       marginLeft:'10%',color:'black'
    },
    comonimg:
    {
        width:40,height:40
    },
    txConn:
    {
        color:'red',fontSize:16,
    },
    loginbtn:
    {
       backgroundColor:"black",flexDirection:'row',width:'65%',justifyContent:'center',padding:5,marginBottom:20
    },
    logtxt:
    {
        color:'white',fontSize:20
    },
    loginimg:
    {
        width:40,height:40,tintColor:'white'
    },
  
})
