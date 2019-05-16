import React from 'react';
import {
  Text, View, Platform, DeviceEventEmitter
} from 'react-native';
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

  constructor(props) {
    super(props);

    this.notif = new NotifService(this.onRegister.bind(this), this.onNotif.bind(this));

    this.gantryRef = db.collection('Gantries');
    this.unsubscribeGantryRef = null;

    // this.isDeviceInGeofence = this.isDeviceInGeofence.bind(this);

    this.state = {
      uid: firebase.app().auth().currentUser.uid,
      currentGantry: null,
      currentTransactionGeofence: null,
      gantries: [],
      grantryMarker: [],
      ready: false,
      isInsideGantry: false,
      // isReadyForTransaction: true,
      hasLeftTransactionGeofence: true,
      loadingGantries: true,
      loadingTransactionGeofences: true,
      gantryName: "Press a marker",
      distanceToGantry: "",
      gantryCost: 0,
      // BT region info
      identifier: 'Estimotes',
      uuid: 'B9407F30-F5F8-466E-AFF9-25556B57FE6D',
    };
  }

  map = null;
  watchId = null;
  isReadyForNotif = true;
  //isReadyForTransaction = true;

  setRegion(region) {
    if(!this.state.ready) {
      setTimeout(() => this.map.animateToRegion(region), 10);
    }
  }

  clearWatch(id) {
    navigator.geolocation.clearWatch(id);
  }

  isDeviceInGeofence(coordinates) {
    console.log("Checking device status..");
    let me = this;
    let isInsideCirle = false;
    let gantryHasTGF = false;
    me.state.gantries.forEach(function(gantry) {
      if(gantry.transactionGeofence) {
        gantryHasTGF = true;
      }
      if(geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, gantry.center, gantry.radius )) {
        isInsideCirle = true;
        console.log("Inside outer geo, check if still inside inner..");
        if(gantryHasTGF) {
          const transactionGeofence = gantry.transactionGeofence;
          //FIXME: Doesn't enter this if statement..
          if(!geolib.isPointInCircle({ latitude: coordinates.latitude, longitude: coordinates.longitude }, transactionGeofence.center, transactionGeofence.radius )) {
            me.setState({
              hasLeftTransactionGeofence: true
            });
          }
        }
        me.setState({
          isInsideGantry: true,
          currentGantry: gantry,
        })
      }
    })
    return isInsideCirle;
  }

  componentWillMount() { 
    //
    // ONLY non component state aware here in componentWillMount
    //
    // Request for authorization while the app is open
    if(Platform.OS === 'ios'){
      Beacons.requestWhenInUseAuthorization();
    } else if(Platform.OS === 'android') {
      Beacons.detectIBeacons();
    }

    // Define a region which can be identifier + uuid,
    // identifier + uuid + major or identifier + uuid + major + minor
    // (minor and major properties are numbers)
    const region = {
      identifier: this.state.identifier,
      uuid: this.state.uuid
    };
    // Range for beacons inside the region
    Beacons.startRangingBeaconsInRegion(region);
    if(Platform.OS === 'ios'){
      Beacons.startUpdatingLocation();
    }
  }

  componentDidMount() {
    this.getCurrentposition();
    this.unsubscribeGantryRef = this.gantryRef.onSnapshot(this.onGantryCollectionUpdate);
    

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
    //
    // component state aware here - attach events
    //
    // Ranging: Listen for beacon changes
    this.beaconsDidRange = DeviceEventEmitter.addListener(
      'beaconsDidRange',
      (data) => {
        let me = this;
        data.beacons.forEach((beacon) => {
          if(beacon.accuracy) {
            const distance = beacon.accuracy.toFixed(2);
            
            if(me.isBeaconInRange(distance) && me.state.hasLeftTransactionGeofence && me.state.isInsideGantry) {
              me.setState({
                hasLeftTransactionGeofence: false
              });
              me.makeTransaction();
              console.log("Just made a transaction.     status on: hasLeftTransactionGeo: " + me.state.hasLeftTransactionGeofence);
            } 
            // else {
            //   this.setState = {
            //     isReadyForTransaction: true
            //   }
            // }
          }
        });
      }
    );
  }

  componentWillUnmount() {
    navigator.geolocation.clearWatch(this.watchID);
    this.unsubscribeGantryRef();
    this.beaconsDidRange = null;
  }

  onGantryCollectionUpdate = (querySnapshot) => {
    const gantries = [];
    const gantryMarkers = [];
    const transactionGeofences = [];
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

  isBeaconInRange = (distance) => {
     return (distance < 5);
  }

  makeTransaction = () => {
    console.log("make transaction!");

    const { currentGantry, uid } = this.state;
    addUserTransaction(currentGantry, uid);
  }

  render() {

    const { region } = this.state;
    const { children, renderMarker, markers } = this.props;
    
    return (
      <View style={styles.container}>
        <MapView
          showsUserLocation={true}
          ref={ map => { this.map = map }}
          data={markers}
          initialRegion={region}
          renderMarker={renderMarker}
          onMapReady={() => this.onMapReady}
          // followsUserLocation
          showsMyLocationButton={true}
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

  handlePerm(perms) {
    alert("Permissions", JSON.stringify(perms));
  }
}
