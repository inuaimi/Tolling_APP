'use strict'

export class Database {
  ref = (path) => {
    if (!this[path]) {
      this[path] = new Reference(path)
    }
    return this[path]
  }
}

export class Reference {
  constructor(path) {
    this.path = path
    this.snap = { val: () => this._val()}
    this.data = null
  }

  _val = jest.fn(() => {
    return this.data
  })

  once = jest.fn((param, callback) => {
    const promise = new Promise ((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  on = jest.fn((param, callback) => {
    const promise = new Promise ((resolve, reject) => {
      if (callback) {
        callback(this.snap)
        resolve()
      } else {
        resolve(this.snap)
      }
    })
    RNFirebase.promises.push(promise)
    return promise
  })

  off = jest.fn((param, callback) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  update = jest.fn((data) => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })

  remove = jest.fn(() => {
    const promise = Promise.resolve()
    RNFirebase.promises.push(promise)
    return promise
  })
}

export class MockFirebase {
  constructor() {
    this.database = () => {
      if (!this.databaseInstance) {
        this.databaseInstance = new Database()
      }
      return this.databaseInstance
    }
  }
}

const collection = jest.fn(() => {
  return {
    doc: jest.fn(() => {
      return {
        collection: collection,
        update: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
        get: jest.fn(() => Promise.resolve(true))
      }
    }),
    where: jest.fn(() => {
      return {
        get: jest.fn(() => Promise.resolve(true)),
        onSnapshot: jest.fn(() => Promise.resolve(true)),
      }
    })
  }
});

const Firestore = () => {
  return {
    collection
  }
}

Firestore.FieldValue = {
  serverTimestamp: jest.fn()
}


export default class RNFirebase {
  static initializeApp() {
    RNFirebase.firebase = new MockFirebase()
    RNFirebase.promises = []
    return RNFirebase.firebase
  }

  static auth = jest.fn(() => {
    return {
      createUserAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      sendPasswordResetEmail: jest.fn(() => Promise.resolve(true)),
      signInAndRetrieveDataWithEmailAndPassword: jest.fn(() => Promise.resolve(true)),
      fetchSignInMethodsForEmail: jest.fn(() => Promise.resolve(true)),
      signOut: jest.fn(() => Promise.resolve(true)),
      onAuthStateChanged: jest.fn(),
      currentUser: {
        sendEmailVerification: jest.fn(() => Promise.resolve(true))
      }
    }
  });

  static firestore = Firestore;

  static notifications = jest.fn(() => {
    return {
        onNotification: jest.fn(),
        onNotificationDisplayed: jest.fn(),
        onNotificationOpened: jest.fn()
    }
  });

  static messaging = jest.fn(() => {
    return {
        hasPermission: jest.fn(() => Promise.resolve(true)),
        subscribeToTopic: jest.fn(),
        unsubscribeFromTopic: jest.fn(),
        requestPermission: jest.fn(() => Promise.resolve(true)),
        getToken: jest.fn(() => Promise.resolve('RN-Firebase-Token'))
    }
  });

  static reset() {
    RNFirebase.promises = []
    RNFirebase.firebase.databaseInstance = null
  }

  static waitForPromises() {
    return Promise.all(RNFirebase.promises)
  }

  static analytics () {}
  
  static app () {}
}
