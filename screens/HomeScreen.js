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
  Dimensions,
} from 'react-native';

import { SearchBar } from 'react-native-elements';



export default function HomeScreen({ navigation }) {

  // search bar:
  const [search, setSearch] = useState("");
  const updateSearch = (search) => {
  setSearch(search);
};


  /*
  const dispatch = useDispatch();
  const user = useSelector((state) => state.user.value);

  const [city, setCity] = useState('');

  // Modifiez le fonctionnement de PlacesScreen afin que lorsqu’une nouvelle ville est ajoutée (depuis l’input reliée 
  // à l’API Adresses), la route POST /places soit appelée afin de l’enregistrer en base de données.

  const handleSubmit = () => {
    if (city.length === 0) {
      return;
    }

// 1st request: get geographic data from API
fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
.then((response) => response.json())
.then((data) => {
  // Nothing is done if no city is found by API
  if (data.features.length === 0) {
    return;
  }

const fistCity = data.features[0];
const newPlace = {
name: fistCity.properties.city,
latitude: fistCity.geometry.coordinates[1],
longitude: fistCity.geometry.coordinates[0],
};

*/

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

  <View style={styles.rowContainer}>

<SearchBar 
lightTheme
searchIcon={{ size: 24 }}
showCancel
containerStyle={{backgroundColor: 'white', width: 300, heigth: 10, justifyContent: 'center', borderWidth: 0, borderRadius: 10}}
placeholder="Indiquez votre ville..."
onChangeText={updateSearch}
value={search}
>
</SearchBar>

<TouchableOpacity >
<Icon name='bars' size={40} color='#475059' style={styles.menuIcon}/>
</TouchableOpacity>

</View>

    <MapView 
      Type="hybrid" style={styles.map} title="My location" pinColor='#FED579'
      showsUserLocation={true}
      followsUserLocation={true}
      >
        

        <Marker coordinate={location} title="My position" pinColor="#fecb2d" />
     
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
    alignItems: 'center',
    justifyContent: 'center',  
   margin: 0,
   padding: 0,
  },

  
  
  topContainer: {
    //justifyContent: 'space-between',
    flex: 1.2,
    marginTop: 0,
    width: '100%',
  },

  rowContainer: {
  flexDirection :'row',
  justifyContent: 'space-around',
  marginTop: '12%',
  },
  
  menuIcon: {
    flexDirection :'column',
    justifyContent: 'center',
  },

  map: {
      flex: 1.2,
      marginTop: 0,
    },
   
  bottomContainer: {
    flex: 0.8,
    backgroundColor: '#77D0DE',
    padding: 0,
    width: '100%',
  },


  tipsList:  {
    alignItems: 'flex-start',
    flexDirection: "column",
    flexWrap: "wrap",
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  }

});


