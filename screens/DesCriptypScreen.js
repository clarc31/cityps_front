import {
  StyleSheet,
  Text,
  View,
} from 'react-native';

export default function DescripTypScreen() {
  
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