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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class PointStandardScreen extends Component{

    render(){
    
       return(
            <View style = {styles.container}>
                <View style = {styles.emptySection}>
                </View>
                <View style = {styles.historySection} indicatorStyle = {'white'}>
                    <View style = {styles.listSection}>
                        <View style = {styles.textSection}>
                            <View style = {styles.contentSection}>
                                <Text style = {styles.contentText}>
                                    새로운 비대위 가입
                                </Text>
                            </View>
                            <View style = {styles.pointSection}>
                                <Text style = {styles.pointText}>
                                    +10
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.textSection}>
                            <View style = {styles.contentSection}>
                                <Text style = {styles.contentText}>
                                    기자회견,국민청원,입법제안 참여
                                </Text>
                            </View>
                            <View style = {styles.pointSection}>
                                <Text style = {styles.pointText}>
                                    +5
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.textSection}>
                            <View style = {styles.contentSection}>
                                <Text style = {styles.contentText}>
                                    대화, 자료공유에 참여
                                </Text>
                            </View>
                            <View style = {styles.pointSection}>
                                <Text style = {styles.pointText}>
                                    +3
                                </Text>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.textSection}>
                            <View style = {styles.contentSection}>
                                <Text style = {styles.contentText}>
                                    다른 사람글에 좋아요 누르기
                                </Text>
                            </View>
                            <View style = {styles.pointSection}>
                                <Text style = {styles.pointText}>
                                    +1
                                </Text>
                            </View>
                        </View>
                    </View>
                </View>
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
    emptySection : {
        height : wp('30%'),
        justifyContent : 'center',
        alignItems : 'center',
        flexDirection : 'row',
    },
    historySection : {
        flex : 1,
    },
    listSection : {
        height : wp('15'),
        flexDirection : 'row',
        backgroundColor : 'white',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        alignItems : 'center',
    },
    textSection : {
        flexDirection : 'row',
        width : wp('60'),
        marginLeft : wp('3'),
    }, 
    contentText : {
        fontSize : wp('4,9'),
    }, 
    pointText : {
        fontSize : wp('5'),
        fontWeight : 'bold',
    },
    contentSection :  {
        width : wp('75%')
    },
    pointSection : {
        width : wp('25%')
    }
})


