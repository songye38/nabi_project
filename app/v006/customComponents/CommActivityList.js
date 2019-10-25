import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommOffAction from './CommOffAction';
import CommOnAction from './CommOnAction';
import CommTalk from './CommTalk';
import CommShare from './CommShare';


export default class CommActivityList extends Component{

    static defaultProps = {
        commName: 'null',
        content: 'null',
        count: 0,
        date: 'null',
      }

      //<Text style={styles.titleText} numberOfLines={1}>{this.props.commName}</Text>
    constructor(props){
        super(props);
      }

    render(){
        const { navigate } = this.props.navigation;
        return (
            <ScrollView>
                <View style={styles.listMainContent}>
                    <View style = {styles.contentSection}>
                        <View style = {styles.categorySection}>
                            <Icon name='users' type='feather' size = {28}/>
                        </View>
                        <View style = {styles.textSection}>
                            <View style = {styles.subTextSection}>
                                <Text style = {styles.subText}>기자회견</Text>
                                <Text style = {styles.subText}>2019.9.12 목요일</Text>
                                <Text style = {styles.subText}>오후 2시</Text>
                                <Text style = {styles.subText}>광화문</Text>
                            </View>
                            <TouchableHighlight style = {styles.mainTextSection} onPress={() => navigate('CommOffAction')} underlayColor='white'>
                                <Text style = {{fontSize : wp('4')}}>비대위 설립을 알리는 기자회견이 있습니다.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>  
                </View>    
                <View style={styles.listMainContent}>
                    <View style = {styles.contentSection}>
                        <View style = {styles.categorySection}>
                            <Icon name='message-circle' type='feather' size = {27}/>
                        </View>
                        <View style = {styles.textSection}>
                            <View style = {styles.subTextSection}>
                                <Text style = {styles.subText}>국민청원</Text>
                                <Text style = {styles.subText}>2019.9.12 목요일</Text>
                                <Text style = {styles.subText}>오후 2시</Text>
                                <Text style = {styles.subText}>광화문</Text>
                            </View>
                            <TouchableHighlight style = {styles.mainTextSection} onPress={() => navigate('CommOnAction')} underlayColor='white'>
                                <Text style = {{fontSize : wp('4')}}>비대위 설립을 알리는 기자회견이 있습니다.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>  
                </View> 
                <View style={styles.listMainContent}>
                    <View style = {styles.contentSection}>
                        <View style = {styles.categorySection}>
                            <Icon name='users' type='feather' size = {28} color = 'black'/>
                        </View>
                        <View style = {styles.textSection}>
                            <View style = {styles.subTextSection}>
                                <Text style = {styles.subText}>대화</Text>
                                <Text style = {styles.subText}>2019.9.12 목요일</Text>
                                <Text style = {styles.subText}>오후 2시</Text>
                                <Text style = {styles.subText}>광화문</Text>
                            </View>
                            <TouchableHighlight style = {styles.mainTextSection} onPress={() => navigate('CommTalk')} underlayColor='white'>
                                <Text style = {{fontSize : wp('4')}}>비대위 설립을 알리는 기자회견이 있습니다.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>  
                </View>   
                <View style={styles.listMainContent}>
                    <View style = {styles.contentSection}>
                        <View style = {styles.categorySection}>
                            <Icon name='users' type='feather' size = {28} color = 'black'/>
                        </View>
                        <View style = {styles.textSection}>
                            <View style = {styles.subTextSection}>
                                <Text style = {styles.subText}>자료공유</Text>
                                <Text style = {styles.subText}>2019.9.12 목요일</Text>
                                <Text style = {styles.subText}>오후 2시</Text>
                                <Text style = {styles.subText}>광화문</Text>
                            </View>
                            <TouchableHighlight style = {styles.mainTextSection} onPress={() => navigate('CommShare')} underlayColor='white'>
                                <Text style = {{fontSize : wp('4')}}>비대위 설립을 알리는 기자회견이 있습니다.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>  
                </View>  
                <View style={styles.listMainContent}>
                    <View style = {styles.contentSection}>
                        <View style = {styles.categorySection}>
                            <Icon name='users' type='feather' size = {28} color = 'black'/>
                        </View>
                        <View style = {styles.textSection}>
                            <View style = {styles.subTextSection}>
                                <Text style = {styles.subText}>기자회견</Text>
                                <Text style = {styles.subText}>2019.9.12 목요일</Text>
                                <Text style = {styles.subText}>오후 2시</Text>
                                <Text style = {styles.subText}>광화문</Text>
                            </View>
                            <TouchableHighlight style = {styles.mainTextSection} onPress={() => navigate('CommOffAction')} underlayColor='white'>
                                <Text style = {{fontSize : wp('4')}}>비대위 설립을 알리는 기자회견이 있습니다.</Text>
                            </TouchableHighlight>
                        </View>
                    </View>  
                </View>   
            </ScrollView>                           
        );
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
        height : wp('10'),
        flexDirection : 'row',
    },
    categorySection : {
        width : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textSection : {
        flex : 1,
    }, 
    subTextSection : {
        flexDirection : 'row',
        marginBottom : wp('2'),
    },
    subText : {
        fontSize : wp('3'),
        paddingRight : wp('1.5'), 
        fontWeight : 'bold'
    }
})
