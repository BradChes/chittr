// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
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

    render() {
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
                    placeholder = 'Email Address'
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
                    <Text style={styles.spinnerTextStyle}>Working on it...</Text>
                }
                {!this.state.spinner &&
                <ActionButton
                    text = 'Submit'
                    onPress = { () => this.props.navigation.goBack() } 
                />
                }
            </View>
        );
    }
}