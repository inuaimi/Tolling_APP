import React, { Component } from 'react';  
import { Button, View, Text, FlatList } from 'react-native';
import styles from '../Styles/styles';
import ListComponent from '../Components/ListComponent';

import { db } from '../Database/Database';

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

  componentDidMount() {
    this.unsubscribe = this.ref.onSnapshot(this.onCollectionUpdate);
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