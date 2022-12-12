import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login, logout } from '../reducers/user';
import React, { useState } from 'react';
import {
  Image,
  ImageBackground,
  KeyboardAvoidingView,
  Platform,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import { NavigationProp, ParamListBase } from '@react-navigation/native';



export default function SignInScreen() {
	const dispatch = useDispatch();

const [signInEmail, setSignInEmail] = useState('');
const [signInPassword, setSignInPassword] = useState('');

const handleConnection = () => {

    fetch('http://localhost:3000/users/signin', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email: signInEmail, password: signInPassword }),
    }).then(response => response.json())
        .then(data => {
            if (data.result) {
                dispatch(login({ email: signInEmail, token: data.token }));
                setSignInEmail('');
                setSignInPassword('');
               
            }
        });
};
return (
    <View>
        <View>
            <Image></Image>
        </View>
        <View>
            <TouchableOpacity onPress={() => handleConnection()}>S'inscrire (c'est gratuit!)</TouchableOpacity>
            <Text>Déjà inscrit ?</Text>
            <TouchableOpacity onPress={() => handleConnection()}>Email</TouchableOpacity>
            <TouchableOpacity onPress={() => handleConnection()}>password</TouchableOpacity>
        </View>
        <View>
        <TouchableOpacity onPress={() => handleConnection()}></TouchableOpacity>
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    
})