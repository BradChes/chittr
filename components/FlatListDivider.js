// React
import React, { Component } from 'react';
import {
    StyleSheet,
    View
} from 'react-native';

const styles = StyleSheet.create({
    divider: {
        height: 0.5,
        backgroundColor: "gray"
    }
});

export default class FlatListDivider extends Component {
    render() {
        return (
            <View style={styles.divider} />
        );
    }
}