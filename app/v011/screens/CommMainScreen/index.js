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
import { Button, Snackbar } from 'react-native-paper';
import { StackActions, NavigationActions } from 'react-navigation';


import MyRankScreen from '../MyRankScreen';
import PointHistoryScreen from '../PointHistoryScreen';
import PointStandardScreen from '../PointStandardScreen';
import CommActivityList from '../../customComponents/CommActivityList';
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')



export default class CommMainScreen extends Component{
  constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            userId : '5db7d2513c6cbc15d538be46',
            goingLen : 0,
            takeLen : 0,
            archiveLen : 0,
            visible : false,
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
        const comm = `https://songye.run.goorm.io/search/${commId}`;
        const join = `https://songye.run.goorm.io/searchJoinStatus/${commId}/${this.state.userId}`;

        Promise.all([fetch(onGoing), fetch(participate),fetch(archive),fetch(comm),fetch(join)])
          .then(([res1, res2,res3,res4,res5]) => { 
             return Promise.all([res1.json(), res2.json(),res3.json(),res4.json(),res5.json()]) 
          })
          .then(([res1, res2,res3,res4,res5]) => {
            this.setState({
                onGoingResult: res1.value,
                participateResult : res2.value,
                archiveResult : res3.value,
                commInfo : res4.value,
                joinStatus : res5.value,
                isLoading : false
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
    commAlert(commId,commName){
        if (this.state.joinStatus==0){
            Alert.alert(
            "Alert",
            "참여하시겠습니까?",
            [
                {text: 'ok', onPress:  () => this._joinOrDelComm(commId,commName)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }else {
            Alert.alert(
            "Alert",
            "취소하시겠습니까??",
            [
                {text: 'ok', onPress:  () => this._joinOrDelComm(commId,commName)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }
    }
    _joinOrDelComm(commId,commName){
        fetch("https://songye.run.goorm.io/comJoin", {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id: this.state.userId,
            comm_id : commId,
            comm_name : commName,
            comm_pic : "Null",
            user_status : this.state.joinStatus
          }),
        })
        .then(response => {
        if (response.status === 200) {
          responseJson = response.json();
          return responseJson;
        } else {
          throw new Error('Something went wrong on api server!');
        }
      })
        .then((responseJson) => {
            if(responseJson.result =='success'){
                this.setState({
                  joinStatus : !this.state.joinStatus,
                  visible: !this.state.visible,
                })
            }
        })
    }

    fotmattingDate(param){
        const date = dayjs(param)
        return date.format('YYYY년 MM월 DD일 dddd')
    }
    render(){
      if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
      const { navigation } = this.props;
        return(
          <View style={{flexDirection:'column',flex:1}}>
            <View style = {styles.infoSection}>
              <View style = {styles.infoCommImg}></View>
              <View style = {styles.mainContentSection}>
                  <View style = {{paddingBottom : wp('3.5')}}>
                    <Text style = {{fontSize:wp('5.5'), fontWeight : 'bold'}}>{this.state.commInfo[0].name}</Text>
                  </View>
                  <View>
                    <View>
                      <Text style = {{fontSize : wp('3'), paddingRight : wp('2')}}>참여인원 : {this.state.commInfo[0].count}</Text>
                    </View>
                    <View>
                      <Text style = {{fontSize : wp('3')}}>시작날짜 : {this.fotmattingDate(this.state.commInfo[0].date)}</Text>
                    </View>
                  </View>
                  <TouchableHighlight style = {this.state.joinStatus ==0 ? styles.notParticipateSection : styles.participateSection} onPress={() => this.commAlert(this.props.navigation.getParam('commId'),this.props.navigation.getParam('commName'))} underlayColor='white'>
                    <Text style = {{fontSize : wp('5'),fontWeight : 'bold'}}>{this.state.joinStatus==0 ? "참여하기" : "가입중"}</Text>
                  </TouchableHighlight>
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
                </ScrollableTabView>
            </View>
            <Snackbar
              visible={this.state.visible}
              onDismiss={() => this.setState({ visible: false })}
              action={{
                label: 'Ok!',
                onPress: () => {
                  // Do something
                },
              }}
            >
              비대위에 가입되었습니다.
        </Snackbar>
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
  notParticipateSection : {
    width : wp('35'),
    height : wp('10'),
    borderRadius : wp('8'),
    backgroundColor : 'white',
    marginTop : wp('5'),
    borderWidth : wp(0.3),
    borderColor : '#1abc9c',
    borderStyle : 'dotted',
    alignItems : 'center',
    justifyContent : 'center',
  },
  participateSection : {
    width : wp('35'),
    height : wp('10'),
    borderRadius : wp('8'),
    backgroundColor : 'white',
    marginTop : wp('5'),
    backgroundColor : '#1abc9c',
    alignItems : 'center',
    justifyContent : 'center',
  }
})

