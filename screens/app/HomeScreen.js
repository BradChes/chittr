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
        alignItems: 'center'
    },
    divider: {
        height: 0.5,
        backgroundColor: "gray"
    },
    chitContainer: {
        paddingHorizontal: 10,
        paddingVertical:10
    },
    chitHeader: {
        fontSize: 16,
        fontWeight: 'bold',
        color: 'gray',
        paddingBottom: 4
    },
    chitBody: {
        fontSize: 18
    }
});

class ChitView extends Component {
    render() {
        var date = new Date(this.props.timestamp);
        var day = date.getDate();
        var month = date.getMonth();
        var year = date.getFullYear();

      return (
        <View style = { styles.chitContainer }>
            <Text style = { styles.chitHeader }>{this.props.user} | {day}/{month}/{year}</Text>
            <Text style = { styles.chitBody }>{this.props.body}</Text>
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