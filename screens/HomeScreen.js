import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
import MapView from 'react-native-maps'; // initialRegion permet de gérer le positionnement par défaut de la carte.
import { Marker } from 'react-native-maps'; // pour les markers
import * as Location from 'expo-location'; // pour la GÉOLOCALISATION

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

// géolocalisation (carte d'accueil du user):

    const [location, setLocation] = useState({});
    console.log(location)
  
    useEffect(() => {
      (async () => {
        const { status } = await Location.requestForegroundPermissionsAsync();
  
        if (status === 'granted') {
          // Location.getCurrentPositionAsync({accuracy: Location.Accuracy.High},
          Location.watchPositionAsync({ distanceInterval: 10 },
            (location) => {
              console.log("location", location)
              setLocation({latitude : location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.08,longitudeDelta:0.08});
              
            });
        }
      })();
    }, []);

// SEARCH BAR :

const searchBar = () => {

  // 1) create a variable using the useState() hook to take the input:
  const [searchCity, setSearchCity] = useState("");

 /* 2) Create a handler function that will read changes in the searchbar:

const handleChange = (e) => {
  e.preventDefault();
  setSearchCity(e.target.value);
};
*/

/* 3) Check if city written in the searchbar exist in API :

data.features.length = {
name: city.properties.city,
latitude: city.geometry.coordinates[1],
longitude: city.geometry.coordinates[0],
};


1st request: get geographic data from API
fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
.then((response) => response.json())
.then((data) => {

  // Create an if statement that will return the city that match what has been entered into the search bar:

  // a) Nothing is done if no city is found by API
  if (data.features.length === 0) {
    return;
  }
  
// b) A city is found by API:
  if (data.features.length > 0) {
    city.filter((city) => {
    return city.name.match(searchCity);
    setSearchCity(location.coords.accuracy);
});
*/

};

// List of selected tips by catégories for this City for this user:

const selectedTipsForThisUser = () => {
/*
=> Créer une route GET existingTipsbyCity (qui affiche tous les tips dispo sur l'appli toutes categories confondues)

useEffect(() => {
    fetch(`http://localhost:3000/tips/:cityname`)
      .then(response => response.json())
      .then((data) => {
        data.result && dispatch(addTiptoSelection(data.tips));
      });
   }, []);

addTiptoSelection est un reducer (un tableau) 

=> Créer une route GET selectedCategorieByUSer (qui affiche les categories selectionnées par le user)
useEffect(() => {
    fetch(`http://localhost:3000/user/:categories`)
      .then(response => response.json())
      .then((data) => {
        data.result && dispatch(addCategoriestoSelection(data.user);
      });
   }, []);

addCategoriestoSelection est un reducer (un tableau)

const existingTipsForThisUser = existingTipsbySelectedCategories.match(searchCity);
*/

return (
    <View style={styles.tipsList}>
        <Image source={require('../assets/avatar.png')}  style={styles.avatar} />  {/* {user.avatar} */}
        <Text style={styles.title}> {tips.title} </Text>
        <Text style={styles.place}> {tips.city} </Text>
        <Text style={styles.content}> {tips.description} </Text>     
    </View>
    );
};


// markers:

/*  
  const otherTipsforThisCity = [existingTipsbyCity-selectedTipsForThisUser].match(searchCity);
  
  const orangeMarkers = existingTipsForThisUser.map((data, i) => {
    return <><Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#F77B55' /> </> 
  });

  const blackMarkers = otherTipsforThisCity.map((data, i) => {
    return <><Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#475059' /> </> 
  });

  useEffect(() => {
    fetch(`http://localhost:3000/tips/:cityname`)
      .then(response => response.json())
      .then((data) => {
        data.result && dispatch(addMarkers({orangeMarkers + blackMarkers});
      });
   }, []);

   AddMarkers est un reducer (un tableau)
*/

   const scrollTest = []
   for(let i = 0; i < 10; i++) {
    scrollTest.push(     <View style={styles.tipsList} key={i}>
      <Image source={require('../assets/avatar.png')}  style={styles.avatar} />
      <View style={styles.insideCardContainer}>
        <View style={styles.topCarte}>
          <Text style={styles.title}> Titre </Text>
          <Text style={styles.place}> Lieu </Text>
        </View>
        <Text style={styles.content}> Premières lignes du descriptyps</Text>

      </View>
      
      </View>)
   }

  return (
  <View style={styles.mainContainer}>

    <View style={styles.topContainer}>

      <View style={styles.rowContainer}>

        <View style={styles.searchBar}>
          <TextInput
          //value={searchInput}
          //onChange={handleChange}
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
            placeholder={'Indiquez votre ville...'}
            placeholderTextColor={'#666'}
            searchIcon={{ size: 24 }}
          />
        </View>

        <TouchableOpacity >
            <Icon name='bars' size={40} color='#475059' style={styles.menuIcon}/>
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
        region={location}
        >
        <Marker coordinate={location} title="My position" pinColor="#fecb2d" />
      </MapView>
    </View>  

     <ScrollView contentContainerStyle={styles.scrollContainer} className={styles.bottomContainer}>
     {/* {selectedTipsForThisUser} */}
    
            {scrollTest}
     </ScrollView>

  </View> 

  )};



const styles = StyleSheet.create({

  mainContainer: {
  flex: 1,
  // alignItems: 'center',
  // justifyContent: 'center',  
  //  margin: 0,
  //  padding: 0,
   backgroundColor: '#77D0DE',
  },

  topContainer: {
    // justifyContent: 'space-between',
    // flex: 1.2,
    // top: 0,
    // width: '100%',
    backgroundColor: 'red',
    height: '45%',
    position: 'relative',
  },
  
  rowContainer: {
  flexDirection :'row',
  justifyContent: 'space-around',
  alignItems: 'center',
  position: 'absolute',
  top: 40, 
  zIndex: 1,
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
    // height: '100%',
    // padding: 0,
    // width: '100%',
    // backgroundColor: 'blue',
  },
  scrollContainer: {
    // height: '100%',
    backgroundColor: '#77D0DE',
  },
  tipsList:  {
    // alignItems: 'flex-start',
    // flexDirection: "column",
    // flexWrap: "wrap",
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
    // height: 60,
    flexDirection: 'row',
    // justifyContent: 'flex-between',

  },
  insideCardContainer: {
    flexDirection: 'column',
  },

  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  }

});


