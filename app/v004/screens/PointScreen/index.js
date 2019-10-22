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
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';

export default class PointScreen extends Component{

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

    componentDidMount() {
        const url1 = "https://nabii.run.goorm.io/comSearch/all";
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
            console.log("point screen")
            console.log(this.state.commListData[0])
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
       return(
            <ScrollView>
                {this.state.commListData.map((element, index) => {
                    return (
                        <View key={index}>
                            <Text>{element[0]},{element[1]},{element[2]},{index}</Text>
                        </View>                             
                    );
                })}
            </ScrollView>
        )
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        paddingRight: wp('5%'),
        paddingLeft : wp('5%'),
        paddingTop : wp('5%'),
    }
})

