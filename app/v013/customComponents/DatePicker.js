import React, {Component} from 'react';
import {
  Text,
  StyleSheet,
  ScrollView,
  View,
  TouchableHighlight
} from 'react-native';
import {Calendar} from 'react-native-calendars';
import { Modal, Portal, Button, Provider,Dialog,RadioButton } from 'react-native-paper';
import {LocaleConfig} from 'react-native-calendars';
import { Icon } from 'react-native-elements';
import {widthPercentageToDP as wp, heightPercentageToDP as hp} from 'react-native-responsive-screen';


LocaleConfig.locales['ko'] = {
  monthNames: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  monthNamesShort: ['1월','2월','3월','4월','5월','6월','7월','8월','9월','10월','11월','12월'],
  dayNames: ['일요일','월요일','화요일','수요일','목요일','금요일','토요일'],
  dayNamesShort: ['일','월','화','수','목','금','토'],
  today: '오늘'
};
LocaleConfig.defaultLocale = 'ko';

export default class MyDatePicker extends Component {
  constructor(props) {
    super(props);
    this.state = {visible: false,selected : "all"};
    this.onDayPress = this.onDayPress.bind(this);
  }

  _showDialog = () => {
    this.setState({ visible: true });
  }

  _hideDialog = () => {
       this.setState({ visible: false});
       this.props.parentCallback(this.state.selected);
  }
  _resetDate = () => {
    this.setState({visible: false,selected: "all"}, function() {
            this.props.parentCallback(this.state.selected);
        });

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
            <Dialog.Title>날짜 선택</Dialog.Title>
            <Dialog.ScrollArea>
            <ScrollView contentContainerStyle={{ paddingHorizontal: 10 }}>
            <Calendar
                onDayPress={this.onDayPress}
                style={styles.calendar}
                hideExtraDays
                markedDates={{[this.state.selected]: {selected: true, disableTouchEvent: true, selectedDotColor: 'red'}}}
              />
            </ScrollView>
          </Dialog.ScrollArea>
            <Dialog.Actions>
              <Button onPress={this._resetDate}>초기화</Button>
              <Button onPress={this._hideDialog}>확인</Button>
            </Dialog.Actions>
          </Dialog>
        </Portal>
      </View>
    );
  }

  onDayPress(day) {
    this.setState({
      selected: day.dateString
    });
  }
}

const styles = StyleSheet.create({
  calendar: {
    borderTopWidth: 1,
    paddingTop: 5,
    borderBottomWidth: 1,
    borderColor: '#eee',
    height: 350
  },
  text: {
    textAlign: 'center',
    borderColor: '#bbb',
    padding: 10,
    backgroundColor: '#eee'
  },
  container: {
    flex: 1,
    backgroundColor: 'gray'
  },
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
});