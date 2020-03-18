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
      token: '',
      draftChits: [],
      isLoading: true,
      isRefreshing: false
    }
    this.readyUp()
  }

  async readyUp () {
    try {
      const userInfo = await AsyncStorage.getItem('USER_INFO')
      const userInfoJson = JSON.parse(userInfo)
      this.setState({ token: userInfoJson.token })
      this.getDrafts()
    } catch (e) {
      console.log(e.message)
    }
  }

  onRefresh () {
    this.setState({ isRefreshing: true }, function () { this.getDrafts() })
  }

  async getDrafts () {
    const draftChits = await AsyncStorage.getItem('DRAFT_CHITS')
    const draftChitsJson = JSON.parse(draftChits)

    this.setState({
      draftChits: draftChitsJson,
      isLoading: false, 
      isRefreshing: false,
    })
  }

  async clearDrafts () {
    await AsyncStorage.removeItem('DRAFT_CHITS')
    this.getDrafts()
  }

  renderSeparator () {
    return (
      <FlatListDivider />
    )
  };

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
          onRefresh={() => this.onRefresh()}
          refreshing={this.state.isRefreshing}
          ItemSeparatorComponent={this.renderSeparator}
          ListEmptyComponent={
            <FlatListEmpty
              message='There are no drafts to display at the moment...'
            />
          }
          renderItem={({ item }) =>
            <DraftChitView
              draftChitId={item.id}
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
