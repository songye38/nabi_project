import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class CustomList extends Component{

    static defaultProps = {
        commName: 'null',
        content: 'null',
        count: 0,
        date: 'null',
      }

    constructor(props){
        super(props);
      }

    render(){
        return (
            <View style={styles.listMainContent}>
               <View style = {styles.title}>
                    <Text style={styles.titleText} numberOfLines={1}>{this.props.commName}</Text>
                </View>  
                <View style = {styles.explain}>
                    <Text style={styles.explainText} numberOfLines={1}>{this.props.commName} 참여하였습니다</Text>
                </View>
                <View style={styles.listSubContent}>
                <View style = {styles.count}>
                    <Text style={styles.countText}>참여인원 : {this.props.count}</Text>
                </View>
                <View style = {styles.startDay}>
                    <Text style={styles.startDayText} numberOfLines={1}>시작날짜 : {this.props.date}</Text>
                </View>
            </View>
            </View>                            
        );
    }
}

const styles = StyleSheet.create({
    listSection : {
        width : wp('95%'),
        flex : 1,
    },  
    listContentSection : {
        width : '100%',
        flex : 1,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : wp(4.5),
        paddingBottom : wp(4.5),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    }, 
    listImg : {
        height : wp('20'),
        width : wp('20%'),
        borderRadius : wp('20'),
        backgroundColor : '#eee',
    },
    listMainContent : {
        width : wp('57%'),
        marginLeft : wp('3'),
    }, 
    listSubContent : {
        flexDirection : 'row',
        width : wp('57%'),
    }, 
    explainText : {
        fontSize : wp(3.5),
        paddingBottom : wp(1.7),
    },
    countText : {
        fontSize : wp(2.5),
        paddingRight : wp(1),
    },
    startDayText : {
        fontSize : wp(2.5),
        width : wp('100%'),
    },
        titleText : {
        fontSize : wp(4.5),
        fontWeight : 'bold',
        paddingBottom : wp(1.3),
    }
})
