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

export default class PointHistoryScreen extends Component{

    render(){
    
       return(
            <View style = {styles.container}>
                <View style = {styles.pointSection}>
                    <Text style = {styles.mainPointText}>
                        342 
                    </Text>
                    <Text style = {styles.subText}>
                        포인트
                    </Text>
                </View>
                <ScrollView style = {styles.historySection} indicatorStyle = {'white'}>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
                    <View style = {styles.listSection}>
                        <View style = {styles.commImg}></View>
                        <View style = {styles.textSection}>
                            <View style = {styles.dateSection} >
                                <Text style = {styles.dateText}>
                                    2019.08.08
                                </Text>
                            </View>
                            <View style = {styles.titleSection}>
                                <Text style = {styles.titleText}>
                                    비대위에 가입하였습니다.
                                </Text>
                            </View>
                        </View>
                        <View style = {styles.pointSection}>
                            <Text style = {styles.pointText}>
                                 +5
                            </Text>
                        </View>
                    </View>
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
    pointText : {
        color : '#1c6ced',
        fontWeight : 'bold',
        fontSize : wp(6.5),
    }
})

