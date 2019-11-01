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
import Krunal from '../assets/test.jpg';


export default class CommShare extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            keyword : 'all',
            modalVisible : false,
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
            });
            console.log(this.state.dataset);
          });  
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
                            this.setState({keyword: text})
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
                <ScrollView 
                    style = {styles.commentSection}
                    showsVerticalScrollIndicator={false}>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => this.showModal()} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => this.showModal()} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => this.showModal()} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                    <View style = {styles.commentList}>
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
                                <Text style = {{lineHeight : wp('5.5')}}>대통령은 내란 또는 외환의 죄를 범한 경우를 제외하고는 재직중 형사상의 소추를 받지 아니한다. 모든 국민은 건강하고 쾌적한 환경에서 생활할 권리를 가지며, 국가와 국민은 환경보전을 위하여 노력하여야 한다. 대통령후보자가 1인일 때에는 그 득표수가 선거권자 총수의 3분의 1 이상이 아니면 대통령으로 당선될 수 없다.</Text>
                            </View>
                            <View style = {styles.imgSection}>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                                <ImageBackground style={{flex : 1,height: 50,marginRight : wp('3'),alignItems : 'center',justifyContent : 'center'}} source={{uri: 'https://facebook.github.io/react-native/img/tiny_logo.png'}} blurRadius  = {8}>
                                    <TouchableHighlight onPress={() => alert("hello")} underlayColor='#eee'>
                                        <Icon name='plus' type='antdesign' size = {25} color = 'orange'/>
                                    </TouchableHighlight>
                                </ImageBackground>
                            </View>
                        </View>
                    </View>
                </ScrollView>
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



