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
            givenName: '',
            familyName: '',
            email: '', 
            password: '',
            spinner: false
        };
    }

    _onPressedSubmit = async () => {
        this.setState({spinner: true});
        Alert.alert(
            'Congraulations!',  
            'You\'ve made an account on Chittr, welcome to the family.',
            [
                {
                    text: 'Go back',
                    onPress: () => this.props.navigation.goBack()
                },
                {
                    text: 'Log in!',
                    onPress: () => this.props.navigation.navigate('Login')
                }
            ]
        )
        this.setState({spinner: false})
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
                    <Text style={style.spinnerTextStyle}>Working on it...</Text>
                }
                {!this.state.spinner &&
                    <Button 
                        title = 'Submit'
                        color = 'red'
                        onPress = {this._onPressedSubmit} 
                    />
                }
            </View>
        );
    }
}