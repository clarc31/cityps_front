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

    const [location, setLocation] = useState(null); // compatibilté Android - info Zouhair
  
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


// SEARCH BAR :

const searchBar = () => {

  // 1) create a variable using the useState() hook to take the input:
  const [searchCity, setSearchCity] = useState("");

 /* 2) Create a handler function that will read changes in the search bar.:

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
        <Image source={require('../assets/avatar.png')}  style={styles.avatar} /> // {user.avatar}
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

  return (
    <View style={styles.mainContainer}>
   {/* <View style={styles.topContainer}>*/}
      <View style={styles.rowContainer}>

        {/* <SearchBar 

        {/*<SearchBar 
>>>>>>> front16
          lightTheme
          searchIcon={{ size: 24 }}
          showCancel
          containerStyle={{backgroundColor: 'white', width: 300, heigth: 10, justifyContent: 'center', borderWidth: 0, borderRadius: 10}}
          placeholder="Indiquez votre ville..."
          onChangeText={updateSearch}
          value={search}
          >

        </SearchBar> */}



        <TouchableOpacity >
          <Icon name='bars' size={40} color='#475059' style={styles.menuIcon}/>
        </TouchableOpacity>
      {/*  </View>*/}
    <MapView 
      Type="hybrid" style={styles.map} title="My location" pinColor='#FED579'
      showsUserLocation={true}
      followsUserLocation={true}
      >
      {/* <Marker coordinate={location} title="My position" pinColor="#fecb2d" />*/}     
    </MapView>   
  </View>   
 {/* <View style={styles.bottomContainer}> 
    <View style={styles.tipsList}>
      <Image source={require('../assets/avatar.png')}  style={styles.avatar} /> 
      <Text style={styles.title}> Titre </Text>
      <Text style={styles.place}> Lieu </Text>
      <Text style={styles.content}> Premières lignes du descriptyps</Text>  
</View>
  </View>*/}
</View>

)};

/* Init Senda
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
    />
 </View>

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
  

  <ScrollView contentContainerStyle={styles.bottomContainer}>
        {selectedTipsForThisUser}
  </ScrollView>

 

  </View>

)};
*/

const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center', 
    backgroundColor:"red", 
   margin: 0,
   padding: 0,
  },

  /*
  
  topContainer: {
    //justifyContent: 'space-between',
    flex: 1.2,
    top: 0,
    width: '100%',
    backgroundColor: 'red',
   
  },*/
  
  rowContainer: {
    height:"100%",
  flexDirection :'row',
  justifyContent: 'space-around',
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
      //position: 'relative',
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


