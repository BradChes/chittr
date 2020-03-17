// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Image,
  TouchableHighlight,
  Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'
import BackgroundTimer from 'react-native-background-timer';

//Components
import ActionIcon from '../components/ActionIcon'

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
  }
})

export default class ChitView extends Component {
  constructor () {
    super()
    this.state = {
      token: ''
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

  delete () {
    console.log('delete')
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

    BackgroundTimer.stopBackgroundTimer();
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

    BackgroundTimer.stopBackgroundTimer();
  }

schedule() {
  BackgroundTimer.runBackgroundTimer(() => { 
    this.post()
    console.log("Posting  schedule chit")
  }, 3000);
}

  render () {
    return (
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
            onPress={() => this.schedule()}
            name='calendar'
          />   
        </View>
 
      </TouchableHighlight>
    )
  }
}
