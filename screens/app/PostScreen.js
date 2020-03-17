// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  Dimensions,
  Alert,
  Text,
  Image,
  ActivityIndicator,
  PermissionsAndroid
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import Geolocation from 'react-native-geolocation-service'

// Components
import ActionIcon from '../../components/ActionIcon'
import ActionButton from '../../components/ActionButton'

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
  },
  spinner: {
    margin: 20
  }
})

export default class PostScreen extends Component {
  constructor () {
    super()
    this.state = {
      userId: 0,
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
      spinner: false
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ userId: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
    } catch (e) {
      console.log(e.message)
    }
  }

  async postChit () {
    const { token, chit, imageData, location } = this.state
    this.setState({ spinner: true })

    var jsonBody = JSON.stringify({
      timestamp: new Date().getTime(),
      chit_content: chit,
      location: location
    })

    try {
      window.fetch('http://10.0.2.2:3333/api/v0.0.5/chits', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'X-Authorization': token
        },
        body: jsonBody
      })
        .then((response) => response.json())
        .then((response) => {
          if (imageData.blob !== '') {
            this.postImage(response.chit_id)
          }
        })
        .catch(e => Alert.alert('Connection Error', e.message))
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
    this.setState({
      chit: '',
      spinner: false
    })
  }

  async postImage (chitId) {
    const { token, imageData } = this.state

    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo', {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'image/jpeg'
        },
        body: imageData.blob
      })
      if (response.status !== 201) {
        const responseText = await response.text()
        Alert.alert('Error', responseText)
      }
      this.setState({ isRefreshing: false })
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server to post image.')
      this.setState({ isRefreshing: false })
    }

    this.setState({
      imageData: {
        uri: '',
        blob: ''
      }
    })
  }

  returnData (imageData) {
    console.log(imageData)
    this.setState({ imageData: imageData })
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

  async saveDraft () {
    const storedDraftChits = await AsyncStorage.getItem('DRAFT_CHITS')
    const storedDraftChitsJson = JSON.parse(storedDraftChits)

    var chitId = storedDraftChitsJson ? storedDraftChitsJson.length + 1 : 1

    var draftChit = {
      id: chitId,
      chit: this.state.chit,
      imageData: this.state.imageData,
      location: this.state.location
    }

    var draftChits = []
    if (storedDraftChitsJson !== null) {
      draftChits = draftChits.concat(storedDraftChitsJson)
    }

    draftChits.push(draftChit)

    await AsyncStorage.setItem('DRAFT_CHITS', JSON.stringify(draftChits))
  }

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

  render () {
    const { chit } = this.state
    const enabled = chit.length > 0
    return (
      <View style={styles.container}>
        <TextInput
          onChangeText={chit => this.setState({ chit })}
          style={styles.input}
          placeholder="What's on your mind?"
          value={this.state.chit}
        />

        <View style={styles.actionContainer}>

          <ActionIcon
            onPress={() => this.props.navigation.navigate('Camera', {
              onGoBack: this.returnData.bind(this)
            })}
            name='camera'
          />

          <ActionIcon
            onPress={() => this.findCoordinates()}
            name='map-pin'
          />

          <ActionIcon
            onPress={() => this.saveDraft()}
            name='edit'
          />

          {this.state.spinner &&
            <ActivityIndicator style={styles.spinner} />}
          {!this.state.spinner &&
            <ActionIcon
              disabled={!enabled}
              onPress={() => this.postChit()}
              name='share'
            />}
        </View>
        {this.state.imageData.uri ? <Image style={styles.image} source={{ uri: this.state.imageData.uri }} /> : null}
        {this.state.location.latitude ? <Text style={styles.informationText}> Position: {this.state.location.latitude}, {this.state.location.longitude} </Text> : null}
        <ActionButton
          text='Saved drafts'
          handleOnPress={() => this.props.navigation.navigate('Drafts')}
        />
      </View>
    )
  }
}
