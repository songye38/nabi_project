import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TextInput,
    Picker,
} from 'react-native';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class SearchScreen extends Component{

    constructor(props) {
      super(props);
      this.state = {
        keyword: ''
      }
    }

    render(){
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
                            this.setState({email: text})
                          }}
                        value={this.state.email}/>
                </View>
            </View>
            <View style={styles.categorySection}>
                <ScrollView style={styles.categoryList} horizontal = {true} indicatorStyle = {'white'}>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                    <View style = {styles.cagegoryItem}><Text style={styles.categoryTitle}>모든목록</Text></View>
                </ScrollView>
            </View>
            <View style={styles.listSection}>
                <View style = {styles.listSectionTitleView}><Text style={styles.listSectionTitle}>모든목록</Text></View>
                <View style = {styles.listScrollSection}>
                    <ScrollView style={styles.listScrollContents} indicatorStyle = {'white'}>
                     <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>
                    <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>
                     <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>
                     <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>
                     <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>
                     <View style = {styles.listContentSection}>
                        <View style= {styles.listImg}></View>
                        <View style={styles.listMainContent}>
                            <View style = {styles.title}><Text style = {styles.titleText}>채용비리 근절 비대위</Text></View>
                            <View style = {styles.explain}><Text style = {styles.explainText}>채용비리 근절을 위한 비대위입니다.</Text></View>
                            <View style={styles.listSubContent}>
                                <View style = {styles.count}><Text style = {styles.countText}>참여인원 : 11,700</Text></View>
                                <View style = {styles.startDay}><Text style = {styles.startDayText}>시작날짜 : 2019.05.03</Text></View>
                            </View>
                        </View>
                        <View style = {styles.participate}>
                            <Icon name='pluscircleo' type='antdesign' size = {30} color = '#46c3ad'/>
                        </View>
                     </View>


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
    categoryList : {


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
        paddingTop : wp(2.5),
        paddingBottom : wp(2.5),
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
        flexDirection : 'row',
    },
    participate : {
        width : wp('20%'),
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
        fontSize : wp(3),
        paddingRight : wp(1),
    },
    startDayText : {
        fontSize : wp(3),
    }
})
