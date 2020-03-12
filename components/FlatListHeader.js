// React
import React, { Component } from 'react';
import {
    StyleSheet,
    View,
    Text
} from 'react-native';

const styles = StyleSheet.create({
    container: {
        width: '100%',
        height: 45,
        backgroundColor: 'red',
        alignItems: 'center',
        justifyContent: 'center'
    },
    text: {
        textAlign: 'center',
        color: 'white',
        fontSize: 22
    }
});

export default class FlatListHeader extends Component {
    render() {
        return (
            <View style={styles.container}>
                <Text style={styles.text}>{this.props.title}</Text>
            </View>
        );
    }
}