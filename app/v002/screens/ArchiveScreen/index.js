import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    ActivityIndicator,
    ActionSheetIOS
} from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class ArchiveScreen extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            userNo : 1
        }
    }

    componentDidMount() {
        const url1 = "https://nabii.run.goorm.io/actSearch/all/all/all/1";
        const url2 = "https://nabii.run.goorm.io/point/rank/1";
        Promise.all([fetch(url1), fetch(url2)])

          .then(([res1, res2]) => { 
             return Promise.all([res1.json(), res2.json()]) 
          })
          .then(([res1, res2]) => {
            console.log(res1.value);
            this.setState({
                isLoading : false,
                participateList : res1.value,
                userPointData : res2.value
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
            <View style={styles.container}>
                <View style={styles.searchSection}>
                    <View style={styles.searchIcon}>
                        <Icon name='search1' type='antdesign' size = {33}/>
                    </View>
                    <View style={styles.formArea}>
                        <TextInput
                            name = "keyword"
                            onChangeText = {this.handleChange}
                            style={styles.textForm}
                            placeholder={"검색어를 입력해주세요."}
                            onChangeText={(text) => {
                                this.setState({keyword: text})
                              }}
                            value={this.state.email}/>
                    </View>
                </View>
                <View style={styles.categorySection}>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 비대위</Text>
                        <Icon name='keyboard-arrow-down' type='materialIcons'/>
                    </View>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 활동</Text>
                        <Icon name='keyboard-arrow-down' type='materialIcons'/>
                    </View>
                    <View style = {styles.cagegoryItem}>
                        <Text style={styles.categoryTitle}>모든 기간</Text>
                        <Icon name='keyboard-arrow-down' type='materialIcons'/>
                    </View>
                </View>
                <View style={styles.listSection}>
                    <View style = {styles.listScrollSection}>
                        <ScrollView style={styles.listScrollContents} indicatorStyle = {'white'}>
                            {this.state.participateList.map((element, index) => {
                                     return (
                                        <View style = {styles.listContentSection}>
                                            <View style= {styles.listImg}></View>
                                            <View style={styles.listMainContent}>
                                               <View style = {styles.title}>
                                                    <Text style={styles.dateText}>{element[3]}</Text>
                                                </View>  
                                                <View style = {styles.explain}>
                                                    <Text style={styles.explainText}>{element[1]} 참여하였습니다</Text>
                                                </View>
                                            </View>
                                        </View>                             
                                    );
                                  })}
                        </ScrollView>
                    </View>
                </View>
                <View style={styles.pointSection}>
                    <Text style={styles.pointText}>
                    {this.state.userPointData[0][2]} 포인트
                    </Text>
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
        width : wp('100%'),
        height : wp('15%'),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
        flexDirection : 'row',
        alignItems : 'center',
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
        width : wp('33%'),
        height : wp('15'),
        alignItems : 'center',
        justifyContent : 'center',
        borderColor : 'gray',
        borderLeftWidth : wp(0.2),
    },
        listSection : {
        width : wp('95%'),
        flex : 1,
    },
    listScrollSection : {
        flex : 1,
    },
    listContentSection : {
        width : '100%',
        flex : 1,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : wp(3.5),
        paddingBottom : wp(3.5),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    }, 
    listImg : {
        height : wp('15'),
        width : wp('15%'),
        borderRadius : wp('15'),
        backgroundColor : '#eee',
    },
    listMainContent : {
        width : wp('57%'),
        marginLeft : wp('5'),
    },
    dateText : {
        fontSize : wp(3),
        paddingBottom : wp(1.7),
        fontWeight : 'bold',
    },
    explainText : {
        fontSize : wp(4.5),
        paddingBottom : wp(1.7),
    },
    pointSection : {
        width : wp('20'),
        height : wp('10'),
        position : 'absolute',
        right : 0,
        bottom : wp('3%'),
        backgroundColor : 'orange',
        justifyContent : 'center',
        alignItems : 'center',
    },
    pointText : {
        fontSize : 13,
        fontWeight: 'bold',
    }
})
