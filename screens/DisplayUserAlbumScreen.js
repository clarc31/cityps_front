import {
  StyleSheet,
  Text,
  View,
  } from 'react-native';


export default function DisplayUserAlbumScreen() {

  return (
    <View style={styles.mainContainer}>
     <Text>Display User Album Screen</Text>
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