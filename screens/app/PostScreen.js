// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    TextInput,
    Dimensions, 
    Alert,
    TouchableOpacity,
    PermissionsAndroid } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';
import Icon from 'react-native-vector-icons/FontAwesome';
import Geolocation from 'react-native-geolocation-service';

// Components
import ActionButton from '../../components/ActionButton';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    actionContainer: {
        flexDirection: 'row',
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
    cameraIcon: {        
        marginHorizontal: 20,
        alignItems: 'center',
        backgroundColor: 'red',
        padding: 10,
        borderRadius: 50
    },
    spinnerTextStyle: {
        textAlign: 'center'
    },
});

export default class PostScreen extends Component {
    constructor() {
        super();
        this.state = {
            userId: 0,
            token: '',
            chit: '',
            image: '',
            location: {
                latitude: 0.0,
                longitude: 0.0
            },
            locationPermission: false,
            spinner: false,
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({userId: userInfoJson.id})
            this.setState({token: userInfoJson.token})
          } catch(e) {
            //TODO
        }
    }

    _postChit = async () => {
        const {token, chit, image, location} = this.state;
        this.setState({spinner: true})

        var jsonBody = JSON.stringify({
            timestamp: new Date().getTime(),
            chit_content: chit,
            location: location
        })

        try {
            const response = await fetch("http://10.0.2.2:3333/api/v0.0.5/chits", {
                method: 'POST',
                 headers: {
                    'Content-Type': 'application/json',
                    'X-Authorization': token
                }, 
                body: jsonBody
            })
            .then((response) => response.json())
            .then((response) => {  
                if (image !== '') {
                    this._postImage(response.chit_id)
                }
            })
            .catch(e => Alert.alert('Connection Error',  e)); 
        } catch (error) {
            console.log(error.message)
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
        this.setState({
            chit: '',
            spinner: false
        });
    }

    _postImage = async (chitId) => {
        const { token, image } = this.state;

        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits/' + chitId + '/photo', {
                method: 'POST',
                 headers: {
                    'X-Authorization': token,
                    'Content-Type': 'image/jpeg'
                },
                body: image
            });
            if (response.status !== 201) {
                const responseText = await response.text();
                Alert.alert('Error', responseText)
            } 
            this.setState({ isRefreshing: false });
        } catch (error) {
            Alert.alert('Error',  'Couldn\'t reach the server to post image.')
            this.setState({ isRefreshing: false });
        }

        this.setState({image: ''});
    }

    returnData(image) {
        this.setState({image: image});
    }

  findCoordinates = () => {
    if(!this.state.locationPermission){
      this.state.locationPermission = this.requestLocationPermission();
    }

    Geolocation.getCurrentPosition(
      (position) => {
        this.setState({ 
            location: { 
                latitude: position.coords.latitude, 
                longitude: position.coords.longitude
            } 
        });
      },
      (error) => {
        Alert.alert(error.message)
      },
      {
        enableHighAccuracy: true,
        timeout: 20000,
        maximumAge: 1000
      }
    );
  };

  async requestLocationPermission() {
    try {
      const granted = await PermissionsAndroid.request(
        PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION,
        {
          title: 'Lab6 Location Permission',
          message: 'This app requires access to your location.',
          buttonNeutral: 'Ask Me Later',
          buttonNegative: 'Cancel',
          buttonPositive: 'OK',
        },
      );

      if (granted === PermissionsAndroid.RESULTS.GRANTED) {
        return true;
      } else {
        return false;
      }
    } catch (err) {
      console.warn(err);
    }
  }

    render() {
        const { chit } = this.state;
        const enabled = chit.length > 0;
        return (
            <View style={styles.container}>
                <TextInput
                    onChangeText = {chit => this.setState({chit})}
                    style = {styles.input}
                    placeholder = "What's on your mind?"
                    value = {this.state.chit}  
                />

                <View style = { styles.actionContainer }>
                    <TouchableOpacity 
                        style = {styles.cameraIcon} 
                        onPress = {() => this.props.navigation.navigate('Camera', { 
                            returnData: this.returnData.bind(this),
                            onGoBack: () => console.log(this.state.image)
                        })
                    }>
                        <Icon name = 'camera' 
                            color = '#FFF'
                            size = {20} />
                    </TouchableOpacity>

                    <TouchableOpacity 
                        style = {styles.cameraIcon} 
                        onPress = {() => this.findCoordinates()}
                    >
                        <Icon name = 'map-pin' 
                            color = '#FFF'
                            size = {20} />
                    </TouchableOpacity>

                    {this.state.spinner &&
                        <Text style={styles.spinnerTextStyle}>Posting...</Text>
                    }
                    {!this.state.spinner &&
                        <ActionButton
                            disabled = {!enabled}
                            text = 'Submit'
                            onPress = { () => this._postChit() } 
                        />
                    }
                </View>
            </View>
        );
    }
}