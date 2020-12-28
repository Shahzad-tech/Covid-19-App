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
    Input, 
    Alert
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
  const [load, setload] =  useState(true)

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
     
      setListCountryNames(responseJson.body.countries)
      setOriginalListCountryNames(responseJson.body.countries)
      setload(false)
    
})
.catch(err => {
console.error(err);
});

},[])

  const searchCountry=(text)=>{

    
      setOriginalListCountryNames(countryNames.filter(val=>val.includes(text)))
   
         
  }
  
  
  
  
  if(load){
    
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{textAlign:"center", marginTop:"5%"}}>Loading Data from Fetch API ...</Text>
      </View>
    );

  }

  return(    
      
    <View style={styles.container}>
    
        <View style={{flexDirection:"row", justifyContent:"center", alignItems:"center", marginBottom:14, marginTop:3}}>
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
  const [Load, setload] = useState(true)
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
    setload(false)
    // console.log(response);
  })
  .catch(err => {
    console.error(err);



  });
}, [])

if (Load) {
  return (
    <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="red" />
        <Text style={{textAlign:"center", marginTop:"5%"}}>Loading Data from Fetch API ...</Text>
      </View>
  );
}

const addToFav= async ()=>{

  await AsyncStorage.setItem(country,country)
  Alert.alert(
    "Country Added...!",
    "Country has been added to favourites",
    [
      { text: "OK", onPress: () => {} }
    ],
  );
  setcolor("#900")

}



  return(

    <View style={styles.container}>
      <View style={{alignItems:"flex-end"}}>
      <TouchableOpacity onPress={()=>{addToFav()}}>
        <Text>
        <Ionicons name="star-sharp" size={30} color={color}/>  {/*#900*/}
        </Text>
      </TouchableOpacity>
      </View>

      {/* <Button title="Che" onPress={()=>{getFav()}}/> */}
      <View style={{alignItems:"flex-start", marginBottom:15}}>
       
      <View style={{flexDirection:"row"}}><Text style={styles.textt}>longitude :{'  '} </Text><Text style={styles.textTwo}>{JSON.stringify(details[0].longitude)}</Text></View>
      <View  style={{flexDirection:"row"}}><Text style={styles.textt}>latitude :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].latitude)}</Text></View>
      <View  style={{flexDirection:"row"}}><Text style={styles.textt}>Country :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].country).slice(1, -1)}</Text></View>
      <View  style={{flexDirection:"row"}}><Text style={styles.textt}>Date :{'  '} </Text><Text  style={styles.textTwo}>{JSON.stringify(details[0].date).slice(1, -1)}</Text></View>
      </View>
      <FlatList
        keyExtractor={(item,ind)=>"Key" + ind }
        data={details[0].provinces}
        renderItem={({item})=> (
          <View style={{flexDirection:"row", justifyContent:"center"}}>
          
          <Text style={styles.item} >Province: {(item.province)}{'   '}  Confirmed: {item.confirmed}{'\n\n'}Recovered: {item.recovered}{'   '}  
          Deaths: {item.deaths}{'   '}  Active: {item.active}
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
      <Stack.Navigator  screenOptions={({navigation})=>({

        headerTitleAlign:"center",
  
        headerTintColor:"wheat",
        headerStyle:{
          backgroundColor:"orangered"
        }

      })}>
        <Stack.Screen name="Countries" component={CountriesScreen}/>
        <Stack.Screen name="Details" component={CountryDetails} />
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor:"gainsboro"
  },
  item: {
    backgroundColor: 'seashell',
    fontWeight:"bold",
    color:"saddlebrown",
    padding: 20,
    borderWidth:1,
    borderColor:"grey",
    fontFamily:"sans-serif-light",
    width:370,
   
    marginLeft:5
  },
  itemTwo:{
      backgroundColor: 'grey',
      padding: 20,
      marginVertical: 8,
      marginRight:2,
      color:"red",
      
  },
  textt:{
   
    fontFamily:"sans-serif-light",
    fontSize:23,
    color:"midnightblue",
    marginLeft:10,  
    fontWeight:"bold"
   
  },
  textTwo:{
    fontFamily:"sans-serif-light",
    fontSize:18,
    color:"maroon",
    marginTop:5,
    justifyContent:"center"
  }
});


export default App;

 