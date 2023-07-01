import * as React from 'react';
import {useEffect,useState} from 'react';
import { View, Text,StyleSheet, Image,Dimensions, TextInput } from 'react-native';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import {db} from './firebase.js';

export default function Modal(props){
    const [nome,setNome] = useState('');
    const [mensagem, setMensagem] = useState('');

    const enviarMensagem = () =>{
        db.collection('contato').add({
          nome: nome,
          mensagem: mensagem
        })
        alert('Sua mensagem foi enviada com sucesso.');

        setNome('');

        setMensagem('');
        
    }

    return (
        <View style={styles.modalParent}>
            <View style={{position:'absolute',right:0,top:0,width:50,height:50,backgroundColor:'#333',
          zIndex:2,justifyContent:'center'}}>
              <TouchableOpacity style={{width:'100%',height:'100%',justifyContent:'center'}} onPress={()=>props.setModal(!props.showModal)}>
                <Text style={{color:'white',textAlign:'center'}}>X</Text>
                </TouchableOpacity>
            </View>
            <View style={styles.boxModal}>
              <Text style={{...styles.textHeader,fontSize:15}}>Qual seu nome?</Text>
              <TextInput value={nome} onChangeText={(text)=>setNome(text)} style={{height:40,width:'100%',borderColor:'#ccc',borderWidth:1,marginBottom:20}} multiline
        numberOfLines={4}></TextInput>
        <Text style={{...styles.textHeader,fontSize:15}}>Qual sua mensagem?</Text>
              <TextInput value={mensagem} onChangeText={(text)=>setMensagem(text)} style={{height:80,width:'100%',borderColor:'#ccc',borderWidth:1,marginBottom:20}} multiline
        numberOfLines={4}></TextInput>
          <TouchableOpacity onPress={()=>enviarMensagem()} style={{...styles.btnNavigation,justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:14}}>Enviar!</Text>
          </TouchableOpacity>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    modalParent:{
      position:'absolute',
      left:0,
      top:0,
      width:'100%',
      height:'100%',
      backgroundColor:'rgba(0,0,0,0.6)',
      zIndex:1
    },
    boxModal:{
      backgroundColor:'white',
      height:370,
      width:'100%',
      position:'absolute',
      left:0,
      top:'50%',
      marginTop:-185,
      padding:10
    },
    btnNavigation:{
        backgroundColor:'#5f5380',
        padding:20,
        marginTop:15,
        flexDirection:'row'
      }
  })