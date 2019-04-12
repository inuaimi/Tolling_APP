import React from 'react';
import {
  Text, View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE } from "react-native-maps";
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'
import { throwStatement } from '@babel/types';

// TODO: Zoom map
// TODO: Current location
// TODO: Marked locations

const LATITUDE_DELTA = 0.01;
const LONGITUDE_DELTA = 0.01;

const initialRegion = {
  latitude: 57.504518,
  longitude: 14.710427,
  latitudeDelta: 1,
  longitudeDelta: 1
}

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };
  // constructor(props) {
  //   super(props);

  //   this.state = {
  //     latitude: null,
  //     longitude: null,
  //     error: null
  //   };
  // }

  map = null;

  state = {
    region: {
      latitude: 57.504518,
      longitude: 14.710427,
      latitudeDelta: 1,
      longitudeDelta: 1
    },
    ready: true,
    filteredMarkers: []
  };

  setRegion(region) {
    if(!this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
    //this.setState({ region });
  }

  componentDidMount() {
    this.getCurrentposition();
  }
  // componentDidMount() {
  //   navigator.geolocation.getCurrentPosition(
  //     (position) => {
  //       this.setState({
  //         latitude: position.coords.latitude,
  //         longitude: position.coords.longitude,
  //         error: null,
  //       });
  //     },
  //     (error) => this.setState({ error: error.message }),
  //     { enableHighAccuracy: false, timeout: 200000, maximumAge: 1000 },
  //   )
  // }

  getCurrentposition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          console.log('currentPos: ', JSON.stringify(position, null, 2))
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: LATITUDE_DELTA,
            longitudeDelta: LONGITUDE_DELTA
          };
          this.setRegion(region);
        },
        (error) => {
          switch(error.code) {
            case 1:
              alert("", "To locate your location enable permission for the application in Settings - Privacy - Location");
              break;
            default:
              alert("", "Error in localizing your location")
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
    }
  };

  onMapReady = (e) => {
    if(!this.state.ready) {
      this.setState({ ready: true });
    }
  };

  onRegionChange = (region) => {
    console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
  };

  render() {

    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;

    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          ref={ map => { this.map = map }}
          data={markers}
          initialRegion={initialRegion}
          renderMarker={renderMarker}
          onMapReady={this.onMapReady}
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          textStyle={{ color: '#bc8b00' }}
          containerStyle={{ backgroundColor: 'white', borderColor: '#bc8b00' }}

          // { markers.map(renderMarker) }

          // { children && children || null }
        />
      </View>
    );
  }
}




{/* <View style={styles.container}>
  <MapView
    style={styles.map}
    provider={PROVIDER_GOOGLE} // when you didnt add this line, you get apple maps
    initialRegion={{ // initial region set to Bileto
        latitude: 57.504518,
        longitude: 14.710427,
        latitudeDelta: 1,
        longitudeDelta: 1
    }}>
    
    {!!this.state.latitude && !!this.state.longitude && <MapView.Marker
        coordinate={{"latitude:":this.state.latitude, "longitude":this.state.longitude}}
        title={"Your location"}
    />}
  </MapView>
  <View style={styles.bottomDetailsContainer}>
    <View style={styles.bottomDetailsKeys}>
      <Text style={styles.bottomDetailsKeyText}>Name of gantry</Text>
      <Text style={styles.bottomDetailsKeyText}>Distance to gantry</Text>
    </View>
    <View style={styles.bottomDetailsValues}>
    <Text style={styles.bottomDetailsText}>Öresund</Text>
    <Text style={styles.bottomDetailsText}>10km</Text>
    
    </View>
  </View>
</View> */}