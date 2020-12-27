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

 
const App=()=>{  

// var resp = ""
const [resp , setresp ]= useState([])
const [Loading, setloading] = useState(true)


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
        <Text>Confirmed: {JSON.stringify(resp.confirmed)}</Text>
        <Text>Critical: {JSON.stringify(resp.critical)}</Text>
        <Text>Deaths: {JSON.stringify(resp.deaths)}</Text>
        <Text>Last Change: {JSON.stringify(resp.lastChange)}</Text>
        <Text>Last Update: {JSON.stringify(resp.lastUpdate)}</Text>
        <Text>Recovered: {JSON.stringify(resp.recovered)}</Text>
        {/* <Text>{JSON.stringify(resp.map((item)=>{item.confirmed}))}</Text> */}
    </View>
)


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