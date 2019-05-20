import PushNotification from 'react-native-push-notification';

export default class NotifService {
  constructor(onRegister, onNotification) {
    this.configure(onRegister, onNotification);
  }

  configure(onRegister, onNotification) {
    PushNotification.configure({
      onRegister: onRegister,

      onNotification: onNotification,

      permissions: {
        alert: true,
        badge: true,
        sound: true
      },

      popInitialNotification: true,

      requestPermissions: true,
    });
  }
  
  geofenceNotif() {
    PushNotification.localNotificationSchedule({
      message: "You are inside a geofence!", // (required)
      date: new Date(Date.now() + (1 * 1000))
    });
  }

  transactionGeofenceNotif() {
    PushNotification.localNotificationSchedule({
      message: "You're outside the TGF!",
      date: new Date(Date.now() + (1 * 1000))
    });
  }

  transactionNotif() {
    PushNotification.localNotificationSchedule({
      message: "A transaction was made",
      date: new Date(Date.now() + (1*1000))
    });
  }

  checkPermission(cbk) {
    return PushNotification.checkPermissions(cbk);
  }

  cancelNotif() {
    PushNotification.cancelLocalNotifications({id: ''+this.lastId});
  }

  cancelAll() {
    PushNotification.cancelAllLocalNotifications();
  }
}