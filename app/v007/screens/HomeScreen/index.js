import React, {Component} from 'react';
import {
    View,
    Text,
    ScrollView,
    StyleSheet,
    TouchableOpacity,
    Button,
    ActivityIndicator,
    TouchableHighlight
} from 'react-native';
import { Icon } from 'react-native-elements';
import { StackActions, NavigationActions } from 'react-navigation';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


export default class HomeScreen extends Component{

    constructor(props){
        super(props);
        this.state ={ isLoading: true}
    }

    componentDidMount() {
        const url1 = "https://nabii.run.goorm.io/point/rank/1";
        const url2 = "https://nabii.run.goorm.io/main/1";
        Promise.all([fetch(url1), fetch(url2)])

          .then(([res1, res2]) => { 
             return Promise.all([res1.json(), res2.json()]) 
          })
          .then(([res1, res2]) => {
            this.setState({
                isLoading : false,
                userPointData : res1.value,
                commListData : res2.value,
            });
          });
    }

    // _navigate(){
    //     this.props.navigation.navigate('SearchScreen');
    // }

    render(){

        if(this.state.isLoading){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        const { navigate } = this.props.navigation;
        return (
            <View style={styles.container}>
                <View style={styles.title}><Text style = {styles.titleText}>가입</Text></View>
                <View style={{height: wp('35%'),paddingBottom: wp('5%')}}>
                <ScrollView style={styles.commList} horizontal={true} indicatorStyle = {'white'}>
                       {this.state.commListData.map((prop, index) => {
                         return (
                            <View style={styles.commImg_big} key={index}>
                                <Text style={styles.commTitle} numberOfLines={1}>{prop[1]}</Text>
                            </View>
                         );
                      })}
                       <TouchableHighlight style={styles.addButton} onPress={() => navigate('SearchScreen')} underlayColor='#eee'>
                            <Icon name='plus' type='antdesign' size = {30}/>
                       </TouchableHighlight>
            </ScrollView>
            </View>
            <View style={styles.title}><Text style = {styles.titleText}>최신 소식</Text></View>
            <View style = {{flex : 1}}>
                <ScrollView showsVerticalScrollIndicator={false}>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                    <View style={styles.contentsList}>
                            <View style={styles.commImg_small}></View>
                            <View style={styles.contents}>
                                <Text style ={styles.commTitle_column}>비대위이름</Text>
                                <Text style ={styles.contentsTitle}>설문조사를 진행하고 있습니다.</Text>
                            </View>
                    </View>
                </ScrollView>
            </View>
            <TouchableHighlight style={styles.pointBox} onPress={() => navigate('PointScreen')}><Text style={styles.pointText}>{this.state.userPointData[0][2]} 포인트</Text></TouchableHighlight>
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        paddingTop : wp('5%'),
    },
    commList: {
        width: wp('90%'),
        height : wp('10%'),
        paddingBottom: wp('1%'),
        flexDirection : 'row',

    },
    news: {
        flex : 1,
        marginBottom: wp('2%'),
        flexDirection : 'row',
    },
    commImg_big: {
        width : wp('20'),
        height : wp('20'),
        backgroundColor: "#eee",
        borderRadius : wp('20'),
        margin : wp('1.5'),
    },
    commImg_small: {
        width : wp('17'),
        height : wp('17'),
        backgroundColor: "#eee",
        borderRadius : wp('17'),
        margin : wp('1.5'),
    },
    title : {
        width : wp('90%'),
        height : wp('10%'),
        paddingBottom : wp('2%'),
    },
    titleText : {
        fontSize: 25,
        fontWeight: 'bold',
    },
    commTitle : {
        width : '100%',
        fontSize : 12,
        top : wp('23'),
        alignItems: 'center',
        justifyContent: 'center',
    },
    commTitle_column : {
        fontSize : 12,
        top: wp('2'),
        fontWeight: 'bold',
    },
    contentsTitle : {
        fontSize : 14,
        paddingTop : wp('4'),
        alignItems: 'center',
        justifyContent: 'center',

    },
    contentsList : {
        width : '90%',
        flexDirection : 'row',
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    contents : {
        width : wp('80'),
        alignItems : 'flex-start',
        justifyContent : 'center',
        paddingLeft : wp('3'),
    },
    pointBox : {
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
    },
    addButton : {
        width : wp('20'),
        height : wp('20'),
        borderRadius : wp('20'),
        margin : wp('1.5'),
        borderWidth : wp(0.6),
        borderColor : 'black',
        alignItems : 'center',
        justifyContent : 'center',
        borderStyle : 'dotted',

    }
})


