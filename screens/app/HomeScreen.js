// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
  Alert
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import ChitView from './../../components/ChitView'
import FlatListEmpty from '../../components/FlatListEmpty'
import FlatListDivider from '../../components/FlatListDivider'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default class HomeScreen extends Component {
  constructor () {
    super()
    this.state = {
      id: 0,
      token: '',
      isLoading: true,
      isRefreshing: false,
      chitListData: []
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
      this.getChits()
    } catch (e) {
      console.log(e.message)
    }
  }

  async getChits () {
    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/chits')
      const responseJson = await response.json()
      this.setState({
        isLoading: false,
        isRefreshing: false,
        chitListData: responseJson
      })
    } catch (e) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
  }

  onRefresh () {
    this.setState({ isRefreshing: true }, function () { this.getChits() })
  }

  renderSeparator () {
    return (
      <FlatListDivider />
    )
  };

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.container}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <FlatList
          data={this.state.chitListData}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isRefreshing}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={
            <FlatListEmpty
              message='There are no tweets to display at the moment...'
            />
          }
          renderItem={({ item }) =>
            <ChitView
              chitId={item.chit_id}
              userId={item.user.user_id}
              user={item.user.given_name + ' ' + item.user.family_name}
              timestamp={item.timestamp}
              body={item.chit_content}
              latitude={item.location
                ? item.location.latitude : null}
              longitude={item.location
                ? item.location.longitude : null}
            />}
          keyExtractor={({ chit_id }) => chit_id.toString()} // eslint-disable-line camelcase
        />
      </View>
    )
  }
}
