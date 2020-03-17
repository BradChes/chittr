// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert,
  Modal,
  TextInput,
  Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import BackgroundTimer from 'react-native-background-timer'

// Components
import ActionIcon from '../components/ActionIcon'
import ActionButton from '../components/ActionButton'

const deviceWidth = Dimensions.get('window').width

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
    height: 150,
    marginVertical: 5
  },
  bodyText: {
    fontSize: 22,
    marginVertical: 5
  },
  informationText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: 'gray',
    marginVertical: 5
  },
  modalContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  modalInput: {
    width: deviceWidth - 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginVertical: 10
  },
})

export default class ChitView extends Component {
  constructor () {
    super()
    this.state = {
      token: '',
      modalVisible: false,
      scheduleTime: '0'
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ token: userInfoJson.token })
    } catch (e) {
      console.log(e.message)
    }
  }

  edit () {
    console.log('edit')
  }

  async post () {
    const { token } = this.state

    var jsonBody = JSON.stringify({
      timestamp: new Date().getTime(),
      chit_content: this.props.body,
      location: this.props.location
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
          if (this.props.imageData.blob !== '') {
            this.postImage(response.chit_id)
          }
        })
        .catch(e => Alert.alert('Connection Error', e.message))
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }

    BackgroundTimer.stopBackgroundTimer()
  }

  async postImage (chitId) {
    const { token } = this.state

    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo', {
        method: 'POST',
        headers: {
          'X-Authorization': token,
          'Content-Type': 'image/jpeg'
        },
        body: this.props.imageData.blob
      })
      if (response.status !== 201) {
        const responseText = await response.text()
        Alert.alert('Error', responseText)
      }
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server to post image.')
    }

    BackgroundTimer.stopBackgroundTimer()
  }

  schedule () {
    var parsedScheduleTime = parseInt(this.state.scheduleTime)
    BackgroundTimer.runBackgroundTimer(() => {
      this.post()
      console.log('Posting  schedule chit')
    }, parsedScheduleTime * 6000)
  }

  openModal () {
    this.setState({ modalVisible: true })
  }

  closeModal () {
    this.setState({ modalVisible: false })
    this.schedule()
  }

  render () {
    return (
      <View>
        <TouchableHighlight
          underlayColor='lightgray'
          onPress={() => Alert.alert('Draft Management', 'Edit or post your selected draft?',
            [
              {
                text: 'Edit',
                onPress: () => this.edit()
              },
              {
                text: 'Post',
                onPress: () => this.post()
              }
            ]
          )}
        >
          <View style={styles.superContainer}>
            <View style={styles.bodyContainer}>
              <Text style={styles.bodyText}>{this.props.body}</Text>
              {this.props.imageData.uri ? <Image style={styles.bodyImage} source={{ uri: this.props.imageData.uri }} /> : null}
              {this.props.location.latitude ? <Text style={styles.informationText}> Position: {this.props.location.latitude}, {this.props.location.longitude} </Text> : null}
            </View>
            <ActionIcon
              onPress={() => this.openModal()}
              name='calendar'
            />
          </View>

        </TouchableHighlight>
        <Modal
          visible={this.state.modalVisible}
          animationType='slide'
          onRequestClose={() => this.closeModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>Schedule by the minute?</Text>
              <TextInput
                autoCompleteType='tel'
                keyboardType='numeric'
                onChangeText={scheduleTime => this.setState({ scheduleTime })}
                style={styles.modalInput}
                placeholder='30'
                value={this.state.scheduleTime}
            />
                      <ActionButton
            text='Submit'
            handleOnPress={() => this.closeModal()}
          />
            </View>
          </View>
        </Modal>
      </View>
    )
  }
}
