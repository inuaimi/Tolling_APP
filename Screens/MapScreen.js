// TODO: 
//   - Kolla upp om appen kör i bakgrunden för:
//     1. Plats i bakgrunden.
//     2. Beacon-skanning i bakgrunden.
//  - Olika pris för fordonstyperna.
//  - Unable to retrieve location alert, fixa. De stackar på varandra....


import React from 'react';
import {
  Text, View, Platform, DeviceEventEmitter, TouchableOpacity
} from 'react-native';
import { Icon } from "react-native-elements";
import MapView, { PROVIDER_GOOGLE, Marker, Circle } from "react-native-maps";
                                                    //      Imports: "css-alike-ish" styling                            
import styles from '../Styles/styles'
import NotifService from '../Components/NotificationService';
import { db } from '../Database/Database';
import geolib from 'geolib';
import Beacons from 'react-native-beacons-manager';
import firebase from 'react-native-firebase';
import { addUserTransaction } from '../Database/Database';

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

  _isMounted = false;
  unsubscribeGantryRef = null;

  constructor(props) {
    super(props);

    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));
    this.gantryRef = db.collection('Gantries');
    // this.unsubscribeGantryRef = null;
    this.map = null;
    this.watchId = null;
    this.isReadyForNotif = true;

    this.state = {
      gantries: [],
      grantryMarker: [],
      ready: false,
      isInsideGantry: false,
      hasLeftTransactionGeofence: true,
      loadingGantries: true,
      gantryName: "Press a marker",
      distanceToGantry: "",
      gantryCost: 0,
      toggleFollowUser: true,
      // BT region info
      identifier: 'Estimotes',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
    };
  }

  componentWillMount() { 
    if(Platform.OS === 'ios'){
      Beacons.requestWhenInUseAuthorization();
    } else if(Platform.OS === 'android') {
      Beacons.detectIBeacons();
    }
    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid
    };
    Beacons.startRangingBeaconsInRegion(region);
    if(Platform.OS === 'ios'){
      Beacons.startUpdatingLocation();
    }
  }

  componentDidMount() {
    this._isMounted = true;
    if(this._isMounted) {
      this.unsubscribeGantryRef = this.gantryRef.onSnapshot(this.onGantryCollectionUpdate);
      this.getCurrentPosition(LATITUDE_DELTA, LONGITUDE_DELTA);
      this.watchPosition();
    }
  }

  componentWillUnmount() {
    this._isMounted = false;
    navigator.geolocation.clearWatch(this.watchID);
    if(this.unsubscribeGantryRef) {
      this.unsubscribeGantryRef();
    }
    this.beaconsDidRange = null;
  }

  setRegion(region) {
    if(this.state.ready) {
      this.map.animateToRegion(region);
    } else {
      console.log("not ready to animate");
    }
  }

  isDeviceInGeofence(coordinates) {
    let me = this;
    let isInsideCirle = false, gantryHasTGF = false;
    me.state.gantries.forEach(function(gantry) {
      if(gantry.transactionGeofence) {
        gantryHasTGF = true;
      }
      if(geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, gantry.center, gantry.radius )) {
        isInsideCirle = true;
        me.scanForBeacons();
        me.setState({
          isInsideGantry: true,
          currentGantry: gantry,
        })
        if(gantryHasTGF) {
          const transactionGeofence = gantry.transactionGeofence;
          if(!geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, transactionGeofence.center, transactionGeofence.radius )) {
            // me.notif.transactionGeofenceNotif();
            me.setState({
              hasLeftTransactionGeofence: true
            });
          }
        }
      }
    })
    return isInsideCirle;
  }

  onGantryCollectionUpdate = (querySnapshot) => {
    const gantries = [], gantryMarkers = [], transactionGeofences = [];
    querySnapshot.forEach((doc) => {
      const gantry = doc.data();

      gantries.push({ 
        title: gantry.Title,
        date: gantry.Date,
        time: gantry.Time,
        cost: gantry.Cost,
        center: {
          latitude: gantry.Latitude,
          longitude: gantry.Longitude
        },
        radius: gantry.Radius,
        transactionGeofence: gantry.TransactionGeofence
      });
      gantryMarkers.push({
        title: gantry.Title,
        coordinates: {
          latitude: gantry.Latitude,
          longitude: gantry.Longitude
        },
        gantryCost: gantry.Cost
      })
      if(gantry.TransactionGeofence) {
        transactionGeofences.push(gantry.TransactionGeofence);
      }
    });

    this.setState({
      gantries,
      gantryMarkers,
      transactionGeofences,
      loadingGantries: false
    });
  }

  watchPosition() {
    let me = this;
    me.watchId = navigator.geolocation.watchPosition(
      position => {
        let coordinates = position.coords;

        if(me.state.toggleFollowUser) {
          const { currentLatitudeDelta, currentLongitudeDelta } = me.state;
          const region = {
            latitude: coordinates.latitude,
            longitude: coordinates.longitude,
            latitudeDelta: currentLatitudeDelta,
            longitudeDelta: currentLongitudeDelta
          }
          me.setRegion(region);
        }
  
        if(me.isDeviceInGeofence(coordinates)) {
          if(me.isReadyForNotif) {
            me.notif.geofenceNotif();
            me.isReadyForNotif = false;
          }
        } else {
          me.isReadyForNotif = true;
        }
      }, 
      error => {
        //FIXME:    Theese errors stacks..
        alert(error.message)
        console.log(error.message);
      },
      { enableHighAccuracy: true, timeout: 5000, maximumAge: 0, distanceFilter: 5 }
    );
  }

  scanForBeacons() {
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        let me = this;
        data.beacons.forEach((beacon) => {
          if(beacon.accuracy) {
            const distance = beacon.accuracy.toFixed(2);
            
            if(me.isBeaconInRange(distance) && me.state.hasLeftTransactionGeofence && me.state.isInsideGantry) {
              // if(me.state.hasLeftTransactionGeofence && me.state.isInsideGantry) {
              me.setState({
                hasLeftTransactionGeofence: false
              });
              me.makeTransaction();
            }
          }
        });
      }
    );
  }

  getCurrentPosition(latDelta, longDelta) {
    try {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const region = {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude,
            latitudeDelta: latDelta,
            longitudeDelta: longDelta
          };
          //Detta fungerar!
          this.setRegion(region);
        },
        (error) => {
          switch(error.code) {
            case 1:
              alert("To locate your location enable permission for the application in Settings - Privacy - Location");
              break;
            default:
              alert("Error in localizing your location");
          }
        }
      );
    } catch(e) {
      alert(e.message || "");
      console.log("catch error: " + JSON.stringify(e, null, 2));
    }
  };

  onMapReady = (e) => {
    if(!this.state.ready) {
      console.log("set state ready");
      this.setState({ ready: true });
    }
  };

  onRegionChange = (region) => {
    // console.log('onRegionChange', region);
  };

  onRegionChangeComplete = (region) => {
    console.log('onRegionChangeComplete', region);
    this.setState({
      currentLatitudeDelta: region.latitudeDelta,
      currentLongitudeDelta: region.longitudeDelta
    })
  };

  isBeaconInRange = (distance) => {
    if(distance < 5) {
      console.log("beacon in range");
      return true;
    } else {
      console.log("not in range");
      return false;
    }
    //  return (distance < 5);
  }

  makeTransaction = () => {
    console.log("make transaction!");

    const uid = firebase.app().auth().currentUser.uid;

    const { currentGantry } = this.state;
    addUserTransaction(currentGantry, uid);
    this.notif.transactionNotif();
  }

  toggleFollowUserLocation = () => {
    // console.log("toggle!");
    const { currentLatitudeDelta, currentLongitudeDelta, toggleFollowUser } = this.state;
    this.setState(state => ({
      toggleFollowUser: !state.toggleFollowUser
    }));
    if(!toggleFollowUser) {
      this.getCurrentPosition(currentLatitudeDelta, currentLongitudeDelta);
    }
  }

  render() {
    // const { region } = this.state;
    
    return (
      <View style={styles.container}>
        <MapView
          provider={PROVIDER_GOOGLE}
          showsUserLocation={true}
          showsIndoors={false}
          showsIndoorLevelPicker={false}
          showsTraffic={false}
          ref={ map => { this.map = map }}
          initialRegion={initialRegion}
          onMapReady={() => this.onMapReady()}
          loadingEnabled={true}
          onRegionChange={this.onRegionChange}
          onRegionChangeComplete={this.onRegionChangeComplete}
          style={styles.map}
          textStyle={{ color: '#bc8b00' }}
          containerStyle={{ backgroundColor: 'white', borderColor: '#bc8b00' }}
        > 
          { this.renderGantryMarkers() }
          { this.renderGantries() }
          { this.renderTransactionGeofences() }
        </MapView>
        <View style={styles.mapButtonContainer}>
          <TouchableOpacity style={
              this.state.toggleFollowUser
                ? styles.activeFollowUserButton
                : styles.inactiveFollowUserButton
              } onPress={() => this.toggleFollowUserLocation()}>
            <Icon name="location-arrow" type="font-awesome" color="white" />
          </TouchableOpacity>
        </View>
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

  renderGantryMarkers() {
    if(this.state.gantryMarkers) {
      return (
        this.state.gantryMarkers.map((marker, i) => (
          <MapView.Marker
            key={i}
            coordinate={marker.coordinates}
            title={marker.title}
            onPress = {() => {this.longNames(marker.title); this.setState({gantryCost: marker.gantryCost})}}
          />
        ))
      )
    } else {
      return null;
    }
  }

  renderGantries() {
    if(this.state.gantries) {
      return (
        this.state.gantries.map((gantry, i) => (
          <MapView.Circle
            key={i}
            center={gantry.center}
            radius={ gantry.radius }
            strokeWidth = { 1 }
            strokeColor={ '#20bf6b' }
          />
        ))
      )
    } else {
      return null;
    }
  }

  renderTransactionGeofences() {
    if(this.state.transactionGeofences) {
      return (
        this.state.transactionGeofences.map((geofence, i) => (
          <MapView.Circle
            key={i}
            center={geofence.center}
            radius={ geofence.radius }
            strokeWidth = { 1 }
            strokeColor={ '#2980b9' }
          />
        ))
      )
    } else {
      return null;
    }
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
}
