import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text } from 'react-native';

const styles = StyleSheet.create({
        container: {
            paddingHorizontal: 10,
            paddingVertical:10
        },
        header: {
            fontSize: 16,
            fontWeight: 'bold',
            color: 'gray',
            paddingBottom: 4
        },
        body: {
            fontSize: 18
        }
    });

export default class ChitView extends Component {
    render() {
        var date = new Date(this.props.timestamp);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

      return (
        <View style = { styles.container }>
            <Text style = { styles.header }>{this.props.user} | {day}/{month}/{year}</Text>
            <Text style = { styles.body }>{this.props.body}</Text>
        </View>
      );
    }
  }