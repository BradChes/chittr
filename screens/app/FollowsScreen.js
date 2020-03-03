// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList,
    Text,
    Alert } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import UserView from '../../components/UserView';

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
    header: {
        fontSize: 26,
        fontWeight: 'bold',
        marginHorizontal: 20,
        marginVertical: 10
    },
    divider: {
        height: 0.5,
        backgroundColor: "gray"
    }
});

export default class HomeScreen extends Component {
    constructor(props) {
        super(props);
        this.state = {
            id: 0,
            token: '',
            isLoading: true,
            results: [],
            header: this.props.navigation.state.params.header,
            followsUrl: this.props.navigation.state.params.followsUrl
        };

        this._readyUp()
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({id: userInfoJson.id})
            this.setState({token: userInfoJson.token})
            this._getFollows()
          } catch(e) {
            //TODO
        }
    }

    _getFollows = async () => {
        const {followsUrl} = this.state;
        try {
            const response = await fetch(followsUrl);
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                results: responseJson,
            });
        }
        catch(e) {
            Alert.alert('Error',  'Couldn\'t reach the server.')
        }
    }

    renderSeparator = () => {
        return (
            <View style={ styles.divider }
          />
        );
    };

    renderEmptyComponent = () => {
        return (
            <Text>Need some friends</Text>
        );
    };

    render() {
        return(
            <View style = {styles.container}>
                <Text style = {styles.header}>{this.state.header}</Text>
                {this.state.loading &&  
                    <ActivityIndicator/>
                }
                {!this.state.loading &&
                        <FlatList
                            data = { this.state.results }
                            ItemSeparatorComponent = {this.renderSeparator }
                            ListEmptyComponent = { this.renderEmptyComponent }
                            renderItem = {({item}) => 
                                <UserView
                                    token = {this.state.token}
                                    userId = {item.user_id}
                                    user = {item.given_name + " " + item.family_name} 
                                    email = {item.email}
                                />
                            }   
                            keyExtractor = {({user_id}) => user_id.toString() } 
                        />
                }
            </View>
        )
    }
}