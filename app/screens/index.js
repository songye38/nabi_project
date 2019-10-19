import React from 'react';
import {
    Text
} from 'react-native';
import {createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createBottomTabNavigator } from 'react-navigation-tabs'
import { Icon } from 'react-native-elements';

import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ArchiveScreen from './ArchiveScreen';
import SettingScreen from './SettingScreen';
import SomethingScreen from './somethingScreen';
import RegisterScreen from './RegisterScreen';


const LoginStack = createStackNavigator(
     {
        LoginScreen,
        RegisterScreen
     },
     {
        initialRouteName: 'LoginScreen',
     }

)
const HomeStack = createStackNavigator(
    {
        HomeScreen
    },
    // if you need.
    // recommend custom header
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Home',
        }),
    }
);
const SearchStack = createStackNavigator(
    {
        SearchScreen
    },
    // if you need.
    // recommend custom header
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Search',
        }),
    }
);
const ArchiveStack = createStackNavigator(
    {
        ArchiveScreen
    },
    // if you need.
    // recommend custom header
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Archive',
        }),
    }
);
const SettingStack = createStackNavigator(
    {
        SettingScreen,
        SomethingScreen
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Setting',
        }),
        initialRouteName: 'SettingScreen',
    }
);


const TabNavigator = createBottomTabNavigator(
    {
        Home: HomeStack,
        Search: SearchStack,
        Archive: ArchiveStack,
        Setting: SettingStack,
    },
    {
        defaultNavigationOptions: ({navigation}) => ({
            tabBarIcon: ({focused, horizontal, tintColor}) => {
                const {routeName} = navigation.state;
                if(routeName === 'Home'){
                    return <Icon name='home' type='antdesign'/>
                } else if(routeName === 'Setting'){
                    return <Icon name='ellipsis1' type='antdesign'/>
                } else if(routeName === 'Search'){
                    return <Icon name='search1' type='antdesign'/>
                } else if(routeName === 'Archive'){
                    return <Icon name='folder1' type='antdesign'/>
                } 
            }
        }),
        lazy: false,
        tabBarOptions: {
            activeTintColor: "#46c3ad",
            inactiveTintColor: "#888",
            style: {          
              height: 60,
              borderTopWidth: 0.5,
              borderTopColor: '#eee',                      
          },      
            labelStyle: {
              fontSize: 11,
              marginBottom: 5
          },
        },
    }
);

const AppStack = createStackNavigator(
    {
        LoginScreen: LoginScreen,
        RegisterScreen : RegisterScreen,
        TabNavigator: {
            screen: TabNavigator,
            navigationOptions: ({navigation}) => ({
                header: null,
            }),
        },
    }
);

export default createAppContainer(AppStack);