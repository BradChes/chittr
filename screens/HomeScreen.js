import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    AsyncStorage } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: ''
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        const userName = await AsyncStorage.getItem('UserName');
        this.setState({name: userName});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.name}</Text>
                <Text>to Home Screen</Text>
            </View>
        );
    }
}