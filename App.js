import * as React from 'react';
import {useEffect,useState} from 'react';
import { View, Text,StyleSheet, Image,Dimensions, TextInput } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { ScrollView, TouchableOpacity } from 'react-native-gesture-handler';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { StatusBar } from 'expo-status-bar';
import Modal from './Modal.js';
import * as WebBrowser from 'expo-web-browser';



function HomeScreen({navigation}) {
  return (
    <View style={{padding:15,flex:1}}>
        <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
            <Text style={styles.textHeader}>Para onde você deseja navegar?</Text>

        <TouchableOpacity onPress={()=>navigation.navigate('Home')} style={styles.btnNavigation}>
          <Ionicons name="md-home" size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Home</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Sobre')} style={styles.btnNavigation}>
          <Ionicons name="ios-information-circle" size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Sobre</Text>
        </TouchableOpacity>

        <TouchableOpacity onPress={()=>navigation.navigate('Portfolio')} style={styles.btnNavigation}>
          <Ionicons name="ios-list-box" size={29} color='white' />
          <Text style={{color:'white',marginTop:8,marginLeft:8}}>Portfólio</Text>
        </TouchableOpacity>



        </ScrollView>


    </View>
  );
}

function SobreScreen({navigation}) {

  const [showModal,setModal] = useState(false);
 

  const abrirModalContato = () =>{
     setModal(!showModal);
  }

 



  let widthWindow = Dimensions.get('window').width - 30 -40;
  //https://scontent.ffln1-1.fna.fbcdn.net/v/t1.0-9/39339120_10215252457240059_3825243919885533184_n.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFtKTYxrBXZYP_2kxfmoywu4TRqoCKwgsDhNGqgIrCCwED5a3INQMXIihI3ua89SmE&_nc_ohc=n_JY5Fo1JdAAX-IDHaS&_nc_ht=scontent.ffln1-1.fna&oh=8382319b91e7f7a05f1dea3c068d98a1&oe=5FCC3483
  return (
    <View style={{flex:1}}>

      {
        (showModal)?
        <Modal showModal={showModal} setModal={setModal}  />
        :
        <View></View>
      }
    
    <View style={{padding:10,flex:1}}>

    <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Sobre</Text>

        <Image style={{width:widthWindow,height:widthWindow,marginTop:20}} source={{uri:'https://scontent.ffln1-1.fna.fbcdn.net/v/t1.0-9/39339120_10215252457240059_3825243919885533184_n.jpg?_nc_cat=100&ccb=2&_nc_sid=09cbfe&_nc_eui2=AeFtKTYxrBXZYP_2kxfmoywu4TRqoCKwgsDhNGqgIrCCwED5a3INQMXIihI3ua89SmE&_nc_ohc=n_JY5Fo1JdAAX-IDHaS&_nc_ht=scontent.ffln1-1.fna&oh=8382319b91e7f7a05f1dea3c068d98a1&oe=5FCC3483'}} />
        <View>
          <Text style={{fontSize:20,marginTop:10}}>Guilherme Grillo / CEO</Text>
          <Text style={{fontSize:16,marginTop:10}}>
Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis velit ex. Nullam finibus, enim ac malesuada maximus, dui neque condimentum nunc, quis porttitor sapien quam sit amet nibh. Aliquam ultricies lorem nec condimentum placerat. Cras id rutrum nulla. Nulla facilisi. Etiam a vehicula lacus, laoreet pulvinar orci. Morbi massa sem, hendrerit non finibus ac, condimentum nec lorem. Suspendisse non leo hendrerit, fermentum diam a, egestas leo. Duis tincidunt, nisl id accumsan eleifend, est mi porta turpis, in aliquam eros erat sit amet turpis. Cras ultrices dolor consequat ultricies consequat. Pellentesque habitant morbi tristique senectus et netus et malesuada fames ac turpis egestas. Quisque gravida ultrices purus, eget commodo justo. Curabitur sollicitudin nibh nisi, eget vehicula risus accumsan at.</Text>

          <TouchableOpacity onPress={()=>abrirModalContato()} style={{...styles.btnNavigation,justifyContent:'center'}}>
            <Text style={{color:'white',fontSize:17}}>Entrar em contato!</Text>
          </TouchableOpacity>

</View>
        

    </ScrollView>


</View>
</View>
  );
}


function PortfolioScreen({navigation,route}) {

  const [images,setImages] = useState([
    {
      img: require('./resources/img1.jpg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    },
    {
      img: require('./resources/img2.jpg'),
      width:0,
      height:0,
      ratio:0,
      website:'https://cursos.dankicode.com'
    }
  ])

  const [windowWidth,setWindowWidth] = useState(0);

  useEffect(() => {

    let windowWidthN = Dimensions.get('window').width;

    setWindowWidth(windowWidthN - 30 - 40);

    let newImages = images.filter(function(val){
        let w = Image.resolveAssetSource(val.img).width;
        let h = Image.resolveAssetSource(val.img).height;

        val.width = w;
        val.height = h;

        val.ratio = h/w;

        return val;

    })

    setImages(newImages);

  }, [])


  const abrirNavegador = async (website) =>{
      let result = await WebBrowser.openBrowserAsync(website);
  }

  return (
    <View style={{padding:15,flex:1}}>
    <ScrollView contentContainerStyle={{padding:20}} style={styles.container}>
        <Text style={styles.textHeader}>Os últimos projetos!</Text>
        
         
         
         {
           images.map(function(val){
              return (
                <View style={styles.parentImage}>
                  <Image 
                  style={{width:windowWidth,height:windowWidth*val.ratio,resizeMode:'stretch'}} source={val.img} />


                  <TouchableOpacity onPress={()=>abrirNavegador(val.website)} style={styles.botaoAbrirNavegador}><Text style={{textAlign:'center',color:'white',fontSize:18}}>Abrir no navegador!</Text></TouchableOpacity>



                </View>
              )
           })
         }
         
        
      

      
    </ScrollView>


</View>
  );
}


const Tab = createBottomTabNavigator();
const Stack = createStackNavigator();
function App() {


  return (
    <NavigationContainer>
    
    <StatusBar hidden />
 
    <Tab.Navigator
      screenOptions={({ route }) => ({
        tabBarIcon: ({ focused, color, size }) => {
          let iconName;

          if (route.name === 'Home') {
            iconName = focused
              ? 'ios-home'
              : 'ios-home';
          } else if (route.name == 'Portfolio') {
            iconName = focused ? 'ios-list-box' : 'ios-list';
          }else if(route.name == 'Sobre'){
              iconName = focused ? 'ios-information-circle' : 'ios-information-circle';
          }

          // You can return any component that you like here!
          return <Ionicons name={iconName} size={size} color={color} />;
        },
      })}
      tabBarOptions={{
        activeTintColor: '#5f5380',
        inactiveTintColor: 'gray',
      }} 

      
      >

      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="Sobre" component={SobreScreen} />
      <Tab.Screen name="Portfolio" component={PortfolioScreen} />
    </Tab.Navigator>
  </NavigationContainer>
  );
}

export default App;


const styles = StyleSheet.create({
  container:{
    backgroundColor:'white'
  },
  textHeader:{
    color:'#5f5380',
    fontSize:24
  },
  btnNavigation:{
    backgroundColor:'#5f5380',
    padding:20,
    marginTop:15,
    flexDirection:'row'
  },
 
  parentImage:{
    marginTop:30
  },
  botaoAbrirNavegador:{
    padding:10,
    backgroundColor:'#5f5380',
  },
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
  }
})
