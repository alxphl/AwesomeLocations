import React, { Component } from 'react';
import { StyleSheet, Text, View } from 'react-native';
import MapView from 'react-native-maps';
import  * as Location  from 'expo-location';
import * as Permissions from 'expo-permissions';

export default class App extends Component {
  constructor(props){
    super(props)
    this.state = {
      mapRegion: { latitude: 37.78825, longitude: -122.4324, latitudeDelta: 0.0922, longitudeDelta: 0.0421 },
      locationResult: null,
      location: {coords: { latitude: 37.78825, longitude: -122.4324}},
    };
  }


  componentDidMount() {
    this._getLocationAsync();
  }

  _handleMapRegionChange = mapRegion => {
    this.setState({ mapRegion });
  };

  _getLocationAsync = async () => {
   let { status } = await Permissions.askAsync(Permissions.LOCATION);
   if (status !== 'granted') {
     this.setState({
       locationResult: 'Permission to access location was denied',
       location,
     });
   }

   let location = await Location.getLastKnownPositionAsync();
   this.setState({ locationResult: JSON.stringify(location), location, });
   console.log(location);
   console.log("LATITUDE: "+this.state.location.coords.latitude+"      LONGTITUDE: "+this.state.location.coords.longitude)
  };








/*
  componentWillMount(){
    this._getLocation();
  }
_getLocation = async () =>{
  const { status } = await Location.requestPermissionsAsync();
console.log(status);
  if(status !=='granted'){
    console.log('Permissions not granted!');
    this.setState({
      errorMessage:'Permissions not tranted!',
    })
  }



  const userLocation=await   Location.getLastKnownPositionAsync();
  console.log(userLocation);
  this.setState({
    location:userLocation
  });

}
*/

render(){

  return (
    <View style={styles.container}>
      <Text>Awesome Locations</Text>
      <Text>Find yourself on the map and track your move!</Text>
      <MapView
          style={{ alignSelf: 'stretch', height: 200 }}
          region={{ latitude: this.state.location.coords.latitude, longitude: this.state.location.coords.longitude, latitudeDelta: 0.0922, longitudeDelta: 0.0421 }}
          onRegionChange={this._handleMapRegionChange}
      coordinate={{latitude:this.state.location.coords.latitude, longitude: this.state.location.coords.longitude}}
      title="My Marker"
      description="Some description"
    />
          <Text>
          Location: {this.state.locationResult}
        </Text>
    </View>
  );
}
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});
