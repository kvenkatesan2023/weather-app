import { StatusBar } from 'expo-status-bar';
import React, { useState } from 'react';
import { View, Text, TextInput, TouchableOpacity, StyleSheet,Image } from 'react-native';
import axios from 'axios';
import { SafeAreaView } from 'react-native-web';

const API_KEY = 'b21134d557e1aa0c338d3d6445ed843e'; // Replace with your OpenWeatherMap API key

const App = () => {
  const [city, setCity] = useState('');
  const [weather, setWeather] = useState(null);
  const [temperature, setTemperature] = useState(null);
  const [system,setSystem]=useState(null);
  const [maintain,setMaintain] =useState(null);
  const [img ,setImg] = useState(null);
  const[des ,setDes]=useState(null);
  const[spe,setSpe]=useState(null);

  
  const getWeather = () => {
    if (city.trim() === '') {
      setWeather('Please enter a city');
      setTemperature(null);
      setSystem(null);
     
    } else {
      axios
        .get(`http://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${API_KEY}`)
        .then(response => {
          const {description} = response.data.weather[0];
          const temp = response.data.main.temp;
          
          const city =  response.data.weather;
          const humidity = response.data.main.humidity;
          const feels_like = response.data.main.feels_like;
          const speed = response.data.wind.speed
          const visibility = response.data.visibility;
          const sunrise = response.data.sys.sunrise;
          const sunset = response.data.sys.sunrise;
          
        
          setWeather(`${description}`);
          setTemperature(`${temp}°C`);
          setSystem(`${visibility}`)
          setMaintain(`${feels_like}°C`)
          
          setImg(`${humidity}%`)
          setDes(`${description}`)
          setSpe(`${speed}`)
          
          
        })
        .catch(error => {
          console.error('Error fetching weather data:', error);
          setWeather('Failed to fetch weather data');
          setTemperature(null);
        });
    }
  };

  return (
    <SafeAreaView style={styles.container}>
    <View style={styles.container1}>
      <Text style={styles.title}>Weather App</Text>
      <TextInput
        style={styles.input}
        placeholder="Enter city"
        value={city}
        onChangeText={text => setCity(text)}
      />
      <Text style={{fontSize: 18,fontWeight: 'bold',textAlign:'center',}}>{city}</Text>
       <View style={styles.logo}>
      <Image style={{width:120,height:120,}} source={{uri:`https://openweathermap.org/img/wn/02d.png`}}/>
      <Text style={{fontSize:23,marginRight:14,fontWeight:'bold',textAlign:'center'}}>{temperature}   </Text>
      
      
      </View>
      <Text style={styles.description}>{weather}</Text>
 
      <View style={styles.extraInfo}>
          <View style={styles.info}>
             <Image style={styles.smallIcon}
               source={require('./assets/temp.jpg')}
             />
             <Text style={styles.infoText}>{maintain}</Text>
             <Text style={styles.infoText}>Feels Like</Text>

                
          
          </View>
          <View style={styles.info}>
             <Image style={styles.smallIcon}
               source={require('./assets/hum.jpeg')}
             />
             <Text style={styles.infoText}>{img}</Text>
             <Text style={styles.infoText}>humidity</Text>

                
          
          </View>

          
          

      </View>
      <View style={styles.extraInfo}>
          <View style={styles.info}>
             <Image style={styles.smallIcon}
               source={require('./assets/vis1.png')}
             />
             <Text style={styles.infoText}>{system}</Text>
             <Text style={styles.infoText}>Visibility</Text>

                
          
          </View>
          <View style={styles.info}>
             <Image style={styles.smallIcon}
               source={require('./assets/wind.png')}
             />
             <Text style={styles.infoText}>{spe}</Text>
             <Text style={styles.infoText}>Wind Speed</Text>

                
          
          </View>

          
          

      </View>
      
       
      
    </View>
    <TouchableOpacity style={styles.button} onPress={getWeather}>
        <Text style={styles.buttonText}>Get Weather</Text>
      </TouchableOpacity>

    </SafeAreaView>
    
  );
};

const styles = StyleSheet.create({
  container: {
    
    
    backgroundColor:'lightyellow',
    width:'20%',
    height:'80%',
    marginLeft:590,
    marginTop:80
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    textAlign:'center',
    marginTop:20 ,
    backgroundColor:'#D0EAFA',
    padding:10,
    width:'100%',
  
  },
  input: {
    width: 270,
    height: 40,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    paddingHorizontal: 10,
    marginBottom: 10,
    margin:20
  },
  button: {
    backgroundColor: 'blue',
    padding: 10,
    borderRadius: 5,
    marginBottom: 10,
    marginTop:40
  },
  buttonText: {
    color: 'white',
    fontWeight: 'bold',
    textAlign: 'center',
  },
  weatherText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  temperatureText: {
    
    marginLeft:150,
    
  },
  logo:{
    flexDirection:'row',
    alignItems:'center',
    justifyContent:'space-between'

  },
  description:{
    textAlign:'center',
    fontSize:20,
 

  },
  extraInfo:{
     flexDirection:'row',
     justifyContent:"space-between",
     padding:7,
  },
  info:{
    width:'',
    backgroundColor:'#D0EAFA',
    padding:10,
    borderRadius:12,
    justifyContent:'center'
  },
  smallIcon:{
    height:40,
    width:40,
    borderRadius:40/2,
    marginLeft:50,
  }

});

export default App;
