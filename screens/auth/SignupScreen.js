// React
import React, { Component } from 'react'
import {
  View,
  Alert,
  Text,
  StyleSheet,
  TextInput,
  Dimensions
} from 'react-native'

// Components
import ActionButton from '../../components/ActionButton'

const deviceWidth = Dimensions.get('window').width

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
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

export default class LoginScreen extends Component {
  constructor (props) {
    super(props)

    this.state = {
      givenName: '',
      familyName: '',
      email: '',
      password: '',
      spinner: false
    }
  }

  async _onPressedSubmit () {
    const { givenName, familyName, email, password } = this.state

    this.setState({ spinner: true })
    try {
      const response = await window.fetch('http://10.0.2.2:3333/api/v0.0.5/user', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          given_name: givenName,
          family_name: familyName,
          email: email,
          password: password
        })
      })
      if (response.status === 201) {
        Alert.alert(
          'Congraulations!',
          'You\'ve made an account on Chittr, welcome to the family.',
          [
            {
              text: 'Go back',
              onPress: () => this.props.navigation.goBack()
            },
            {
              text: 'Log in!',
              onPress: () => this.props.navigation.navigate('Login')
            }
          ]
        )
      } else {
        const responseText = await response.text()
        Alert.alert('Error', responseText)
      }
    } catch (error) {
      Alert.alert('Error', 'Couldn\'t reach the server.')
    }
    this.setState({ spinner: false })
  }

  render () {
    return (
      <View style={styles.container}>
        <TextInput
          autoCompleteType='name'
          onChangeText={givenName => this.setState({ givenName })}
          style={styles.input}
          placeholder='First name'
          value={this.state.givenName}
        />
        <TextInput
          autoCompleteType='name'
          onChangeText={familyName => this.setState({ familyName })}
          style={styles.input}
          placeholder='Surname'
          value={this.state.familyName}
        />
        <TextInput
          keyboardType='email-address'
          autoCompleteType='email'
          onChangeText={email => this.setState({ email })}
          style={styles.input}
          placeholder='Email Address'
          value={this.state.email}
        />
        <TextInput
          secureTextEntry
          autoCompleteType='password'
          onChangeText={password => this.setState({ password })}
          style={styles.input}
          placeholder='Password'
          value={this.state.password}
        />
        {this.state.spinner &&
          <Text style={styles.spinnerTextStyle}>Working on it...</Text>}
        {!this.state.spinner &&
          <ActionButton
            text='Submit'
            handleOnPress={this._onPressedSubmit}
          />}
      </View>
    )
  }
}
