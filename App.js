import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import FontAwesome from 'react-native-vector-icons/FontAwesome';
import HomeScreen from './screens/HomeScreen';
import SignInScreen from './screens/SignInScreen';
import SignUpScreen from './screens/SignUpScreen';
import DisplayUserAlbumScreen from './screens/DisplayUserAlbumScreen';
import NewPostScreen from './screens/NewPostScreen';


import { Provider } from 'react-redux';
import { configureStore } from '@reduxjs/toolkit';
// import user from './reducers/user';

const store = configureStore({
  reducer: { },
});

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

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
        <Stack.Screen name="Home" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}