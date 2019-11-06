import * as React from 'react';
import { View ,TouchableHighlight,ScrollView,Text,StyleSheet} from 'react-native';
import { Button, Paragraph, Dialog, Portal,RadioButton } from 'react-native-paper';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';
import { Icon } from 'react-native-elements';

export default class ActTypeModal extends React.Component {

  constructor(props){
        super(props);
        this.state ={ 
            isLoading: true,
            visible: false,
            type : "all",
            typeTitle : '모든 활동',
        }
  }

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _hideDialog = (type) => {
       this.setState({ visible: false});
       this.props.parentCallback(this.state.type,this.state.typeTitle);
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
                      status={this.state.type === "all" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: "all"  , typeTitle : '모든 활동'}); }}
                    />
                    <Text style = {styles.title}>모든 활동</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="join_comm"
                      status={this.state.type === "join_comm" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'join_comm', typeTitle : '비대위 가입' }); }}
                    />
                    <Text style = {styles.title}>비대위 가입</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="del_comm"
                      status={this.state.type === "del_comm" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'del_comm', typeTitle : '비대위 탈퇴' }); }}
                    />
                    <Text style = {styles.title}>비대위 탈퇴</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="join_talk"
                      status={this.state.type === "join_talk" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'join_talk', typeTitle : '대화 참여' }); }}
                    />
                    <Text style = {styles.title}>대화 참여</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="edit_talk"
                      status={this.state.type === "edit_talk" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'edit_talk', typeTitle : '댓글 수정' }); }}
                    />
                    <Text style = {styles.title}>댓글 수정</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="del_talk"
                      status={this.state.type === "del_talk" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'del_talk', typeTitle : '댓글 삭제' }); }}
                    />
                    <Text style = {styles.title}>댓글 삭제</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="join_share"
                      status={this.state.type === "join_share" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'join_share' , typeTitle : '자료 공유'}); }}
                    />
                    <Text style = {styles.title}>자료 공유</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="edit_share"
                      status={this.state.type === "edit_share" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'edit_share', typeTitle : '자료 수정' }); }}
                    />
                    <Text style = {styles.title}>자료 수정</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="del_share"
                      status={this.state.type === "del_share" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'del_share', typeTitle : '자료 삭제' }); }}
                    />
                    <Text style = {styles.title}>자료 삭제</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="join_off"
                      status={this.state.type === "join_off" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'join_off', typeTitle : '모임 참여' }); }}
                    />
                    <Text style = {styles.title}>모임 참여</Text>
                </View>
                <View style = {styles.listSection}>
                    <RadioButton
                      value="del_off"
                      status={this.state.type === "del_off" ? 'checked' : 'unchecked'}
                      onPress={() => { this.setState({ type: 'del_off', typeTitle : '모임 참석 취소' }); }}
                    />
                    <Text style = {styles.title}>모임 참석 취소</Text>
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