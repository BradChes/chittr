// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    ActivityIndicator,
    FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';

// Components
import ChitView from './../../components/ChitView';

const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    },
    divider: {
        height: 0.5,
        backgroundColor: "gray"
    }
});

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            id: 0,
            token: '',
            isLoading: true,
            isRefreshing: false,
            chitListData: []
        };
        this._readyUp();
    }

    componentDidMount() {
        this._getChits();
    }

    _readyUp = async () =>  {
        try {
            const userInfo = await AsyncStorage.getItem('USER_INFO')
            const userInfoJson = JSON.parse(userInfo)
            this.setState({id: userInfoJson.id})
            this.setState({token: userInfoJson.token})
          } catch(e) {
            console.log(e);
        }
    }

    _getChits = async () => {
        try {
            const response = await fetch('http://10.0.2.2:3333/api/v0.0.5/chits');
            const responseJson = await response.json();
            this.setState({
                isLoading: false,
                isRefreshing: false,
                chitListData: responseJson,
            });
        }
        catch(e) {
            console.log(e);
        }
    }

    _onRefresh() {
        this.setState({ isRefreshing: true }, function() { this._getChits() });
    }

    renderSeparator = () => {
        return (
            <View style={ styles.divider }
          />
        );
    };

    render() {
        if(this.state.isLoading) {
            return(
                <View style = {styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
      
        return (
            <View style = { styles.container }>
                <FlatList
                    data = { this.state.chitListData }
                    onRefresh = {() => this._onRefresh()}
                    refreshing = { this.state.isRefreshing }
                    ItemSeparatorComponent = {this.renderSeparator }
                    renderItem = {({item}) => 
                        <ChitView 
                            user = {item.user.given_name + " " + item.user.family_name} 
                            timestamp = {item.timestamp}
                            body = {item.chit_content} /> 
                    }
                    keyExtractor={({chit_id}) => chit_id } />
            </View>
        );
    }
}