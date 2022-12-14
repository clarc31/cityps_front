import {
    Image,
    Text,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
    KeyboardAvoidingView,
    Modal,
    FlatList
  } from 'react-native';

import { useState, useEffect } from 'react';
//import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

const BACKEND = 'https://cityps-back.vercel.app';

export default function SignUpScreen() {
    const [envie, setEnvie] = useState([]);
    const [modalVisible, setModalVisible] = useState(false);

  useEffect (() =>{
      fetch(`${BACKEND}/categories`)
      .then(response => response.json())
      .then(dataDb => {
        setEnvie(dataDb.data)
        // console.log('data',dataDb.data.category)
        //   console.log(envie)
          //   setEnvie(formatedData);
        });
    },[]);

    const formatedData = envie.map((el, i) =>{
        console.log('category', el.category)
        return <Text key={i} >{el.category}</Text>
    })


    // const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    // const [signUpNom, setSignUpNom] = useState('');
    // const [signUpPrenom, setSignUpPrenom] = useState('');
    // const [signUpPseudo, setSignUpPseudo] = useState('');
    // const [signUpEmail, setSignUpEmail] = useState('');
    // const [signUpPassword, setSignUpPassword] = useState('');

/*
const handleRegister = () => {

    fetch('http://localhost:3000/users/signup', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ nom: signUpNom, prenom: signUpPrenom, pseudo: signUpPseudo, email: signUpEmail, password: signUpPassword}),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                dispatch(login({ nom: signUpNom, token: data.token, prenom: signUpPrenom, pseudo: signUpPseudo, email: signUpEmail }));
                setSignUpNom('');
                setSignUpPrenom('');
                setSignUpPseudo('');
                setSignUpEmail('');
                setSignUpPassword('');
                navigation.navigate('Home');
            }
        });
};

*/


const handleSubmit = () => {
    setModalVisible(true);
}
  

return(
    < KeyboardAvoidingView style={styles.mainContainer} behavior={Platform.OS === 'ios' ? 'padding' : 'height'} enabled = {false}>
        <View style={styles.imageCity}>
            <Image style={styles.image} source={require('../assets/imageCity.png')} />
            <FontAwesome name='close' size={45} color='#f77b55' style={styles.iconX}/>
        </View>
        {/* <View style={styles.inputContainer2}> */}
            <TextInput placeholder="  Email" onChangeText={(value) => setSignUpEmail(value)}  style={styles.input2} />
            <TextInput placeholder="  Password" onChangeText={(value) => setSignUpPassword(value)}  style={styles.input2} />
        {/* </View>       */}
        <View style={styles.inputContainer1}>
            <View style={styles.inputContainerValue}>
                <TextInput placeholder="  Nom" onChangeText={(value) => setSignUpNom(value)}  style={styles.input1} />
                <TextInput placeholder="  Prenom" onChangeText={(value) => setSignUpPrenom(value)}  style={styles.input1} />
                <TextInput placeholder="  Pseudo" onChangeText={(value) => setSignUpPseudo(value)}  style={styles.input1} />
                <TouchableOpacity onPress={() => handleSubmit()}  style={styles.button} activeOpacity={0.9}></TouchableOpacity>
            </View>
            <View>
                <Image source={require('../assets/avatar.png')}  className={styles.avatar} />  
            </View>    
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
                <TouchableOpacity onPress={() => handleClose()} style={styles.Button} activeOpacity={0.8}>
              <Text style={styles.textButton}>start</Text>
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
        // paddingBottom: '20%'
        // marginTop: '15%'
        // marginBottom: '50%'
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
    avatar:{
        
        // width: 100
      },
      inputContainer2:{
        flex: 1,
        width: '100%',
        alignItems: 'flex-start',
        // paddingBottom: '20%'
        
        // justifyContent: 'space-evenly',
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
        width: "90%",
        height: "20%",
        borderRadius: 20,
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
        height: '80%'
      },
      Button:{
        width: '80%',
        height: '5%',
        alignItems: 'center',
        marginTop: 20,
        paddingTop: 8,
        backgroundColor: '#f77b55',
        borderRadius: 10,
      }

    //   inputContainer2: {
    //     justifyContent: 'space-between',
    //     width: '100%',
    //     alignItems: 'center',
    // },

    // buttonContainer:{
    //     flex: 1,
    //     alignItems: 'center',
    //     justifyContent: 'flex-end',
    //     paddingBottom: 50,
    //   },

  });

