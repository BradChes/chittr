// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 40
  },
  text: {
    alignItems: 'center'
  }
})

export default class FlatListEmpty extends Component {
  render () {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>{this.props.message}</Text>
      </View>
    )
  }
}
