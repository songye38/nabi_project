import React, {Component} from 'react';
import {
    View,
    Text,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import { TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class LoginScreen extends Component{

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        pwd: ''
      }
    }

    static navigationOptions = {
        // title: 'First Page',
        //Sets Header text of Status Bar
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


     _navigate(){
        this.props.navigation.navigate('RegisterScreen');
    }

    // static navigationOptions = {
    //     header: null,
    // };

    _doLogin(){
        this.props.navigation.replace('TabNavigator')
    //     fetch('https://songye.run.goorm.io/login', {
    //       method: 'POST',
    //       headers: {
    //         Accept: 'application/json',
    //         'Content-Type': 'application/json',
    //       },
    //       body: JSON.stringify({
    //         email: this.state.email,
    //         pwd: this.state.pwd,
    //       }),
    //     })
    //     .then(response => {
    //     if (response.status === 200) {
    //       responseJson = response.json();
    //       return responseJson;
    //     } else {
    //       throw new Error('Something went wrong on api server!');
    //     }
    //   })
    // .then((responseJson) => {
    //   if (responseJson.result=='fail'){
    //     Alert.alert(
    //         "Alert",
    //         "아이디, 비밀번호 중 일치하지 않는것이 있습니다.",
    //         [
    //             {text: 'ok', onPress: () => null},
    //         ],
    //         { cancelable: false }
    //     )
    //   }
    //   else {
    //     this.props.navigation.replace('TabNavigator')
    //     Alert.alert(
    //         "Alert",
    //         "로그인되었습니다!",
    //         [
    //             {text: 'ok', onPress: () => null},
    //         ],
    //         { cancelable: false }
    //     ) 
    //   }
    // })
    //   .then(response => {
    //     console.debug(response);
    //     // ...
    //   }).catch(error => {
    //     console.error(error);
    //   });
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>로그인</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        onChangeText = {this.handleChange}
                        label='이메일 주소'
                        value={this.state.text}
                        onChangeText={(text) => {this.setState({email: text})}}
                        value={this.state.email}
                        mode = 'outlined'
                        style = {{marginBottom : wp(2)}}
                      />
                      <TextInput
                        label='비밀번호'
                        value={this.state.text}
                        secureTextEntry={true}
                        onChangeText={(text) => {this.setState({pwd: text})}}
                        value={this.state.pwd}
                        mode = 'outlined'
                      />
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>Login</Text>
                    </TouchableOpacity>
                </View>
                <TouchableOpacity 
                    style={styles.wrapButton}
                    onPress={this._navigate.bind(this)}>
                    <Text>🏅 회원가입</Text>
                </TouchableOpacity>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: 'white',
        paddingLeft: wp('10%'),
        paddingRight: wp('10%'),
        justifyContent: 'center',
    },
    titleArea: {
        width: '100%',
        padding: wp('10%'),
        alignItems: 'center',
    },
    title: {
        fontSize: wp('10%'),
    },
    formArea: {
        width: '100%',
        paddingBottom: wp('10%'),
    },
    textForm: {
        borderWidth: 0.5,
        borderColor: '#888',
        width: '100%',
        height: hp('5%'),
        paddingLeft: 5,
        paddingRight: 5,
        marginBottom: 5,
    },
    buttonArea: {
        width: '100%',
        height: hp('5%'),
    },
    button: {
        backgroundColor: "#46c3ad",
        width: "100%",
        height: "100%",
        justifyContent: 'center',
        alignItems: 'center',
    },
    buttonTitle: {
        color: 'white',
    },
    wrapButton: {
        fontSize: wp('10%'),
        width: wp('50%'),
        height: hp('8%'),
        paddingTop : wp('8%'),
        justifyContent: 'center',
        borderColor: '#ccc',
    },
})
