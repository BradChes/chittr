// React
import React, { Component } from 'react';
import { 
    View, 
    Button, 
    Alert, 
    Text, 
    StyleSheet, 
    TextInput,
    Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    input: {
        width: deviceWidth - 50,
        backgroundColor: '#FFFFFF',
        borderColor: 'red',
        borderWidth: 1,
        borderRadius: 20,
        paddingLeft: 10,
        marginVertical: 10

    },
    submit: {
        width: deviceWidth - 100,
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
            console.log(response)
            if (response.status == 200) {
                const responseJson = await response.json();
                await AsyncStorage.setItem('USER_INFO', JSON.stringify(responseJson));
                this.props.navigation.navigate('App');    
            } else {
                const responseText = await response.text();
                Alert.alert('Error', responseText)
            }
        } catch (error) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
        this.setState({spinner: false})
    }

    render() {
        return (
            <View style={styles.container}>
            <TextInput
                keyboardType = "email-address"
                onChangeText = {email => this.setState({email})}
                style = {styles.input}
                placeholder = "Email Address"
                value = {this.state.email}  
            />
                <TextInput
                    secureTextEntry = {true}
                    onChangeText = {password => this.setState({password})}
                    style = {styles.input}
                    placeholder = "Password"
                    value = {this.state.password}  
                />
                {this.state.spinner &&
                    <Text style={styles.spinnerTextStyle}>Working on it...</Text>
                }
                {!this.state.spinner &&
                    <Button 
                        title = "Log In"
                        color = 'red'
                        onPress = {this._onPressedLogIn} 
                    />
                }
            </View>
        );
    }
}