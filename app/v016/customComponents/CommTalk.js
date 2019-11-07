import React, {Component} from 'react';
import { Icon } from 'react-native-elements';
import Swipeable from 'react-native-swipeable';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import {TextInput,Button } from 'react-native-paper';
import {View,Text,ScrollView,StyleSheet,TouchableHighlight,ActivityIndicator,TouchableOpacity,Alert,Keyboard} from 'react-native';
import ListAccordion from './ListAccordion';

export default class CommTalk extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            keyword : 'all',
            userId : '5db7d2513c6cbc15d538be46',
            userName : '송이송이',
            textInputStatus : false,
            userWriteStatus : false,
            updateMode : false,
        }
    }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', '제목'),
          headerTintColor: 'black',
          headerTitleStyle: {
          fontWeight: 'bold',
        },
        };
      };

    componentDidMount(){
        let commId = this.props.navigation.getParam('commId');
        let actionId = this.props.navigation.getParam('actionId');
        const url = `https://songye.run.goorm.io/talk/read/${commId}/${actionId}`;
        Promise.all([fetch(url)])
          .then(([res1]) => { 
             return Promise.all([res1.json()]) 
          })
          .then(([res1]) => {
            this.setState({
                dataset: res1.value,
                commentStatus : res1.value[0].commentStatus,
            }, function () {
                if(this.state.commentStatus==0){
                    this.setState({isLoading : false})
                }else{
                    this._checkUserWriteStatus();
                }
            });
          });  
    }

    addComment(){
        fetch('https://songye.run.goorm.io/talk/write', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              talk_id : this.props.navigation.getParam('actionId'),
              user_id : this.state.userId,
              user_name : this.state.userName,
              comm_id : this.props.navigation.getParam('commId'),
              comm_name :this.props.navigation.getParam('commName'),
              comm_pic : "Null",
              content : this.state.comment
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
                this.componentDidMount();
                this.setState({comment : ''})
            }
        })
    }
    _updateComment=()=>{
        fetch('https://songye.run.goorm.io/talk/update', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              talk_id : this.props.navigation.getParam('actionId'),
              user_id : this.state.userId,
              comm_id : this.props.navigation.getParam('commId'),
              comm_name :this.props.navigation.getParam('commName'),
              comm_pic : "Null",
              content : this.state.comment
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
                this.componentDidMount();
                this.setState({comment : '',updateMode : false})
                alert("정상적으로 수정되었습니다.")
            }
        })
    }

    _showComment = ()=>{
        this.setState({textInputStatus : true,userWriteStatus : false,text :this.state.userComment[0].userList[0].content,updateMode:true})
    }

    _checkDelete = ()=>{
        Alert.alert(
        "Alert",
        "정말 댓글을 삭제하시겠습니까?",
        [
            {text: 'ok', onPress:  () => this._delComment()},
            {text: 'cancel', onPress: () => null},
        ],
        { cancelable: true }
        )

    }
    _delComment = ()=>{
        fetch('https://songye.run.goorm.io/talk/delete', {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  talk_id : this.state.dataset[0]._id.$oid,
                  user_id : this.state.userId,
                  comm_id : this.state.dataset[0].comm_id.$oid,
                  comm_name :this.state.dataset[0].comm_name,
                  comm_pic : "Null",
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
                    this.componentDidMount()
                    this.setState({userWriteStatus : false})
                    alert("정상적으로 삭제되었습니다.");
                }
            })
    }
    _hideDialog = () => {
        this.setState({ textInputStatus: false});
        Keyboard.dismiss()
  }
   _sendCommentToServer = () => {
        this.setState({
            comment: this.state.text,
            text : "",
            textInputStatus : false,
        }, function () {
          if(this.state.updateMode==true){
            this._updateComment()
          }else{
            this.addComment()
          }
            Keyboard.dismiss()
    });
  }
   _checkUserWriteStatus= ()=>{
      const url = `https://songye.run.goorm.io/talk/listup/${this.state.dataset[0].comm_id.$oid}/${this.state.dataset[0]._id.$oid}/${this.state.userId}`;
      Promise.all([fetch(url)])
      .then(([res]) => { 
         return Promise.all([res.json()]) 
      })
      .then(([res]) => {
        if(res.status==1){
            this.setState({userWriteStatus : true,userComment : res.value,isLoading : false})
        }
      });

   }
    render(){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }

        let comment;
        const rightButtons = [
        <TouchableOpacity style={[styles.editRightSwipeItem]} onPress={() => this._showComment()}>
          <Text style={{paddingBottom : wp(2)}}>수정</Text>
          <Icon name='edit' type='feather' size = {40} color = '#4058de'/>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.delRightSwipeItem]} onPress={() => this._checkDelete()}>
          <Text style={{paddingBottom : wp(2)}}>삭제</Text>
          <Icon name='trash-2' type='feather' size = {40} color = '#f54842'/>
        </TouchableOpacity>
        ]
        const buttons = <View style = {{flexDirection : 'row',justifyContent : 'flex-end'}}>
                         <Button onPress={this._hideDialog}>취소</Button>
                         <Button onPress={this._sendCommentToServer}>완료</Button>
                      </View>
        const textInput = <View style = {this.state.textInputStatus == false ? styles.textInputSectionBottom : styles.textInputSectionTop}>
                    <TextInput
                        multiline = {true}
                        label='댓글을 입력해주세요.'
                        value={this.state.text}
                        onChangeText={(text) => {this.setState({text: text})}}
                        onFocus = {()=>{this.setState({textInputStatus : true})}}
                      />
                      {this.state.textInputStatus == true ? buttons : null}
                </View>
        if(this.state.commentStatus === 1 ){
            comment =  <ScrollView style = {styles.commentSection} showsVerticalScrollIndicator={false} scrollEnabled={!this.state.isSwiping}>
                {this.state.dataset.map((element, index) => {
                 return (
                    <Swipeable style = {styles.commentList} rightButtons = {element.userList.user_id.$oid==this.state.userId ? rightButtons : null} rightButtonWidth={wp('25%')} key = {index} onSwipeStart={() => this.setState({isSwiping: true})} onSwipeRelease={() => this.setState({isSwiping: false})}>
                        <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
                            <View style = {styles.profileSection}>
                                <View style = {styles.img}/>
                                <View style = {styles.name}><Text style = {{fontSize : wp('3'),fontWeight : 'bold'}}>송이송이</Text></View>
                            </View>
                            <View style = {styles.contentSection}>
                                <View style = {styles.subContent}>
                                    <View style = {{paddingRight : wp('3'),flexDirection : 'row',alignItems : 'center'}}>
                                        <Icon name='heart' type='antdesign' size = {15} color = 'red'/>
                                        <Text style = {{fontSize : wp('3'),fontWeight : 'bold',color : 'red',paddingLeft : wp('1')}}>
                                            추천 13
                                        </Text>
                                    </View>
                                    <View><Text style = {{fontSize : wp('3'),fontWeight : 'bold',color : 'red'}}>new!</Text></View>
                                </View>
                                <View style = {styles.mainContent}>
                                    <Text style = {{lineHeight : wp('5.5')}}>{element.userList.content}</Text>
                                </View>
                            </View>
                        </View>
                    </Swipeable>                            
                );
              })}      
            </ScrollView>
        }else{
            comment = <View style = {{position : 'absolute',top: wp('50%')}}><Text>아직 등록된 댓글이 없습니다.</Text></View>
        }
        return (
        <View style = {styles.container}>
            <View style = {styles.titleSection}>
                <View style = {{marginBottom : wp('3')}}>
                    <Text style = {{fontSize : wp('5'),fontWeight : 'bold'}}>제목</Text>
                </View>
                <ScrollView>
                    <Text style = {{lineHeight : wp('6.5'), fontSize : wp('4')}}>{this.state.dataset[0].title}</Text>
                </ScrollView>
            </View>
            <View style = {styles.sortingSection}>
                <View style = {{paddingRight : wp('10'),flexDirection : 'row',alignItems : 'center'}}>
                </View>
                <View style = {{paddingRight : wp('10'),flexDirection : 'row',alignItems : 'center'}}>
                </View>
            </View>
                {comment}
                {this.state.userWriteStatus == true ? null : textInput}
        </View>                        
        );
    }
}

const styles = StyleSheet.create({ 
    container : {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        paddingTop : wp('5%'),
        alignItems : 'center',
    },
    titleSection : {
        width : wp('85%'),
        marginBottom : wp('5'),
    },
    textInputSectionBottom : {
        width : wp('90%'),
        flex : 1,
        position : 'absolute',
        bottom : 0,
        marginBottom : wp('3'),
        justifyContent : 'center',
    },
    textInputSectionTop : {
        width : wp('90%'),
        flex : 1,
        position : 'absolute',
        top : wp('5'),
        justifyContent : 'center',
    },
    sortingSection : {        
        width : wp('95%'),
        height : wp('13%'),
        flexDirection : 'row',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        justifyContent : 'flex-end',
        alignItems : 'center',
    },
    commentSection : {
        width : wp('95%'),
        flex : 1,
        marginBottom : wp('20'),
    },
    commentList : {
        width : wp('95%'),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
        paddingTop : wp('5'),
        paddingBottom : wp('5'),
    },
    profileSection : {
        width : wp('25%'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    contentSection : {
        width : wp('75%'),
        flex :1,
        paddingLeft : wp('5'),
    },
    img : {
        width : wp('15'),
        height : wp('15'),
        borderRadius : wp('15'),
        backgroundColor : '#eee',
        marginBottom : wp('2'),
    },
    mainContent : {
        flex : 1,
        paddingRight : wp('5'),
    },
    subContent : {
        flexDirection : 'row',
        marginBottom : wp('1.5'),
        alignItems : 'center'
    },
    editRightSwipeItem: {
        width: wp('25%'),
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center',
        borderLeftWidth : wp('0.2'),
        borderLeftColor : '#eee',
        //backgroundColor : '#f7ef4d',
  },
  delRightSwipeItem: {
        width: wp('25%'),
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center',
        borderLeftWidth : wp('0.2'),
        borderLeftColor : '#eee',
        //backgroundColor : '#f54842',
  },
})



