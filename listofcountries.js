import React from 'react';
import { useEffect } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    FlatList,
    Button,
    ActivityIndicator, 
    Input
  } from 'react-native';
import { TextInput, TouchableOpacity } from 'react-native-gesture-handler';
import { useState } from 'react/cjs/react.development';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Ionicons from 'react-native-vector-icons/Ionicons';
import AsyncStorage from '@react-native-async-storage/async-storage';

const CountriesScreen=({navigation,route})=>{
   
  const [OriginalcountryNames, setOriginalListCountryNames] = useState([])
  const [countryNames, setListCountryNames] = useState([])
  const [filteredName, setFilteredName] = useState("")
  const [displayFilterOne, setdisplayFilterOne] = useState(false)

  useEffect(()=>{
  fetch("https://world-population.p.rapidapi.com/allcountriesname", {
"method": "GET",
"headers": {
  "x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
  "x-rapidapi-host": "world-population.p.rapidapi.com"
}
})
  .then((response)=>response.json())
  .then(responseJson => {
      // setListofCountries(responseJson)
      setListCountryNames(responseJson.body.countries)
      setOriginalListCountryNames(responseJson.body.countries)
    // console.log(response);
})
.catch(err => {
console.error(err);
});

},[])

  const searchCountry=(text)=>{

    
      setOriginalListCountryNames(countryNames.filter(val=>val.includes(text)))
    
    // if(text!=""){
      //     for (var i=0; i<countryNames.length; i++){
      //         if(text==countryNames[i]){
                  
      //             setFilteredName(text)
      //             setdisplayFilterOne(true)
      //             // alert("Found")
      //         }
      //     }
        
      //     }
         
  }
  
  
  
  // if(displayFilterOne){
  //     return( 
  //         <View style={{flexDirection:"row"}}>
  //         <TouchableOpacity style={{width:350}}  
  //         onPress = {
  //           () => navigation.navigate("Details", {county: filteredName })
  //         }
  //         >
  //         <Text style={styles.item}>{filteredName}</Text> 
  //         </TouchableOpacity>

  //         </View>
  //         )
      
  //     // setdisplayFilterOne(false)
  // }
  // else{
  return(    
      
    <View>
    
        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center"}}>
        <Text>
        <Ionicons name="search-outline" size={23} color={"grey"}/>  {/*#900*/}
        </Text>
            <TextInput
            style={{borderColor:"red", borderBottomWidth:2}}
            placeholder= "Enter the country to Search"
            onChangeText = {(text)=>{searchCountry(text);}}
          //   value={countrytoSearch}
            />
        </View>

        <FlatList
        keyExtractor={(item,ind)=>"Key" + ind }
        data={OriginalcountryNames}
        renderItem={({item})=> (
          <View style={{flexDirection:"row", justifyContent:"center"}}>
          <TouchableOpacity style={{width:350}} onPress = {
              () => navigation.navigate("Details", {county: item })
          }>
          <Text style={styles.item} >{JSON.stringify(item).slice(1, -1)} 
          </Text>
          </TouchableOpacity>
          </View>
        )}
        
        ></FlatList>

    </View>

  )
        }


const CountryDetails=({navigation,route})=>{
  
  const [details, setDetails] = useState([])
  const country = route.params.county
  const [Loading, setloading] = useState(true)
  const [color, setcolor] = useState("grey")

  // alert(country)

  const getFav = async()=>{

    const Cname =  await AsyncStorage.getItem(country)
    
    if(Cname){
      setcolor("#900")
    }
    
    }

useEffect(()=>{
  
  getFav()

  fetch('https://covid-19-data.p.rapidapi.com/report/country/name?date=2020-04-01&name='+country, {
    "method": "GET",
    "headers": {
      "x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
      "x-rapidapi-host": "covid-19-data.p.rapidapi.com"
    }
  })
  .then((response)=>response.json())
  .then(response => {
    setDetails(response)
    setloading(false)
    // console.log(response);
  })
  .catch(err => {
    console.error(err);



  });
}, [])

if (Loading) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" color="blue" />
      <Text>Loading Data from JSON Placeholder API ...</Text>
    </View>
  );
}

const addToFav= async ()=>{

  await AsyncStorage.setItem(country,country)
  setcolor("#900")

}



  return(
    <View>
      <View style={{alignItems:"flex-end"}}>
      <TouchableOpacity onPress={()=>{addToFav()}}>
        <Text>
        <Ionicons name="star-sharp" size={30} color={color}/>  {/*#900*/}
        </Text>
      </TouchableOpacity>
      </View>

      {/* <Button title="Che" onPress={()=>{getFav()}}/> */}

      <Text>Country: {JSON.stringify(details[0].country).slice(1, -1)}</Text>
      <Text>latitude: {JSON.stringify(details[0].latitude)}</Text>
      <Text>longitude: {JSON.stringify(details[0].longitude)}</Text>
      <Text>Date: {JSON.stringify(details[0].date).slice(1, -1)}</Text>
      <FlatList
        keyExtractor={(item,ind)=>"Key" + ind }
        data={details[0].provinces}
        renderItem={({item})=> (
          <View style={{flexDirection:"row"}}>
          
          <Text style={styles.item} >Province: {(item.province)} Confirmed: {item.confirmed} Recovered: {item.recovered} Deaths: {item.deaths} Active: {item.active}
          </Text>

          </View>
        )}
        >

        </FlatList>
    
  
    </View>

  )

}


const Stack = createStackNavigator();

function App() {
  return (
    // <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen name="Countries" component={CountriesScreen}/>
        <Stack.Screen name="Details" component={CountryDetails} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    marginTop: StatusBar.currentHeight || 0,
  },
  item: {
    backgroundColor: '#f9c2ff',
    padding: 20,
    marginVertical: 8,
  //   marginHorizontal: 10,
    marginLeft:10
  },
  itemTwo:{
      backgroundColor: 'grey',
      padding: 20,
      marginVertical: 8,
      marginRight:2,
      color:"red"
      // marginHorizontal: 10, 
  },
  title: {
    fontSize: 32,
  },
});


export default App;

 