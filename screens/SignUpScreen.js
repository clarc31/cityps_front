import {
    Image,
    StyleSheet,
    TextInput,
    TouchableOpacity,
    View,
  } from 'react-native';

import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
// import { login } from '../reducers/user';
import FontAwesome from 'react-native-vector-icons/FontAwesome';

import { MultipleSelectList } from 'react-native-dropdown-select-list'

export default function SignUpScreen() {

    const dispatch = useDispatch();
    // const user = useSelector((state) => state.user.value);

    const [signUpNom, setSignUpNom] = useState('');
    const [signUpPrenom, setSignUpPrenom] = useState('');
    const [signUpPseudo, setSignUpPseudo] = useState('');
    const [signUpEmail, setSignUpEmail] = useState('');
    const [signUpPassword, setSignUpPassword] = useState('');

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

const [selected, setSelected] = useState("");
  
  const data = [
      {key:'1', value:'Activités pour les enfants'},
      {key:'2', value:'Patrimoine historique '},
      {key:'3', value:'Musées, galeries, expositions'},
      {key:'4', value:'Cuisines, produits du terroir'},
      {key:'5', value:'Sorties en nature'},
      {key:'6', value:'Activités sportives '},
      {key:'7', value:'Loisirs créatifs'},
      {key:'8', value:'Loisirs culturels'},
      {key:'9', value:'Idées de sorties'},
      {key:'10', value:'Spectacles'},
      {key:'11', value:"Parc d'attraction à thème"},
      {key:'12', value: "Activités « Bien-être »"},
  ]
  

return(
    <View style={styles.mainContainer}>
        <FontAwesome name='close' size={45} color='#000000' />
        <View style={styles.citypsContainer}>
        <Image style={styles.image} source={require('../assets/logosignup.png')} />
        </View>

    <View style={styles.inputContainer1}>
        <View>
        <TextInput placeholder="Nom" onChangeText={(value) => setSignUpNom(value)} value={signUpNom} style={styles.input1} />
        <TextInput placeholder="Prenom" onChangeText={(value) => setSignUpPrenom(value)} value={signUpPrenom} style={styles.input1} />
        <TextInput placeholder="Pseudo" onChangeText={(value) => setSignUpPseudo(value)} value={signUpPseudo} style={styles.input1} />
        </View>
        <Image source={require('../assets/avatar.png')}  className={styles.avatar} />      
    </View>

        <View style={styles.inputContainer2}>
        <TextInput placeholder="Email" onChangeText={(value) => setSignUpEmail(value)} value={signUpEmail} style={styles.input2} />
        <TextInput placeholder="Password" onChangeText={(value) => setSignUpPassword(value)} value={signUpPassword} style={styles.input2} />
        </View>
    
    <MultipleSelectList 
        setSelected={(val) => setSelected(val)} 
        data={data} 
        save="value"
        onSelect={() => alert(selected)} 
        label="Mes envies"
    />

    <View style={styles.buttonContainer}>
        <TouchableOpacity onPress={() => handleRegister()}>
        <FontAwesome name='circle-thin' size={150} color="#adebf6"  />
        </TouchableOpacity>
    </View>

    </View>
)}


const styles = StyleSheet.create({
    mainContainer: {
      flex: 1,
      backgroundColor: '#77D0DE',
      width: '100%',
      alignItems: 'center',
      justifyContent: 'space-between',
    },

    image: {
        width: '20%',
        height: '20%',
      },
    
    inputContainer1: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },

    input1: {
        width: "50%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
      },

    avatar:{
        width: '46',
        height:'46',
        borderRadius: 50,
      },

      inputContainer2: {
        justifyContent: 'space-between',
        width: '100%',
        alignItems: 'center',
    },

    input2: {
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
      },

    buttonContainer:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
      },

  });

