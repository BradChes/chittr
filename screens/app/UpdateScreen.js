// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Alert,
    Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import ActionButton from '../../components/ActionButton';

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
    spinnerTextStyle: {
        textAlign: 'center'
    },
});

export default class UpdateScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            token: '',
            givenName: '',
            familyName: '',
            email: '', 
            password: '',
            spinner: false
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

    _onPressedSubmit = async () => {
        const {id, token, givenName, familyName, email, password} = this.state;
        this.setState({spinner: true});

        var  body = JSON.stringify({
            given_name: givenName,
            family_name: familyName,
            email: email,
            password: password
        }, (key, value) => {
            if (value !== '') return value
          })

        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ id, {
                method: 'PATCH',
                headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }, 
                body: body
            });
            if (response.status == 201) {
                Alert.alert(
                    'Updated!',  
                    'Your user infomation has been updated!',
                    [
                        {
                            text: 'Go back',
                            onPress: () => {
                                this.props.navigation.state.params.onGoBack();
                                this.props.navigation.goBack();
                            }
                        },
                    ]
                )    
            } else {
                const responseText = await response.text();
                Alert.alert('Error', responseText)
            }
            this.setState({
                givenName: '',
                familyName: '',
                email: '',
                password: '', 
                spinner: false,
            });
        } catch(error) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
    }

    render() {
        const { givenName, familyName, email, password } = this.state;
        const enabled = givenName.length > 0 || familyName.length > 0 || email.length > 0 || password.length > 0;

        return (
            <View style={styles.container}>
                <TextInput
                    autoCompleteType = 'name'
                    onChangeText = {givenName => this.setState({givenName})}
                    style = {styles.input}
                    placeholder = 'First name'
                    value = {this.state.givenName}  
                />
                <TextInput
                    autoCompleteType = 'name'
                    onChangeText = {familyName => this.setState({familyName})}
                    style = {styles.input}
                    placeholder = 'Surname'
                    value = {this.state.familyName}  
                />
                <TextInput
                    keyboardType = 'email-address'
                    autoCompleteType = 'email'
                    onChangeText = {email => this.setState({email})}
                    style = {styles.input}
                    placeholder = 'Email address'
                    value = {this.state.email}  
                />
                <TextInput
                    secureTextEntry = {true}
                    autoCompleteType = 'password'
                    onChangeText = {password => this.setState({password})}
                    style = {styles.input}
                    placeholder = 'Password'
                    value = {this.state.password}  
                />
                {this.state.spinner &&
                    <Text style={styles.spinnerTextStyle}>Updating...</Text>
                }
                {!this.state.spinner &&
                <ActionButton
                    disabled = {!enabled}
                    text = 'Submit'
                    onPress = { () => this._onPressedSubmit() } 
                />
                }
            </View>
        );
    }
}