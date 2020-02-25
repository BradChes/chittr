import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs'

import HomeScreen from './HomeScreen';
import PostScreen from './PostScreen';
import SearchScreen from './SearchScreen';
import SettingsScreen from './SettingsScreen';

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

