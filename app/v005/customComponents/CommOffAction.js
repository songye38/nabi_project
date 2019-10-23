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


export default class CommOffAction extends Component{

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
                <ScrollView showsVerticalScrollIndicator={false}> 
                    <View style = {{marginBottom : wp('3')}}>
                        <View style = {{marginBottom : wp('4')}}>
                            <Text style = {styles.titleText}>목적</Text>
                            <Text style = {{numberOfLines : '3', lineHeight : wp('6')}}>대통령은 제1항과 제2항의 처분 또는 명령을 한 때에는 지체없이 국회에 보고하여 그 승인을 얻어야 한다. 국가는 주택개발정책등을 통하여 모든 국민이 쾌적한 주거생활을 할 수 있도록 노력하여야 한다. 헌법재판소는 법관의 자격을 가진 9인의 재판관으로 구성하며, 재판관은 대통령이 임명한다. 대통령·국무총리·국무위원·행정각부의 장·헌법재판소 재판관·법관·중앙선거관리위원회 위원·감사원장·감사위원 기타 법률이 정한 공무원이 그 직무집행에 있어서 헌법이나 법률을 위배한 때에는 국회는 탄핵의 소추를 의결할 수 있다.</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>신청기간</Text>
                            <Text style = {styles.rowText}>2019.08.03 ~ 2019.08.20</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>날짜와 시간</Text>
                            <Text style = {styles.rowText}>2019.09.07 오후 2시</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>장소</Text>
                            <Text style = {styles.rowText}>광화문광장</Text>
                        </View>
                    </View>  
                    <View style = {styles.mapSection}>
                    </View>     
                </ScrollView>   
                <TouchableHighlight style = {styles.btnSection} onPress={() => alert("참여 버튼 누름")} underlayColor='white'>
                        <Text style = {{fontSize : wp('6.5'),fontWeight : 'bold'}}>참여하기</Text>
                </TouchableHighlight> 
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
        alignItems : 'center',


    },
    titleText : {
        fontSize : wp('5'),
        fontWeight : 'bold',
        paddingBottom : wp('3'),
    },
    rowSection :{
        flexDirection : 'row',
        justifyContent : 'space-between',
        paddingBottom : wp('0.7'),
    },
    mapSection : {
        height : wp('65%'),
        backgroundColor : '#eee',
        marginBottom : wp('3'),
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
    }

})
