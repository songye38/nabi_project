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


export default class CommOffAction extends Component{

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
        const url = `https://songye.run.goorm.io/off/read/${commId}/${actionId}`;
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
                <ScrollView showsVerticalScrollIndicator={false}> 
                    <View style = {{marginBottom : wp('3')}}>
                        <View style = {{marginBottom : wp('4')}}>
                            <Text style = {styles.titleText}>목적</Text>
                            <Text style = {{lineHeight : wp('6')}}>{this.state.dataset[0].goal}</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>신청기간</Text>
                            <Text style = {styles.rowText}>{this.state.dataset[0].start} ~ {this.state.dataset[0].end}</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>날짜와 시간</Text>
                            <Text style = {styles.rowText}>{this.state.dataset[0].day} {this.state.dataset[0].time}</Text>
                        </View>
                        <View style = {styles.rowSection}>
                            <Text style = {styles.titleText}>장소</Text>
                            <Text style = {styles.rowText}>{this.state.dataset[0].loc}</Text>
                        </View>
                    </View>  
                    <View style = {styles.mapSection}>
                    </View>     
                </ScrollView>  
                <TouchableHighlight style={this.state.dataset[0].status === 0  ? styles.btnFalseSection : styles.btnSection} disabled = {this.state.dataset[0].status === 0 ? true : false} onPress={() => alert("참여 버튼 누름")} underlayColor='white'>
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

    }

})
