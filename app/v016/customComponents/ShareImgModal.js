import React, { Component } from 'react'
import { AppRegistry, StyleSheet, Text, View,TouchableOpacity,Image } from 'react-native'
import { Icon } from 'react-native-elements';

import Swiper from 'react-native-swiper'


export default class ShareImgModal extends Component {

  _hideModal=()=>{
    this.props.parentCallback();
  }
  render() {
    return (
      <View style = {styles.container}>
        <TouchableOpacity style ={{alignItems : 'flex-end',paddingRight : '1%',paddingBottom : '1%'}} onPress={() => this._hideModal()}>
          <Icon name='closecircleo' type='antdesign' size = {20} color = 'black'/>
        </TouchableOpacity>
        <Swiper style={styles.wrapper} showsButtons={true}>
          <View style={styles.slide1}>
            <Image style={styles.avatar} source={{uri:this.props.img1}} />
          </View>
          <View style={styles.slide2}>
            <Image style={styles.avatar} source={{uri:this.props.img2}} />
          </View>
          <View style={styles.slide3}>
            <Image style={styles.avatar} source={{uri:this.props.img3}} />
          </View>
        </Swiper>
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container : {
    width : '100%',
    height : '80%',
    position : 'absolute',
    top:'7%',
  },
  wrapper: {
    backgroundColor : '#eee',
  },
  slide1: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide2: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  slide3: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    color: '#fff',
    fontSize: 30,
    fontWeight: 'bold'
  },
  avatar : {
    width : '100%',
    height : '100%',
  }
})
