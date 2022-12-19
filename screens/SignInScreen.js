// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';
import React, { useState } from 'react';
import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
// import { NavigationProp, ParamListBase } from '@react-navigation/native';



export default function SignInScreen({ navigation }) { 
	// const dispatch = useDispatch();

const [signInEmail, setSignInEmail] = useState('');
const [signInPassword, setSignInPassword] = useState('');
// ctrl states
// console.log('signInEmail',signInEmail);
// console.log('signInPassword',signInPassword);

const BACKEND = 'https://cityps-back.vercel.app'; // En ligne Vercel
// const BACKEND = 'http://192.168.142.41:3000'; // Local Zouhair
// const BACKEND = 'http://192.168.1.8:3000'; // Local Christian 

const handleConnection = () => {
// Route signin neutralisée car ne marche pas
// retirer ligne suivante et lire ligne 40 
// navigation.navigate('TabNavigator')

    // console.log('entrée click');
    // console.log('signInEmail2',signInEmail);
    // console.log('signInPassword2',signInPassword);

// RETIRER COMMENTAIRE POUR REACTIVER FETCH VERS BE
    fetch(`${BACKEND}/users/signin`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    }).then(response => response.json())
        .then(data => {
            console.log('Retour du BE', data)
            if (data.result) {
                console.log(data);
                // dispatch(login({ email: signInEmail, token: data.token }));
                setSignInEmail('');
                setSignInPassword('');
               navigation.navigate('TabNavigator');
            }
        });
};


return (
    <View style={styles.containerMain}>
        <View style={styles.containerImage}>
            <Image style={styles.logo} source={require('../assets/logisignin.png')}/>
        </View>
        <View style={styles.containerSignIn}>
           <TouchableOpacity    onPress={() => navigation.navigate('SignUp')} style={styles.inputSignUp}><Text>  S'inscrire (c'est gratuit!)</Text></TouchableOpacity>
            <Text>Déjà inscrit ?</Text>
            <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputEmail} placeholder="  Email" />
            <TextInput onChangeText={(value) => setSignInPassword(value)}  style={styles.inputPassword} placeholder="  Password" />
        </View>
        <View style={styles.containerButton}>
        <FontAwesome name='circle-thin' size={150} color="#d6f5fa"  onPress={() => handleConnection()} />
        </View>
    </View>
)
}

const styles = StyleSheet.create({
    containerMain:{
        backgroundColor: "#77d0de",
        flex: 1,
        //width: '100%',
        //alignItems: "center"
    },
    logo: { // NOUVEAU
        height: 250,
        width: 250,
        resizeMode: 'contain',
    },
    containerImage:{
        height: "28%",
       // width: "100%",
        alignItems: 'center',
        marginTop: "20%"
    },
    TextInput:{
        borderRadius: 10,
    },
    containerSignIn:{
        height: "30%",
        // backgroundColor: 'yellow',
        justifyContent: 'space-between',
        width: '100%',
        // flex: 1,
        alignItems: 'center',
    },
    containerButton:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    TouchableOpacity:{
        // color: 'red',
        // width: "100%"
    },
    inputSignUp:{
        marginTop: "10%",
        color: 'red',
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
        flex:0.33,
        justifyContent: 'center',
    },
    inputEmail:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
    },
    inputPassword:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
    },
    TouchableOpacity:{
        alignItems: 'center',
    }

})


/* Ancien CSS
const styles = StyleSheet.create({
    containerMain:{
        backgroundColor: "#77d0de",
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    containerImage:{
        height: "30%",
        width: "100%",
        alignItems: 'center',
        marginTop: "20%"
    },
    TextInput:{
        borderRadius: 10,
    },
    containerSignIn:{
        height: "30%",
        // backgroundColor: 'yellow',
        justifyContent: 'space-between',
        width: '100%',
        // flex: 1,
        alignItems: 'center',
    },
    containerButton:{
        flex: 1,
        alignItems: 'center',
        justifyContent: 'flex-end',
        paddingBottom: 50,
    },
    TouchableOpacity:{
        // color: 'red',
        // width: "100%"
    },
    inputSignUp:{
        marginTop: "10%",
        color: 'red',
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa",
    },
    inputEmail:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
    },
    inputPassword:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
    },
    TouchableOpacity:{
        alignItems: 'center',
    }

})
*/
