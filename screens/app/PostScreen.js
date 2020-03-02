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
                    onChangeText = {chit => this.setState({chit})}
                    style = {styles.input}
                    placeholder = "What's on your mind?"
                    value = {this.state.chit}  
                />
                {this.state.spinner &&
                    <Text style={styles.spinnerTextStyle}>Working on it...</Text>
                }
                {!this.state.spinner &&
                <ActionButton
                    text = 'Submit'
                    onPress = { () => Alert.alert("Post", "Hello, world!") } 
                />
                }
            </View>
        );
    }
}