// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Alert,
  Text,
  PermissionsAndroid,
  Modal
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'

// Components
import ActionIcon from './ActionIcon'

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  actionContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: deviceWidth - 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginVertical: 10
  },
  image: {
    width: 150,
    height: 150,
    marginVertical: 5
  },
  informationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginVertical: 5
  }
})

export default class EditModal extends Component {
  constructor () {
    super()
    this.state = {
      token: '',
      chit: '',
      imageData: {
        uri: '',
        blob: ''
      },
      location: {
        latitude: 0.0,
        longitude: 0.0
      },
      locationPermission: false,
      draftChits: []
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const draftChits = await AsyncStorage.getItem('DRAFT_CHITS')
      const draftChitsJson = JSON.parse(draftChits)
      this.setState({ draftChits: draftChitsJson })
      var draftChit = this.state.draftChits[this.props.draftChitId - 1]
      this.setState({ chit: draftChit.chit })
      this.setState({ imageData: draftChit.imageData })
      this.setState({ location: draftChit.location })
    } catch (e) {
      console.log(e.message)
    }
  }

  findCoordinates () {
    if (!this.state.locationPermission) {
      this.state.locationPermission = this.requestLocationPermission()
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({
          location: {
            latitude: position.coords.latitude,
            longitude: position.coords.longitude
          }
        })
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    )
  };

  async requestLocationPermission () {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Chittr Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK'
        }
      )

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true
      } else {
        return false
      }
    } catch (err) {
      console.warn(err)
    }
  }

  async updateDraft () {
    const { draftChits } = this.state

    var draftChit = {
      id: this.props.draftChitId,
      chit: this.state.chit,
      imageData: this.state.imageData,
      location: this.state.location
    }

    draftChits[this.props.draftChitId - 1] = draftChit

    await AsyncStorage.setItem('DRAFT_CHITS', JSON.stringify(draftChits))

    this.props.close()
  }

  render () {
    const { chit } = this.state
    const enabled = chit.length > 0

    return (
      <Modal
        visible={this.props.visible}
        animationType='slide'
        onRequestClose={() => this.props.close()}
      >
        <View style={styles.container}>
          <TextInput
            onChangeText={chit => this.setState({ chit })}
            style={styles.input}
            placeholder="What's on your mind?"
            value={this.state.chit}
          />

          <View style={styles.actionContainer}>

            <ActionIcon
              onPress={() => this.findCoordinates()}
              name='map-pin'
            />

            <ActionIcon
              disabled={!enabled}
              onPress={() => this.updateDraft()}
              name='save'
            />

          </View>
          {this.state.location.latitude ? <Text style={styles.informationText}> Position: {this.state.location.latitude}, {this.state.location.longitude} </Text> : null}
        </View>
      </Modal>
    )
  }
}
