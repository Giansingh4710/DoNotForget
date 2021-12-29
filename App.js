import React, {useState, useReducer, useEffect} from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  FlatList,
  Button,
} from 'react-native';

import {Icon} from 'react-native-elements';
import AsyncStorage from '@react-native-async-storage/async-storage';

import {initialState, actions, reducer} from './state';
import GetInputModal from './components/getInputModal';
import ReminderItem from './components/eachReminer';
import PlusIconModal from './components/firstPlus';

import {
  showNotification,
  scheduledNotification,
  cancelAllNotification,
} from './notification';

const App = () => {
  const [state, dispatch] = useReducer(reducer, initialState);
  useEffect(() => {
    async function getData() {
      let theState;
      try {
        const theStringState = await AsyncStorage.getItem('state');
        if (theStringState !== null) {
          theState = JSON.parse(theStringState);
          console.log('got state that was previously saved');
          // console.log(theState);
        } else {
          console.log('there is nothing is state');
          theState = initialState;
        }
        cancelAllNotification();
        theState.allReminders.map(reminder => {
          scheduledNotification(
            reminder.title,
            reminder.body,
            reminder.repeat,
            reminder.id,
          );
        });
        dispatch(actions.setState(theState));
      } catch (error) {
        // Error retrieving data
        console.log(error);
      }
    }
    getData();
  }, []);

  if (state.allReminders.length === 0) {
    cancelAllNotification();
    return (
      <View style={styles.container}>
        <GetInputModal
          theVisible={state.showInputModal}
          dispatch={dispatch}
          actions={actions}
        />
        <PlusIconModal dispatch={dispatch} actions={actions} />
      </View>
    );
  }
  return (
    <View style={styles.container}>
      <GetInputModal
        theVisible={state.showInputModal}
        dispatch={dispatch}
        actions={actions}
      />
      <View style={styles.header}>
        <Text style={styles.headerText}>Your Reminders</Text>
      </View>
      <View style={styles.list}>
        <FlatList
          // style={styles.list}
          data={state.allReminders}
          keyExtractor={rem => rem.id}
          scrollEnabled
          renderItem={({item}) => {
            // console.log(item);
            const index = state.allReminders.indexOf(item);
            return (
              <ReminderItem
                dispatch={dispatch}
                actions={actions}
                // id={item.id}
                data={item}
                index={index}
              />
            );
          }}
        />
      </View>
      <View
        style={{
          // backgroundColor: "yellow",
          height: '20%',
          padding: '10%',
        }}></View>
      {state.showInputModal ? (
        <View />
      ) : (
        <View style={styles.lastRow}>
          <TouchableOpacity
            style={styles.cancel}
            onPress={() => {
              console.log('cancled all notifications');
              dispatch(actions.deleteAllReminders);
              cancelAllNotification();
            }}>
            <Icon
              // style={{ flex: 1 }}
              name="close-outline"
              type="ionicon"
              color="#7FFFD4"
              size={100}
              // onPress={() => {
              //   dispatch(actions.setInputModal);
              // }}
              // onLongPress={() => console.log("LON")}
            />
            <Text style={styles.bottomRowText}>Cancel all notifications</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() => {
              dispatch(actions.setInputModal);
            }}
            style={styles.icon}>
            <Icon
              // style={{ flex: 1 }}
              name="add-outline"
              type="ionicon"
              color="#7FFFD4"
              size={100}
              // onLongPress={() => console.log("LON")}
            />
            <Text style={styles.bottomRowText}>Add some new notifications</Text>
          </TouchableOpacity>
        </View>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#00308F',
    alignItems: 'center',
    justifyContent: 'center',
  },
  getShabad: {
    top: '5%',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#6495ED',
  },
  header: {},
  headerText: {
    fontSize: 24,
    color: '#7FFFD4',
    fontFamily: 'monospace',
  },
  lastRow: {
    flexDirection: 'row',
    // top: "30%",
    // left: "40%",
  },
  list: {
    width: '100%',
    height: '55%',
    // backgroundColor: "blue",
  },
  scroller: {
    flex: 1,
  },
  icon: {
    flex: 1,
    backgroundColor: '#00BFFF',
    borderRadius: 20,
  },
  cancel: {
    flex: 1,
    backgroundColor: 'red',
    borderRadius: 20,
    // width: 110,
    textAlign: 'center',
  },
  bottomRowText: {
    textAlign: 'center',
    fontFamily: 'monospace',
  },
});

export default App;
