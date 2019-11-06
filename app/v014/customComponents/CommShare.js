import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableHighlight,
    TextInput,
    Image,
    ImageBackground,
    Button,
    ActivityIndicator
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class CommShare extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            keyword : 'all',
            modalVisible : false,
            userId : '5db7d2513c6cbc15d538be46',
            userName : '송이송이'
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
        const url = `https://songye.run.goorm.io/share/read/${commId}/${actionId}`;
        Promise.all([fetch(url)])
          .then(([res1]) => { 
             return Promise.all([res1.json()]) 
          })
          .then(([res1]) => {
            this.setState({
                dataset: res1.value,
                isLoading : false,
                commentStatus : res1.value[0].commentStatus,
            });
          });  
    }

    addComment(){
        fetch('https://songye.run.goorm.io/share/write', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
              share_id : this.props.navigation.getParam('actionId'),
              user_id : this.state.userId,
              user_name : this.state.userName,
              comm_id : this.props.navigation.getParam('commId'),
              comm_name :this.props.navigation.getParam('commName'),
              comm_pic : "Null",
              content : this.state.comment,
              img1:1238239283234,
              img2:2892839839823,
              img3:2983492849283,
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
                this.componentDidMount();
                this.setState({comment : ''})
            }
        })
    }

    showModal = () => {
    this.setState({
      modalVisible: true
    });
    setTimeout(() => {
      this.setState({
        modalVisible: false
      })
      }, 700);
  }

    renderModalContent = () => (
    <View style={styles.content}>
      <Text style={styles.contentTitle}>Hi 👋!</Text>
    </View>
  );


    render(){
        let comment;
        if(this.state.commentStatus === 1 ){
            comment =  <ScrollView style = {styles.commentSection} showsVerticalScrollIndicator={false}>
                {this.state.dataset.map((element, index) => {
                 return (
                    <View style = {styles.commentList} key = {index}>
                        <View style = {styles.profileSection}>
                            <View style = {styles.img}/>
                            <View style = {styles.name}><Text style = {{fontSize : wp('3'),fontWeight : 'bold'}}>송이송이</Text></View>
                        </View>
                        <View style = {styles.contentSection}>
                            <View style = {styles.subContent}>
                                <View style = {{paddingRight : wp('3'),flexDirection : 'row',alignItems : 'center'}}>
                                    <Icon name='heart' type='antdesign' size = {15} color = 'red'/>
                                    <Text style = {{fontSize : wp('3'),fontWeight : 'bold',color : 'red',paddingLeft : wp('1')}}>
                                        추천 13
                                    </Text>
                                </View>
                                <View><Text style = {{fontSize : wp('3'),fontWeight : 'bold',color : 'red'}}>new!</Text></View>
                            </View>
                            <View style = {styles.mainContent}>
                                <Text style = {{lineHeight : wp('5.5')}}>{element.userList.content}</Text>
                            </View>
                        </View>
                    </View>                            
                );
              })}      
            </ScrollView>
        }else{
            comment = <View><Text>아직 등록된 댓글이 없습니다.</Text></View>
        }
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        return (
            <View style = {styles.container}>
                <View style = {styles.titleSection}>
                    <View style = {{marginBottom : wp('3')}}>
                        <Text style = {{fontSize : wp('5'),fontWeight : 'bold'}}>제목</Text>
                    </View>
                    <ScrollView>
                        <Text style = {{lineHeight : wp('6.5'), fontSize : wp('4')}}>{this.state.dataset[0].title}</Text>
                    </ScrollView>
                </View>
                <View style = {styles.textInputSection}>
                    <TextInput
                        name = "keyword"
                        style = {{fontSize : wp('3.5'),paddingLeft : wp('3'),textAlign : 'auto'}}
                        placeholder={"댓글을 입력해주세요."}
                        onChangeText={(text) => {
                            this.setState({text: text})
                        }}
                        onSubmitEditing={()=>{
                            this.setState({comment : this.state.text})
                            this.addComment()
                    }} />
                </View>
                <View style = {styles.sortingSection}>
                    <View style = {{paddingRight : wp('7'),flexDirection : 'row',alignItems : 'center'}}>
                        <Text style = {{paddingRight : wp('1')}}>모든 글쓴이</Text>
                        <Icon name='down' type='antdesign' size = {15}/>
                    </View>
                    <View style = {{paddingRight : wp('7'),flexDirection : 'row',alignItems : 'center'}}>
                        <Text style = {{paddingRight : wp('1')}}>최신순</Text>
                        <Icon name='down' type='antdesign' size = {15}/>
                    </View>
                </View>
                    {comment}
                <Modal
                  isVisible={this.state.modalVisible == true}
                  onSwipeComplete={() => this.setState({modalVisible: false})}
                  swipeDirection={'up'}
                  style={styles.bottomModal}>
                  {this.renderModalContent()}
                </Modal>
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
    titleSection : {
        width : wp('85%'),
        marginBottom : wp('5'),
    },
    textInputSection : {
        width : wp('85%'),
        height : wp('13%'),
        borderRadius : wp('10'),
        borderColor : 'black',
        borderWidth : wp(0.2),
        marginBottom : wp('5'),
        justifyContent : 'center',
    },
    sortingSection : {        
        width : wp('95%'),
        height : wp('13%'),
        flexDirection : 'row',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        justifyContent : 'flex-end',
        alignItems : 'center',
    },
    commentSection : {
        width : wp('95%'),
        flex : 1,
    },
    commentList : {
        width : wp('95%'),
        flexDirection : 'row',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        paddingTop : wp('5'),
        paddingBottom : wp('5'),
    },
    profileSection : {
        width : wp('25%'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    contentSection : {
        width : wp('75%'),
        flex :1,
        paddingLeft : wp('5'),
    },
    img : {
        width : wp('15'),
        height : wp('15'),
        borderRadius : wp('15'),
        backgroundColor : '#eee',
        marginBottom : wp('2'),
    },
    mainContent : {
        flex : 1,
        paddingRight : wp('5'),
    },
    subContent : {
        flexDirection : 'row',
        marginBottom : wp('1.5'),
        alignItems : 'center'
    },
    imgSection :{
        flex : 1,
        flexDirection : 'row',
        marginTop : wp('3'),
    },
    content: {
    backgroundColor: 'white',
    padding: 22,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 4,
    borderColor: 'rgba(0, 0, 0, 0.1)',
  },
  contentTitle: {
    fontSize: 20,
    marginBottom: 10,
  },
  bottomModal: {
    justifyContent: 'flex-end',
    margin: 0,
  },
})



