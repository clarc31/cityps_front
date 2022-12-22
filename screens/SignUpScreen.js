import {
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Modal,
  } from 'react-native';
import { login, logout } from '../reducers/user';
import { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import { CheckBox } from 'react-native-elements';
import * as ImagePicker from 'expo-image-picker';

// const BACKEND = 'https://cityps-back.vercel.app'; // En ligne Vercel


const BACKEND = 'https://cityps-back.vercel.app'; // En ligne Vercel
// const BACKEND = 'http://192.168.142.41:3000'; // Local Zouhair
//const BACKEND = 'http://192.168.43.162:3000'; // Local Christian

export default function SignUpScreen ({ navigation }) { 
  const dispatch = useDispatch();
  // const user = useSelector((state) => state.user.value);
  //-----------------------------------USESTATE-------------------------------------------------------------------------------------
  const [envie, setEnvie] = useState([]);
  const [modalVisible, setModalVisible] = useState(false);
  const [image, setImage] = useState(null);
  const [signUpName, setSignUpName] = useState('');
  const [signUpFirstName, setSignUpFirstname] = useState('');
  const [signUpUserName, setSignUpUserName] = useState('');
  const [signUpEmail, setSignUpEmail] = useState('');
  const [signUpPassword, setSignUpPassword] = useState('');
  const [emailError, setEmailError] = useState(false); // test email REGEX
  const [missingInput, setMissingInput] = useState(false); // test missing input

  

  //---------------------------------FETCH CATEGORIES-----------------------------------------------------------------------------  
    useEffect (() =>{
      fetch(`${BACKEND}/categories`)
      .then(response => response.json())
      .then(dataDb => {
        // ON AJOUTE UNE CLE ISSELECTED A CHACUNE DES CATEGORIES
        const formattedCategories = dataDb.data.map((categorie, i) => {
          return {...categorie, isSelected: false, key:{i}}
        })
        // ON STOCKE CE NOUVEAU TABLEAU DANS UN STATE
        setEnvie(formattedCategories)
      });
    },[]);
    // CETTE FONCTION RECOIT L ID DE LA CATEGORIE SUR LAQUELLE ON A CLIQUE
    // PUIS COMPARE L ID RECUPERE AVEC LES ID DANS LE TABLEAU 
    // SI MATCH ON INVERSE LA VALEUR DE ISSELECTED
    // ET ON REASSIGNE LE TABLEAU AU STATE
    const handleCheckbox = (id) => {
      let temp = envie.map((fav) => {
        if (id === fav._id) {
          return {...fav, isSelected: !fav.isSelected}
        }
        return fav
      })
      setEnvie(temp)
    }
    // ON BOUCLE SUR LE TABLEAU DE CATEGORIES POUR CREER UNE CHECKBOX A CHAQUE CATEGORIE
    const formatedData = envie.map((el, i) =>{
        return (
                <View style={styles.checkbox} key={i}>
                  <CheckBox  checked={el.isSelected} onPress={() => handleCheckbox(el._id)} style={styles.checkbox} />
                  <Text style={styles.label}>
                    {el.category}
                  </Text>
                </View> 
        )
    })
    // console.log(signUpFirstName)
//-----------------------------------FUNCTION HANDLEREGISTER---------------------------------------------------------------------------
const handleRegister = () => {
 
  const idsCategory = envie.map(category => {
    if(category.isSelected) {
      return category._id
    }
    return;
  })
  // console.log("idsCategory", idsCategory)
  const idsCategoryFiltered = idsCategory.filter(category => category !== undefined)

  if (
    !idsCategoryFiltered.length > 0 
    || !signUpEmail.length > 0 
    || !signUpPassword.length > 0
    || !signUpName.length > 0 
    || !signUpFirstName.length > 0
    || !signUpUserName.length > 0 
    
    ) {
      console.log("Please enter")
      setMissingInput(true);
      return;
    }
   
  // console.log("idsCategoryFiltered", idsCategoryFiltered)

  const formData = new FormData();
  
  image && formData.append('photoFromFront',{
    uri: image,
    name: 'photo.jpg',
    type: 'image/jpeg',
  });
  formData.append("name", signUpName)
  formData.append("firstname", signUpFirstName)
  formData.append("username", signUpUserName)
  formData.append("email", signUpEmail)
  formData.append("password", signUpPassword)
  formData.append("categories", idsCategoryFiltered)
  // console.log(signUpFirstName);
  // console.log(formData)

  // set regex :
  const EMAIL_REGEX = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
  console.log(!EMAIL_REGEX.test(signUpEmail))
        if (!EMAIL_REGEX.test(signUpEmail)) {
          setEmailError(true);
          return
        }
        
//------------------------------FETCH SIGNUP-----------------------------------------------------------------------------------
  fetch(`${BACKEND}/users/signup`, {
        method: 'POST',
        body: formData,
    }).then((response) => response.json())
    .then((data) => {
      console.log('responseJson', data)
      // .then(response => response.json())
      // .then(data => {
            // if (data.result) {
          dispatch(login({
          // //   firstname: signUpFirstName,
          // //   image:image,
             username:signUpUserName,
          // //   email: signUpEmail,
             token: data.token, }));
            // setSignUpName('');
            // setSignUpFirstname('');
            // setImage('');
            // setSignUpUserName('');
            // setSignUpEmail('');
            // setSignUpPassword('');
            // setSignUpInscriptionDate('');
            navigation.navigate('TabNavigator');
    })
          //  );
};


const handleModal = () => {
  
    setModalVisible(true);
}
  
const pickImage = async () => {
  // No permissions request is necessary for launching the image library
  let result = await ImagePicker.launchImageLibraryAsync({
    mediaTypes: ImagePicker.MediaTypeOptions.Images,
    allowsEditing: false,
    aspect: [4, 3],
    quality: 1,
  });


  if (!result.canceled) {
    setImage(result.assets[0].uri);
  }
  // console.log('image',image);
};

return(
    < KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled = {false}>
        <View style={styles.imageCity}>
            <Image style={styles.image} source={require('../assets/imageCity.png')} />
            <FontAwesome name='close' size={45} color='#f77b55' style={styles.iconX}/>
        </View>
        {/* <View style={styles.inputContainer2}> */}
            <TextInput placeholder="  Email" onChangeText={(value) => setSignUpEmail(value)}  style={styles.input2} />
            {emailError && <Text style={styles.error}>Invalid email address</Text>}
            <TextInput placeholder="  Password" onChangeText={(value) => setSignUpPassword(value)}  style={styles.input2} />
        {/* </View>       */}
        <View style={styles.inputContainer1}>
            <View style={styles.inputContainerValue}>
                <TextInput placeholder="  Nom" onChangeText={(value) => setSignUpName(value)}  style={styles.input1} />
                <TextInput placeholder="  Prenom" onChangeText={(value) => setSignUpFirstname(value)}  style={styles.input1} />
                <TextInput placeholder="  Pseudo" onChangeText={(value) => setSignUpUserName(value)}  style={styles.input1} />
                <TouchableOpacity onPress={() => handleModal()}  style={styles.button} activeOpacity={0.9}><Text style={styles.buttonText}> vos envies</Text></TouchableOpacity>
            </View>
            <TouchableOpacity onPress={() => pickImage()}>
                <Image source={require('../assets/avatar.png')}  className={styles.avatar} />  
            </TouchableOpacity>   
        </View>
        <View>
        {missingInput && <Text style={styles.missingInput}> Veuillez remplir tous les champs de saisie </Text>} 
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleRegister()}>
            <FontAwesome name='circle-thin' size={150} color="#adebf6"  />
            </TouchableOpacity>
        </View>

        <Modal visible={modalVisible} animationType="fade" transparent>
           <View style={styles.centeredView}>
             <View style={styles.modal}>
               {formatedData}
             </View>
             <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.Button} activeOpacity={0.8}>
               <Text style={styles.textButton}>valider</Text>
             </TouchableOpacity>
           </View>
         </Modal>
         
    </KeyboardAvoidingView>
)}


const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#77D0DE',
      width: '100%',
      height: '100%',
      alignItems: 'center',
    //   justifyContent: 'space-between',
    },
    imageCity: {
        flex: 1,
        height: '20%',
        flexDirection: 'row',
        alignItems: 'center'
        // backgroundColor: 'red',
    },
    inputContainer1: {
        flex: 1,
        flexDirection: 'row',
        justifyContent: 'space-evenly',
        width: '100%', 
        height: '20%',
    },
    image:{
        alignItems: 'center',
    },
    input1: {
        width: "90%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
        marginTop: '4%',
        marginLeft: '4%'
      },
      inputContainerValue:{
        flex: 1,
        justifyContent: 'flex-start',
      },
      buttonText:{
        marginLeft: '35%',
        fontSize: 20,
        marginTop: '2%'
      },
    avatar:{
        width: 4,
        height: 4,
        resizeMode: 'contain'
        // width: 100
      },
      inputContainer2:{
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
      },
      input2:{
        width: "95%",
        height: "5%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
        marginTop: '2%'
        // paddingBottom: '20%'
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
        // justifyContent:"flex-start"
        alignItems: "flex-start"
      },
      Button:{
        width: '80%',
        height: '5%',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 8,
        backgroundColor: '#f77b55',
        borderRadius: 10,
      },
      ////////////////////////////////////MODAL STYLE INTERNE/////////////////////////////////////////////////////////////
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

  })