// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TouchableHighlight,
    Alert } from 'react-native';

const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 10,
            paddingVertical:10
        },
        header: {
            fontSize: 18
        },
        body: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'gray',
            paddingBottom: 4
        }
    });

export default class ChitView extends Component {
    _follow = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.userId + '/follow', {
                method: 'POST',
                headers: {
                    'X-Authorization': this.props.token
                }
            });
        } catch(e) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
    }

    _unfollow = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.userId + '/follow', {
                method: 'DELETE',
                headers: {
                    'X-Authorization': this.props.token
                }
            });
        } catch(e) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
    }

    render() {
      return (
        <TouchableHighlight 
            disabled = {this.props.disabled}
            underlayColor = 'lightgray'
            onPress = {() => 
                Alert.alert(
                    'Follower Management',  
                    'Follow or unfollow, that is the question?',
                    [
                        {
                            text: 'Follow',
                            onPress: () => this._follow()
                        },
                        {
                            text: 'Unfollow',
                            onPress: () => this._unfollow()
                        }
                    ]
                )}
            >
            <View style = { styles.container }>
                <Text style = { styles.header }>{this.props.user}</Text>
                <Text style = { styles.body }>{this.props.email}</Text>
            </View>
        </TouchableHighlight>
      );
    }
  }