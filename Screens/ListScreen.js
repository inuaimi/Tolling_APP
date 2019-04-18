import React, { Component } from 'react';  
import { Button, View, Text } from 'react-native';
import styles from '../Styles/styles';
import ListComponent from '../Components/ListComponent';

import { db } from '../Database/Database';

let itemsRef = db.ref('/test');

export default class List extends React.Component {

    state = {
        items: []
    }

    componentDidMount() {
        itemsRef.on('value', (snapshot) => {
            let data = snapshot.val();
            let items = Object.values(data);
            this.setState({items});
         });
    }
    
    render() {
        return (
            <View style={styles.container}>
                {
                    this.state.items.length > 0
                    ? <ListComponent items={this.state.items} />
                    : <Text>No items</Text>
                }
            </View>
        )
    }
}