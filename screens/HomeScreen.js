import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps'; // initialRegion permet de gérer le positionnement par défaut de la carte.
import { Marker } from 'react-native-maps'; // a utiliser plus tard pour les markers
import * as Location from 'expo-location'; // GÉOLOCALISATION

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SearchBar } from 'react-native-elements';



export default function HomeScreen({ navigation }) {

  // search bar:
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
  setSearch(search);
};


  
  

  // géolocalisation dans un composant
  const [location, setLocation] = useState({});
  
  useEffect(() => {
    (async () => {
      const { status } = await Location.requestForegroundPermissionsAsync();

      if (status === 'granted') {
        Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High},
          (location) => {
            setLocation(location.coords.accuracy);
          });
      }
    })();
  }, []);

  

  return (
    <View style={styles.mainContainer}>

    <View style={styles.topContainer}>
    <TouchableOpacity >
          <Icon name='bars' size={40} color='#475059' />
          </TouchableOpacity>

        <SearchBar style={styles.SearchBar}
          round
          searchIcon={{ size: 24 }}
          placeholder="Indiquez votre ville..."
          onChangeText={updateSearch}
          value={search}
          >
       </SearchBar>
       
    <MapView 
      Type="hybrid" style={styles.map} title="My location" pinColor='#FED579'
      showsUserLocation={true}
      followsUserLocation={true}
      >
    {location && (
          <Marker coordinate={location} title="My position" pinColor="#fecb2d" />)}
     
         </MapView>
         
        
         
    
     

    </View>   

      <View style={styles.bottomContainer}>
    
        <View style={styles.tipsList}>
        <Image source={require('../assets/avatar.png')}  style={styles.avatar} />
        <Text style={styles.title}> Titre </Text>
        <Text style={styles.place}> Lieu </Text>
        <Text style={styles.content}> Premières lignes du descriptyps</Text>
        
        </View>

      </View>

     </View>

  )};



const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#77D0DE',
      flexDirection: "vertical",
      justifyContent: 'space-between',
      alignItems: "center",
   margin: 0,
   padding: 0,
  },

  SearchBar: {
    justifyContent: 'center',
    width: '100%',
    flex: 1,
    Color: 'white',
    borderRadius: 15,
    margin: 0,
    padding: 0,
   
  },
  
  topContainer: {
    flex: 0.5,
  },

  bottomContainer: {
    flex: 0.5,
  },

  map: {
    flex: 1,
    width: 300,
    height: 500,
    margintop: 0,
    
  
   
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  }
});


