import React, { Component } from 'react'
import { Text, View,StyleSheet,Image,TouchableOpacity,TextInput, ScrollView } from 'react-native'
import IPaddress from './IPaddress';

export default class Registration_Account extends Component {
   
    constructor(props)
    {
        super(props);
        this.state={
            passpic:require('../assests/hidden.png'),
            showpass:true,
            user_Name:'',
            mail_address:'',
            password:'',
        }
    }
      SendRecord = async ()=>
      {
        console.log("inside")
        await fetch(IPaddress.dbaddress+'RegistrationApi.php',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                U_Name:this.state.user_Name,
                U_Mail:this.state.mail_address,
                U_Password:this.state.password
            })
        })
        .then((response)=>response.json())
        .then((jsresponse)=>alert(JSON.stringify(jsresponse)))
        .catch((error)=>console.log(error))
      }
    ChangePassprop = ()=>
    {
        if(this.state.showpass==true)
        {
            this.setState({passpic:require("../assests/eye.png"),showpass:false});
        }
        else if(this.state.showpass==false)
        {
            this.setState({passpic:require("../assests/hidden.png"),showpass:true});
        }
    }
    render() {
        return (
            <View style={styles.mainContainer} >
                  <Text style={{color:'red',fontSize:29,marginBottom:20,marginTop:'30%'}} >
                    Registeration Form
                </Text>
                <ScrollView contentContainerStyle={styles.scroll} >
               
                
                <TextInput
                placeholder="User Name"
                placeholderTextColor="gray"
                style={styles.commontexinput}
                onChangeText={(text)=>this.setState({user_Name:text}) }
                />
                 
                 
                <TextInput
                placeholder="Mail Address"
                placeholderTextColor="gray"
                style={styles.commontexinput}
                onChangeText={(text)=>this.setState({mail_address:text}) }
                />
                  
                {/* Passsword View TextBox */}
                <View style={styles.passview} >
                    <TouchableOpacity onPress={this.ChangePassprop} >
                    <Image source={this.state.passpic} style={styles.comonimg} />
                    </TouchableOpacity>
    
                <TextInput
                secureTextEntry={this.state.showpass}
                placeholderTextColor="gray"
                placeholder="Enter Password"
                style={styles.passtb}
                />  
                </View>
                   
                <View style={styles.passview} >
                    <TouchableOpacity  >
                    <Image source={this.state.passpic} style={styles.comonimg} />
                    </TouchableOpacity>
    
                <TextInput
                placeholder="Confrim Password"
                placeholderTextColor="gray"
                secureTextEntry={this.state.showpass}
                style={styles.passtb}
                onChangeText={(text)=>this.setState({password:text}) }
                />  
                </View>
    
                {/* Registor Btn */}
                <TouchableOpacity onPress={()=>this.SendRecord()} >
                    <Text style={styles.btnreg}  >
                        Register
                    </Text>
                </TouchableOpacity>
                </ScrollView>
            </View>
        )
    }
}

const styles=StyleSheet.create(
    {
        mainContainer:
        {
            flex:1,justifyContent:'center',alignItems:'center'
        },
        commonText:
        {
            textAlign:'center',width:250,marginBottom:10,color:'black'
        },
        commontexinput:
        {
            width:'100%',marginBottom:20,borderWidth:1,paddingLeft:10,color:'black',borderColor:'red',textAlign:'center'
        },
        passtb:
        {
           width:'100%',color:"black" ,paddingLeft:'15%'
        },
        passview:
        {
            flexDirection:'row',borderWidth:1,width:250,marginBottom:20,borderColor:'red'
        },
        comonimg:
        {
           height:30,width:30,marginTop:7,marginLeft:7
        },
        btnreg:
        {
            backgroundColor:'black',color:'white',textAlign:'center',height:30,paddingTop:5,
        },
        scroll:
        {
            padding:20
        }
    }
)