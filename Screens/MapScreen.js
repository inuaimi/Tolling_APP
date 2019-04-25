import React from 'react';
import {
  Text, View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'
import NotifService from '../Components/NotificationService';
import geolib from 'geolib';

const LATITUDE_DELTA = 0.005;
const LONGITUDE_DELTA = 0.005;

const initialRegion = {
  latitude: 57.782522,
  longitude: 14.165725,
  latitudeDelta: LATITUDE_DELTA,
  longitudeDelta: LONGITUDE_DELTA
}

export default class MapScreen extends React.Component {
  static navigationOptions = {
    title: 'Map'
  };

  constructor(props) {
    super(props);

    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
  }

  map = null;
  watchId = null;
  isReadyForNotif = true;

  state = {
    markers: [{
      title: 'JKPG Lasarettsparken',
      coordinates: {
        latitude: 57.779732,
        longitude: 14.157731
      }
    }, {
      title: 'JKPG Jönköpings Tekniska Högskola',
      coordinates: {
        latitude: 57.778782,
        longitude: 14.163407
      }
    }, {
      title: 'JKPG Rådhusparken',
      coordinates: {
        latitude: 57.782522,
        longitude: 14.165725
      }
    }, {
      title: "Casa de Lajne",
      coordinates: {
        latitude: 57.777813,
        longitude: 14.157513
      }
    }],
    circles: [{
      // JKPG Lasarettsparken
      center: {
        latitude: 57.779732,
        longitude: 14.157731
      },
    }, {
      // JKPG Jönköpings Tekniska Högskola 
      center: {
        latitude: 57.778782,
        longitude: 14.163407
      },
    }, {
      // JKPG Rådhusparken
      center: {
        latitude: 57.782522,
        longitude: 14.165725
      },
    }, {
      //Casa de Lajne
      center: {
        latitude: 57.777813,
        longitude: 14.157513
      }
    }],
    ready: true,
  };

  setRegion(region) {
    if(!this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
  }

  clearWatch(id) {
    navigator.geolocation.clearWatch(id);
  }

  isDeviceInGeofence(coordinates) {
    let isInsideCirle = false;
    let index = null;
    this.state.circles.forEach(function(circle) {
      if(geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, circle.center, 10 )) {
        isInsideCirle = true;
      }
    })
    return isInsideCirle;
  }

  componentDidMount() {
    this.getCurrentposition();

    this.watchId = navigator.geolocation.watchPosition(
      position => {
        let coordinates = position.coords;
  
        if(this.isDeviceInGeofence(coordinates)) {
          if(this.isReadyForNotif) {
            this.notif.localNotif();
            this.isReadyForNotif = false;
          }
        } else {
          this.isReadyForNotif = true;
        }
      }, 
      error => alert(error.message),
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, distanceFilter: 5 }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
  }

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
    //console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    //console.log('onRegionChangeComplete', region);
  };

  render() {

    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;
    let me = this;

    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation
          ref={ map => { this.map = map }}
          data={markers}
          initialRegion={initialRegion}
          renderMarker={renderMarker}
          onMapReady={this.onMapReady}
          followsUserLocation
          showsMyLocationButton={false}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          textStyle={{ color: '#bc8b00' }}
          containerStyle={{ backgroundColor: 'white', borderColor: '#bc8b00' }}
        >
          {this.state.markers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.coordinates}
              title={marker.title}
            />
          ))}
          {this.state.circles.map((cirle, i) => (
            <MapView.Circle
              key={i}
              center={cirle.center}
              radius={ 10 }
              strokeWidth = { 1 }
              strokeColor={ '#20bf6b' }
            />
          ))}
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
      </View>
    );
  }

  onRegister(token) {
    alert("Registered !", JSON.stringify(token));
    console.log(token);
    this.setState({ registerToken: token.token, gcmRegistered: true });
  }

  onNotif(notif) {
    console.log(notif);
    alert(notif.message);
  }

  handlePerm(perms) {
    alert("Permissions", JSON.stringify(perms));
  }
}
