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
import EditModal from '../components/EditModal'


const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  superContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingVertical: 10
  },
  bodyContainer: {
    flexDirection: 'column'
  },
  scheduleContainer: {
    justifyContent: 'center',
    alignItems: 'center'
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
  innerContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  modalInput: {
    width: deviceWidth - 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10,
    marginVertical: 10
  }
})

export default class DraftChitView extends Component {
  constructor () {
    super()
    this.state = {
      token: '',
      editModalVisible: false,
      scheduleModalVisible: false,
      scheduleTime: ''
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
  }

  schedule () {
    if(this.state.scheduleTime !== '') {
      if(!isNaN(this.state.scheduleTime)) {
        var parsedScheduleTime = parseInt(this.state.scheduleTime)
        BackgroundTimer.setTimeout(() => {
          this.post()
          console.log('Posting schedule chit')
        }, parsedScheduleTime * 6000)
      }
    }
  }

  openEditModal () {
    this.setState({ editModalVisible: true })
  }

  closeEditModal () {
    this.setState({ editModalVisible: false })
  }

  openScheduleModal () {
    this.setState({ scheduleModalVisible: true })
  }

  closeScheduleModal () {
    this.setState({ scheduleModalVisible: false })
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
                text: 'Cancel'
              },
              {
                text: 'Edit',
                onPress: () => this.openEditModal()
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
            <View style={styles.scheduleContainer}>
              <ActionIcon
                onPress={() => this.openScheduleModal()}
                name='calendar'
              />
            </View>
          </View>
        </TouchableHighlight>

        <Modal
          visible={this.state.scheduleModalVisible}
          animationType='slide'
          onRequestClose={() => this.closeScheduleModal()}
        >
          <View style={styles.modalContainer}>
            <View style={styles.innerContainer}>
              <Text>Delay this chit (By the minute)?</Text>
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
                handleOnPress={() => this.closeScheduleModal()}
              />
            </View>
          </View>
        </Modal>


        <EditModal
          draftChitId={this.props.draftChitId}
          visible={this.state.editModalVisible}
          close={() => this.closeEditModal()}/>
      </View>
    )
  }
}
