// import { useEffect, useState } from 'react';
// import { TextInput } from 'react-native';
// import { useDispatch, useSelector } from 'react-redux';
// import { login, logout } from '../reducers/user';
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
//   import { NavigationProp, ParamListBase } from '@react-navigation/native';




export default function SignUpScreen() {
// 	const dispatch = useDispatch();
// 	// const user = useSelector((state) => state.user.value);
//     const [signUpNom, setSignUpNom] = useState('');
// 	const [signUpPrenom, setSignUpPrenom] = useState('');
// 	const [signUpPseudo, setSignUpPseudo] = useState('');
// 	const [signUpEmail, setSignUpEmail] = useState('');
// 	const [signUpPassword, setSignUpPassword] = useState('');



// const handleRegister = () => {
//     fetch('http://localhost:3000/users/signup', {
//         method: 'POST',
//         headers: { 'Content-Type': 'application/json' },
//         body: JSON.stringify({ nom: signUpNom, prenom: signUpPrenom, pseudo: signUpPseudo, email: signUpEmail, password: signUpPassword}),
//     }).then(response => response.json())
//         .then(data => {
//             if (data.result) {
//                 dispatch(login({ nom: signUpNom, token: data.token, prenom: signUpPrenom, pseudo: signUpPseudo, email: signUpEmail }));
//                 setSignUpNom('');
//                 setSignUpPrenom('');
//                 setSignUpPseudo('');
//                 setSignUpEmail('');
//                 setSignUpPassword('');
                
//             }
//         });
// };
return(
    <View style={styles.mainContainer}>
        <View style={styles.citypsContainer}>
            <Image source={require('../assets/logosignup.png')} style={styles.Image}/>
            {/* <FontAwesome name='circle-thin' size={150} color="#adebf6"  onPress={() => handleConnection()}/> */}
        </View>
        <View style={styles.nomContainer}>
            <View style={styles.inputContainer}>
                <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputName} placeholder="  Email"/>
                <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputSurname} placeholder="  Email"/>
                <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputUserName} placeholder="  Email"/>
            </View>
            <View>
                <Image source={require('../assets/favicon.png')} style={styles.Image1}></Image>
            </View>
        </View>
        <View style={styles.emailContainer}>
            <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputEmail} placeholder="  Email"/>
            <TextInput onChangeText={(value) => setSignInEmail(value)}  style={styles.inputPassword} placeholder="  Email"/>
            <TextInput />
        </View>
        <View style={styles.scrollContainer}>
            
        </View>
        <View style={styles.buttonContainer}>
            <TouchableOpacity onPress={() => handleRegister()}></TouchableOpacity>
        </View>
    </View>
)
}
const styles = StyleSheet.create({
    mainContainer:{
        margin: 0,
        padding: 0,
        backgroundColor: "#77d0de",
        flex: 1,
        width: '100%',
        alignItems: "center"
    },
    citypsContainer:{
        height: "10%",
        marginTop: "20%"
    },
    nomContainer:{
        marginTop: '50%',
        height: "30%",
        // flex: 1,
        flexDirection: 'row',
        width: '50%',
        justifyContent: 'space-between'
        // flex: 1,
        
    },
    inputContainer:{
        flex: 1,
        justifyContent: 'space-evenly',
        
    },
    inputName:{
        color: 'yellow',
        width: "80%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
    },
    inputSurname:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
    },
    inputUserName:{
        width: "85%",
        height: "15%",
        borderRadius: 20,
        backgroundColor: "#d6f5fa"
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
    }
    
})