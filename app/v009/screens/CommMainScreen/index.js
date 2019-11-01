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
import CommActivityList from '../../customComponents/CommActivityList';
export default class CommMainScreen extends Component{
  constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            userId : '5db7d2513c6cbc15d538be46',
            goingLen : 0,
            takeLen : 0,
            archiveLen : 0,
        }
    }
    static defaultProps = {
        commId : 'defaultValue',
      }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('commName', '제목'),
          headerTintColor: 'black',
          headerTitleStyle: {
          fontWeight: 'bold',
        },
        };
      };
  componentDidMount(){
        let commId = this.props.navigation.getParam('commId');
        const onGoing = `https://songye.run.goorm.io/${commId}/onGoing`;
        const participate = `https://songye.run.goorm.io/${commId}/participate/${this.state.userId}`;
        const archive = `https://songye.run.goorm.io/${commId}/archive/${this.state.userId}`;

        Promise.all([fetch(onGoing), fetch(participate),fetch(archive)])
          .then(([res1, res2,res3]) => { 
             return Promise.all([res1.json(), res2.json(),res3.json()]) 
          })
          .then(([res1, res2,res3]) => {
            this.setState({
                isLoading : false,
                onGoingResult: res1.value,
                participateResult : res2.value,
                archiveResult : res3.value
            });
            this.setState({
              goingLen : Object.keys(this.state.onGoingResult).length,
              takeLen : Object.keys(this.state.participateResult).length,
              archiveLen : Object.keys(this.state.archiveResult).length
            })
          });
    }
    setStateForTabChange(e){
      switch(e){
        case 0:
          this.setState({isSceneOneVisible : true});
        case 1:
          this.setState({isSceneTwoVisible : true});
        case 2:
          this.setState({isSceneThreeVisible : true});

      }

    }

    render(){
      const { navigation } = this.props;
        return(
          <View style={{flexDirection:'column',flex:1}}>
            <View style = {styles.infoSection}>
              <View style = {styles.infoCommImg}></View>
              <View style = {styles.mainContentSection}>
                  <View style = {{paddingBottom : wp('3.5')}}>
                    <Text style = {{fontSize:wp('5.5'), fontWeight : 'bold'}}>{JSON.stringify(navigation.getParam('commName', 'NO-ID'))}</Text>
                  </View>
                  <View style = {{paddingBottom : wp('1')}}>
                    <Text>채용비리 근절을 위해 만들어진 비대위입니다.</Text>
                  </View>
                  <View style = {{flexDirection : 'row'}}>
                    <View>
                      <Text style = {{fontSize : wp('3'), paddingRight : wp('2')}}>참여인원 : {JSON.stringify(navigation.getParam('commCount', 'NO-ID'))}</Text>
                    </View>
                    <View>
                      <Text style = {{fontSize : wp('3')}}>시작날짜 : {JSON.stringify(navigation.getParam('commDate', 'NO-ID'))}</Text>
                    </View>
                  </View>
                  <View style = {styles.participateSection}>
                    <Text style = {{fontSize : wp('4'),fontWeight : 'bold'}}>가입하기</Text>
                  </View>
              </View>
            </View>
            <View style={{flex:1}}>
                <ScrollableTabView
                    onChangeTab={(event)=>{this.setStateForTabChange(event.i)}}
                    renderTabBar={() => (
                      <ScrollableTabBar
                        style={styles.scrollStyle}
                        tabStyle={styles.tabStyle}
                      />
                    )}
                    tabBarTextStyle={styles.tabBarTextStyle}
                    tabBarInactiveTextColor={'black'}
                    tabBarActiveTextColor={'#1abc9c'}
                    tabBarUnderlineStyle={styles.underlineStyle}
                    initialPage={0}>
                      <CommActivityList dataset = {this.state.onGoingResult} key={'1'} tabLabel={`진행중 (${this.state.goingLen})`} style={{flex:1,backgroundColor:'red'}} navigation={this.props.navigation}  type ='ongoing' isActive={this.state.isSceneOneVisible}/>
                      <CommActivityList dataset = {this.state.participateResult} key={'2'} tabLabel={`참여 (${this.state.takeLen})`} style={{flex:1,backgroundColor:'red'}} navigation={this.props.navigation} type = 'take' isActive={this.state.isSceneTwoVisible}/>
                      <CommActivityList dataset = {this.state.archiveResult} key={'3'} tabLabel={`아카이브 (${this.state.archiveLen})`} style={{flex:1,backgroundColor:'red'}} navigation={this.props.navigation} type = 'archive' isActive={this.state.isSceneThreeVisible}/>
                      <CommActivityList key={'4'} tabLabel={'정보(2)'} style={{flex:1,backgroundColor:'red'}} navigation={this.props.navigation}/>
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


 


