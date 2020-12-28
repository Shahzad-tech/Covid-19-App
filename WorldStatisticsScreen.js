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
import { color, set } from 'react-native-reanimated';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Entypo from 'react-native-vector-icons/Entypo';
import { TouchableOpacity } from 'react-native-gesture-handler';
import { createStackNavigator, HeaderTitle } from '@react-navigation/stack';
import Moment from 'moment';
 
const HomeScreen=()=>{  

// var resp = ""
const [resp , setresp ]= useState([])
const [Load, setload] = useState(true)
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
    setload(false)
    setresp(responseJson[0])
})
.catch(err => {
	console.error(err);
});

}, [] )

if (Load) {
    return (
      <View style={{ flex: 1, padding: 20 }}>
      <ActivityIndicator size="large" color="red" />
      <Text style={{textAlign:"center", marginTop:"5%"}}>Loading Data from Fetch API ...</Text>
    </View>
    );
  }

return( 
    <View style={styles.container}>
      <View style={{alignItems:"center"}}>
        <Text style={styles.headers}>Total Population</Text ><Text style={styles.headerTwo}>{worldPopulation}</Text>
      </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Confirmed Cases</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo}> {JSON.stringify(resp.confirmed)}</Text><Text style={styles.content}>{'      '}{((resp.confirmed/worldPopulation)*100).toFixed(2)}% of the world</Text></View>
      </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Recovered Cases</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} > {JSON.stringify(resp.recovered)}</Text><Text style={styles.content}>{'     '}{((resp.recovered/resp.confirmed)*100).toFixed(2)} % of the the confirmed cases</Text></View>
        </View>
      <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Critical Cases</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} >{JSON.stringify(resp.critical)}</Text><Text style={styles.content}>{'     '}{((resp.critical/worldPopulation)*100).toFixed(9)} % of the world </Text></View>
      </View>
      
        
    
        
        <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Deaths</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo} >{JSON.stringify(resp.deaths)}</Text><Text style={styles.content}>{'    '}{((resp.deaths/worldPopulation)*100).toFixed(2)} % of the world </Text></View>
      </View>
        <View style={{ alignItems:"center"}}>
        <Text style={styles.headers}>Last Update</Text><View style={{flexDirection:"row"}}><Text style={styles.headerTwo}> {Moment(resp.lastUpdate).format("dddd, MMMM Do YYYY, h:mm:ss a")}</Text></View>
        </View>
        
    </View>
)


}


const Stack = createStackNavigator();
function App() {


  return (

      <Stack.Navigator screenOptions={({navigation})=>({

        headerTitleAlign:"center",
  
        headerLeft:()=> ( <TouchableOpacity onPress={()=>navigation.openDrawer()}><Text><Entypo name="menu" size={30} color="#900"></Entypo></Text></TouchableOpacity>),
        headerTintColor:"wheat",
        headerStyle:{
          backgroundColor:"orangered"
        }

      })}>
        <Stack.Screen name="World Statistics" component={HomeScreen}/>
       
      </Stack.Navigator>
    
  );
}


const styles = StyleSheet.create({
  container: {
    flex:1,
    
    justifyContent:"center",
    backgroundColor:"gainsboro"
  },
  headers:{
    marginTop:10,
    fontSize:28,
    color:"darkslategrey",
    fontFamily:"sans-serif-light",
    borderBottomWidth:1,
    borderBottomColor:"crimson",
    fontWeight:"bold"
  },
  headerTwo:{
    marginTop:12,
    fontSize:15,
    fontFamily:"serif",
    color:"darkred"
  },
  content:{
    marginTop:12,
    fontFamily:"sans-serif-condensed",
    color:"dimgrey"
  },
  
});


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