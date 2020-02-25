import React, { Component } from 'react';
import { View, Text, AsyncStorage, StyleSheet } from 'react-native'
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs'
import SettingsScreen from './SettingsScreen';

const style = StyleSheet.create({
    container: {
        flex: 1, 
        justifyContent: 'center', 
        alignItems: 'center'
    }
});

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    name = 'home' 
                    color = {tintColor} 
                    size = {25} />
            )
        }
    },
    Post: {
        screen: PostScreen,
        navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    name = 'home' 
                    color = {tintColor} 
                    size = {25} />
            )
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    name = 'home' 
                    color = {tintColor} 
                    size = {25} />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({tintColor}) => (
                <Icon 
                    name = 'cog' 
                    color = {tintColor} 
                    size = {25} />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        inactiveBackgroundColor: 'grey',
        showIcon: true
    }
});

