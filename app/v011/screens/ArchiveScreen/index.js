import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ActionSheetIOS,
    TouchableHighlight,
    Picker
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommMainScreen from '../CommMainScreen';
import CommOffAction from '../../customComponents/CommOffAction';
import CommOnAction from '../../customComponents/CommOnAction';
import CommTalk from '../../customComponents/CommTalk';
import CommShare from '../../customComponents/CommShare';
import ScrollableModal from '../../customComponents/ScrollableModal';
import DatePicker from '../../customComponents/datePicker';

import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')


export default class ArchiveScreen extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            userId : '5db7d2513c6cbc15d538be46',
            scrollModalStatus : false,
        }
    }

    static navigationOptions = {
        headerStyle: {
          // backgroundColor: '#f4511e',
          //Sets Header color
        },
        headerTintColor: 'white',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
  };

    componentDidMount() {
        const url1 = `https://songye.run.goorm.io/actSearch/all/all/all/${this.state.userId}`;
        const url2 = `https://songye.run.goorm.io/point/rank/${this.state.userId}`;
        Promise.all([fetch(url1), fetch(url2)])

          .then(([res1, res2]) => { 
             return Promise.all([res1.json(), res2.json()]) 
          })
          .then(([res1, res2]) => {
            this.setState({
                isLoading : false,
                participateList : res1.value,
                userPointData : res2.value
            });
          });
    }
    switchMessage(param){
      switch(param) {
        case 'join_comm':
          return '비대위에 가입하였습니다.';
        case 'del_comm':
            return '비대위 가입을 취소하였습니다.';
        case 'join_talk':
            return '대화에 댓글을 달았습니다.';
        case 'edit_talk':
            return '댓글을 수정하였습니다.';
        case 'del_talk':
            return '댓글을 삭제하였습니다.';
        case 'join_share':
            return '자료를 공유하였습니다.';
        case 'edit_share':
            return '자료를 수정하였습니다.';
        case 'del_share':
            return '자료를 삭제하였습니다.'
        case 'join_off':
            return '참석을 신청하였습니다.';
        case 'del_off':
            return "참석을 취소하였습니다."
      }
    }
    fotmattingDate(param){
        const date = dayjs(param)
        return date.format('YYYY년 MM월 DD일 dddd HH시 mm분')
    }

    navigateToCommMain(commId,commName){
        const { navigate } = this.props.navigation;
        return navigate('CommMainScreen',{
                  commName : commName,
                  commId : commId,
                })
    }
    navigateToAction(type,commId,actionId){
        const { navigate } = this.props.navigation;
        switch(type) {
        case 'join_comm':
          return navigate('CommMainScreen',{commId : commId})
        case 'del_comm':
            return navigate('CommMainScreen',{commId : commId})
        case 'join_talk':
            return navigate('CommTalk',{actionId : actionId,commId : commId})
        case 'edit_talk':
            return navigate('CommTalk',{actionId : actionId,commId : commId})
        case 'del_talk':
            return navigate('CommTalk',{actionId : actionId,commId : commId})
        case 'join_share':
            return navigate('CommShare',{actionId : actionId,commId : commId})
        case 'edit_share':
            return navigate('CommShare',{actionId : actionId,commId : commId})
        case 'del_share':
            return navigate('CommShare',{actionId : actionId,commId : commId})
        case 'join_off':
            return navigate('CommOffAction',{actionId : actionId,commId : commId})
        case 'del_off':
            return navigate('CommOffAction',{actionId : actionId,commId : commId})
      }
    }
    showCommModal(){
        return <ScrollableModal message = 'hi~'></ScrollableModal>
    }

    render(){
        const { navigate } = this.props.navigation;
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }

        return (
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <View style={styles.searchIcon}>
                        <Icon name='search1' type='antdesign' size = {33}/>
                    </View>
                    <View style={styles.formArea}>
                        <TextInput
                            name = "keyword"
                            onChangeText = {this.handleChange}
                            style={styles.textForm}
                            placeholder={"검색어를 입력해주세요."}
                            onChangeText={(text) => {
                                this.setState({keyword: text})
                              }}
                            value={this.state.email}/>
                    </View>
                </View>
                <View style={styles.categorySection}>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 비대위</Text>
                        <ScrollableModal title = "비대위 목록" underlayColor='white'></ScrollableModal>
                    </View>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 활동</Text>
                        <ScrollableModal title = "활동 종류" underlayColor='white'></ScrollableModal>
                    </View>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 기간</Text>
                        <Icon name='keyboard-arrow-down' type='materialIcons'/>
                    </View>
                </View>
                <View style={styles.listSection}>
                    <View style = {styles.listScrollSection}>
                        <ScrollView style={styles.listScrollContents} indicatorStyle = {'white'}>
                            {this.state.participateList.map((element, index) => {
                                     return (
                                        <View style = {styles.listContentSection} key={index}>
                                            <TouchableHighlight style= {styles.listImg} onPress={() => this.navigateToCommMain(element.pointList.comm_id.$oid,element.pointList.comm_name)} underlayColor='white'><Text></Text></TouchableHighlight>
                                            <View style={styles.listMainContent}>
                                               <View style = {styles.title}>
                                                    <Text style={styles.dateText}>{element.pointList.comm_name}</Text>
                                                </View>  
                                                <TouchableHighlight style = {styles.explain} onPress={() => this.navigateToAction(element.pointList.type,element.pointList.comm_id.$oid,element.pointList.action_id)} underlayColor='white'>
                                                    <Text style={styles.explainText}>
                                                        {this.switchMessage(element.pointList.type)}
                                                    </Text>
                                                </TouchableHighlight>
                                            </View>
                                        </View>                             
                                    );
                                  })}
                        </ScrollView>
                    </View>
                </View>
                <TouchableHighlight style={styles.pointSection} onPress={() => navigate('PointScreen')}>
                    <Text style={styles.pointText}>
                        {this.state.userPointData[0]['score']} 포인트
                    </Text>
                </TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        backgroundColor: 'white',
        alignItems : 'center',
    },
    searchSection : {
        width : wp('95%'),
        height : wp('20%'),
        justifyContent : 'center',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
    },
    categorySection : {
        width : wp('100%'),
        height : wp('15%'),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
        alignItems : 'center',
    },
    searchIcon : {
        alignItems : 'flex-start',
        justifyContent : 'center',
    },
    formArea : {
        width : wp('80%'),
        justifyContent : 'center',
        paddingLeft : wp('5'),
    }, 
    textForm : {
        fontSize : wp('5'),
    }, 
    cagegoryItem : {
        width : wp('33%'),
        height : wp('15'),
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : 'gray',
        borderLeftWidth : wp(0.2),
    },
    listSection : {
        width : wp('95%'),
        flex : 1,
    },
    listScrollSection : {
        flex : 1,
    },
    listContentSection : {
        width : '100%',
        flex : 1,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : wp(3.3),
        paddingBottom : wp(3.3),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    }, 
    listImg : {
        height : wp('15'),
        width : wp('15%'),
        borderRadius : wp('15'),
        backgroundColor : '#eee',
    },
    listMainContent : {
        width : wp('57%'),
        marginLeft : wp('5'),
        justifyContent : 'center',
    },
    dateText : {
        fontSize : wp(2.5),
        paddingBottom : wp(1.7),
        fontWeight : 'bold',
    },
    explainText : {
        fontSize : wp(5),
        paddingBottom : wp(1.7),
    },
    pointSection : {
        width : wp('20'),
        height : wp('10'),
        position : 'absolute',
        right : 0,
        bottom : wp('3%'),
        backgroundColor : 'orange',
        justifyContent : 'center',
        alignItems : 'center',
    },
    pointText : {
        fontSize : 13,
        fontWeight: 'bold',
    }
})
