// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    TouchableOpacity } from 'react-native';
import Icon from 'react-native-vector-icons/FontAwesome';


const styles = StyleSheet.create({
    container: {
        margin: 10,
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 50
    },
    icon: {        
        alignItems: 'center',
        backgroundColor: 'red',
        color: '#FFF',
        fontSize: 20
    }
});

export default class ActionIcon extends Component {

    render() {
        return (
            <TouchableOpacity 
                style = {styles.container} 
                disabled={ this.props.disabled } 
                onPress = {() => this.props.onPress()}>
                    <Icon 
                        style = { styles.icon }
                        name = { this.props.name } />
            </TouchableOpacity>
        );
    }
}