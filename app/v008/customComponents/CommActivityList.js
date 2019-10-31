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
import { StackActions, NavigationActions } from 'react-navigation';
import ScrollableTabView, { DefaultTabBar, ScrollableTabBar } from 'react-native-scrollable-tab-view-forked'
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import CommOffAction from './CommOffAction';
import CommOnAction from './CommOnAction';
import CommTalk from './CommTalk';
import CommShare from './CommShare';


export default class CommActivityList extends Component{

    constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
        }
      }

      //<Text style={styles.titleText} numberOfLines={1}>{this.props.commName}</Text>
    componentWillReceiveProps(props) {
          this.setState({
            dataset: props.dataset,
            type : props.type,
            isLoading : false,
        }) 
      }
    setNavigateName(type,title,actionId,commId){
        const { navigate } = this.props.navigation;
        switch(type){
            case "press":
                return navigate('CommOffAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })
            case 'protest':
                return navigate('CommOffAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })
            case 'lawmake':
                return navigate('CommOnAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })
            case 'petition':
                return navigate('CommOnAction',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })
            case 'talk':
                return navigate('CommTalk',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })
            case 'share':
                return navigate('CommShare',{
                  actionId: actionId,
                  title : title,
                  commId : commId,
                })


        }

    }
    render(){
        if(this.state.isLoading && this.state.dataset!=''){
          return(
            <View style={{flex: 1, padding: 20}}>
              <ActivityIndicator/>
            </View>
          )
        }
        const { navigate } = this.props.navigation;
        return(
            <ScrollView>
            {this.state.dataset.map((element, index) => {
                 return (
                    <View style={styles.listMainContent} key={index}>
                        <View style = {styles.contentSection}>
                            <View style = {styles.categorySection}>
                                <Icon name='users' type='feather' size = {28}/>
                            </View>
                            <View style = {styles.textSection}>
                                <View style = {styles.subTextSection}>
                                    <Text style = {styles.subText}>{element.comm_name}</Text>
                                    <Text style = {styles.subText}>{element.day}</Text>
                                    <Text style = {styles.subText}>{element.time}</Text>
                                    <Text style = {styles.subText}>{element.loc}</Text>
                                </View>
                                <TouchableHighlight style = {styles.mainTextSection} onPress={() => this.setNavigateName(element.type,element.title,element._id.$oid,element.comm_id.$oid)} underlayColor='white'>
                                    <Text style = {{fontSize : wp('4')}} numberOfLines={1}>{element.title}</Text>
                                </TouchableHighlight>
                            </View>
                        </View>  
                    </View>                             
                );
              })}         
            </ScrollView>

            )
}
}

const styles = StyleSheet.create({ 
    listMainContent : {
        width : '95%',
        flex : 1,
        backgroundColor : 'white',
        flexDirection : 'row',
        alignItems : 'center',
        paddingTop : wp(5),
        paddingBottom : wp(5),
        borderBottomWidth : wp('0.2'),
        borderBottomColor : '#eee',
    },
    contentSection : {
        width : wp('100%'),
        height : wp('10'),
        flexDirection : 'row',
    },
    categorySection : {
        width : wp('20%'),
        justifyContent : 'center',
        alignItems : 'center',
    },
    textSection : {
        flex : 1,
    }, 
    subTextSection : {
        flexDirection : 'row',
        marginBottom : wp('2'),
    },
    subText : {
        fontSize : wp('3'),
        paddingRight : wp('1.5'), 
        fontWeight : 'bold'
    }
})
