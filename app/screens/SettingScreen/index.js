import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    Alert,
    StyleSheet
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import { Icon, Avatar } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class SettingScreen extends Component{
    _navigate(){
        this.props.navigation.navigate('SomethingScreen');
    }

    _checkLogout(){
        Alert.alert(
            "Alert",
            "Are you sure?",
            [
                {text: 'ok', onPress: this._logout.bind(this)},
                {text: 'cancel', onPress: () => null},
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

    render(){
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
                    <View style={styles.profileName}>
                        <Text style={styles.profileNameText}>
                        초코송이  수정
                        </Text>
                    </View>
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.emailText}>
                        vsongyev@hanmail.net
                    </Text>
                    <Text style={styles.logoutText}>
                        로그아웃
                    </Text>
                </View>
                <View style={styles.oneColumnSection}>
                    <Text style={styles.pwdText}>
                        비밀번호 변경
                    </Text>
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.pwdText}>
                        푸시 설정
                    </Text>
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.pwdText}>
                        건의 & 불편신고
                    </Text>
                </View>
                <View style={styles.twoColumnSection}>
                    <Text style={styles.pwdText}>
                        탈퇴하기 
                    </Text>
                </View>
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