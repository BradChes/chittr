// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Button,
    Text } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

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
            id: '',
            token: ''
        };
        this._readyUp()
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({id: userInfoJson.id})
            this.setState({token: userInfoJson.token})
          } catch(e) {
            //TODO
        }
    }

    _onPressedLogOut = async () => {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>ID: {this.state.id}</Text>
                <Text>Token: {this.state.token}</Text>
                <Text>to Settings Screen</Text>
                <Button 
                    title = "Log out"
                    onPress = {this._onPressedLogOut} 
                />
            </View>
        );
    }
}