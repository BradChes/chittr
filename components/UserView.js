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
    render() {
      return (
        <TouchableHighlight onPress = {() => Alert.alert("Alert", "Hello, World!")}>
            <View style = { styles.container }>
                <Text style = { styles.header }>{this.props.user}</Text>
                <Text style = { styles.body }>{this.props.email}</Text>
            </View>
        </TouchableHighlight>
      );
    }
  }