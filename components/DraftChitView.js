// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image
} from 'react-native'

const styles = StyleSheet.create({
  superContainer: {
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  bodyContainer: {
    flexDirection: 'column'
  },
  bodyImage: {
    width: 150,
    height: 150
  },
  bodyText: {
    fontSize: 22
  }
})

export default class ChitView extends Component {
  constructor () {
    super()
    this.state = {
      showImage: true
    }
  }

  render () {
    return (
      <View style={styles.superContainer}>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{this.props.body}</Text>
          {this.props.imageUri ? <Image style={styles.bodyImage} source={{ uri: this.props.imageUri }} /> : null}
          {this.props.latitude ? <Text style={styles.informationText}> Position: {this.props.latitude}, {this.props.longitude} </Text> : null}
        </View>
      </View>
    )
  }
}
