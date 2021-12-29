import * as React from 'react';
import {StyleSheet, Modal, View} from 'react-native';

import {Icon} from 'react-native-elements';

export default function PlusIconModal({dispatch, actions}) {
  //   const styles = StyleSheet.create(theStyles);
  return (
    <Modal transparent animationType="slide">
      <View style={styles.container}>
        <Icon
          name="add-circle-outline"
          type="ionicon"
          color="#00BFFF"
          size={200}
          onPress={() => {
            dispatch(actions.setInputModal);
          }}
          // onLongPress={() => console.log("LON")}
          // disabled={true}
          // styles={styles}
        />
        {/* <PlusCircleOutlined /> */}
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
});
