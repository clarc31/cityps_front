// import { useEffect, useState } from 'react';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';
// import React, { useState } from 'react';
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



export default function SignInScreen() {
	// const dispatch = useDispatch();

// const [signInEmail, setSignInEmail] = useState('');
// const [signInPassword, setSignInPassword] = useState('');

const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                console.log(data);
                // dispatch(login({ email: signInEmail, token: data.token }));
                // setSignInEmail('');
                // setSignInPassword('');
               
            }
        });
};


return (
    <View style={styles.containerMain}>
        <View style={styles.containerImage}>
            <Image source={require('../assets/logisignin.png')}/>
        </View>
        <View style={styles.containerSignIn}>
           <TouchableOpacity   style={styles.inputSignUp}><Text>  S'inscrire (c'est gratuit!)</Text></TouchableOpacity>
            <Text>Déjà inscrit ?</Text>
            <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputEmail} placeholder="  Email" />
            <TextInput onChangeText={(value) => setSignInPassword(value)}  style={styles.inputPassword} placeholder="  Password" />
        </View>
        <View style={styles.containerButton}>
        <FontAwesome name='circle-thin' size={150} color="#adebf6"  onPress={() => handleConnection()}/>
        </View>
    </View>
)
}
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