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
      showImage: true
    }
  }

  delete() {
    console.log("delete")
  }

  edit() {
    console.log("edit")
  }

  post() {
    console.log("post")
  }

  render () {
    return (
      <TouchableHighlight
      disabled={this.props.disabled}
      underlayColor='lightgray'
      onPress={() => Alert.alert('Follower Management', 'Follow or unfollow, that is the question?',
        [
          {
            text: 'Delete',
            onPress: () => this.delete()
          },
          {
            text: 'Edit',
            onPress: () => this.edit()
          },
          {
            text: 'Post',
            onPress: () => this.post()
          },
        ]
      )}
    >
      <View style={styles.superContainer}>
        <View style={styles.bodyContainer}>
          <Text style={styles.bodyText}>{this.props.body}</Text>
          {this.props.imageUri ? <Image style={styles.bodyImage} source={{ uri: this.props.imageUri }} /> : null}
          {this.props.latitude ? <Text style={styles.informationText}> Position: {this.props.latitude}, {this.props.longitude} </Text> : null}
        </View>
      </View>
    </TouchableHighlight>
    )
  }
}
