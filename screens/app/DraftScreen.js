// React
import React, { Component } from 'react'
import {
  StyleSheet,
  View,
  ActivityIndicator,
  FlatList
} from 'react-native'
import AsyncStorage from '@react-native-community/async-storage'

// Components
import DraftChitView from './../../components/DraftChitView'
import FlatListEmpty from '../../components/FlatListEmpty'
import FlatListDivider from '../../components/FlatListDivider'
import ActionButton from '../../components/ActionButton'

const styles = StyleSheet.create({
  superContainer: {
    flex: 1,
    justifyContent: 'center'
  },
  listContainer: {
    flex: 8,
  },
  deleteContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
})

export default class DraftScreen extends Component {
  constructor () {
    super()
    this.state = {
      id: 0,
      token: '',
      draftChits: [],
      isLoading: true
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ id: userInfoJson.id })
      this.setState({ token: userInfoJson.token })
      this.getDrafts()
    } catch (e) {
      console.log(e.message)
    }
  }

  renderSeparator () {
    return (
      <FlatListDivider />
    )
  };

  async getDrafts () {
    const draftChits = await AsyncStorage.getItem('DRAFT_CHITS')
    const draftChitsJson = JSON.parse(draftChits)

    this.setState({ draftChits: draftChitsJson })
    this.setState({ isLoading: false })
  }

  async clearDrafts () {
    await AsyncStorage.removeItem('DRAFT_CHITS')
    this.getDrafts()
  }

  render () {
    if (this.state.isLoading) {
      return (
        <View style={styles.superContainer}>
          <ActivityIndicator />
        </View>
      )
    }

    return (
      <View style={styles.superContainer}>
              <View style={styles.listContainer}>

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
              imageData={item.imageData}
              location={item.location}
            />}
          keyExtractor={({ id }) => id.toString()}
        />
        </View>
        <View style={styles.deleteContainer}>
        <ActionButton
          text='Clear drafts'
          handleOnPress={() => this.clearDrafts()}
        />
        </View>
      </View>
    )
  }
}
