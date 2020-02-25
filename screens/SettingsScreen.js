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

export default class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            password: ''
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        const userName = await AsyncStorage.getItem('UserName');
        const password = await AsyncStorage.getItem('Password');
        this.setState({name: userName});
        this.setState({password});
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.name}</Text>
                <Text>Welcome {this.state.name}</Text>
                <Text>to Settings Screen</Text>
            </View>
        );
    }
}