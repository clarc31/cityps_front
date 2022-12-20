import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { useState, useEffect } from 'react';
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

  const [geolocation, setGeoLocation] = useState(null); // 1ere etape geoloc
  const [inputCity, setInputCity] = useState(null); // 2eme etape searchbar
  const [region, setRegion] = useState(null); // display on map 


// DISPLAY USER GEOLOCALISATION ON HOMESCREENN MAP :
  
useEffect(() => {
  (async () => {
    const { status } = await Location.requestForegroundPermissionsAsync();
  
        if (status === 'granted') {
          Location.watchPositionAsync({ distanceInterval: 10 },
            (location) => {
              console.log("location", location)
              setGeoLocation({latitude : location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.08,longitudeDelta:0.08});
              setRegion({latitude : location.coords.latitude, longitude: location.coords.longitude, latitudeDelta: 0.08,longitudeDelta:0.08});
            });
        }
      })();
    }, []);


// MANAGE THE SEARCH BAR :

// check if inputCity in the searchbar exist in API :  
function handleSearchBar () {

//request: get geographic data from API
fetch(`https://api-adresse.data.gouv.fr/search/?q=${inputCity}`)
.then((response) => response.json())
.then((data) => {

// create an if statement that will return the city that match what has been entered into the search bar:

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

// SETUP OF THE TIPS LIST (scroll list):

const scrollList = []
for(let i = 0; i < 10; i++) {
 scrollTest.push(     
  <View style={styles.tipsList} key={i}>
    <Image source={require('../assets/avatar.png')}  style={styles.avatar} /> 
    <View style={styles.insideCardContainer}>
         <View style={styles.topCarte}>
          <Text style={styles.title}> Titre </Text> 
          <Text style={styles.place}> Lieu </Text> 
        </View>
        <Text style={styles.descriptContent}> Premières lignes du descriptyps</Text> 
    </View>
  </View>
  )
};

const importSelectedTipsForThisUser = () => {

  /*
  => 1) Créer une route GET "existingTipsbyCity" (qui affiche tous les tips dispo sur l'appli toutes categories confondues pour cette ville)
  
  router.get("/tips/:city", (req, res) => {
  Tip.find({ city: req.params.city }).then(data => {
    res.json({ result: true, city: data });
  });
 });

  importTipsByCity est un reducer TIPS (un tableau) 
  
  importTipsByCity : (state, action) => {
  state.value.tips(action.payload); 
  },

  import { importTipsByCity } from '../reducers/tips';

  Lire les informations du store pour pouvoir les afficher:
  const tips = useSelector((state) => state.tips.value);

  import { useDispatch, useSelector } from 'react-redux';
  const dispatch = useDispatch();

  useEffect(() => {
      fetch(`http://localhost:3000/tips/:city`)
        .then(response => response.json())
        .then((data) => {
          data.result && dispatch(importTipsByCity(data.city);
        });
     }, []);
  

  Test à faire:
  const markers = tips.city.map((data, i) => {
    return <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} title={data.city} />;
  });


  => 2) Créer une route GET "existingTipsbyCategories" (qui affiche tous les tips dispo sur l'appli, classés par categorie)
  
  router.get("/tips/:categories", (req, res) => {
  Tip.find({ categories: req.params.categories }).then(data => {
    res.json({ result: true, categories: data });
  });
  });

  importTipsByCategories est un reducer TIPS (un tableau) 
  
  importTipsByCategories : (state, action) => {
  state.value.tips(action.payload); 
  },

  import { importTipsByCategories } from '../reducers/tips';

  Lire les informations du store pour pouvoir les afficher:
  const tips = useSelector((state) => state.tips.value);

  import { useDispatch, useSelector } from 'react-redux';
  const dispatch = useDispatch();

  UseDispatch : méthode chargée de l’envoi de l’ordre dans le reducer. 
  Elle met à jour le store et déclenche les actions associées au reducer.

  useEffect(() => {
      fetch(`http://localhost:3000/tips/:categories`)
        .then(response => response.json())
        .then((data) => {
          data.result && dispatch(importTipsByCategories(data.categories));
        });
     }, []);
  

  => 3) Créer une route GET "selectedCategoriesByUSer" (qui affiche uniquement les categories selectionnées par le user)
  
  router.get("/user/:categories", (req, res) => {
  User.find({ categories: req.params.categories }).then(data => {
    res.json({ result: true, categories: data });
  });
  });

  importUserCategories est un reducer USER (un tableau)

  importUserCategories : (state, action) => {
  state.value.categories(action.payload); 
  },
  
  import { importUserCategorie } from '../reducers/users';

  Lire les informations du store pour pouvoir les afficher:
  const users = useSelector((state) => state.users.value);

  import { useDispatch, useSelector } from 'react-redux';
  const dispatch = useDispatch();

  useEffect(() => {
      fetch(`http://localhost:3000/user/:categories`)
        .then(response => response.json())
        .then((data) => {
          data.result && dispatch(importUserCategories(data.user);
        });
     }, []);
  

  importSelectedTipsForThisUser :
  array: importTipsByCity
  array: importTipsByCategories
  array: importUserCategories
  = importUserCategories.match(importTipsByCity && importTipsByCategories);
 
  */
  
  };

// MARKERS:
    
    /*  
      AddMarkers est un reducer MARKERS (un tableau)

      addMarkers: (state, action) => {
      state.value.markers.push(action.payload);  

      import { addMarkers } from '../reducers/markers';

      import { useDispatch, useSelector } from 'react-redux';
      const dispatch = useDispatch();

      Lire les informations du store pour pouvoir les afficher:
      const markers = useSelector((state) => state.markers.value);
      
      const orangeMarkers = importSelectedTipsForThisUser.map((data, i) => {
        return <> <Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#F77B55' /> </> 
      });
    
      const otherTipsforThisCity = existingTipsbyCity-importSelectedTipsForThisUser

      const blackMarkers = otherTipsforThisCity.map((data, i) => {
        return <><Marker key={i} coordinate={{ latitude: data.latitude, longitude: data.longitude }} /><Icon name='location-pin' color='#475059' /> </> 
      });

      const addMarkers = (newMarkers) => {
      dispatch(addMarkers({orangeMarkers} && {blackMarkers});
      },

    */
    

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
         {/* {addMarkers} */}
      </MapView>
    </View>  

     <ScrollView contentContainerStyle={styles.scrollContainer} className={styles.bottomContainer}>
     {/* {importSelectedTipsForThisUser} */}
    
      {scrollList}
     </ScrollView>

  </View> 

);
}


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
  tipsList:  {
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


