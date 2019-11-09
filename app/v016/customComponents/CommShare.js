import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    ActivityIndicator,
    TouchableOpacity,
    Alert,
    Keyboard,
    Image,
    ImageBackground
} from 'react-native';
import { Icon } from 'react-native-elements';
import Modal from 'react-native-modal';
import Swipeable from 'react-native-swipeable';
import {TextInput,Button,Dialog,Portal,Paragraph } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import ImagePicker from 'react-native-image-picker';
import OptionModal from './OptionModal';
import ShareImgModal from './ShareImgModal';

export default class CommShare extends Component{

    state = {
        img1 : null,
        img2 : null,
        img3 : null,
    };

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            keyword : 'all',
            modalVisible : false,
            userId : '5db7d2513c6cbc15d538be46',
            userName : '송이송이',
            textInputStatus : false,
            text : '',
            authorOption : 'all',
            dateOption : 'latest',
            showModalStatus : false,

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

    selectPhotoTapped(index){
      const options = {
        quality: 1.0,
        maxWidth: 300,
        maxHeight: 300,
        index : index,
        storageOptions: {
          skipBackup: true,
        },
      };

      ImagePicker.showImagePicker(options,(response) => {
        //console.log('Response = ', response);

        if (response.didCancel) {
          //console.log('User cancelled photo picker');
        } else if (response.error) {
          //console.log('ImagePicker Error: ', response.error);
        } else if (response.customButton) {
          //console.log('User tapped custom button: ', response.customButton);
        } else {
          //let source = {uri: response.uri};

          // You can also display the image using data:
          let source = { uri: 'data:image/jpeg;base64,'+response.data};

          if(options.index==0){
            this.setState({img1 : source});
          }else if(options.index==1){
            this.setState({img2 : source});
          }else{
            this.setState({img3 : source});
          }
        }
      });
  }

    addComment(){
      console.log("this.state.text")
      console.log(this.state.text)
        fetch('https://songye.run.goorm.io/share/write', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          //body: formdata
          body: JSON.stringify({
              share_id : this.props.navigation.getParam('actionId'),
              user_id : this.state.userId,
              user_name : this.state.userName,
              comm_id : this.props.navigation.getParam('commId'),
              comm_name :this.props.navigation.getParam('commName'),
              comm_pic : "Null",
              content : this.state.text,
              img1:this.state.img1,
              img2:this.state.img2,
              img3:this.state.img3,
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
                this.setState({comment : '',img1 : null,img2:null,img3:null})
                alert("댓글이 정상적으로 등록되었습니다.");
            }else if(responseJson.result =='fail'){
              alert("댓글이 입력되지 않았습니다.");
            }
        })
    }

  //   showModal = () => {
  //   this.setState({
  //     modalVisible: true
  //   });
  //   setTimeout(() => {
  //     this.setState({
  //       modalVisible: false
  //     })
  //     }, 700);
  // }

  _hideDialog = () => {
        this.setState({ textInputStatus: false,text : ''});
        Keyboard.dismiss()
  }
  _sendDialog = () => {
      if(this.state.text==''){
        alert("댓글을 입력해주세요.")
      }
      if(this.state.text!=''){
        this.addComment();
        this.setState({ textInputStatus: false,text : ''});
        Keyboard.dismiss()
      }
  }

  _hideModal=()=>{
     this.setState({ showModalStatus: false});
  }
  _showModal=(index,img1,img2,img3)=>{
     this.setState({ showModalStatus: true,userSelectImg1 : });
  }
  _updateSortOption=(type,option)=>{
    if(type=='author'){
        this.setState({authorOption : option})
    }else {
      this.setState({dateOption : option})
    }

  }

    renderModalContent = () => (
        <View style={styles.content}>
          <Text style={styles.contentTitle}>Hi 👋!</Text>
        </View>
  );
    _checkDelete = ()=>{
        Alert.alert(
        "Alert",
        "정말 댓글을 삭제하시겠습니까?",
        [
            {text: 'ok', onPress:  () => this._delComment()},
            {text: 'cancel', onPress: () => null},
        ],
        { cancelable: true }
        )

    }
    _delComment = ()=>{
        fetch('https://songye.run.goorm.io/share/delete', {
              method: 'DELETE',
              headers: {
                Accept: 'application/json',
                'Content-Type': 'application/json',
              },
              body: JSON.stringify({
                  share_id : this.state.dataset[0]._id.$oid,
                  user_id : this.state.userId,
                  comm_id : this.state.dataset[0].comm_id.$oid,
                  comm_name :this.state.dataset[0].comm_name,
                  comm_pic : "Null",
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
                    this.componentDidMount()
                    this.setState({userWriteStatus : false})
                    alert("정상적으로 삭제되었습니다.");
                }
            })
    }


    render(){
        let comment;
        const rightButtons = [
        <TouchableOpacity style={[styles.editRightSwipeItem]} onPress={() => this._showComment()}>
          <Text style={{paddingBottom : wp(2)}}>수정</Text>
          <Icon name='edit' type='feather' size = {40} color = '#4058de'/>
        </TouchableOpacity>,
        <TouchableOpacity style={[styles.delRightSwipeItem]} onPress={() => this._checkDelete()}>
          <Text style={{paddingBottom : wp(2)}}>삭제</Text>
          <Icon name='trash-2' type='feather' size = {40} color = '#f54842'/>
        </TouchableOpacity>
        ]
        const buttons = <View style = {{flexDirection : 'row',justifyContent : 'flex-end'}}>
                         <Button onPress={this._hideDialog}>취소</Button>
                         <Button onPress={this._sendCommentToServer}>완료</Button>
                      </View>
        const textInput = <View style = {this.state.textInputStatus == false ? styles.textInputSectionBottom : styles.textInputSectionTop}>
                    <TextInput
                        multiline = {true}
                        label='댓글을 입력해주세요.'
                        value={this.state.text}
                        onFocus = {()=>{this.setState({textInputStatus : true})}}
                      />
                      {this.state.textInputStatus == true ? buttons : null}
                </View>
        const textInputTop = <Portal>
          <Dialog
             visible={this.state.textInputStatus}
             onDismiss={this._hideDialog}>
            <Dialog.Title>자료공유</Dialog.Title>
            <Dialog.Content>
              <Paragraph>최소 1개의 이미지를 업로드 해주세요.</Paragraph>
            </Dialog.Content>
            <Dialog.ScrollArea>
                <View>
                    <TextInput
                    label='댓글을 입력해주세요.'
                    multiline = {true}
                    scrollEnabled = {true}
                    style = {{height : wp('20%')}}
                    value={this.state.text}
                    mode = 'outlined'
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
          </Dialog.ScrollArea>
          <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'space-between',height : wp('15')}}>
              <View style = {{flexDirection : 'row',marginLeft:wp('7')}}>
                <TouchableOpacity onPress={() => this.selectPhotoTapped(0)} style = {{paddingRight : wp('3'),justifyContent : 'center'}}>
                  {this.state.img1 == null ? <Icon name='file-upload' type='materialicons' size = {25} color = 'black'/> : <Image style={styles.avatar} source={this.state.img1} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectPhotoTapped(1)} style = {{paddingRight : wp('3'),justifyContent:'center'}}>
                  {this.state.img2 == null ? <Icon name='file-upload' type='materialicons' size = {25} color = 'black'/> : <Image style={styles.avatar} source={this.state.img2} />}
                </TouchableOpacity>
                <TouchableOpacity onPress={() => this.selectPhotoTapped(2)} style = {{paddingRight : wp('3'),justifyContent : 'center'}}>
                  {this.state.img3 == null ? <Icon name='file-upload' type='materialicons' size = {25} color = 'black'/> : <Image style={styles.avatar} source={this.state.img3} />}
                </TouchableOpacity>
              </View>
              <Dialog.Actions>
                  <Button onPress={this._hideDialog}>취소</Button>
                  <Button onPress={this._sendDialog}>확인</Button>
              </Dialog.Actions>
            </View>
          </Dialog>
        </Portal>
        if(this.state.commentStatus === 1 ){
            comment =  <ScrollView style = {styles.commentSection} showsVerticalScrollIndicator={false}>
                {this.state.dataset.map((element, index) => {
                 return (
                    <Swipeable style = {styles.commentList} rightButtons = {element.userList.user_id.$oid==this.state.userId ? rightButtons : null} rightButtonWidth={wp('25%')} key = {index} onSwipeStart={() => this.setState({isSwiping: true})} onSwipeRelease={() => this.setState({isSwiping: false})}>
                        <View style = {{flexDirection : 'row',alignItems : 'center',justifyContent : 'center'}}>
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
                                <View style = {{flexDirection : 'row'}}>
                                      <TouchableOpacity onPress={() => this._showModal(0,element.userList.img1)}>
                                          <ImageBackground style={{width: wp('15'), height: wp('10'),marginRight: wp('3'),alignItems : 'center',justifyContent : 'center'}} source={element.userList.img1} blurRadius={15}>
                                            <Icon name='plus' type='antdesign' size = {30} color = '#1abc9c'/>
                                          </ImageBackground>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => this._showModal(1,element.userList.img2)}>
                                          <ImageBackground style={{width: wp('15'), height: wp('10'),marginRight: wp('3'),alignItems : 'center',justifyContent : 'center'}} source={element.userList.img2} blurRadius={15}>
                                            <Icon name='plus' type='antdesign' size = {30} color = '#1abc9c'/>
                                          </ImageBackground>
                                      </TouchableOpacity>
                                      <TouchableOpacity onPress={() => this._showModal(2,element.userList.img3)}>
                                          <ImageBackground style={{width: wp('15'), height: wp('10'),marginRight: wp('3'),alignItems : 'center',justifyContent : 'center'}} source={element.userList.img3} blurRadius={15}>
                                            <Icon name='plus' type='antdesign' size = {30} color = '#1abc9c'/>
                                          </ImageBackground>
                                      </TouchableOpacity>
                                </View>
                            </View>
                        </View>
                    </Swipeable>                            
                );
              })}      
            </ScrollView>
        }else{
            comment = <View style = {{position : 'absolute',top: wp('50%')}}><Text>아직 등록된 댓글이 없습니다.</Text></View>
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
                <View style = {styles.sortingSection}>
                    <View style = {{paddingRight : wp('7'),flexDirection : 'row',alignItems : 'center'}}>
                      <OptionModal parentCallback = {this._updateSortOption}></OptionModal>
                    </View>
                    <View style = {{paddingRight : wp('7'),flexDirection : 'row',alignItems : 'center'}}>
                        <Text style = {{paddingRight : wp('1')}}>최신순</Text>
                        <Icon name='down' type='antdesign' size = {15}/>
                    </View>
                </View>
                    {comment}
                    {this.state.showModalStatus==true ? <ShareImgModal parentCallback = {this._hideModal}></ShareImgModal> : null}
                    {this.state.textInputStatus == true ? textInputTop : textInput}
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
    textInputSectionBottom : {
        width : wp('90%'),
        flex : 1,
        position : 'absolute',
        bottom : wp('5'),
        marginBottom : wp('3'),
        justifyContent : 'center',
    },
    textInputSectionTop : {
        width : wp('90%'),
        flex : 1,
        position : 'absolute',
        top : wp('5'),
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
        marginBottom : wp('25'),
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
        marginBottom : wp('8'),
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
  editRightSwipeItem: {
        width: wp('25%'),
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center',
        borderLeftWidth : wp('0.2'),
        borderLeftColor : '#eee',
  },
  delRightSwipeItem: {
        width: wp('25%'),
        flex : 1,
        justifyContent: 'center',
        alignItems : 'center',
        borderLeftWidth : wp('0.2'),
        borderLeftColor : '#eee',
  },
  avatar: {
    borderRadius: wp('10'),
    width: wp('10'),
    height: wp('10'),
  },
})



