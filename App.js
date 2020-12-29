/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 * @flow strict-local
 */

import React from 'react';
import {
  SafeAreaView,
  StyleSheet,
  ScrollView,
  View,
  Text,
  StatusBar,
  Button
} from 'react-native';

import {
  Header,
  LearnMoreLinks,
  Colors,
  DebugInstructions,
  ReloadInstructions,
} from 'react-native/Libraries/NewAppScreen';

import WorldStatisticsScreen from "./WorldStatisticsScreen"
import ListofCountries from "./listofcountries"
import FavouriteCountries from "./FavouriteCountries"
import { createDrawerNavigator } from '@react-navigation/drawer';
import { NavigationContainer } from '@react-navigation/native';
import Fontisto from 'react-native-vector-icons/Fontisto';
import Foundation  from 'react-native-vector-icons/Foundation';




const Drawer = createDrawerNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName="Home"
      drawerType="slide"
      drawerStyle={{
        backgroundColor:"linen",
        
      }}
      drawerContentOptions={{
        activeTintColor: 'midnightblue',
        inactiveTintColor:"olive"
      }}
    
      
      >
        <Drawer.Screen 
        options={{
          drawerIcon:()=><Fontisto name="world-o" size={25} color="cadetblue"></Fontisto>
        }}
        name="World Statistics" component={WorldStatisticsScreen} />
        <Drawer.Screen name="countriesList" component={ListofCountries} options={{
          drawerIcon:()=><Foundation name="flag" size={25} color="grey"></Foundation>,
          drawerLabel:"Countries List"}}/>
        <Drawer.Screen name="Favourites" component={FavouriteCountries} options={{
          drawerIcon:()=><Fontisto name="favorite" size={25} color="red"></Fontisto>,
          drawerLabel:"Favourite Countries"}}/>
      </Drawer.Navigator>
    </NavigationContainer>
  );
}


// const styles = StyleSheet.create({
//   scrollView: {
//     backgroundColor: Colors.lighter,
//   },
//   engine: {
//     position: 'absolute',
//     right: 0,
//   },
//   body: {
//     backgroundColor: Colors.white,
//   },
//   sectionContainer: {
//     marginTop: 32,
//     paddingHorizontal: 24,
//   },
//   sectionTitle: {
//     fontSize: 24,
//     fontWeight: '600',
//     color: Colors.black,
//   },
//   sectionDescription: {
//     marginTop: 8,
//     fontSize: 18,
//     fontWeight: '400',
//     color: Colors.dark,
//   },
//   highlight: {
//     fontWeight: '700',
//   },
//   footer: {
//     color: Colors.dark,
//     fontSize: 12,
//     fontWeight: '600',
//     padding: 4,
//     paddingRight: 12,
//     textAlign: 'right',
//   },
// });


