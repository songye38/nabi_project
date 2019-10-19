import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet
} from 'react-native';
import { Icon,input } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class PointScreen extends Component{
    render(){
        return (
            <Text>안녕 포인트 점수 궁금하니?</Text>
        );   
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        paddingTop : wp('5%'),
    }
})

