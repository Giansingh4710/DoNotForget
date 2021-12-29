import * as React from 'react';
import {StyleSheet, Modal, View, Text, ScrollView} from 'react-native';

import {Icon} from 'react-native-elements';

export default function DetailsModal({theVisible, setModal, data}) {
  //   const styles = StyleSheet.create(theStyles);
  function determineSize(heading, content) {
    //for date obj
    if (typeof content !== typeof 'hi') {
      //if date obj
      content =
        'Date: ' +
        content.toLocaleDateString() +
        '\n Time: ' +
        content.getHours() +
        ':' +
        content.getMinutes();
    }
    let theText = (
      <View style={styles.info}>
        <Text style={styles.headings}> {heading}: </Text>
        <Text style={styles.text}> {content}</Text>
      </View>
    );
    if (content.length > 50) {
      theText = (
        <ScrollView style={styles.scroll}>
          <Text style={styles.headings}> {heading}: </Text>
          <Text style={styles.textInScroll}>{content}</Text>
        </ScrollView>
      );
    }
    return <View style={styles.rows}>{theText}</View>;
  }

  // console.log(data);
  return (
    <Modal
      // transparent
      animationType="fade"
      visible={theVisible}
      onRequestClose={() => setModal(false)}>
      <View style={styles.container}>
        <View style={styles.topRow}>
          <View style={styles.icon}>
            <Icon
              name="backspace-outline"
              type="ionicon"
              size={60}
              onPress={() => {
                setModal(false);
              }}
            />
          </View>
          <Text style={styles.goBack}>Go Back</Text>
        </View>
        {/* <View style={styles.topRow}>
          <Text style={styles.text}>{data.title}</Text>
        </View> */}

        {determineSize('Title', data.title)}
        {determineSize('Body', data.body)}
        {determineSize('Set at', data.notificationSetDate)}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    // justifyContent: "center",
    // alignItems: "center",
    backgroundColor: '#00BFFF',
  },
  topRow: {
    flexDirection: 'row',
    left: -65,
    marginTop: 30,
    // justifyContent: "flex-end",
  },
  icon: {
    flex: 1,
  },
  goBack: {
    fontSize: 50,
  },
  headings: {
    fontSize: 50,
  },
  text: {
    // flex: 1,
    fontSize: 30,
  },
  textInScroll: {
    flex: 1,
    fontSize: 20,
    textAlign: 'center',
  },
  scroll: {
    backgroundColor: '#00b',
    backgroundColor: 'rgba(0,191,205,2)',
    borderRadius: 25,
    // width: 40,
    height: 300,
  },
});
