// React
import React, { Component } from 'react';
import { 
    View, 
    StatusBar, 
    ActivityIndicator,  
    StyleSheet } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: 'center',
        justifyContent: 'center',
    },
});

export default class AuthLoadingScreen extends Component {
    constructor() {
        super();
        this._readyUp();
    }

    _readyUp = async () =>  {
        try {
            const userName = await AsyncStorage.getItem('UserName');
            this.props.navigation.navigate(userName ? 'App' : 'Auth');
          } catch(e) {
            // TODO
          }
    }

    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator />
                <StatusBar barStyle="default" />
            </View>
        )
    }
}