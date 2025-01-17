// React
import React, { Component } from 'react'
import {
  StyleSheet,
  Text,
  TouchableOpacity,
  View
} from 'react-native'

// React-Native camera
import { RNCamera } from 'react-native-camera'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'black'
  },
  preview: {
    flex: 1,
    justifyContent: 'flex-end',
    alignItems: 'center'
  },
  capture: {
    flex: 0,
    backgroundColor: '#fff',
    borderRadius: 5,
    padding: 15,
    paddingHorizontal: 20,
    alignSelf: 'center',
    margin: 20
  }
})

export default class CameraScreen extends Component {
  render () {
    return (
      <View style={styles.container}>
        <RNCamera
          ref={ref => {
            this.camera = ref
          }}
          style={styles.preview}
          type={RNCamera.Constants.Type.back}
          flashMode={RNCamera.Constants.FlashMode.on}
          captureAudio={false}
          androidCameraPermissionOptions={{
            title: 'Permission to use camera',
            message: 'We need your permission to use your camera',
            buttonPositive: 'Ok',
            buttonNegative: 'Cancel'
          }}
        />
        <View style={{ flex: 0, flexDirection: 'row', justifyContent: 'center' }}>
          <TouchableOpacity onPress={this.takePicture.bind(this)} style={styles.capture}>
            <Text style={{ fontSize: 14 }}> Capture </Text>
          </TouchableOpacity>
        </View>
      </View>
    )
  }

  async takePicture () {
    if (this.camera) {
      const options = {
        quality: 0.5,
        base64: true,
        orientation: 'portrait',
        fixOrientation: true
      }
      const data = await this.camera.takePictureAsync(options)

      window.fetch(data.uri)
        .then((response) => response.blob())
        .then((response) => {
          var imageData = {
            uri: data.uri,
            blob: response
          }
          this.props.navigation.state.params.onGoBack(imageData)
          this.props.navigation.goBack()
        })
    }
  };
}
