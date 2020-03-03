// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    TextInput,
    FlatList,
    Dimensions, 
    ActivityIndicator,
    Keyboard } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import ActionButton from '../../components/ActionButton';
import UserView from './../../components/UserView';

const deviceWidth = Dimensions.get('window').width;

const styles = StyleSheet.create({
    container: {
        flex: 1, 
    },
    searchBoxContainer: {
        flex: 1,
        marginVertical: 20,
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
    },
    searchResultsContainer: {
        flex: 6,
    }
});

export default class SearchScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            token: '',
            query: '',
            results: [],
            loading: false,
        };
        this._readyUp();
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({id: userInfoJson.id})
            this.setState({token: userInfoJson.token})
          } catch(e) {
            //TODO
        }
    }

    _onPressedSearch = async () => {
        const {query} = this.state;
        this.setState({loading: true});

        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/search_user?q=' + query);
            const responseJson = await response.json();
            console.log(responseJson)
            this.setState({
                isLoading: false,
                results: responseJson,
            });
        }
        catch(e) {
            console.log(e);
        }

        Keyboard.dismiss()
    }

    renderSeparator = () => {
        return (
            <View style={ styles.divider }
          />
        );
    };

    render() {
        return (
            <View style={styles.container}>
                <View style={styles.searchBoxContainer}>
                    <TextInput
                        onChangeText = {query => this.setState({query})}
                        style = {styles.input}
                        placeholder = 'Search'
                        value = {this.state.givenName}  
                    />
                    <ActionButton
                        text = 'search'
                        onPress = { () => this._onPressedSearch() } 
                    />
                </View>
                <View style={styles.searchResultsContainer}>
                    <FlatList
                        data = { this.state.results }
                        ItemSeparatorComponent = {this.renderSeparator }
                        renderItem = {({item}) => 
                            <UserView
                                user = {item.given_name + " " + item.family_name} 
                                email = {item.email}
                            />
                        }   
                        keyExtractor = {({user_id}) => user_id.toString() } />
                </View>
            </View>
        );
    }
}