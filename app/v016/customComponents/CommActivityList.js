import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommOffAction from './CommOffAction';
import CommOnAction from './CommOnAction';
import CommTalk from './CommTalk';
import CommShare from './CommShare';
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')


export default class CommActivityList extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            date : 'hi',
        }
      }
    componentDidMount() {
          this.setState({
            dataset: this.props.dataset,
            type : this.props.type,
            status : this.props.status,
        },function(){
            this._getTodayDate()
            this.setState({isLoading : false})
        });
      }
    _getTodayDate = ()=> {
      let date = new Date().getDate(); //Current Date
      let month = new Date().getMonth() + 1; //Current Month
      let year = new Date().getFullYear(); //Current Year
      this.setState({date : year+'-'+month+'-'+date},function(){
      })
    }
    setNavigateName(type,title,actionId,commId,commName){
        const { navigate } = this.props.navigation;
        switch(type){
            case "press":
                return navigate('CommOffAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })
            case 'protest':
                return navigate('CommOffAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })
            case 'lawmake':
                return navigate('CommOnAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })
            case 'petition':
                return navigate('CommOnAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })
            case 'talk':
                return navigate('CommTalk',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })
            case 'share':
                return navigate('CommShare',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                  commName : commName
                })


        }

    }
    renderIcon(type){
      switch(type){
            case "press":
                return <Icon name='map' type='feather' size = {20}/>
            case 'protest':
                return <Icon name='map' type='feather' size = {20}/>
            case 'lawmake':
                return <Icon name='link' type='feather' size = {20}/>
            case 'petition':
                return <Icon name='link' type='feather' size = {20}/>
            case 'talk':
                return <Icon name='message-circle' type='feather' size = {20}/>
            case 'share':
                return <Icon name='file-text' type='feather' size = {20}/>
        }

    }
    render(){
        if(this.state.isLoading && this.state.dataset!=''){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        const { navigate } = this.props.navigation;
        return(
            <ScrollView>
            {this.state.dataset.map((element, index) => {
              const targetDay = dayjs(element.end)
              const today = dayjs(this.state.date)
                 return (
                    <View style={styles.listMainContent} key={index}>
                        <View style = {styles.contentSection}>
                            <View style = {styles.categorySection}>
                                {this.renderIcon(element.type)}
                            </View>
                            <View style = {styles.textSection}>
                                <View style = {styles.subTextSection}>
                                    <Text style = {styles.subText}>신청기간 [{element.start} ~ {element.end}]</Text>
                                </View>
                                <TouchableHighlight style = {styles.mainTextSection} onPress={() => { this.state.status==1 ?this.setNavigateName(element.type,element.title,element._id.$oid,element.comm_id.$oid,element.comm_name) : alert("가입하지 않은 회원은 읽을 수 없습니다.")}} underlayColor='white'>
                                    <Text style = {{fontSize : wp('4.4')}} numberOfLines={1}>{element.title}</Text>
                                </TouchableHighlight>
                            </View>
                            <View style = {{width : wp('15%'),alignItems : 'center',justifyContent : 'center'}}>
                              <Text style = {{fontSize : wp('3.5'),fontWeight : 'bold',color:'red'}}>D-{targetDay.diff(today,'day')}</Text>
                            </View>
                        </View>  
                    </View>                             
                );
              })}         
            </ScrollView>

            )
}
}

const styles = StyleSheet.create({ 
    listMainContent : {
        width : '95%',
        flex : 1,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : wp(5),
        paddingBottom : wp(5),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    contentSection : {
        width : wp('100%'),
        height : wp('12'),
        flexDirection : 'row',
    },
    categorySection : {
        width : wp('15%'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textSection : {
        flex : 1,
        paddingRight : wp(10),
    }, 
    subTextSection : {
        flexDirection : 'row',
        marginBottom : wp('2'),
    },
    subText : {
        fontSize : wp(2.7),
        fontWeight : 'bold',
        color : '#a5abb5',
    }
})
