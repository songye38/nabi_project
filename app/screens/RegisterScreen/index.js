import React, {Component} from 'react';
import {
    View,
    Text,
    TextInput,
    TouchableOpacity,
    StyleSheet,
    Alert
} from 'react-native';

import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class RegisterScreen extends Component{

    constructor(props) {
      super(props);
      this.state = {
        email: '',
        name : '',
        pwd: ''
      }
    }

    static navigationOptions = {
        header: null,
    };

    _navigate(){
        this.props.navigation.navigate('RegisterScreen');
    }

    _doLogin(){
        fetch('https://nabii.run.goorm.io/register', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            email: this.state.email,
            name : this.state.name,
            pwd: this.state.pwd,
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
        console.log(responseJson.result)
      if (responseJson.result=='fail'){
        Alert.alert(
            "Alert",
            "다른 아이디를 입력해주세요.",
            [
                {text: 'ok', onPress: () => null},
            ],
            { cancelable: false }
        )
      }
      else {
        this.props.navigation.replace('TabNavigator')
        Alert.alert(
            "Alert",
            "가입되었습니다!",
            [
                {text: 'ok', onPress: () => null},
            ],
            { cancelable: false }
        ) 
        this.props.navigation.navigate('LoginScreen');
      }
    })
    }

    render(){
        return (
            <View style={styles.container}>
                <View style={styles.titleArea}>
                    <Text style={styles.title}>회원가입</Text>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        name = "email"
                        onChangeText = {this.handleChange}
                        style={styles.textForm}
                        placeholder={"이메일 주소"}
                        onChangeText={(text) => {
                            this.setState({email: text})
                          }}
                        value={this.state.email}/>
                    <TextInput
                        name = "pwd"
                        secureTextEntry={true}
                        style={styles.textForm}
                        placeholder={"비밀번호"}
                        onChangeText={(text) => {
                            this.setState({pwd: text})
                          }}
                        value={this.state.pwd}/>
                    <TextInput
                        name = "name"
                        onChangeText = {this.handleChange}
                        style={styles.textForm}
                        placeholder={"닉네임"}
                        onChangeText={(text) => {
                            this.setState({name: text})
                          }}
                        value={this.state.name}/>
                </View>
                <View style={styles.buttonArea}>
                    <TouchableOpacity
                        style={styles.button}
                        onPress={this._doLogin.bind(this)}>
                        <Text style={styles.buttonTitle}>회원가입</Text>
                    </TouchableOpacity>
                </View>
                <View>
                    
                </View>
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
        marginBottom: 10,
        borderRadius : 5,
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
})
