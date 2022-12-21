import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';

import FontAwesome from 'react-native-vector-icons/FontAwesome';

import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DesCriptypScreen from './screens/DesCriptypScreen'; // Ajout import Screen
import DisplayUserAlbumScreen from './screens/DisplayUserAlbumScreen';
import NewPostScreen from './screens/NewPostScreen';

/* REDUX PERSIST POUR REACT NATIVE */

//  1) imports nécessaires pour utiliser redux-persist:
import { Provider } from 'react-redux';
import AsyncStorage from '@react-native-async-storage/async-storage'; 
import { persistStore, persistReducer  } from 'redux-persist'; 
import { PersistGate } from 'redux-persist/integration/react'; 

// 2) Importez également la fonction combineReducers :
import { configureStore, combineReducers} from '@reduxjs/toolkit'; 

// 3) Importez le reducer:
import user from './reducers/user'; 

// 3) Définissez le ou les reducer(s) de votre application avec la fonction combineReducers :
const reducers = combineReducers({ user });

// 4) Utilisez une clé de stockage pour définir un nom à votre store à l’intérieur du local storage :
const persistConfig = {
  key: 'cityps',
  storage: AsyncStorage,
}

// 5) Mettez ensuite à jour le contenu de votre store avec la fonction configureStore :
const store = configureStore({
  reducer: persistReducer(persistConfig, reducers),
  middleware: (getDefaultMiddleware) => getDefaultMiddleware({ serializableCheck: false }),
 });
 
// 6) Transformez votre store pour qu’il soit persistant :
const persistor = persistStore(store)

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();
console.log('stack', Stack) // ---------------------------------
console.log('Tab', Tab) // -------------------------------------
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ backgroundColor,color, size }) => {
        let iconName = '';

        if (route.name === 'Mes albums') {
          iconName = 'book';
        } else if (route.name === 'Postyps') {
          iconName = 'edit';
        } else if (route.name === 'Découvrir') {
          iconName = 'map'
        }
        return <FontAwesome name={iconName} size={size} color={color} backgroundColor={backgroundColor} />;
      },
      headerShown: false,
      tabBarActiveTintColor: '#F77B55',
      tabBarInactiveTintColor: '#475059',
      //activeBackgroundColor: '#77d0de', //tabBarBackgroundColor: '#77d0de'
      tabBarStyle:{
        backgroundColor: '#77d0de',
      }
      
      
    })} initialRouteName="Découvrir">
      <Tab.Screen name="Mes albums" component={DisplayUserAlbumScreen} />
      <Tab.Screen name="Découvrir" component={HomeScreen} />
      <Tab.Screen name="Postyps" component={NewPostScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  
  return (
    <Provider store={store}>
      <PersistGate persistor={persistor}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }} initialRouteName="SignIn">
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
          <Stack.Screen name="SignUp" component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="DesCriptyp" component={DesCriptypScreen}/>
          <Stack.Screen name="DisplayUserAlbum" component={DisplayUserAlbumScreen}/>
          <Stack.Screen name="NewPost" component={NewPostScreen}/>
          <Stack.Screen name="SignIn"component={SignInScreen} />
        </Stack.Navigator>
      </NavigationContainer>
      </PersistGate>
    </Provider>
  );
}


/* Init Senda
const TabNavigator = () => {
  return (
    <Tab.Navigator screenOptions={({ route }) => ({
      tabBarIcon: ({ backgroundColor,color, size }) => {
        let iconName = '';

        if (route.name === 'User Albums') {
          iconName = 'file-text';
        } else if (route.name === 'New Post') {
          iconName = 'edit';
        } else {
          iconName = 'home';
        }
        return <FontAwesome name={iconName} size={size} color={color} backgroundColor={backgroundColor} />;
      },
      headerShown: false,
      tabBarActiveTintColor: '#F77B55',
      tabBarInactiveTintColor: '#475059',
      tabBarBackgroundColor: '#77D0DE',
      
    })}>
      <Tab.Screen name="Home" component={HomeScreen} />
      <Tab.Screen name="User Albums" component={DisplayUserAlbumScreen} />
      <Tab.Screen name="New Post" component={NewPostScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SignIn'component={SignInScreen} />
        <Stack.Screen name='SignUp'component={SignUpScreen} />
        <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
    </Provider>
  );
}
*/