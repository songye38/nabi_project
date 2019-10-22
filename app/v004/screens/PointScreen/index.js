import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Picker,
    ActivityIndicator,
    TouchableHighlight,
    Alert
} from 'react-native';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'

import MyRankScreen from '../MyRankScreen';
import PointHistoryScreen from '../PointHistoryScreen';
import PointStandardScreen from '../PointStandardScreen';

export default class PointScreen extends Component{
    render(){
        return(
            <ScrollableTabView

        renderTabBar={() => (
          <ScrollableTabBar
            style={styles.scrollStyle}
            tabStyle={styles.tabStyle}
          />
        )}
        tabBarTextStyle={styles.tabBarTextStyle}
        tabBarInactiveTextColor={'black'}
        tabBarActiveTextColor={'black'}
        tabBarUnderlineStyle={styles.underlineStyle}
        initialPage={1}
      >

        <MyRankScreen key={'1'} tabLabel={'나의 순위'} style={{flex:1,backgroundColor:'white'}}/>
        <PointHistoryScreen key={'2'} tabLabel={'포인트 이력'} style={{flex:1,backgroundColor:'white'}}/>
        <PointStandardScreen key={'3'} tabLabel={'점수 및 기준'} style={{flex:1,backgroundColor:'white'}}/>
      </ScrollableTabView>
        )
    }
}

const styles = StyleSheet.create({
   tabStyle: {},
  scrollStyle: {
    backgroundColor: 'white',
    // paddingRight: 30,
    justifyContent: 'center',
  },
  tabBarTextStyle: {
    fontSize: 14,
    fontWeight: 'normal',
  },
  underlineStyle: {
    height: 1,
    backgroundColor: 'black',
    // width: 100,
  },
});
 
 // tabBarUnderlineStyle={styles.underlineStyle}

