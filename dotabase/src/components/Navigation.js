import { createStackNavigator } from 'react-navigation-stack';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Overview from '../pages/Overview';
import Icon from "react-native-vector-icons/FontAwesome";
import React from "react";


const TabNavigator = createBottomTabNavigator(
    {
        Profile: {
            screen: Profile,
            navigationOptions: {
                title: "Profile",
                tabBarIcon: ({tintColor}) => (
                    <Icon name={'users'} size={30} color={tintColor} />
                )
            }

        },
        Overview: {
            screen: Overview,
            navigationOptions: {
                title: "Overview",
                tabBarIcon: ({tintColor}) => (
                    <Icon name={'bar-chart'} size={30} color={tintColor} />
                )
            }
        },
        Search: {
            screen: Search,
            navigationOptions: {
                title: "Search",
                tabBarIcon: ({tintColor}) => (
                    <Icon name={'search'} size={30} color={tintColor} />
                )
            }
        }
    },
    {
        initialRouteName: 'Profile',
        tabBarOptions: {
            activeTintColor: 'white',
            inactiveTintColor: '#80cbc4',
            showLabel: false,
            showIcon: true,
            style: {
                backgroundColor: '#26a69a'
            }
        }
    }
);

export default createStackNavigator({ TabNavigator }, { headerMode: "none" });