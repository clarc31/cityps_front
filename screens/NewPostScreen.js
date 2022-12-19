import { useState, useEffect } from 'react';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';
import MapView, { Marker } from 'react-native-maps';
import {
    StyleSheet,
    Text,
    View,
    Image,
    TextInput,
    TouchableOpacity,
    Modal,
    KeyboardAvoidingView,
    } from 'react-native';


// const BACKEND = 'https://cityps-back.vercel.app'; // En ligne Vercel
const BACKEND = 'http://192.168.43.162:3000'; // Local Christian  

  export default function NewPostScreen({navigation}) {
    // states et setters
    const [title, setTitle] = useState ('');                   // Titre typs -> BDD
    const [categoriesData, setCategoriesData] = useState ([]); // Ttes les catégories possibles pour typs
    const [category, setCategory] = useState ('');             // Id_Catégorie retenue pour le typs saisi -> BDD
    const [content, setContent] = useState ('');               // Saisie user de la description du typs -> BDD
    const [pictures, setPictures] = useState (['0']);          // 3 chemins vers galerie photo
    const [modalVisible, setModalVisible] = useState(false);   // Affichage modale Catégories
    const [mapModaVisible, setMapModaVisible] = useState(false); // Affichage modale Map
    const [coordinates,setCoordinates] = useState(null);       // Coordonnées lat & long du lieu du typs -> BDD
    const [typsArea, setTypsArea] = useState(null);            // pour centrage map sur ville du typs 
    const [city, setCity] = useState('');                      // Ville typs pour recherche coord via API et -> BDD

    // ctrl states
    //console.log('categoriesData',categoriesData);



    // Au mount : on récupère la liste des catégories existantes dès l'ouverture du composant
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

    // ---------------------------------- positionnement de la ville du typs sur la map ------------------------------
    const locOnMap = () => {
      console.log('vers MapScreen')
      setMapModaVisible(true);
      //navigation.navigate('MapPostyps')
    };
    const handleLongPress = (e) => {
      setCoordinates(e.nativeEvent.coordinate);
      console.log('L59 coordinatesTyps',coordinates);
      setMapModaVisible(false)
   }
   const searchCity = () => {
    console.log('L63 searchCity')
    // coordonnées de la ville via API https://medium.com/geekculture/mapview-in-expo-react-native-5aa69eb81519
    fetch(`https://api-adresse.data.gouv.fr/search/?q=${city}`)
    .then((response) => response.json())
    .then((data) => {
      // rien ne se passe si la ville n'est pas trouvée via API
      if (data.features.length === 0) {
        return;
      }
      const coordCity = data.features[0];
      const chosenCity = {
        latitude: coordCity.geometry.coordinates[1],
        longitude: coordCity.geometry.coordinates[0],
      };
      setCoordinates(chosenCity);
      // coordonnées de la ville à afficher sur la map avec périmètre fixe
      let citypsMap = { ...chosenCity, latitudeDelta:0.1, longitudeDelta:0.1};
      setTypsArea(citypsMap);
    });
   }
   
   const coordCityValidation = () => {
    console.log('L87 validation coord city')
   }
    
    // ------------------------------------ catégorie du typs : choix unique via modale ----------------------------------
    const chooseCategory = () => {
      setModalVisible(true);
    }
    // cette fonction reçoit l'Id de la catégorie sur laquelle on clique ds la modale >>
    // 1. state category : mis à jour avec cet Id
    // 2. state categoriesData : ts les isSelected deviennent false sauf pour la sélection (true) 
    const handleCheckbox = (id) => {
      setCategory(id)
      let displaySelectedCategory = categoriesData.map((fav) => {
        if (id === fav._id) {
          fav.isSelected = true;
        } else {
          fav.isSelected = false;
        }
        return fav;
      })
      setCategoriesData(displaySelectedCategory);
    }
    // on boucle sur le tableau de catégories pour créer une CHECKBOX pour chaque catégorie
    const formatedData = categoriesData.map((el, i) =>{
        return (
                <View style={styles.checkbox} key={i}>
                  <CheckBox  checked={el.isSelected} onPress={() => handleCheckbox(el._id)} style={styles.checkbox} />
                  <Text style={styles.label}>
                    {el.category}
                  </Text>
                </View> 
        )
    })
    const closeModal = () => {
      if (category !== '') {
        setModalVisible(false)
      }
    }

    // ------------------------------------ choix 3 photos ds la galerie ------------------------------
    const pickImage = async (index) => {
      // No permissions request is necessary for launching the image library
      
      // affichage galerie et choix photo enregistré dans rank
      let result = await ImagePicker.launchImageLibraryAsync({
        mediaTypes: ImagePicker.MediaTypeOptions.Images,
        allowsEditing: false,
        aspect: [4, 3],
        quality: 1,
      });
      // enregistrement dans le state à la place prédéfinie
      if (!result.canceled) {
        let savePicture = pictures.map (() => {          
            pictures[index]=result.assets[0].uri;   
        return 
        })
        setPictures(pictures)

      }
    };
    // --------- RESTE A FAIRE sur photos galerie -----------
    // Modifier ou Supprimer photo 1, 2 ou 3
    // Changer couleur icône qd une photo est sélectionnée
    // Vérifier si accord RGPD nécessaire
    // ------------------------------------------------------ 
    
    // ------------------------------------------- envoi vers BE ----------------------------------------------------
    const handlepost = () => {
      const Id_Leviator = '639dd2e113fe1d637f7215a8';
      console.log('title',title);
      console.log('city',city);
      console.log('content',content);
      console.log('pictures',pictures);
      console.log('author >> récup l\'Id du store',Id_Leviator); 
      console.log('category',category);
      console.log('coordinates',coordinates);

      const formData = new FormData();
      
      pictures && formData.append('photoFromFront',{
        uri: pictures,
        name: 'photo.jpg',
        type: 'image/jpeg',
      });
      formData.append('title', title)
      formData.append("city", city)
      formData.append("content", content)
      formData.append("author", Id_Leviator) // RECUPERER L'ID DU USER DS LE STORE A LA CONNEXION
      formData.append("category", category)
      formData.append("coordinates", coordinates)

      console.log(formData)

    //-fetch route typs - POST
      fetch(`${BACKEND}/typs`, {
            method: 'POST',
            body: formData,
        }).then((response) => response.json())
        .then((data) => {
          console.log('responseJson', data)
        })
      


    }

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
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => pickImage(0)} />
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => pickImage(1)} style={styles.camera}/>
          <FontAwesome name='camera' size={55} color="#d6f5fa"  onPress={() => pickImage(2)} style={styles.camera}/>
        </View>

        <Image source={require('../assets/descriptyps_uni.png')} style={styles.titleDescImg}/>

        <TextInput placeholder='  On dit tout ?...' onChangeText={(value) => setContent(value)} 
          value={content} 
          style={styles.pageContent} 
          multiline={true}
          maxLength={1000}
        />

        <Modal visible={modalVisible} animationType="fade" transparent>
          <View style={styles.centeredView}>
            <View style={styles.modal}>
               {formatedData}
            </View>
            <TouchableOpacity onPress={() => closeModal()} style={styles.Button} activeOpacity={0.8}>
              <Text style={styles.textButton}>   Valider   </Text>
            </TouchableOpacity>
          </View>
        </Modal>

        
        <Modal visible={mapModaVisible} transparent style={styles.mapModal}> 
        
          <View style={styles.header}>
            <Text>Recherchez la ville ou celle la plus proche, affiner puis appuyer longuement</Text>
            <View style={styles.chooseCity}>
              <TextInput style={styles.inputText} onChangeText={(value) => setCity(value)} placeholder='Rechercher la ville'/>
              <FontAwesome name='search' size={30} color="#f77b55"  onPress={() => searchCity()} style={styles.iconSearch}/>
            </View>
          </View>
          <MapView onLongPress={(e) => handleLongPress(e)} style={styles.mapModal}
            initialRegion={{
            latitude: 48,
            longitude: 1.8,
            latitudeDelta: 10,
            longitudeDelta: 13,
            }}
            region={typsArea}>
            {coordinates && <Marker coordinate={coordinates} title="My position" pinColor="#fecb2d" />}
          </MapView>
          <FontAwesome name='circle-thin' size={100} color="#f77b55"  onPress={() => coordCityValidation()} style={styles.mapSubmitBtn}/>
        
        </Modal>
        

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
      marginTop: "3%",
      marginLeft: "40%",
    },
    // ----------------------------------------------- modale Catégorie --------------------------------------------
    centeredView: {
      flex: 1,
      justifyContent: 'center',
      alignItems: 'center',
    },
    modal:{
      backgroundColor: 'white',
      borderRadius: 20,
      padding: 30,
      alignItems: 'center',
      shadowColor: '#000',
      shadowOffset: {
        width: 0,
        height: 2,
      },
      shadowOpacity: 0.25,
      shadowRadius: 4,
      elevation: 5,
      width: '80%',
      height: '80%',
      alignItems: "flex-start"
    },
    button:{
      backgroundColor: '#f77b55',
      width: "150%",
      height: "15%",
      borderRadius: 20,
      marginTop: 10,
      marginLeft: 10,
      // alignItems: 'center'
    },
    textButton: {
      backgroundColor: '#f77b55',
      marginTop: "3%",
      borderRadius: 10,
    },
    // ------------------------------------------ modale Catégorie style interne -------------------------------------------
    checkbox:{
      flex: 1,
      justifyContent:'flex-start',
      // width: '80%'
      flexDirection: "row",
      alignItems: "center"

    },
    container: {
      // flex: 1,
      alignItems: 'flex-start'
    },
  
    textContainer:{
      // flex:1,
      // justifyContent: 'space-between',
      // alignItems: 'flex-end',
    },
    checkboxContainer: {
      justifyContent: 'flex-start',
      // marginRight: '80%'
    },
    // checkbox:{
    //   alignSelf: 'center'
    // },
    label: {
      margin: 8,
    },
    // ----------------------------------------- modale Map -----------------------------------------------
    mapModal:{
      flex:1,
    },
    chooseCity:{
      flexDirection: 'row',
      justifyContent: 'center',
      alignItems: 'center',
    },
    header:{
      height: '10%',
      marginTop: '3%',
      marginLeft: '3%',
      marginRight: '3%',
      backgroundColor: '#77d0de',
    },
    inputText:{
      marginTop: '2%',
      backgroundColor: '#d6f5fa',
      width: '50%',
      borderRadius: 10,
    },
    iconSearch:{
      marginLeft: '6%',
    },
    mapSubmitBtn:{
      backgroundColor: '#77d0de',
      marginLeft: '39%',
      marginBottom:'11%',
      
    },


  });