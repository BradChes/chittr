// React
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

export default class PostScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            token: '',
        };
        this._readyUp();
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

    render() {
        return (
            <View style={styles.container}>
                <Text>Welcome {this.state.id}</Text>
                <Text>to Post Screen</Text>
            </View>
        );
    }
}