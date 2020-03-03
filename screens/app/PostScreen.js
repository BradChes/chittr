// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions, 
    Alert } from 'react-native';
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

export default class PostScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            token: '',
            chit: '',
            location: {
                longitude: 0.0,
                latitude: 0.0
            },
            spinner: false,
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

    _postChit = async () => {
        const {token, chit, location} = this.state;
        this.setState({spinner: true})

        var jsonBody = JSON.stringify({
            timestamp: new Date().getTime(),
            chit_content: chit,
            location: location
        })

        console.log(jsonBody)

        try {
            const response = await fetch("http://10.0.2.2:3333/api/v0.0.5/chits", {
                method: 'POST',
                 headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }, 
                body: jsonBody
            });

            if (response.status !== 201) {
                const responseText = await response.text();
                Alert.alert('Error', responseText)
            }
        } catch (error) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
        this.setState({
            chit: '',
            spinner: false
        });
    }

    render() {
        const { chit } = this.state;
        const enabled = chit.length > 0;
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText = {chit => this.setState({chit})}
                    style = {styles.input}
                    placeholder = "What's on your mind?"
                    value = {this.state.chit}  
                />
                {this.state.spinner &&
                    <Text style={styles.spinnerTextStyle}>Posting...</Text>
                }
                {!this.state.spinner &&
                <ActionButton
                    disabled = {!enabled}
                    text = 'Submit'
                    onPress = { () => this._postChit() } 
                />
                }
            </View>
        );
    }
}