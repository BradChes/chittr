// React
import React, { Component } from 'react';
import { 
    KeyboardAvoidingView, 
    View, 
    Button, 
    Alert, 
    Text, 
    StyleSheet, 
    TextInput } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const style = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    spinnerTextStyle: {
        textAlign: 'center'
    },
});

export default class LoginScreen extends Component {
    constructor(props) {
        super(props);

        this.state = {
            email: '', 
            password: '',
            spinner: false
        };
    }

    _onPressedLogIn = async () => {
        const {email, password} = this.state;

        this.setState({spinner: true});

        try {
            const response = await fetch("http://10.0.2.2:3333/api/v0.0.5/login", {
                method: 'POST',
                 headers: {
                    'Content-Type': 'application/json'
                }, 
                body: JSON.stringify({
                    email: email,
                    password: password
                })
            });

            const responseJson = await response.json();
            await AsyncStorage.setItem('USER_INFO', JSON.stringify(responseJson));
            this.props.navigation.navigate('App');
            this.setState({spinner: false})
        } catch (error) {
            console.log(error)
            this.setState({spinner: false})
        }
    }

    storeUserInfo = async (responseJson) => {

    }

    render() {
        return (
            <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding" enabled>
                <View style={style.container}>
                    <TextInput
                        keyboardType = "email-address"
                        onChangeText = {email => this.setState({email})}
                        placeholder = "Email Address"
                        value = {this.state.email}  
                    />
                    <TextInput
                        secureTextEntry = {true}
                        onChangeText = {password => this.setState({password})}
                        placeholder = "Password"
                        value = {this.state.password}  
                    />
                    {this.state.spinner &&
                        <Text style={style.spinnerTextStyle}>Working on it...</Text>
                    }
                    {!this.state.spinner &&
                        <Button 
                            title = "Log In"
                            onPress = {this._onPressedLogIn} 
                        />
                    }
                </View>
            </KeyboardAvoidingView>
        );
    }
}