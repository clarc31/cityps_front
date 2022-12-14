import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

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
     <Text>DescripTypScreen</Text>
   </View>
 );
}

const styles = StyleSheet.create({
  mainContainer: {
    flex: 1,
    backgroundColor: '#ffffff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});