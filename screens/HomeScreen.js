import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import { useSelector } from 'react-redux';
import MapView from 'react-native-maps'; // initialRegion permet de gérer le positionnement par défaut de la carte.
import { Marker } from 'react-native-maps'; // pour les markers
import * as Location from 'expo-location'; // pour la GÉOLOCALISATION
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  TextInput,
  ScrollView,
} from 'react-native';

export default function HomeScreen({ navigation }) {

// categories selected by user : it's an array from User reducer :
  const userCategories = useSelector((state) => state.user.value.categories);

  const [geolocation, setGeoLocation] = useState(null); // geoloc
  const [inputCity, setInputCity] = useState(null); // searchbar
  const [region, setRegion] = useState(null); // display city on map 
  const [typs, setTyps] = useState([]); // pour le useEffect /typs/:city


//-----------------------------------------------initialisation-----------------------------------------------------------


// AT INIT : DISPLAY USER GEOLOCALISATION ON MAP AND SET ASSOCIATED TYPS :
  
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();

  // 1) DISPLAY USER GEOLOCALISATION ON HOMESCREENN MAP AT INIT :
        if (status === 'granted') {
          Location.watchPositionAsync({ distanceInterval: 10 },
            (location) => {
              console.log("location", location)
              setGeoLocation({latitude : location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.08,longitudeDelta:0.08});
              setRegion({latitude : location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.08,longitudeDelta:0.08});
            });
        }
      })();

  // 2) on appelle l'API pour afficher la ville en fonction des coords de geolocation:

  // => on va sur le site de l'API : https://adresse.data.gouv.fr/api-doc/adresse

  /* on choisi : /reverse/ Point d’entrée pour le géocodage inverse.
  consignes:
    Les paramètres lat et lon sont obligatoires: "https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357"
    Le paramètre type permet forcer le type de retour: "https://api-adresse.data.gouv.fr/reverse/?lon=2.37&lat=48.357&type=street"
  */

      fetch(`https://api-adresse.data.gouv.fr/reverse/?lon=${city.geometry.coordinates[0]}&lat=${city.geometry.coordinates[1]}`)
      .then(response => response.json())
  
  // 3) on appelle la BDD pour afficher les typs :
      .then((data) => {
      fetch(`http://localhost:3000/typs/:city`)
      .then(response => response.json())
      .then((data) => {
        data.result && setTyps(data);
      });
      });

    }, []);


//------------------------------------------------Search bar---------------------------------------------------------


// SEARCH BAR : DISPLAY INPUTCITY ON MAP AND SET ASSOCIATED TYPS :

function handleSearchBar () {

// 1) check if inputCity in the searchbar exists in API - request: get geographic data from API
fetch(`https://api-adresse.data.gouv.fr/search/?q=${inputCity}`)
.then((response) => response.json())
.then((data) => {

// 2) inputCity location on map : create an if statement that will return the city that match what has been entered into the search bar:

// a) if no city is found by API, nothing is done :
  if (data.features.length === 0) {
    return;
  }
  
// b) if a city is found by API, display it on map:
    const city = data.features[0];
    const CityPropsAPI = {
        latitude: city.geometry.coordinates[1],
        longitude: city.geometry.coordinates[0],
    };
    let displayOnMap = { ...CityPropsAPI, latitudeDelta:0.1, longitudeDelta:0.1};
    
    setRegion(displayOnMap);
    });
  };



//------------------------------------------------------------------------------------------------------------------


// ADD MARKERS ON MAP :

/* 
raisonnement : on fait un typs.map et une condition : id categories dans typs === id categories dans user:
data = un typs dans le map 
*/

const addmarkers = typs.map((data, i) => {
  if (userCategories.includes(data.category)) {
  return <> <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#F77B55' /> </> 
  } else {
  return <> <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#475059' /> </> 
  }})

  
//------------------------------------------------------------------------------------------------------------------


// DISPLAY THE TYPS LIST (scroll list):

const scrollList = typs.map((data, i) => {
  return (     
   <View style={styles.typsList} key={i}>
     <Image source={require(data.author.photo)}  style={styles.avatar} /> 
     <View style={styles.insideCardContainer}>
          <View style={styles.topCarte}>
           <Text style={styles.title}> {data.title} </Text> 
           <Text style={styles.place}> {data.city} </Text> 
         </View>
         <Text style={styles.descriptContent}> {data.content} </Text> 
     </View>
   </View>
   )
 });
 

//---------------------------------------------Return--------------------------------------------------------


  return (
  <View style={styles.mainContainer}>

    <View style={styles.topContainer}>

      <View style={styles.rowContainer}>

        <View style={styles.searchBar}>
         
          <TextInput
            value={inputCity}
            onChangeText={(value) => setInputCity(value)}
            style={{
              borderRadius: 10,
              margin: 10,
              color: '#000',
              borderColor: '#666',
              backgroundColor: '#FFF',
              borderWidth: 1,
              height: 45,
              paddingHorizontal: 10,
              fontSize: 18,
            }}
            placeholder={'Indiquez la ville...'}
            placeholderTextColor={'#666'}
          />
          <FontAwesome name='search' size={30} color="#f77b55" onPress={() => handleSearchBar()} style={styles.searchIcon}/>
        </View>

        <TouchableOpacity >
            <Icon name='bars' size={40} color='#475059' style={styles.menuIcon} />
        </TouchableOpacity>


      </View>

      <MapView 
        style={styles.map}
        initialRegion={{
          latitude: 47.88,
          longitude: 2.51,
          latitudeDelta: 8,
          longitudeDelta: 18,
        }}
        region={region} 
        >
        {geolocation && <Marker coordinate={geolocation} title="My position" pinColor="#F77B55" />}
        {addmarkers}

      </MapView>
    </View>  

     <ScrollView contentContainerStyle={styles.scrollContainer} className={styles.bottomContainer}>
      {scrollList}
     </ScrollView>

  </View> 

);
}


//---------------------------------------------Style--------------------------------------------------------

const styles = StyleSheet.create({

  mainContainer: {
  flex: 1,
   backgroundColor: '#77D0DE',
  },
  topContainer: {
    backgroundColor: 'red',
    height: '45%',
    position: 'relative',
    marginTop: 0,
  },
  rowContainer: {
    flexDirection :'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    position: 'absolute',
    top: 40, 
    zIndex: 1,
    alignSelf: 'center'
  },
  searchIcon: {
    position: 'absolute',
    right: 20,
    top: 16
  },
  searchBar: {
  width: '80%',
  },
  menuIcon: {
    flexDirection :'column',
    justifyContent: 'center',
  },
 map: {
    flex: 1,
    },
  bottomContainer: {
  },
  scrollContainer: {
    backgroundColor: '#77D0DE',
  },
  typsList:  {
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#F77B55",
    borderWidth: 2,
    margin: 4,
    backgroundColor: "#D6F5FA",
    alignItems: "center",
    height: 80
  },
  topCarte: {
    flexDirection: 'row',
  },
  insideCardContainer: {
    flexDirection: 'column',
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },

  
});


