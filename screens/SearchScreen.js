import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default class SearchScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        try {
            const userName = await AsyncStorage.getItem('UserName');
            this.setState({name: userName});
          } catch(e) {
            //TODO
        }
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.name}</Text>
                <Text>to Search Screen</Text>
            </View>
        );
    }
}