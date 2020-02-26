import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text,
    ActivityIndicator,
    FlatList } from 'react-native';
import AsyncStorage from '@react-native-community/async-storage';


const styles = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center',
    }
});

class ChitView extends Component {
    render() {
        var date = new Date(this.props.timestamp);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

      return (
        <View>
            <Text>@{this.props.user} | {day}/{month}/{year}</Text>
            <Text>Chit: {this.props.body}</Text>
        </View>
      );
    }
  }

export default class HomeScreen extends Component {
    constructor() {
        super();
        this.state = {
            name: '',
            isLoading: true,
            chitListData: []
        };
        this._readyUp();
    }

    componentDidMount() {
        this._getChits();
    }

    _readyUp = async () =>  {
        try {
            const userName = await AsyncStorage.getItem('UserName');
            this.setState({name: userName});
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
                chitListData: responseJson,
            });
        }
        catch(e) {
            console.log(e);
        }
    }

    render() {
        if(this.state.isLoading) {
            return(
                <View style = {styles.container}>
                    <ActivityIndicator/>
                </View>
            )
        }
      
        return (
            <View style = {styles.container}>
                <FlatList
                    data={this.state.chitListData}
                    renderItem={({item}) => 
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