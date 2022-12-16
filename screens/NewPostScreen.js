import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    } from 'react-native';


const BACKEND = 'https://cityps-back.vercel.app';
  

  export default function NewPostScreen() {
    // states et setters
    const [title, setTitle] = useState ('');                // Titre typs
    const [coordonates, setCoordonates] = useState (null);  // Latitude, longitude du lieu onLongPressé
    const [categoriesData, setCategoriesData] = useState ([])
    const [content, setContent] = useState ('');            //

    // Au mount : on récupère la liste complète des catégories
    useEffect (() =>{
      fetch(`${BACKEND}/categories`)
      .then(response => response.json())
      .then(dataDb => {
        // ajout d'une clé ISSELECTED à chaque catégorie, par défaut = false
        const formattedCategories = dataDb.data.map((categorie, i) => {
          return {...categorie, isSelected: false, key:{i}}
        })
        // nouveau tableau stocké ds le state
        setCategoriesData(formattedCategories);
      });
    },[]);



    // ctrl states
    console.log('title',title);
    console.log('content',content);


    // ---------------------------------- onPress positionner sur la map ------------------------------
    const locOnMap = () => {
      console.log('loc on map')
    }

    // ------------------------------------ catégorie du typs : choix unique via modale ----------------------------------
    const chooseCategory = () => {
      console.log('choix catérgorie')
    }

    // ------------------------------------ choix 3 photos ds la galerie ------------------------------
    const catchPhoto = () => {
      console.log('Photo')
    }
    // ------------------------------------ 


    return (
      <View style={styles.mainContainer}>
        <Image source={require('../assets/postyps.png')} style={styles.postyps} />

        <View style={styles.titleContainer}>
          <TextInput placeholder='  Titre...' onChangeText={(value) => setTitle(value)} value={title} style={styles.inputTitle}/>
          <TouchableOpacity onPress={() => locOnMap()} >
            <Image source={require('../assets/orangeLocPin.png')} style={styles.locPinImg}/>
          </TouchableOpacity>
        </View>

        <View style={styles.photosContainer}>
          <TouchableOpacity style={styles.envieBtn} onPress={() => chooseCategory()}>
            <Text style={styles.envieText}>Envies</Text>
          </TouchableOpacity>
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => catchPhoto()} />
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => catchPhoto()} style={styles.camera}/>
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => catchPhoto()} style={styles.camera}/>
        </View>

        <Image source={require('../assets/descriptyps_uni.png')} style={styles.titleDescImg}/>

        <TextInput placeholder='  On dit tout ?...' onChangeText={(value) => setContent(value)} 
          value={content} 
          style={styles.pageContent} 
          multiline={true}
          maxLength={1000}
        />

        <FontAwesome name='circle-thin' size={100} color="#adebf6"  onPress={() => handlepost()} style={styles.circleSubmit}/>

     </View>
   );
  }
  
  
  const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#77d0de',
    },
    postyps: {
      marginTop: "12%",
      marginLeft: "5%",
    },
    titleContainer: {
      marginTop: "6%",
      flexDirection: 'row',
      //backgroundColor: 'green',
      alignItems: 'center',
    },
    inputTitle: {
      marginLeft: "8%",
      width: "70%",
      height: "70%",
      borderRadius: 15,
      backgroundColor: "#d6f5fa",
      fontSize: 20,
    },
    locPinImg:{
      width: 60,
      height: 60,
      resizeMode: 'contain',
      marginLeft: '10%',
    },
    // -------------------------------- container 3 icônes photo + choix catégorie ------------------------------
    photosContainer: {
      flexDirection: 'row',
      height: '8%',
      alignItems: 'center',
      justifyContent: 'space-evenly',
      marginTop: '2%',

    },
    envieBtn: {
      width: "20%",
      height: "82%",
      borderRadius: 20,
      backgroundColor : '#f77b55',
      alignItems: 'center',
      justifyContent : 'center',
    },
    envieText: {
      color: '#d6f5fa',
      fontSize: 18,
    },
    titleDescImg: {
      marginLeft: "8%",
      marginTop: "10%",
    },
    // ------------------------------------------ page d'écriture et post -----------------------------------------------
    pageContent: {
      marginTop: "2%",
      marginLeft: "8%",
      backgroundColor: '#d6f5fa',
      width: "84%",
      height: "40%",
      borderRadius: 15,
      textAlignVertical: 'top',
      fontSize: 16,
    },
    circleSubmit: {
      marginLeft: "40%",
    }

  });