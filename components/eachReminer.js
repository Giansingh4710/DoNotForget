import React, {useEffect, useState} from 'react';
import {StyleSheet, View, Text, TouchableOpacity} from 'react-native';

import {Icon} from 'react-native-elements';

import DetailsModal from './notificationDetails';

export default function ReminderItem({
  state,
  dispatch,
  actions,
  // data.id,
  data,
  index,
}) {
  const [detailsModal, setModal] = useState(false);
  const [theSeconds, setSeconds] = useState(data.repeat);

  let initialTime = new Date().getTime();

  async function logNextTriggerDate() {
    const timeLeftTillNotification = Math.round(
      (initialTime + data.repeat * 1000 - new Date().getTime()) / 1000,
    );

    if (timeLeftTillNotification < 1) {
      initialTime += data.repeat * 1000;
    }
    setSeconds(timeLeftTillNotification);
  }

  let intervalId;
  useEffect(() => {
    //for async storage.
    intervalId = setInterval(logNextTriggerDate, 1000);
    return () => {
      clearInterval(intervalId);
    };
  }, []);

  return (
    <TouchableOpacity
      onPress={() => {
        setModal(true);
      }}
      style={
        index % 2 === 0
          ? styles.container
          : {...styles.container, backgroundColor: '#7CB9E8'}
      }>
      <DetailsModal theVisible={detailsModal} setModal={setModal} data={data} />

      {/* <View style={styles.item}>
        {() => {}}
        <Text style={styles.text}>{getTheSetTime()}</Text>
      </View> */}
      <View style={styles.item}>
        <Text style={styles.text}>Title:</Text>
        <Text style={styles.text}>{data.title}</Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Body:</Text>
        <Text style={styles.text}>
          {data.body.length > 50 ? 'Too Long for preview' : data.body}
        </Text>
      </View>
      <View style={styles.item}>
        <Text style={styles.text}>Repeats Every:</Text>
        <Text>sec: {theSeconds}</Text>
      </View>
      {/* <View style={styles.item}>
        <Icon
          name="pencil-outline"
          type="ionicon"
          color="#002D62"
          // size={25}
          onPress={async () => {
            clearInterval(intervalId);
            console.log('deleted: ' + data.id);
            dispatch(actions.deleteReminder(data.id));
          }}
          // onLongPress={() => console.log("LON")}
        />
      </View> */}
      <View style={styles.item}>
        <Icon
          name="trash-outline"
          type="ionicon"
          color="#002D62"
          // size={25}
          onPress={async () => {
            clearInterval(intervalId);
            console.log('deleted: ' + data.id);
            dispatch(actions.deleteReminder(data.id));
          }}
          // onLongPress={() => console.log("LON")}
        />
      </View>
    </TouchableOpacity>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#F0F8FF',
    flexDirection: 'row',
    height: 80,
    borderRadius: 10,
  },
  item: {
    flex: 1,
    padding: 5,
    // left: 10,
    // backgroundColor: "yellow",
  },
  text: {
    fontSize: 14,
    fontFamily: 'sans-serif-condensed',
  },
});
