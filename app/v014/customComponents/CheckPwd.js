import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton,TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class CheckPwd extends React.Component {
  state = {
    visible: false,
    text: '',
  };

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _checkCurrentPwd = () => {
       this.setState({ visible: false,text : ''});
       this.props.checkPwdCallback(this.state.text,"confirm");
  }

    _hideDialog = () => {
    this.setState({ visible: false ,text : ''});
  }

  render() {        
    return (
      <View>
        <TouchableHighlight onPress={this._showDialog}>
            <Text style ={{fontSize : wp(4)}}>비밀번호 변경</Text>
        </TouchableHighlight>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>[1단계] 비밀번호 확인</Dialog.Title>
            <Dialog.ScrollArea>
                <View>
                    <TextInput
                    label='현재 비밀번호를 입력해주세요.'
                    secureTextEntry={true}
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
          </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this._hideDialog}>취소</Button>
              <Button onPress={this._checkCurrentPwd}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }
}