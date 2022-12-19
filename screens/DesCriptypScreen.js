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
import Icon from 'react-native-vector-icons/FontAwesome';

export default function DescripTypScreen() {
/*
  // 2nd request : send new place to backend to register it in database
fetch('http://localhost:3000/places', {
  method: 'POST',
  headers: { 'Content-Type': 'application/json' },
  body: JSON.stringify({ nickname: user.nickname, name: newPlace.name, latitude: newPlace.latitude, longitude: newPlace.longitude }),
  }).then((response) => response.json())
  .then((data) => {
    // Dispatch in Redux store if the new place have been registered in database
    if (data.result) {
      dispatch(addPlace(newPlace));
      setCity('');
    }
  });

  */

  return (
    <View style={styles.mainContainer}>
      <View>
        <Image source={require('../assets/descriptypsColor.png')}/>
          <View style={styles.tipsList} >
            <Image source={require('../assets/avatar.png')}  style={styles.avatar} />
                  <Text style={styles.title}> Titre </Text>
                  <Text style={styles.place}> Lieu </Text>
          </View>
      </View>
      <View>
        <Image source={require('../assets/logisignin.png')} style={styles.image}/>
        <View style={styles.iconContainer}>
          <Text style={styles.text}>Lorem ipsum dolor sit amet consectetur adipisicing elit. Maxime mollitia,
              molestiae quas vel sint commodi repudiandae consequuntur voluptatum laborum
              numquam blanditiis harum quisquam eius sed odit fugiat iusto fuga praesentium
              optio, eaque rerum! Provident similique accusantium nemo autem. Veritatis
              obcaecati tenetur iure eius earum ut molestias architecto voluptate aliquam
              nihil, eveniet aliquid culpa officia aut! Impedit sit sunt quaerat, odit,</Text>
              <View style={styles.icons}>
                <View style={styles.like}>
                  <Icon name='thumbs-up' size={40} color='#475059' style={styles.menuIcon}/>
                  <Icon name='thumbs-down' size={40} color='#475059' style={styles.menuIcon}/>
                </View>
                <View style={styles.books}>
                  <Icon name='map-marker' size={40} color='#475059' style={styles.menuIcon}/>
                  <Icon name='book' size={40} color='#475059' style={styles.menuIcon}/>
                </View>
              </View>
          </View>
        </View>
   </View>
 );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#77D0DE',
    alignItems: 'center',
    justifyContent: 'center',
  },
  tipsList:  {
    // alignItems: 'flex-start',
    // flexDirection: "column",
    // flexWrap: "wrap",
    flexDirection: "row",
    borderRadius: 10,
    borderColor: "#F77B55",
    borderWidth: 2,
    margin: 4,
    backgroundColor: "#D6F5FA",
    alignItems: "center",
    height: 80,
    width: 370
  },
  avatar: {
    height: 50,
    width: 50,
    borderRadius: 30,
  },
  image:{
    margin: '4%'
  },
  iconContainer:{
    backgroundColor: "#D6F5FA",
    width:370,
    borderRadius: 10,
    margin: '2%'
  },
  icons:{
    // flex:1, 
    // flexDirection: 'row',
    // justifyContent: 'space-between'
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-around'
  },
  menuIcon:{
    color :'#77D0DE'
  },
  like:{
    flex: 1,
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  },
  books:{
    flex : 1,
    alignItems : 'center',
    flexDirection: 'row',
    justifyContent: 'space-evenly'
  }
});