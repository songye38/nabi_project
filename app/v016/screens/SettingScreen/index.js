import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Switch} from 'react-native-paper';
import LoginScreen from '../LoginScreen';
import ChangeName from '../../customComponents/ChangeName';
import ChangePwd from '../../customComponents/ChangePwd';
import CheckPwd from '../../customComponents/CheckPwd';
import Suggest from '../../customComponents/Suggest';

export default class SettingScreen extends Component{

    constructor(props){
        super(props);
        this.state = { 
            isLoading: true,
            isSwitchOn : false,
            userId : '5db7d2513c6cbc15d538be46',
            checkCurrentPwd : false,
        }
    }

    componentDidMount(){
        const userInfo = `https://songye.run.goorm.io/setting/getUserInfo/${this.state.userId}`;
        Promise.all([fetch(userInfo)])
          .then(([res1]) => { 
             return Promise.all([res1.json()]) 
          })
          .then(([res1]) => {
            this.setState({
                userDataset: res1.value,
                isSwitchOn : res1.value[0].push,
                isLoading : false,
            });
          });  
    }
    _updatePushState(state){
        fetch('https://songye.run.goorm.io/setting/push', {
          method: 'PUT',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_id : this.state.userId,
            user_push : !state
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
                this.setState({ isSwitchOn : !this.state.isSwitchOn });
            }
        })
    }

    _setNickname = (nickname) => {
        this.setState({isLoading : true}, function() {
              fetch('https://songye.run.goorm.io/setting/nickname', {
              method: 'PUT',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : this.state.userId,
                user_name : nickname
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
                }else {
                    this.setState({checkCurrentPwd : true})
                }
            })
        });
    }
    _updatePwd = (currentPwd,mode)=>{
        fetch('https://songye.run.goorm.io/setting/pwd', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                mode : mode,
                user_id : this.state.userId,
                user_pwd : currentPwd
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
                    if(mode=='reset'){
                        alert("비밀번호가 정상적으로 변경되었습니다.")
                    }else{
                        this.setState({checkCurrentPwd : true})
                    }
                }else{
                    alert("비밀번호가 일치하지 않습니다.")
                }
            })
    }
    _sendSuggest = (suggestion) =>{
        fetch('https://songye.run.goorm.io/setting/suggest', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : this.state.userId,
                content : suggestion
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
                    alert("정상적으로 전달되었습니다.")

                }
            })
    }

    _checkLogout(){
        Alert.alert(
            "Alert",
            "정말 로그아웃 하시겠습니까?",
            [
                {text: '취소', onPress: () => null},
                {text: '확인', onPress: this._logout.bind(this)},
            ],
            { cancelable: true }
        )
    }

    _logout(){
        const resetAction = StackActions.reset({
            index: 0,
            key: null,
            actions: [NavigationActions.navigate({ routeName: 'LoginScreen' })],
        });
        this.props.navigation.dispatch(resetAction);
    }

    _checkWithdraw = ()=>{
        Alert.alert(
        "Alert",
        "정말 탈퇴하시겠습니까? \n 탈퇴하면 모든 정보가 삭제됩니다.",
        [
            {text: 'ok', onPress:  () => this._withdraw()},
            {text: 'cancel', onPress: () => null},
        ],
        { cancelable: true }
        )

    }

    _withdraw = ()=>{
        fetch('https://songye.run.goorm.io/setting/withdraw', {
              method: 'POST',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                user_id : this.state.userId,
                user_status : 0
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
                    this._logout()
                }
            })

    }
    render(){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        return (
            <View style = {styles.container}>
                <View style= {styles.profileSection}>
                    <View style={styles.profileImg}>
                        <Avatar
                          size={100}
                          rounded
                          icon={{name: 'user', type: 'font-awesome'}}
                          onPress={() => console.log("Works!")}
                          activeOpacity={0.7}
                          showEditButton = {true}
                        />
                    </View>
                    <View style={{flexDirection : 'row',marginTop : wp(2)}}>
                        <Text style={styles.profileNameText}>{this.state.userDataset[0].name}</Text>
                        <ChangeName nickname = {this.state.userDataset[0].name} parentCallback = {this._setNickname}></ChangeName>
                    </View>
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.emailText}>
                        {this.state.userDataset[0].email}
                    </Text>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._checkLogout.bind(this)}>
                    <Text style={styles.logoutText}>로그아웃</Text>
                </TouchableOpacity>
                </View>
                <View style={styles.oneColumnSection}>
                    <CheckPwd checkCurrentPwdStatus = {this.state.checkCurrentPwd} checkPwdCallback = {this._updatePwd}></CheckPwd>
                    {this.state.checkCurrentPwd==true ?<ChangePwd checkPwdCallback = {this._updatePwd}></ChangePwd> : null }
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.pwdText}>
                        푸시 설정
                    </Text>
                    <Switch
                    value={this.state.isSwitchOn}
                    onValueChange={() =>{ 
                        this._updatePushState(this.state.userDataset[0].push) }
                    }
                  />
                </View>
                <View style={styles.twoColumnSection}>
                    <Suggest checkPwdCallback = {this._sendSuggest}></Suggest>
                </View>
                <TouchableHighlight style={styles.twoColumnSection} onPress={() => this._checkWithdraw()}>
                    <Text style={styles.pwdText}>탈퇴하기</Text>
                </TouchableHighlight>
                <View style={styles.columnSection}>
                    <Text style={styles.titleText}>앱 정보</Text>
                    <Text style={styles.infoText}>버전</Text>
                    <Text style={styles.infoText}>개인정보처리방침</Text>
                    <Text style={styles.infoText}>이용약관</Text>
                    <Text style={styles.infoText}>오픈소스 라이센스</Text>
                </View>
            </View>

        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        alignItems : 'center',
    },
    profileSection : {
        width : wp('95%'),
        height : wp('40%'),
        alignItems : 'center',
    },
    profileImg : {
        paddingTop : wp('3.5'),
        paddingBottom : wp('3.5'),
    },
    profileNameText : {
        fontSize : wp(4),
        fontWeight : 'bold',
        paddingRight : wp(2),
    },
    twoColumnSection : {
        width : wp('95%'),
        height : wp('13%'),
        flexDirection : 'row',
        alignItems : 'center',
        justifyContent : 'space-between',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    emailText : {
        fontSize : wp(4),
    },
    logoutText : {
        fontSize : wp(4),
        textDecorationLine: 'underline'
    },
    oneColumnSection : {
        width : wp('95%'),
        height : wp('13%'),
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    pwdText : {
        fontSize : wp(4),
    },
    columnSection : {
        flex : 1,
        width : wp('95%'),
        justifyContent : 'space-between',
        paddingTop : wp(3),
        paddingBottom : wp(5),
    }, 
    titleText : {
        fontSize : wp(4),
    },
    infoText : {
        fontSize : wp(3.5),
    }
})