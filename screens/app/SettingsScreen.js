// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    Alert,
    ActivityIndicator,
    Dimensions } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import ActionButton from '../../components/ActionButton';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center'
    },
    userInfoContainer: {
        flex: 5,
        justifyContent: 'flex-start', 
        marginHorizontal: 20
    },
    logoutContainer: {
        flex: 1,
        justifyContent: 'center', 
        alignItems: 'center'
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginVertical: 10
    },
    text: {
        fontSize: 16,
        marginVertical: 5
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

export default class SettingsScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: '',
            token: '',
            givenName: '',
            familyName: '',
            email: '', 
            password: '',
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
            this._getUserInfo()
            this.setState({isLoading: false})
          } catch(e) {
            //TODO
        }
    }

    _getUserInfo = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/'+ this.state.id);
            const responseJson = await response.json();
            this.setState({
                givenName: responseJson.given_name,
                familyName: responseJson.family_name,
                email: responseJson.email, 
                isLoading: false,
            });
        }
        catch(e) {
            console.log(e);
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
                <View style={styles.userInfoContainer}>
                    <Text style={styles.header}>User Information</Text>
                    <Text style={styles.text}>First name: {this.state.givenName}</Text>
                    <Text style={styles.text}>Surname: {this.state.familyName}</Text>
                    <Text style={styles.text}>Email: {this.state.email}</Text>
                    <ActionButton
                        onPress = {this._onPressedLogOut}
                        text = 'Update User Information'/>
                </View>
                <View style={styles.logoutContainer}>
                    <ActionButton
                        onPress = {this._onPressedLogOut}
                        text = 'Log Out'/>
                </View>
            </View>
        );
    }
}