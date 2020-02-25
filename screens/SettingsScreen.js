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
            name: '',
            password: ''
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        try {
            const userName = await AsyncStorage.getItem('UserName');
            const password = await AsyncStorage.getItem('Password');
            this.setState({name: userName});
            this.setState({password: password});
          } catch(e) {
            //TODO
        }
    }

    _onPressedLogOut = async () => {
        await AsyncStorage.clear();
        this.props.navigation.navigate('Auth');
    }

    render() {
        return (
            <View style={styles.container}>
                <Text>Name: {this.state.name}</Text>
                <Text>Password: {this.state.password}</Text>
                <Text>to Settings Screen</Text>
                <Button 
                    title = "Log out"
                    onPress = {this._onPressedLogOut} 
                />
            </View>
        );
    }
}