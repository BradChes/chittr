import React, { Component } from 'react';
import { 
    KeyboardAvoidingView, 
    View, 
    Button, 
    Alert, 
    Text, 
    AsyncStorage, 
    StyleSheet, 
    TextInput } from 'react-native';

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

        //TODO logic when talking to the API

        await AsyncStorage.setItem('UserName', email);
        await AsyncStorage.setItem('Password', password);

        this.props.navigation.navigate('App');
    }

    render() {
        return (
            <KeyboardAvoidingView style={{flexGrow: 1}} behavior="padding" enabled>
                <View style={style.container}>
                    <TextInput
                        keyboardType = "email-address"
                        onChangeText = {email => this.state({email})}
                        placeholder = "Email Address"
                        value = {this.state.email}  
                    />
                    <TextInput
                        secureTextEntry = {true}
                        onChangeText = {password => this.state({password})}
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