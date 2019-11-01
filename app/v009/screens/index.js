import React from 'react';
import {
    Text
} from 'react-native';
import { createAppContainer } from 'react-navigation';
import { createStackNavigator } from 'react-navigation-stack'
import { createMaterialTopTabNavigator, createBottomTabNavigator } from 'react-navigation-tabs' 
import { Icon } from 'react-native-elements';


import LoginScreen from './LoginScreen';
import HomeScreen from './HomeScreen';
import SearchScreen from './SearchScreen';
import ArchiveScreen from './ArchiveScreen';
import SettingScreen from './SettingScreen';
import SomethingScreen from './somethingScreen';
import RegisterScreen from './RegisterScreen';
import PointScreen from './PointScreen';
import MyRankScreen from './MyRankScreen';
import PointHistoryScreen from './PointHistoryScreen';
import PointStandardScreen from './PointStandardScreen';
import CommMainScreen from './CommMainScreen';
import CustomList from '../customComponents/CustomList';
import CommOffAction from '../customComponents/CommOffAction';
import CommOnAction from '../customComponents/CommOnAction';
import CommTalk from '../customComponents/CommTalk';
import CommShare from '../customComponents/CommShare';


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
        HomeScreen,
        PointScreen : PointScreen,
        CommMainScreen : CommMainScreen
    },
    {
        initialRouteName: 'HomeScreen',
     },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Home',
        }),
    }
);
HomeStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let swipeEnabled;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "PointScreen" || route.routeName === "CommMainScreen") {
        tabBarVisible = false;
        swipeEnabled =  false;
      } else {
        tabBarVisible = true;
        swipeEnabled =  true;
      }
    });
  }
  return {
    tabBarVisible,swipeEnabled
  };
};
const SearchStack = createStackNavigator(
    {
        SearchScreen,
        CommMainScreen : CommMainScreen,
        CommOffAction : CommOffAction,
        CommOnAction : CommOnAction,
        CommTalk : CommTalk,
        CommShare : CommShare,
    },
    {
    defaultNavigationOptions: ({navigation}) => ({
            title : 'Search',
    }),
    }
);

SearchStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let swipeEnabled;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "CommMainScreen" || route.routeName === "CommOffAction" || route.routeName === "CommOnAction" || route.routeName === "CommTalk" || route.routeName === "CommShare") {
        tabBarVisible = false;
        swipeEnabled =  false;
      } else {
        tabBarVisible = true;
        swipeEnabled =  true;
      }
    });
  }
  return {
    tabBarVisible,swipeEnabled
  };
};
const ArchiveStack = createStackNavigator(
    {
        ArchiveScreen,
        PointScreen : PointScreen,
        CommMainScreen : CommMainScreen,
        MyRankScreen : MyRankScreen,
        PointHistoryScreen : PointHistoryScreen,
        PointStandardScreen : PointStandardScreen,
    },
    {
        initialRouteName: 'ArchiveScreen',
     },
    {
        defaultNavigationOptions: ({navigation}) => ({
            title: 'Archive',
        }),
    }
);

ArchiveStack.navigationOptions = ({ navigation }) => {
  let tabBarVisible;
  let swipeEnabled;
  if (navigation.state.routes.length > 1) {
    navigation.state.routes.map(route => {
      if (route.routeName === "PointScreen" || route.routeName === "CommMainScreen") {
        tabBarVisible = false;
        swipeEnabled =  false;
      } else {
        tabBarVisible = true;
        swipeEnabled =  true;
      }
    });
  }
  return {
    tabBarVisible,swipeEnabled
  };
};
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


const TabNavigator = createMaterialTopTabNavigator(
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
                    return <Icon name='home' type='antdesign' color = {tintColor} size = {20} />
                } else if(routeName === 'Setting'){
                    return <Icon name='ellipsis1' type='antdesign' color = {tintColor} size = {20}/>
                } else if(routeName === 'Search'){
                    return <Icon name='search1' type='antdesign' color = {tintColor} size = {20}/>
                } else if(routeName === 'Archive'){
                    return <Icon name='folder1' type='antdesign' color = {tintColor}size = {20} />
                } 
                else if(routeName === 'Point'){
                    return <Icon name='folder1' type='antdesign' color = {tintColor}size = {20} />
                } 
            }
    }),

    animationEnabled: true,
    swipeEnabled: true,
    tabBarPosition: "bottom",
    lazy: false,
    tabBarOptions: {
    showIcon: true,
    activeTintColor: "#1abc9c",
    inactiveTintColor: "black",
    style: {          
      height: 60,
      borderTopWidth: 0.5,
      borderTopColor: 'black',                      
  },      
    labelStyle: {
      fontSize: 10,
      marginBottom: 5
  },
  style: {
    backgroundColor: 'white',
  },
  indicatorStyle : {
    borderBottomColor: '#1abc9c',
    borderBottomWidth: 5,
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