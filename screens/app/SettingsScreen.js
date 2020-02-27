// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Button,
    Text,
    Alert,
    ActivityIndicator } from 'react-native';
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
            token: '',
            isLoading: true,
        };
        this._readyUp()
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({id: userInfoJson.id})
            this.setState({token: userInfoJson.token})
            this.setState({isLoading: false})
          } catch(e) {
            //TODO
        }
    }

    _onPressedLogOut = async () => {
        const { token } = this.state;
        try {
            const response = await fetch("http://10.0.2.2:3333/api/v0.0.5/logout", {
                method: 'POST',
                 headers: {
                    'X-Authorization': token
                }
            });
            if (response.status == 200) {
                await AsyncStorage.clear()
                this.props.navigation.navigate('Auth')   
            } else {
                const responseText = await response.text();
                Alert.alert('Error', responseText)
            }
        } catch (error) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')   
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style = {styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }

        return (
            <View style={styles.container}>
                <Button 
                    title = "Log out"
                    color = 'red'
                    onPress = {this._onPressedLogOut} 
                />
            </View>
        );
    }
}