import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton,TextInput } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class ChangeName extends React.Component {
  state = {
    visible: false,
    text: '',
    nickname : this.props.nickname,
  };

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _hideDialog = (type) => {
       this.setState({ visible: false});
       this.props.parentCallback(this.state.text==''? this.state.nickname : this.state.text);
  }

  render() {        
    return (
      <View>
        <TouchableHighlight onPress={this._showDialog}>
            <Text>수정</Text>
        </TouchableHighlight>
          <Portal>
          <Dialog
             visible={this.state.visible}
             onDismiss={this._hideDialog}>
            <Dialog.Title>닉네임 수정</Dialog.Title>
            <Dialog.ScrollArea>
                <View>
                    <TextInput
                    label={`현재 닉네임 : ${this.state.nickname}`}
                    value={this.state.text}
                    onChangeText={text => this.setState({ text })}
                  />
                </View>
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