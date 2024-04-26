import React,{Component } from 'react'
import { View, Text, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Button,Pressable, Modal } from 'react-native'
import {launchCamera} from 'react-native-image-picker'
import {Calendar} from 'react-native-calendars'
import IPaddress from './IPaddress'
import { TOUCHABLE_STATE } from 'react-native-gesture-handler/lib/typescript/components/touchables/GenericTouchable'
export default class Purchase_Invoice extends Component {
    
    constructor(props)
    {
        super(props)
        this.state={
            newarray:[],
            cameraresponse:[],
            imagev:"noimage",
            txname:'',
            txtotal:'',
            txpay:'',
            txremaining:'',
            itemdes:[],
            modalvisible:false,
            bill_Date:'',
            bill_Pic:''
        }
        
    }
    SaveRecord= async ()=>
    {
        await fetch(IPaddress.dbaddress+'Invoices.php',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json'
            },
            body:JSON.stringify({
                P_name:this.state.txname,
                Total:this.state.txtotal,
                Remaining:this.state.txremaining,
                Payment:this.state.txpay,
                Account_id:IPaddress.nameu,
                Bill_Pic:this.state.bill_Pic,
                Bill_date:this.state.bill_Date,
                Bill_Detail:this.state.itemdes,
                Invoice_Type:"Purchase"
            })
        })
        .then((response)=>response.json())
        .then((response)=>{
            alert(JSON.stringify(response))
        })
        .catch((error)=>console.log(error))
        
    }
    CameraLaunch = async()=>
    {
       await launchCamera({
        saveToPhotos:true,
        quality:0.2,
        },(response)=>
        {
            this.setState({cameraresponse:response.assets});
        });
        this.setState({imagev:'image'})
        let cameraresponse=this.state.cameraresponse;
        if(cameraresponse.length!==0)
        {
            this.setState({bill_Pic:cameraresponse[0]['uri']});
        }
    }
    Picture = ()=>
    {
       if(this.state.imagev=="image")
       {
           return(<Image source={{uri:this.state.cameraresponse[0]["uri"]}} style={styles.imagest} />)
       }
         else{
            return(<Image source={require('../assests/no-photos.png')} style={styles.imagest} />)
         }
    }
    RemoveViewbtn = (  )=>
   {
      
       let textinput = this.state.newarray;
       textinput.pop();
       this.setState({textinput});  
       let inputdata=this.state.itemdes;
       inputdata.pop();
       this.setState({itemdes:inputdata});    
   }
    BillDetail=( index )=>
    {
        let textInput= this.state.newarray;
        this.state.newarray.push(
            <View key={index} >
              <Text style={styles.lbcomon}> 
                 Item Description
             </Text>
             <TextInput 
                style={styles.txcomon}
                onChangeText={(text)=>this.AddValue(text,index)}
                />
            </View>
        )
        this.setState({textInput});
    }
    AddValue =(value,index)=>
    {
        let inputdata=this.state.itemdes;
        let chk=false;
        if(inputdata.length!==0)
        {
            inputdata.forEach(element=>
                {
                    if(element.index===index)
                    {
                        element.text=value;
                        chk=true;
                    }
                });
        }
        if(chk)
        {
            this.setState({itemdes:inputdata});
        }
        else
        {
            inputdata.push({'text':value,'index':index});
            this.setState({itemdes:inputdata}) 
        }
    }
    ShowModal=(value)=>
    {
        this.setState({modalvisible:value});
    }
    CurrnetDate=()=>
    {
        var mydate=new Date()
        this.setState({bill_Date:mydate.toLocaleDateString()})
        console.log(this.state.bill_Date) 
        console.log("INside")
    }
   
    render() {
        
        return (
            <View style={styles.maincontainer} >
                 <View style={{flexDirection:'row'}} >
                <Text style={styles.mainH} >
                    Generate Invoice
                </Text>
                <Pressable style={{paddingLeft:30}} onPress={()=>this.ShowModal(true)}>
                    <Image source={require('../assests/calendar.png')} style={{height:40,width:40}} /></Pressable>
                </View>
                        <ScrollView>
    
                <Text style={styles.lbcomon}>
                    Vendor Name
                </Text>
                <TextInput
                   style={styles.txcomon}
                    onChangeText={(text)=>this.setState({txname:text})}
                />
                 <Text style={styles.lbcomon}>
                    Total Amount
                </Text>
                <TextInput
                   style={styles.txcomon}
                   onChangeText={(text)=>this.setState({txtotal:text})}
                />
                <Text style={styles.lbcomon}>
                    Pay Amount
                </Text>
                <TextInput
                   style={styles.txcomon}
                   onChangeText={(text)=>this.setState({txpay:text})}
                />
                <Text style={styles.lbcomon}>
                    Remaining Amount
                </Text>
                <TextInput
                   style={styles.txcomon}
                   onChangeText={(text)=>this.setState({txremaining:text})}
                />
                {/* Image View */}
                <View style={styles.imageView} >
                      
                    <Text style={styles.imglb} >
                        Bill Pic
                    </Text>
                    {this.Picture()}
               <TouchableOpacity  onPress={()=> this.CameraLaunch()} >
                            <Text style={styles.takephotobtn} >
                                Take Pic
                            </Text>
                        </TouchableOpacity>
                </View>
                <View>
                    <ScrollView  nestedScrollEnabled={true}
                    contentContainerStyle={styles.scrolview}
                    >
                    {this.state.newarray.map((value)=>{
                        return value})}
                    <TouchableOpacity style={styles.scrolview} onPress={()=> this.BillDetail(this.state.newarray.length)} >
                    <Text style={styles.addbtn} >
                        Add Items
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={styles.scrolview} onPress={()=> this.RemoveViewbtn()} >
                    <Text style={styles.addbtn} >
                        Remove  Items
                    </Text>
                </TouchableOpacity>
                <TouchableOpacity style={{backgroundColor:'red',marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>this.SaveRecord()} >
                    <Image source={require('../assests/register.png')} style={{height:20,width:20,tintColor:'white'}} />
                    <Text style={{color:'white'}} >Save Record</Text>
                 </TouchableOpacity>
                        <Modal
                        visible={this.state.modalvisible}
                        animationType={'slide'}
                        onRequestClose={()=>this.ShowModal(false)}
                        transparent={true}
                        >
                            <View style={{flex:1,justifyContent:'center',alignItems:'center'}} >
                                <Calendar
                                 onDayPress={(day)=>
                                {
                                    this.setState({bill_Date:day.dateString})
                                    this.ShowModal(false)
                                }}
                                />
                            </View>

                        </Modal>

                    </ScrollView>
                </View>
                 
                </ScrollView>
            </View>
        )
    }
}
const styles= StyleSheet.create({
    maincontainer:
    {
            flex:1,padding:30,backgroundColor:'white',justifyContent:'center',alignItems:"center"
    },
    scrolview:
    {
      marginTop:20
    },
    imglb:
    {
       fontWeight:'bold',fontSize:20
    },
    imageView:
    {
       height:120,width:200,marginBottom:20,marginTop:20,alignItems:'center'
    },
    imagest:
    {
        height:100,width:100
    },
    takephotobtn:
    {
        fontSize:20,color:'white',fontWeight:'bold',backgroundColor:'red',width:200,textAlign:'center',
    },
    lbcomon:
    {
        marginTop:10,color:'gray',textAlign:'left',fontWeight:'bold'
    },
    txcomon:
    {
        borderWidth:1,marginTop:10,width:'100%',color:'black',textAlign:'center',height:40
    },
    addbtn:
    {
        backgroundColor:'red',color:'white',width:200,textAlign:'center'
    },
    dynamicimg:
    {
        height:20,width:20,marginTop:10
    },
    mainH:
    {
        color:'red',textAlign:'center',fontSize:29,marginBottom:20
    }
})