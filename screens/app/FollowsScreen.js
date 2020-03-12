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
import UserView from '../../components/UserView'
import FlatListEmpty from '../../components/FlatListEmpty'
import FlatListDivider from '../../components/FlatListDivider'
import FlatListHeader from '../../components/FlatListHeader'

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center'
  }
})

export default class FollowsScreen extends Component {
  constructor (props) {
    super(props)
    this.state = {
      id: 0,
      token: '',
      isLoading: true,
      isRefreshing: false,
      results: [],
      header: this.props.navigation.state.params.header,
      followsUrl: this.props.navigation.state.params.followsUrl
    }

    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
      this.getFollows()
    } catch (e) {
      // TODO
    }
  }

  async getFollows () {
    const { followsUrl } = this.state
    try {
      const response = await window.fetch(followsUrl)
      const responseJson = await response.json()
      this.setState({
        isLoading: false,
        isRefreshing: false,
        results: responseJson
      })
    } catch (e) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
  }

  onRefresh () {
    this.setState({ isRefreshing: true }, function () { this.getFollows() })
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
          data={this.state.results}
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isRefreshing}
          ListHeaderComponent={
            <FlatListHeader
              title={this.state.header}
            />
          }
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={
            <FlatListEmpty
              message='You need to get some friends :-('
            />
          }
          renderItem={({ item }) =>
            <UserView
              token={this.state.token}
              userId={item.user_id}
              user={item.given_name + ' ' + item.family_name}
              email={item.email}
            />}
          keyExtractor={({ user_id }) => user_id.toString()}
        />
      </View>
    )
  }
}
