import { createAppContainer } from 'react-navigation';
import { createBottomTabNavigator } from 'react-navigation-tabs';

import Profile from '../pages/Profile';
import Search from '../pages/Search';
import Overview from '../pages/Overview';
import HeroProfile from '../pages/HeroProfile'


const TabNavigator = createBottomTabNavigator(
    {
        Profile: Profile,
        Overview: Overview,
        Search: Search, 
        HeroProfile:{
            screen: HeroProfile,
            navigationOptions:{
                visible:false
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

export default createAppContainer(TabNavigator);