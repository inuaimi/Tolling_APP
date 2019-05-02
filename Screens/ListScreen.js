import React, { Component } from 'react';  
import { Button, View, Text, FlatList } from 'react-native';
import styles from '../Styles/styles';
import ListComponent from '../Components/ListComponent';

import { db } from '../Database/Database';

//let itemsCollection = db.collection('test');

export default class List extends React.Component {

  constructor() {
    super();
    this.ref = db.collection('test');
    this.unsubscribe = null;

    this.state = {
      items: [],
      loading: true
    }
  }

  // state = {
  //     items: []
  // }

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
    // itemsCollection.on('value', (snapshot) => {
    //       let data = snapshot.val();
    //       let items = Object.values(data);
    //       this.setState({items});
    //    });

  }

  componentWillUnmount() {
    this.unsubscribe();
  }

  onCollectionUpdate = (querySnapshot) => {
    const items = [];
    querySnapshot.forEach(doc => {
      const { name } = doc.data();

      items.push({ 
        key: doc.id,
        name 
      });
    });

    this.setState({
      items,
      loading: false
    });
  }
  // render() {
  //   return null;
  // }
  render() {
    if(this.state.loading) {
      return null;
    }
    
    return (
      <View style={styles.container}>
        <FlatList 
          data={this.state.items}
          renderItem={({ item }) => <Text style={styles.itemtext}>{item.name}</Text>}
        />
      </View>     
    )
  }
}

// {
//   this.state.items.length > 0
//   ? <ListComponent items={this.state.items} />
//   : <Text>No items</Text>
// }