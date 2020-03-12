// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  TextInput,
  FlatList,
  Dimensions,
  ActivityIndicator,
  Alert,
  Keyboard
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import ActionButton from '../../components/ActionButton'
import UserView from './../../components/UserView'
import FlatListEmpty from '../../components/FlatListEmpty'
import FlatListDivider from '../../components/FlatListDivider'

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1
  },
  searchBoxContainer: {
    flex: 1,
    marginTop: 40,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center'
  },
  input: {
    width: deviceWidth - 50,
    backgroundColor: '#FFFFFF',
    borderColor: 'red',
    borderWidth: 1,
    borderRadius: 20,
    paddingLeft: 10
  },
  searchResultsContainer: {
    flex: 6
  }
})

export default class SearchScreen extends Component {
  constructor () {
    super()
    this.state = {
      id: 0,
      token: '',
      query: '',
      results: [],
      loading: false
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
    } catch (e) {
      // TODO
    }
  }

  async onPressedSearch () {
    const { query } = this.state
    Keyboard.dismiss()
    this.setState({ loading: true })

    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query)

      if (response.status !== 200) {
        const responseText = await response.text()
        Alert.alert('Error', responseText)
        return
      }

      const responseJson = await response.json()

      this.setState({
        isLoading: false,
        results: responseJson
      })
    } catch (e) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
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
        <View style={styles.searchBoxContainer}>
          <TextInput
            onChangeText={query => this.setState({ query })}
            style={styles.input}
            placeholder='Search'
            value={this.state.givenName}
          />
          <ActionButton
            text='search'
            onPress={() => this.onPressedSearch()}
          />
        </View>
        <View style={styles.searchResultsContainer}>
          <FlatList
            data={this.state.results}
            ItemSeparatorComponent={this.renderSeparator}
            ListEmptyComponent={
              <FlatListEmpty
                message='No search results.'
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
      </View>
    )
  }
}
