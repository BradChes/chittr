// React
import React, { Component } from 'react';
import { 
    StyleSheet,
    View,
    Text } from 'react-native';

// FastImage
import FastImage from 'react-native-fast-image'

const styles = StyleSheet.create({
        superContainer: {
            paddingHorizontal: 10,
            paddingVertical:10
        },
        headerContainer: {
            flexDirection: 'row',
            marginBottom: 10
        },
        informationText: {
            fontSize: 20,
            fontWeight: 'bold',
            color: 'gray',
            paddingBottom: 4
        },
        headerImage: {
            width: 60,
            height: 60,
            overflow: 'hidden',
            borderWidth: 1,
            borderColor: 'black',
            marginEnd: 10
        },
        bodyContainer: {
            flexDirection: 'column'
        },
        bodyImage: {
            width: 150,
            height: 150,
        },
        bodyText: {
            fontSize: 22
        }
    });

export default class ChitView extends Component {
    constructor() {
        super();
        this.state = {
          showImage: true,
        };
      }
    
    render() {
        var date = new Date(this.props.timestamp);
        var day = date.getDate();
        var month = date.getMonth() + 1;
        var year = date.getFullYear();

      return (
        <View style = { styles.superContainer }>
            <View style = { styles.headerContainer }>
                <FastImage style={ styles.headerImage }
                        source={{
                            uri: 'http://10.0.2.2:3333/api/v0.0.5/user/' + this.props.userId + '/photo',
                            headers: { 'Content-Type': 'image/png' },
                            priority: FastImage.priority.high,
                            cache: FastImage.cacheControl.web
                        }}
                        resizeMode={FastImage.resizeMode.contain}
                    />

                <View style = { styles.headerTextContainer }>
                    <Text style = { styles.informationText }> {this.props.user} </Text>
                    <Text style = { styles.informationText }> {day}/{month}/{year} </Text>
                </View>
            </View>

            <View style = { styles.bodyContainer} >
                <Text style = { styles.bodyText }>{this.props.body}</Text>
                <FastImage 
                    style = { styles.bodyImage }
                    source = {{
                        uri: 'http://10.0.2.2:3333/api/v0.0.5/chits/' + this.props.chitId + '/photo',
                        headers: { 'Content-Type': 'image/png' },
                        priority: FastImage.priority.normal,
                    }}
                    resizeMode = { FastImage.resizeMode.contain }
                />
                {this.props.latitude ? 
                    <Text style = { styles.informationText }> 
                        Position: {this.props.latitude}, {this.props.longitude} 
                    </Text> : null
                }
                
            </View>
        </View>
      );
    }
  }