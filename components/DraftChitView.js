// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text
} from 'react-native'

// FastImage
import FastImage from 'react-native-fast-image'

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
          {/* <FastImage
            style={styles.bodyImage}
            source={{
              uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + this.props.chitId + '/photo',
              headers: { 'Content-Type': 'image/png' },
              priority: FastImage.priority.normal
            }}
            resizeMode={FastImage.resizeMode.contain}
          /> */}
          {this.props.latitude ? <Text style={styles.informationText}> Position: {this.props.latitude}, {this.props.longitude} </Text> : null}
        </View>
      </View>
    )
  }
}
