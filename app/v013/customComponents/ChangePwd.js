import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton,TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class ChangePwd extends React.Component {
  state = {
    visible: true,
    text: '',
    checkPwdStatus : this.props.checkCurrentPwdStatus,
  };

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _checkCurrentPwd = () => {
       this.setState({ visible: false});
       this.props.checkPwdCallback(this.state.text,"confirm");
  }

    _hideDialog = () => {
    this.setState({ visible: false });
  }

  render() {        
    return (
      <View>
        <TouchableHighlight onPress={this._showDialog}>
            <Text style ={{fontSize : wp(4)}}></Text>
        </TouchableHighlight>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>[2단계] 비밀번호 입력</Dialog.Title>
            <Dialog.ScrollArea>
                <View>
                    <TextInput
                    label='새로운 비밀번호를 입력해주세요.'
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