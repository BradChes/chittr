// React
import React from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';
import { createBottomTabNavigator } from 'react-navigation-tabs'

// Application Screens
import HomeScreen from './../app/HomeScreen';
import PostScreen from './../app/PostScreen';
import SearchScreen from './../app/SearchScreen';
import SettingsScreen from './../app/SettingsScreen';

export const TabScreen = createBottomTabNavigator({
    Home: {
        screen: HomeScreen,
        navigationOptions: {
            tabBarLabel: 'Home',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='home'
                    color={tintColor}
                    size={25} />
            )
        }
    },
    Post: {
        screen: PostScreen,
        navigationOptions: {
            tabBarLabel: 'Post',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='share'
                    color={tintColor}
                    size={25} />
            )
        }
    },
    Search: {
        screen: SearchScreen,
        navigationOptions: {
            tabBarLabel: 'Search',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='search'
                    color={tintColor}
                    size={25} />
            )
        }
    },
    Settings: {
        screen: SettingsScreen,
        navigationOptions: {
            tabBarLabel: 'Settings',
            tabBarIcon: ({ tintColor }) => (
                <Icon
                    name='cog'
                    color={tintColor}
                    size={25} />
            )
        }
    }
}, {
    tabBarOptions: {
        activeTintColor: 'red',
        showIcon: true
    }
});

