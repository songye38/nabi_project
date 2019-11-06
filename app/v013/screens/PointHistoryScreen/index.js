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
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class PointHistoryScreen extends Component{

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount() {
        const url = "https://songye.run.goorm.io/point/rank/5db7d2513c6cbc15d538be46";
        Promise.all([fetch(url)])

          .then(([res]) => { 
             return Promise.all([res.json()]) 
          })
          .then(([res]) => {
            this.setState({
                isLoading : false,
                userPointData : res.value,
            });
          });
        }
    selectContent(type){
        switch(type) {
        case 'join_comm':
          return '비대위에 가입하였습니다.'
        case 'del_comm':
            return '비대위 가입을 취소하였습니다.'
        case 'join_talk':
            return '댓글을 달았습니다.'
        case 'edit_talk':
            return '댓글을 수정하였습니다.'
        case 'del_talk':
            return '댓글을 삭제하였습니다.'
        case 'join_share':
            return '자료를 공유하였습니다.'
        case 'edit_share':
            return '자료를 수정하였습니다.'
        case 'del_share':
            return '자료를 삭제하였습니다.'
        case 'join_off':
            return '모임에 참여하였습니다.'
        case 'del_off':
            return '모임을 취소하였습니다.'
      }

    }
    selectPoint(type){
        switch(type) {
        case 'join_comm':
          return '+10'
        case 'del_comm':
            return '-10'
        case 'join_talk':
            return '+3'
        case 'edit_talk':
            return "+0"
        case 'del_talk':
            return "-3"
        case 'join_share':
            return "+3"
        case 'edit_share':
            return "+0"
        case 'del_share':
            return "-3"
        case 'join_off':
            return "+5"
        case 'del_off':
            return "-5"
      }
    }
    selectColor(type){
        if (type=='join_comm' || type=='join_talk' || type=='join_share' || type=='join_off'){
            return 1;
        }
        else {
            return 0;
        }
    }
    render(){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
    
       return(
            <View style = {styles.container}>
                <View style = {styles.pointSection}>
                    <Text style = {styles.mainPointText}>
                        {this.state.userPointData[0].score}
                    </Text>
                    <Text style = {styles.subText}>
                        포인트
                    </Text>
                </View>
                <ScrollView style = {styles.historySection} indicatorStyle = {'white'}>
                    {this.state.userPointData[0].pointList.map((element, index) => {
                     return (
                        <View style = {styles.listSection} key = {index}>
                            <TouchableHighlight style = {styles.commImg} onPress={() => alert("clicked")} underlayColor='white'><Text></Text></TouchableHighlight>
                            <View style = {styles.textSection}>
                                <View style = {styles.dateSection} >
                                    <Text style = {styles.dateText}>
                                        {element.comm_name}
                                    </Text>
                                </View>
                                <View style = {styles.titleSection}>
                                    <Text style = {styles.titleText}>
                                        {this.selectContent(element.type)}
                                    </Text>
                                </View>
                            </View>
                            <View style = {styles.pointSection}>
                                <Text style = {this.selectColor(element.type)===1 ? styles.blue : styles.red}>
                                     {this.selectPoint(element.type)}
                                </Text>
                            </View>
                        </View>                            
                    );
                  })}
                </ScrollView>
            </View>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        paddingTop : wp('5%'),
    },
    pointSection : {
        height : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
    },
    mainPointText : {
        fontSize : wp('10'),
        color : 'orange',
        fontWeight : 'bold',
        paddingRight : wp('1'),
    },
    subText : {
        fontSize : wp('5.5'),
        color : 'black',
    },
    historySection : {
        flex : 1,
    },
    listSection : {
        height : wp('20'),
        flexDirection : 'row',
        backgroundColor : 'white',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        alignItems : 'center',
    },
    commImg : {
        width : wp('15'),
        height : wp('15'),
        borderRadius : wp('15'),
        backgroundColor : '#eee',
    },
    textSection : {
        flexDirection : 'column',
        width : wp('60'),
        marginLeft : wp('3'),
    }, 
    dateSection : {
        marginBottom : wp('1'),
    },
    dateText : {
        fontSize : wp('3'),
        fontWeight : 'bold',
    },
    titleText : {
        fontSize : wp('4.7'),
    },
    blue : {
        color : '#1c6ced',
        fontWeight : 'bold',
        fontSize : wp(6.5),
    },
    red :{
        color : 'red',
        fontWeight : 'bold',
        fontSize : wp(6.5),

    }
})

