// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  Text,
  Alert,
  ActivityIndicator,
  Dimensions
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import ActionButton from '../../components/ActionButton'
import UserView from './../../components/UserView'

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  },
  userInfoContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    marginHorizontal: 20,
    marginBottom: 30
  },
  followerManagementContainer: {
    flex: 2,
    justifyContent: 'flex-start',
    marginHorizontal: 20
  },
  logoutContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  header: {
    fontSize: 26,
    fontWeight: 'bold',
    marginVertical: 10
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
  spinnerTextStyle: {
    textAlign: 'center'
  }
})

export default class SettingsScreen extends Component {
  constructor () {
    super()
    this.state = {
      id: '',
      token: '',
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      imageData: {
        uri: '',
        blob: ''
      },
      isLoading: true,
      isRefreshing: false
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
      this.getUserInfo()
      this.setState({ isLoading: false })
    } catch (e) {
      // TODO
    }
  }

  onUserInformationUpdate () {
    this.setState({ isRefreshing: true }, () => { this.getUserInfo() })
  }

  async getUserInfo () {
    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.id)
      const responseJson = await response.json()
      this.setState({
        givenName: responseJson.given_name,
        familyName: responseJson.family_name,
        email: responseJson.email,
        isLoading: false,
        isRefreshing: false
      })
    } catch (e) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
  }

  returnData (imageData) {
    this.setState({ imageData: imageData })
    this.updateUserPicture()
  }

  async updateUserPicture () {
    const { token, imageData } = this.state
    this.setState({ isRefreshing: true })

    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/user/photo', {
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
      } else {
        Alert.alert('Updated', 'Your user profile has been changed.')
      }
      this.setState({ isRefreshing: false })
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
      this.setState({ isRefreshing: false })
    }
  }

  async onPressedLogOut () {
    const { token } = this.state
    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/logout', {
        method: 'POST',
        headers: {
          'X-Authorization': token
        }
      })
      if (response.status === 200) {
        await AsyncStorage.clear()
        this.props.navigation.navigate('Auth')
      } else {
        const responseText = await response.text()
        Alert.alert('Error', responseText)
      }
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
    await AsyncStorage.clear()
    this.props.navigation.navigate('Auth')
  }

  render () {
    if (this.state.isLoading || this.state.isRefreshing) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.userInfoContainer}>
          <Text style={styles.header}>User Information</Text>
          <UserView
            disabled
            userId={this.state.id}
            user={this.state.givenName + ' ' + this.state.familyName}
            email={this.state.email}
          />
          <ActionButton
            handleOnPress={() => this.props.navigation.navigate('UserUpdate', {
              onGoBack: () => this.onUserInformationUpdate()
            })}
            text='Update User Information'
          />
          <ActionButton
            handleOnPress={() => this.props.navigation.navigate('Camera',
              {
                onGoBack: this.returnData.bind(this)
              })}
            text='Update Profile Picture'
          />
        </View>
        <View style={styles.followerManagementContainer}>
          <Text style={styles.header}>Follower Management</Text>
          <ActionButton
            handleOnPress={() => this.props.navigation.navigate('Following',
              {
                followsUrl: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.id + '/following',
                header: 'Following'
              }
            )}
            text='Following'
          />
          <ActionButton
            handleOnPress={() => this.props.navigation.navigate('Followers',
              {
                followsUrl: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.state.id + '/followers',
                header: 'Followers'
              }
            )}
            text='Followers'
          />
        </View>
        <View style={styles.logoutContainer}>
          <ActionButton
            handleOnPress={() => this.onPressedLogOut()}
            text='Log Out'
          />
        </View>
      </View>
    )
  }
}
