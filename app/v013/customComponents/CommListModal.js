import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class CommListModal extends React.Component {

  constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            visible: false,
            commId : "all",
        }
  }

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _hideDialog = () => {
       this.setState({ visible: false});
       this.props.parentCallback(this.state.commId,this.state.commName);
  }

  render() {
    return (
      <View>
        <TouchableHighlight onPress={this._showDialog}>
            <Icon name='keyboard-arrow-down' type='materialIcons'/>
        </TouchableHighlight>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>{this.props.title}</Dialog.Title>
            <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                <View style = {styles.listSection}>
                      <RadioButton
                        value="all"
                        status={this.state.commId === "all" ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ commId: "all" ,commName : '모든 비대위'}); }}
                      />
                      <View style = {styles.titleSection}><Text style = {styles.title} numberOfLines = {1}>모든 비대위</Text></View>
                </View>
            {this.props.dataset.map((element, index) => {
                 return (
                    <View style = {styles.listSection} key = {index}>
                      <RadioButton
                        value={element._id.comm_id.$oid}
                        status={this.state.commId === element._id.comm_id.$oid ? 'checked' : 'unchecked'}
                        onPress={() => { this.setState({ commId: element._id.comm_id.$oid,commName : element._id.comm_name }); }}
                      />
                      <View style = {styles.titleSection}><Text style = {styles.title} numberOfLines = {1}>{element._id.comm_name}</Text></View>
                </View>                   
                );
              })}
            </ScrollView>
          </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>Ok!</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}


const styles = StyleSheet.create({
  titleSection : {
    width : wp('60%'),
  },
    title : {
        fontSize : wp(3.3),
        paddingLeft : wp(3.5),
    },
    listSection : {
        height : wp(10),
        width : wp('100%'),
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#eee',
    }
})