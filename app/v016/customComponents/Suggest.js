import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton,TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class Suggest extends React.Component {
  state = {
    visible: false,
    text: '',
  };

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _sendUserSuggest = () => {
       this.setState({ visible: false,text : ''});
       this.props.checkPwdCallback(this.state.text);
  }

    _hideDialog = () => {
    this.setState({ visible: false ,text : ''});
  }

  render() {        
    return (
      <View>
        <TouchableHighlight onPress={this._showDialog}>
            <Text style ={{fontSize : wp(4)}}>건의사항 작성</Text>
        </TouchableHighlight>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>건의사항</Dialog.Title>
            <Dialog.ScrollArea>
                <View>
                    <TextInput
                    multiline = {true}
                    numberOfLines={4}
                    label='건의사항을 자유롭게 적어주세요.'
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
          </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>취소</Button>
              <Button onPress={this._sendUserSuggest}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}