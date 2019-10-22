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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { StackActions, NavigationActions } from 'react-navigation';

import MyRankScreen from '../MyRankScreen';
import PointHistoryScreen from '../PointHistoryScreen';
import PointStandardScreen from '../PointStandardScreen';

export default class PointScreen extends Component{

    static navigationOptions = {
        title: 'aaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaaa',
        //Sets Header text of Status Bar
        headerStyle: {
          // backgroundColor: '#f4511e',
          //Sets Header color
        },
        headerTintColor: 'black',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
  };

    render(){
        return(
          <View style={{flexDirection:'column',flex:1}}>
            <View style = {styles.infoSection}>
              <View style = {styles.infoCommImg}></View>
              <View style = {styles.mainContentSection}>
                  <View style = {{paddingBottom : wp('3.5')}}>
                    <Text style = {{fontSize:wp('5.5'), fontWeight : 'bold'}}>채용비리 근절 비대위</Text>
                  </View>
                  <View style = {{paddingBottom : wp('1')}}>
                   <Text>채용비리 근절을 위해 만들어진 비대위입니다.</Text>
                  </View>
                  <View style = {{flexDirection : 'row'}}>
                    <View>
                      <Text style = {{fontSize : wp('3'), paddingRight : wp('2')}}>참여인원 : 11,700</Text>
                    </View>
                    <View>
                      <Text style = {{fontSize : wp('3')}}>시작날짜 : 2019.08.03</Text>
                    </View>
                  </View>
                  <View style = {styles.participateSection}>
                    <Text style = {{fontSize : wp('4'),fontWeight : 'bold'}}>가입하기</Text>
                  </View>
              </View>
            </View>
            <View style={{flex:1}}>
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
                    initialPage={0}
                    >
                    <MyRankScreen key={'1'} tabLabel={'진행중(10)'} style={{flex:1,backgroundColor:'red'}}/>
                    <MyRankScreen key={'2'} tabLabel={'참여(30)'} style={{flex:1,backgroundColor:'red'}}/>
                    <MyRankScreen key={'3'} tabLabel={'아카이브(60)'} style={{flex:1,backgroundColor:'red'}}/>
                    <MyRankScreen key={'4'} tabLabel={'정보(2)'} style={{flex:1,backgroundColor:'red'}}/>
                </ScrollableTabView>
            </View>
          </View>
        )
    }
}


const styles = StyleSheet.create({
  infoSection : {
    height : wp('50%'),
    flexDirection : 'row',
    alignItems : 'center',
  },
  tabSection : {
    flex : 1,
  },
  tabStyle : {
  },
  scrollStyle: {
    // paddingRight: 30,
    justifyContent: 'space-between',
  },
  tabBarTextStyle: {
    fontSize: wp('3.3'),
    fontWeight: 'bold',
  },
  underlineStyle: {
    height: 1,
    backgroundColor: 'black',
  },
  infoCommImg : {
    width : wp('20%'),
    height : wp('20%'),
    borderRadius : wp('20%'),
    backgroundColor : '#eee',
    marginLeft : wp('5'),
  },
  mainContentSection : {
    width : wp('80%'),
    paddingLeft : wp('3'),
  },
  participateSection : {
    width : wp('23'),
    height : wp('8'),
    borderRadius : wp('5'),
    backgroundColor : 'white',
    marginTop : wp('5'),
    borderWidth : wp(0.3),
    borderColor : '#1abc9c',
    borderStyle : 'dotted',
    alignItems : 'center',
    justifyContent : 'center',
  }
})


 


