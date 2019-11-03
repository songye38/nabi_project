import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class ScrollableModal extends React.Component {
  state = {
    visible: false,
    checked : "0",
  };

  _showDialog = () => this.setState({ visible: true });

  _hideDialog = () => this.setState({ visible: false});

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
            <ScrollView contentContainerStyle={{ paddingHorizontal: 30 }}>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="0"
                      status={this.state.checked === "0" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: "0" }); }}
                    />
                    <Text style = {styles.title}>모든 비대위</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="1"
                      status={this.state.checked === "1" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: '1' }); }}
                    />
                    <Text style = {styles.title}>사과 비대위</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="2"
                      status={this.state.checked === "2" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ checked: '2' }); }}
                    />
                    <Text style = {styles.title}>사과 비대위</Text>
                </View>


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
    title : {
        fontSize : wp(5),
        paddingLeft : wp(3.5),
    },
    listSection : {
        height : wp(15),
        width : '100%',
        flexDirection : 'row',
        alignItems : 'center',
        borderBottomWidth : 1,
        borderBottomColor : '#eee',
    }
})