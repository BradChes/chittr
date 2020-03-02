// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableOpacity,
    Text } from 'react-native';

const styles = StyleSheet.create({
    container: {
        marginVertical: 10,
        alignItems: 'center',
        backgroundColor: 'red',
        paddingHorizontal: 50,
        padding: 10,
        borderRadius: 50
    },
    text: {
        color: 'white'
    }
});

export default class ActionButton extends Component {

    render() {
        return (
            <TouchableOpacity 
                style = {styles.container} 
                onPress = {() => this.props.onPress()}>
                <Text style = {styles.text}>{this.props.text}</Text>
            </TouchableOpacity>
        );
    }
}