import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet,TouchableOpacity} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class OptionModal extends React.Component {

  constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            visible: false,
            type : "all",
            typeTitle : '모든 글쓴이',
        }
  }

  _showDialog = () => {
    this.setState({ visible: true });
  }
  _justHideDialog=()=>{
    this.setState({ visible: false ,type : "all"});
  }

  _hideDialog = (type) => {
       this.setState({ visible: false});
       this.props.parentCallback("author",this.state.type);
  }

  render() {        
    return (
      <View>
        <TouchableOpacity onPress={this._showDialog} style = {{flexDirection : 'row',alignItems:'center'}}>
            <Text>{this.state.typeTitle}</Text>
            <Icon name='keyboard-arrow-down' type='materialIcons'/>
        </TouchableOpacity>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>Options</Dialog.Title>
            <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="all"
                      status={this.state.type === "all" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: "all"  , typeTitle : '모든 글쓴이'}); }}
                    />
                    <Text style = {styles.title}>모든 글쓴이 (기본)</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="mine"
                      status={this.state.type === "mine" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'mine', typeTitle : '내 댓글' }); }}
                    />
                    <Text style = {styles.title}>내 댓글</Text>
                </View>
            </ScrollView>
          </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this._justHideDialog}>취소</Button>
              <Button onPress={this._hideDialog}>확인</Button>
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