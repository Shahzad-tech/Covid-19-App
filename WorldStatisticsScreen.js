import React from 'react';
import { useEffect } from 'react';
import { useState } from 'react';
import {
    SafeAreaView,
    StyleSheet,
    ScrollView,
    View,
    Text,
    StatusBar,
    ActivityIndicator
  } from 'react-native';
import { set } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Moment from 'moment';
 
const HomeScreen=()=>{  

// var resp = ""
const [resp , setresp ]= useState([])
const [Loading, setloading] = useState(true)
const [worldPopulation, setWorldPopulation] = useState(7794798739)

useEffect(()=>{

  fetch("https://covid-19-data.p.rapidapi.com/totals", {
	"method": "GET",
	"headers": {
		"x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
	}
})
.then((response)=>response.json())
.then(responseJson => {
    // console.log(response);
    setloading(false)
    setresp(responseJson[0])
})
.catch(err => {
	console.error(err);
});

}, [] )

if (Loading) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
        <ActivityIndicator size="large" color="blue" />
        <Text>Loading Data from JSON Placeholder API ...</Text>
      </View>
    );
  }

return( 
    <View>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Total Population: {worldPopulation}</Text><Text> {((resp.confirmed/worldPopulation)*100).toFixed(2)} % of the world</Text>
      </View>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Confirmed Cases: {JSON.stringify(resp.confirmed)}</Text><Text> {((resp.confirmed/worldPopulation)*100).toFixed(2)} % of the world</Text>
      </View>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Critical Cases: {JSON.stringify(resp.critical)} </Text><Text>{((resp.critical/worldPopulation)*100).toFixed(9)} % of the world </Text>
      </View>
      <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Deaths: {JSON.stringify(resp.deaths)}</Text><Text>{((resp.deaths/worldPopulation)*100).toFixed(2)} % of the world </Text>
      </View>
        {/* <View style={{flexDirection:"row", justifyContent:"space-between"}}>  
        <Text>Last Change: {JSON.stringify(resp.lastChange)}</Text>
        </View> */}
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Last Update:</Text><Text> {Moment(resp.lastUpdate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text>
        </View>
        <View style={{flexDirection:"row", justifyContent:"space-between"}}>
        <Text>Recovered Cases: {JSON.stringify(resp.recovered)} </Text><Text>{((resp.recovered/worldPopulation)*100).toFixed(2)} % of the world</Text>
        </View>
        {/* <Text>{JSON.stringify(resp.map((item)=>{item.confirmed}))}</Text> */}
    </View>
)


}


const Stack = createStackNavigator();
function App() {


  return (
    // <NavigationContainer>
      <Stack.Navigator screenOptions={({navigation})=>({

        headerTitleAlign:"center",
        headerLeft:()=> ( <TouchableOpacity onPress={()=>navigation.openDrawer()}><Text><Entypo name="menu" size={30} color="#900"></Entypo></Text></TouchableOpacity>),
        

      })}>
        <Stack.Screen name="World Statistics" component={HomeScreen}/>
        {/* <Stack.Screen name="Details" component={FavDetail} /> */}
      </Stack.Navigator>
    // </NavigationContainer>
  );
}

export default App


// const App=()=>{
    
//     const [dataloaded,setdataloaded] = useState(true)
//     const [dataSource, setDataSource] = useState("")

//   const data=()=>{
    
//     return(

//         fetch("https://covid-19-data.p.rapidapi.com/totals", {
// 	"method": "GET",
// 	"headers": {
// 		"x-rapidapi-key": "3f52bc968emsha572038902d9527p1829e7jsn3e116178b142",
// 		"x-rapidapi-host": "covid-19-data.p.rapidapi.com"
// 	}
// })
// .then((response) => response.json())
// .then((responseJson)=>{
//     setdataloaded(false)
//     setDataSource(responseJson)
// })
// .catch(err => {
//     alert(error)
//     // console.error(err);
// })
//     )
//   }
    
//     if (dataloaded) {
//         return (
//           <View style={{ flex: 1, padding: 20 }}>
//             {/* <ActivityIndicator size="large" color="blue" /> */}
//             <Text>Loading Data from JSON Placeholder API ...</Text>
//           </View>
//         );
//       }
//       return(
//      <View style={{ padding: 30 }}>
//         <Text>Confirmed: {JSON.stringify(dataSource)}</Text>
//       </View>
// )

//      }    

// export default App