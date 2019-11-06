import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    ActivityIndicator,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Button, Snackbar } from 'react-native-paper';


export default class CommOffAction extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            userId : '5db7d2513c6cbc15d538be46',
            visible : false,
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
        const status = `https://songye.run.goorm.io/off/readStatus/${actionId}/${this.state.userId}`;
        Promise.all([fetch(url),fetch(status)])
          .then(([res1,res2]) => { 
             return Promise.all([res1.json(),res2.json()]) 
          })
          .then(([res1,res2]) => {
            this.setState({
                dataset: res1.value,
                joinStatus : res2.value,
                isLoading : false,
            });
          });  
    }
    setButtonStyle(actionStatus,joinStatus){
        if(actionStatus==0){
            return styles.btnFalseSection
        }else if(joinStatus==1){
            return styles.completedSection
        }else{
            return styles.btnSection
        }

    }
    updateParticipate(status,offId,userId,commId,commName,pic){
        if (this.state.joinStatus==0){
            Alert.alert(
            "Alert",
            "참여하시겠습니까?",
            [
                {text: 'ok', onPress:  () => this._commJoinOrDel(status,offId,userId,commId,commName,pic)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }else {
            Alert.alert(
            "Alert",
            "취소하시겠습니까??",
            [
                {text: 'ok', onPress:  () => this._commJoinOrDel(status,offId,userId,commId,commName,pic)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }
    }
    _commJoinOrDel(status,offId,userId,commId,commName,pic){
        fetch('https://songye.run.goorm.io/off/write', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_status : status,
            offaction_id : offId,
            user_id : userId,
            comm_id : commId,
            comm_name :commName,
            comm_pic : pic
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
            if(responseJson.result =='success'){
                if(status==0){
                    this.setState({snackbarMsg : "참여가 등록되었습니다.",visible : true,joinStatus : !this.state.joinStatus})
                }else{
                    this.setState({snackbarMsg : "참여가 취소되었습니다.",visible : true,joinStatus : !this.state.joinStatus})
                }
            }
        })
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
                <TouchableHighlight style={this.setButtonStyle(this.state.dataset[0].status,this.state.joinStatus)} disabled = {this.state.dataset[0].status === 0 ? true : false} onPress={() => this.updateParticipate(this.state.joinStatus,this.state.dataset[0]._id.$oid,this.state.userId,this.state.dataset[0].comm_id.$oid,this.state.dataset[0].comm_name,"Null")} underlayColor='white'>
                        {this.state.joinStatus==0 ? <Text style = {{fontSize : wp('6.5'),fontWeight : 'bold'}}>참여하기</Text> : <Text style = {{fontSize : wp('6.5'),fontWeight : 'bold'}}>참여완료</Text>}
                </TouchableHighlight> 
                <Snackbar
                  visible={this.state.visible}
                  onDismiss={() => this.setState({ visible: false })}
                  action={{
                    label: 'Ok!',
                    onPress: () => {
                      // Do something
                    },
                  }}
                >
                  {this.state.snackbarMsg}
            </Snackbar>
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
    },
    completedSection : {
        width : wp('85%'),
        height : wp('13%'),
        borderRadius : wp('8'),
        backgroundColor : '#f2d94b',
        marginBottom : wp('5'),
        marginTop : wp('5'),
        justifyContent : 'center',
        alignItems : 'center',
    },

})
