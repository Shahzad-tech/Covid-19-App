import AsyncStorage from '@react-native-async-storage/async-storage';
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
    ActivityIndicator
  } from 'react-native';
import { useState } from 'react/cjs/react.development';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator } from '@react-navigation/stack';


  const FavList=({navigation})=>{
   
    const[favnames, setfavNames] = useState([])
    const [color, setcolor] = useState("#900")
    
    const getFav = async()=>{

        const Cname =  await AsyncStorage.getAllKeys()
        
        // alert(typeof(Cname))
        setfavNames(Cname)
        
    }

    const clearFav= async(item)=>{

        await AsyncStorage.removeItem(item)
        
        // setfavNames("")
    }

    useEffect(()=>{
        
        getFav()

    })
   
   
    return(
        <View>
            {/* <Text>{favnames}</Text> */}
            {/* <Button title ='clear'onPress={()=>clearFav()} /> */}
            <FlatList

                keyExtractor={(item,ind)=>"Key" + ind }
                data={favnames}

                renderItem={({item})=> (
          
                    <View style={{flexDirection:"row"}}>
                        <View>
                        <TouchableOpacity onPress={() => navigation.navigate("Details", {county: item })}>
                        <Text style={styles.item}>{item}</Text>
                        </TouchableOpacity>
                        </View>
                        <View style={{alignItems:"flex-end", alignContent:"flex-end", justifyContent:"flex-end"}}>
                            <TouchableOpacity onPress={()=>{clearFav(item)}}>
                            <Text style={styles.itemTwo}><Ionicons name="star-sharp" size={29} color={color}/>  {/*#900*/}</Text>
                            </TouchableOpacity>
                        </View>

                    </View>
                )}
        >

            </FlatList>

        </View>
    )

  }

  const FavDetail=({route})=>{

    const country = route.params.county
    const [details, setDetails] = useState([])
    const [Loading, setloading] = useState(true)
    const [color, setcolor] = useState("grey")


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
      
    //   const addToFav= async ()=>{
      
    //     await AsyncStorage.setItem(country,country)
    //     setcolor("#900")
      
    //   }
      
      
      
        return(
          <View>
            <View style={{alignItems:"flex-end"}}>
            
              <Text>
              <Ionicons name="star-sharp" size={30} color={color}/>  {/*#900*/}
              </Text>

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
          <Stack.Screen name="Favourites" component={FavList}/>
          <Stack.Screen name="Details" component={FavDetail} />
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
      fontSize:24,
      backgroundColor: '#f9c2ff',
      padding: 20,
      marginVertical: 8,
      marginHorizontal: 10,
      marginLeft:10,
      width:300
      
    },
    itemTwo:{
        // backgroundColor: 'grey',
        padding: 20,
        marginVertical: 8,
        marginRight:2,
        backgroundColor: '#f9c2ff',
        marginHorizontal: 10, 
    },
    title: {
      fontSize: 32,
    },
  });


  export default App