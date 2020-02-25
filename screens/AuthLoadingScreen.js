import React, { Component } from 'react';
import { 
    View, 
    StatusBar, 
    ActivityIndicator, 
    AsyncStorage, 
    StyleSheet } from 'react-native'

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
        const userName = await AsyncStorage.getItem('UserName');
        this.props.navigation.navigate(userName ? 'App' : 'Auth');
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