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

export default class CommShare extends Component{

    static defaultProps = {
        commName: 'null',
        content: 'null',
        count: 0,
        date: 'null',
      }

      static navigationOptions = {
        title: '글 제목',
        //Sets Header text of Status Bar
        headerStyle: {
          // backgroundColor: '#f4511e',
          //Sets Header color
        },
        headerTintColor: 'black',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
  };
      //<Text style={styles.titleText} numberOfLines={1}>{this.props.commName}</Text>
    constructor(props){
        super(props);
      }

    render(){
        return (
            <View style = {styles.container}>
                <Text>나는 공유 페이지</Text>
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
    },
    titleSection : {
        flex : 1,
        width : wp('80'),
        marginBottom : wp('7'),
        paddingBottom : wp('7'),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    contentSection : {
        height : wp('100%'),
        width : wp('90%'),
    },
    btnSection : {
        width : wp('85%'),
        height : wp('13%'),
        borderRadius : wp('8'),
        backgroundColor : '#1abc9c',
        marginBottom : wp('5'),
        marginTop : wp('5'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    rowSection :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingBottom : wp('0.7'),
    },
    titleText : {
        fontSize : wp('5'),
        fontWeight : 'bold',
        paddingBottom : wp('3'),
    },
})



