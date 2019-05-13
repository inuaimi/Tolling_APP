import React from 'react';
import {
  Text, View
} from 'react-native';
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'
import NotifService from '../Components/NotificationService';
import { db } from '../Database/Database';
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

    this.ref = db.collection('Gantries');
    this.unsubscribe = null;
  }

  map = null;
  watchId = null;
  isReadyForNotif = true;

  state = {
    gantries: [],
    grantryMarker: [],
    ready: true,
    loading: true,
    gantryName: "Press a marker",
    distanceToGantry: "",
    gantryCost: 0
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
    this.state.gantries.forEach(function(gantry) {
      if(geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, gantry.center, 10 )) {
        isInsideCirle = true;
      }
    })
    return isInsideCirle;
  }

  componentDidMount() {
    this.getCurrentposition();
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);

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
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const gantries = [];
    const gantryMarkers = [];
    querySnapshot.forEach((doc) => {
      const gantry = doc.data();
      //console.log(JSON.stringify(doc.data(), null, 2));

      gantries.push({ 
        center: {
          latitude: gantry.Latitude,
          longitude: gantry.Longitude
        }
      });
      gantryMarkers.push({
        title: gantry.Title,
        coordinates: {
          latitude: gantry.Latitude,
          longitude: gantry.Longitude
        },
        gantryCost: gantry.Cost
      })
    });

    this.setState({
      gantries,
      gantryMarkers,
      loading: false
    });
  }

  getCurrentposition() {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          //console.log('currentPos: ', JSON.stringify(position, null, 2))
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

    if(me.state.loading) {
      return null;
    }

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
          {this.state.gantryMarkers.map((marker, i) => (
            <MapView.Marker
              key={i}
              coordinate={marker.coordinates}
              title={marker.title}
              onPress={() => {this.longNames(marker.title); this.setState({gantryCost: marker.gantryCost})}}
            />
          ))}
          {this.state.gantries.map((gantry, i) => (
            <MapView.Circle
              key={i}
              center={gantry.center}
              radius={ 50 }
              strokeWidth = { 1 }
              strokeColor={ '#20bf6b' }
            />
          ))}
        </MapView>
        <View style={styles.bottomDetailsContainer}>
          <View style={{flexDirection:"row"}}>
            <View style={styles.bottomDetailsKeys}>
              <Text style={styles.bottomDetailsKeyTextLeft}>Name of gantry</Text>
              <Text style={styles.bottomDetailsValueTextLeft}>{this.state.gantryName}</Text>
            </View>
            <View style={styles.bottomDetailsValues}>
              <Text style={styles.bottomDetailsKeyText}>Cost of gantry</Text>
              <Text style={styles.bottomDetailsValueText}>{this.state.gantryCost + "kr"}</Text>
            </View>
          </View>
        </View>
      </View>
    );
  }

  longNames = (name) => {
    let newName = "";

    if(name.length > 17){
      newName = name.replace(/\s+/g, "\n");
    }else{
      newName = name;
    }

    this.setState({gantryName: newName})
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
