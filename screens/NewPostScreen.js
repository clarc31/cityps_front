import {
    StyleSheet,
    Text,
    View,
    } from 'react-native';
  
  
  export default function NewPostScreen() {
  
    return (
      <View style={styles.mainContainer}>
       <Text>New Post Screen</Text>
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