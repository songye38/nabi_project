import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class CommOnAction extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
        }
      }

    static navigationOptions = ({ navigation }) => {
        return {
          title: navigation.getParam('title', '제목'),
          headerTintColor: 'black',
          headerTitleStyle: {
          fontWeight: 'bold',
        },
        };
      };

    componentDidMount(){
        let commId = this.props.navigation.getParam('commId');
        let actionId = this.props.navigation.getParam('actionId');
        const url = `https://songye.run.goorm.io/on/read/${commId}/${actionId}`;
        Promise.all([fetch(url)])
          .then(([res1]) => { 
             return Promise.all([res1.json()]) 
          })
          .then(([res1]) => {
            this.setState({
                dataset: res1.value,
                isLoading : false,
            });
          });  
    }

    render(){
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        return (
            <View style = {styles.container}>
                <ScrollView contentContainerStyle = {{alignItems : 'center'}} showsVerticalScrollIndicator={false}> 
                    <View style = {styles.titleSection}>
                        <Text style = {{fontSize : wp('5'), lineHeight : wp('9.5'),fontWeight : 'bold',textAlign : 'center'}}>{this.state.dataset[0].title}</Text>
                    </View>
                    <View style = {styles.contentSection}>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>신청기간</Text>
                            <Text style = {styles.rowText}>{this.state.dataset[0].start} ~ {this.state.dataset[0].end}</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>서명인원</Text>
                            <Text style = {styles.rowText}>{this.state.dataset[0].count}명</Text>
                        </View>
                        <View style = {{marginBottom : wp('4')}}>
                            <Text style = {styles.titleText}>목적</Text>
                            <Text style = {{lineHeight : wp('6')}}>{this.state.dataset[0].content}</Text>
                        </View>
                    </View>   
                </ScrollView>   
                <View style = {{alignItems : 'center'}}>
                    <TouchableHighlight style = {this.state.dataset[0].status === 0  ? styles.btnFalseSection : styles.btnSection} disabled = {this.state.dataset[0].status === 0 ? true : false} onPress={() => alert("참여 버튼 누름")} underlayColor='white'>
                            <Text style = {{fontSize : wp('6.5'),fontWeight : 'bold'}}>참여하기</Text>
                    </TouchableHighlight> 
                </View>
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
    btnFalseSection : {
        width : wp('85%'),
        height : wp('13%'),
        borderRadius : wp('8'),
        backgroundColor : 'gray',
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



