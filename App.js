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

        if (route.name === 'DisplayUserAlbum') {
          iconName = 'layer-group';
        } else if (route.name === 'NewPost') {
          iconName = 'file-pen';
        }

        return <FontAwesome name={iconName} size={size} color={color} backgroundColor={backgroundColor} />;
      },
      tabBarActiveTintColor: '#F77B55',
      tabBarInactiveTintColor: '#D6F5FA',
      tabBarBackground: '#77D0DE',
      headerShown: false,
    })}>
      <Tab.Screen name="DisplayUserAlbum" component={DisplayUserAlbumScreen} />
      <Tab.Screen name="NewPost" component={NewPostScreen} />
    </Tab.Navigator>
  );
};

export default function App() {
  
  return (
    <Provider store={store}>
      <NavigationContainer >
        <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name='SignUp'component={SignUpScreen} />
          <Stack.Screen name="Home" component={HomeScreen} />
          <Stack.Screen name="TabNavigator" component={TabNavigator} />
        </Stack.Navigator>
      </NavigationContainer>
      </Provider>
  );
}