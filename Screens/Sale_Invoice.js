import React,{Component } from 'react'
import { View, Text, Button, StyleSheet, TextInput, Image, TouchableOpacity, ScrollView, Modal, Pressable } from 'react-native'
import {launchCamera,} from 'react-native-image-picker';
import {Calendar} from 'react-native-calendars';
import IPaddress from './IPaddress';
export default class Sale_Invoice extends Component {
    
    constructor(props)
    {
        super(props)
        this.state={
            newarray:[],
            cameraresponse:[],
            imageokay:'noimg',
            txname:'',
            txtotal:'',
            txreceive:'',
            txremaining:'',
            bill_Pic:'',
            bill_Date:'',
            itemdes:[],
            modalvisible:false,
            Invoice_Type:"Sale"
        }
    }
    RemoveViewbtn = (  )=>
   {
      
       let textinput = this.state.newarray;
       textinput.pop();
       this.setState({textinput});
       let inputvalue=this.state.itemdes;
       inputvalue.pop();
       this.setState({itemdes:inputvalue});     
   }
     AddValue = (text,index)=>
     {
        let inputv=this.state.itemdes;
        let chbool=false;
       if(inputv.length !== 0)
       {
        inputv.forEach(element=>{
            if(element.index===index)
            {
                element.text=text;
                chbool=true;
            }
        });
       }
       if(chbool)
       {
             this.setState({itemdes:inputv});
       }
       else{
        inputv.push({'text':text,'index':index});
        this.setState({
            itemdes:inputv
        });
       }
    }
    BillDetail=( index )=>
    {
        
        this.state.newarray.push(
            <View key={index}  >
             <Text  style={styles.lbcomon}>
                 Item Amount
             </Text>
             <TextInput
                style={styles.txcomon}
                onChangeText={(text)=>this.AddValue(text,index)}
                
             />     
            </View>
        )
        let textInput= this.state.newarray;
        this.setState({newarray:textInput})
    }
    CameraLaunch =  async()=>
    {
      await launchCamera({
           saveToPhotos:true,
           quality:0.2, 
           includeBase64:true,
       },(response)=>{
        this.setState({cameraresponse:response.assets});
        
       });
       this.setState({imageokay:'image'});
       this.setState({bill_Pic:this.state.cameraresponse[0]['uri']})
    } 
    SaveRecord= async ()=>
    {
        await fetch(IPaddress.dbaddress+'Invoices.php',{
            method:'Post',
            headers:{
                'Accept':'application/json',
                'Content-Type':'application/json',
            },
            body:JSON.stringify({
                P_name:this.state.txname,
                Total:this.state.txtotal,
                Payment:this.state.txreceive,
                Remaining:this.state.txremaining,
                Account_id:IPaddress.nameu,
                Bill_Pic:this.state.bill_Pic,
                Bill_date:this.state.bill_Date,
                Bill_Detail:this.state.itemdes,
                Invoice_Type:"Sale"
            })
        })
        .then((response)=>response.json())
        .then((jsresponse)=>{
            alert(JSON.stringify(jsresponse))
        })
        .catch((error)=>console.log(error))
    }
    Picture = ()=>
    {
        if(this.state.imageokay=="image")
        {
            return(<Image source={{uri:this.state.cameraresponse[0]["uri"]}} style={{height:100,width:100}} />);
        }
        else 
        {
            return(<Image source={require('../assests/no-photos.png')} style={{height:100,width:100}} />);
        }
    } 
    ShowModal=(value)=>
    {
        this.setState({modalvisible:value})
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
                    Customer Name
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
                    Receive Amount
                </Text>
                <TextInput
                   style={styles.txcomon}
                   onChangeText={(text)=>this.setState({txreceive:text})}
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
               <TouchableOpacity onPress={()=>this.CameraLaunch()} >
                            <Text style={styles.takephotobtn}> 
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
                    </ScrollView>
                </View>
                 <TouchableOpacity style={{backgroundColor:'red',marginTop:10,flexDirection:'row',alignItems:'center',justifyContent:'center'}} onPress={()=>this.SaveRecord()} >
                    <Image source={require('../assests/register.png')} style={{height:20,width:20,tintColor:'white'}} />
                    <Text style={{color:'white'}} >Save Record</Text>
                 </TouchableOpacity>
                 <Modal
                 visible={this.state.modalvisible}
                 animationType={'slide'}
                 transparent={true}
                 onRequestClose={()=>this.ShowModal(false)}
                 >
                    
                    <View style={{flex:1,alignItems:'center',justifyContent:'center'}} >
                    
                    <Calendar
                    onDayPress={(day)=>{
                        this.setState({bill_Date:day.dateString});
                        this.ShowModal(false);
                        
                    }}
                    />
                    </View>
                    
                 </Modal>
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