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
import DraftChitView from './../../components/DraftChitView'
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
          data={this.state.draftChits}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={
            <FlatListEmpty
              message='There are no drafts to display at the moment...'
            />
          }
          renderItem={({ item }) =>
            <DraftChitView
              chitId={item.id}
              body={item.chit}
              latitude={item.location
                ? item.location.latitude : null}
              longitude={item.location
                ? item.location.longitude : null}
            />}
          keyExtractor={({ id }) => id.toString()}
        />
      </View>
    )
  }
}
