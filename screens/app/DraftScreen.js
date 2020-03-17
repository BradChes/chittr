// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList,
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

export default class DraftScreen extends Component {
  constructor () {
    super()
    this.state = {
      id: 0,
      token: '',
      draftChits: [],
      isLoading: true,
      chitListData: []
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const draftChits = await AsyncStorage.getItem('DRAFT_CHITS')

      const userInfoJson = JSON.parse(userInfo)
      const draftChitsJson = JSON.parse(draftChits)

      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
      this.setState({ isLoading: false })
      this.setState({ draftChits: draftChitsJson })

      console.log(this.state.draftChits)
    } catch (e) {
      console.log(e)
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
        <FlatList
          data={this.state.chitListData}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={
            <FlatListEmpty
              message='There are no drafts to display at the moment...'
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
