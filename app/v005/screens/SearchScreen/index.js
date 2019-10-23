import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Picker,
    ActivityIndicator,
    TouchableHighlight,
    Alert
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CustomList from '../../customComponents/CustomList';
import CommActivityList from '../../customComponents/CommActivityList';
import HomeScreen from '../HomeScreen';
import dayjs from 'dayjs'
import 'dayjs/locale/ko'
dayjs.locale('ko')



export default class SearchScreen extends Component{
    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            keyword : 'all',
            title : '',
            userNo : 1,
            onTouchedIndex : 0
        }
    }

    static navigationOptions = {
        title: '검색',
        //Sets Header text of Status Bar
        headerStyle: {
          // backgroundColor: '#f4511e',
          //Sets Header color
        },
        headerTintColor: 'blak',
        //Sets Header text color
        headerTitleStyle: {
          fontWeight: 'bold',
          //Sets Header text style
        },
  };
    handlerCategoryTouch(selectedCategoryTitle,touchedIndex){
        this.setState({
            onTouchedIndex:touchedIndex,
            keyword: selectedCategoryTitle,
            title : selectedCategoryTitle == 'all' ? '' : selectedCategoryTitle
        }, function () {
            this.componentDidMount()
        });
    }
    componentDidMount() {
        const url1 = `https://nabii.run.goorm.io/comSearch/${this.state.keyword}`;
        const url2 = "https://nabii.run.goorm.io/categorySearch";
        Promise.all([fetch(url1), fetch(url2)])

          .then(([res1, res2]) => { 
             return Promise.all([res1.json(), res2.json()]) 
          })
          .then(([res1, res2]) => {
            this.setState({
                isLoading : false,
                commListData: res1.value,
                categoryListData : res2.value
            });
          });
    }
    _commJoin(commNo){
        fetch('https://nabii.run.goorm.io/comJoin', {
          method: 'POST',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_no: this.state.userNo,
            comm_no : commNo,
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
            }
        })
    }
    _commCancel(commNo){
        fetch('https://nabii.run.goorm.io/comJoinDel', {
          method: 'DELETE',
          headers: {
            Accept: 'application/json',
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            user_no: this.state.userNo,
            comm_no : commNo,
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
            }
        })
    }
    updateParticipate(status,commNo){
        if (status==0){
            Alert.alert(
            "Alert",
            "참여하시겠습니까?",
            [
                {text: 'ok', onPress:  () => this._commJoin(commNo)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }else {
            Alert.alert(
            "Alert",
            "취소하시겠습니까??",
            [
                {text: 'ok', onPress:  () => this._commCancel(commNo)},
                {text: 'cancel', onPress: () => null},
            ],
            { cancelable: true }
        )
        }
    }
    fotmattingDate(param){
        const date = dayjs(param)
        return date.format('YYYY년 MM월 DD일 dddd')
    }
    render(){
        const { navigate } = this.props.navigation;
        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        return (
            <View style={styles.container}>
            <View style={styles.searchSection}>
                <View style={styles.searchIcon}>
                    <Icon name='search1' type='antdesign' size = {33}/>
                </View>
                <View style={styles.formArea}>
                    <TextInput
                        name = "keyword"
                        style={styles.textForm}
                        placeholder={"검색어를 입력해주세요."}
                        onChangeText={(text) => {
                            this.setState({keyword: text})
                          }}
                        onSubmitEditing={()=>{
                            this.componentDidMount()
                            this.setState({title : this.state.keyword})
                            if(this.state.keyword==''){
                                this.componentDidMount()
                                this.setState({
                                    keyword : 'all',
                                    title : ''
                                })
                            }
                        }}  
                        value={this.state.title == '' ? '' : this.state.keyword}/>
                </View>
            </View>
            <View style={styles.categorySection}>
                <ScrollView style={styles.categoryList} horizontal = {true} indicatorStyle = {'white'}>
                    <TouchableHighlight style={this.state.onTouchedIndex === 0  ? styles.cagegoryItemTouched : styles.cagegoryItem} onPress={() => this.handlerCategoryTouch('all',0)} underlayColor='#eee'>
                        <Text style={styles.categoryTitle}>
                            모든목록
                        </Text>
                    </TouchableHighlight>
                    {this.state.categoryListData.map((element, index) => {
                        return (
                           <TouchableHighlight key={index} style={this.state.onTouchedIndex === index+1 ? styles.cagegoryItemTouched : styles.cagegoryItem} onPress={() => this.handlerCategoryTouch(element[0],(index+1))} underlayColor='#eee'>
                                <Text style={styles.categoryTitle}>
                                    {element[0]}
                                </Text>
                            </TouchableHighlight>                          
                        );
                    })}
                </ScrollView>
            </View>
            <View style={styles.listSection}>
                <View style = {styles.listSectionTitleView}>
                    <Text style={styles.listSectionTitle}>
                        {this.state.title == '' ? "모든 목록" : `키워드 : ${this.state.title}`}
                    </Text>
                </View>
                <View style = {styles.listScrollSection}>
                    <ScrollView style={styles.listScrollContents} indicatorStyle = {'white'}>
                    {this.state.commListData.map((element, index) => {
                                     return (
                                        <View style = {styles.listContentSection} key={index}>
                                            <TouchableHighlight style= {styles.listImg} onPress={() => navigate('CommMainScreen')}><Text></Text></TouchableHighlight>
                                            <CustomList
                                                commName = {element[1]}
                                                count = {element[2]}
                                                date = {this.fotmattingDate(element[3])}>
                                            </CustomList>
                                            <View style = {styles.participate}>
                                                {element[4] == 1 ? <TouchableHighlight onPress={() => this.updateParticipate(1,element[0])} underlayColor='#eee'><Icon name='checkcircle' type='antdesign' size = {30} color = '#46c3ad'/></TouchableHighlight>: <TouchableHighlight onPress={() => this.updateParticipate(0,element[0])} underlayColor='#eee'><Icon name='plus' type='antdesign' size = {30} color = '#46c3ad'/></TouchableHighlight> }
                                            </View>
                                        </View>                             
                                    );
                                  })}
                    </ScrollView>
                </View>
            </View>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        backgroundColor: 'white',
        alignItems : 'center',
    },
    searchSection : {
        width : wp('95%'),
        height : wp('20%'),
        justifyContent : 'center',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
    },
    categorySection : {
        width : wp('95%'),
        height : wp('20%'),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
        alignItems : 'center',
    },
    listSection : {
        width : wp('95%'),
        flex : 1,
    },
    searchIcon : {
        alignItems : 'flex-start',
        justifyContent : 'center',
    },
    formArea : {
        width : wp('80%'),
        justifyContent : 'center',
        paddingLeft : wp('5'),
    }, 
    textForm : {
        fontSize : wp('5'),
    }, 
    cagegoryItem : {
        width : wp('23'),
        height : wp('11'),
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : wp(2),
        borderColor : 'black',
        borderWidth : wp(0.2),
        marginLeft : wp(2.5),
        backgroundColor : 'white',
    },
    cagegoryItemTouched : {
        width : wp('23'),
        height : wp('11'),
        alignItems : 'center',
        justifyContent : 'center',
        borderRadius : wp(2),
        borderWidth : wp(0.2),
        marginLeft : wp(2.5),
        backgroundColor : '#1abc9c',
    },
    categoryTitle : {
        fontSize : wp(4),
    },
    listSectionTitleView : {
        marginTop : wp(5),
        marginLeft : wp(3),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    listSectionTitle : {
        fontSize: 25,
        fontWeight: 'bold',
        marginBottom : wp(5),
    }, 
    listScrollSection : {
        flex : 1,
    }, 
    listScrollContents : {
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
        // flexDirection : 'row',
        width : wp('57%'),
    },
    participate : {
        width : wp('20%'),
        paddingRight : wp('3'),
    },
    titleText : {
        fontSize : wp(4.5),
        fontWeight : 'bold',
        paddingBottom : wp(1.3),
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
    }
})
