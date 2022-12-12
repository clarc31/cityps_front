import React from 'react';
import { useState } from 'react';

import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
} from 'react-native';

import { SearchBar } from 'react-native-elements';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

export default function HomeScreen({ navigation }) {
  
  return (
    <View style={styles.mainContainer}>

    <View style={styles.topContainer}>
    
      <TouchableOpacity >
          <FontAwesome name='menu' size={40} color='#475059' />
          </TouchableOpacity>

        <SearchBar style={styles.SearchBar}
          round
          searchIcon={{ size: 24 }}
          placeholder="Indiquez votre ville..."
          >

          <TouchableOpacity>
          <FontAwesome name='search' size={20} color='#475059' />
          </TouchableOpacity>
       
        </SearchBar>

    </View>   

      <View style={styles.bottomContainer}>
    
        <View className={styles.tipsList}>
        <Image source={require('../assets/avatar.png')}  className={styles.avatar} />
        <Text className={styles.title}> Titre </Text>
        <Text className={styles.place}> Lieu </Text>
        <Text className={styles.content}> Premières lignes du descriptyps</Text>
        
        </View>

      </View>

     </View>

  )};



const styles = StyleSheet.create({

  mainContainer: {
    flex: 1,
    backgroundColor: '#77D0DE',
    alignItems: 'center',
    justifyContent: 'center',
  },

  SearchBar: {
    justifyContent: 'center',
    flex: 1,
    backgroundColor: 'white',
    marginTop: Platform.OS == 'ios' ? 30 : 0,
  },
  


});


