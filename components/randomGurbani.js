import * as React from "react";
import {
  StyleSheet,
  Modal,
  View,
  Text,
  TouchableOpacity,
  ScrollView,
} from "react-native";

export default function RandomShabad({ theVisible, setModal }) {
  const [theShabad, setShabad] = React.useState("");
  async function getGurbaniJi() {
    let shabad = "";
    await fetch("https://api.gurbaninow.com/v2/shabad/random")
      .then((res) => res.json())
      .then((resJson) => {
        const shabadOLstbj = resJson.shabad;
        for (const index in shabadOLstbj) {
          const gurmukhi = shabadOLstbj[index].line.larivaar.unicode;
          const translation =
            shabadOLstbj[index].line.translation.english.default;
          shabad += gurmukhi + "\n" + translation + "\n";
        }
      });
    // console.log(shabad);
    return shabad;
  }
  React.useEffect(() => {
    getGurbaniJi().then((res) => {
      setShabad(res);
    });
  }, []);
  return (
    <Modal visible={theVisible} animationType="slide">
      <View style={styles.container}>
        <View style={styles.scroller}>
          <ScrollView>
            <Text style={styles.shabad}>{theShabad}</Text>
          </ScrollView>
        </View>
        <TouchableOpacity
          onPress={() => {
            setModal(false);
          }}
        >
          <Text>Go Back</Text>
        </TouchableOpacity>
      </View>
    </Modal>
  );
}
const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "#5072A7",
  },
  scroller: {
    flex: 1,
    padding: 10,
    borderRadius: 30,
    backgroundColor: "#6CB4EE",
  },
  shabad: {
    padding: 10,
    borderRadius: 30,
    textAlign: "center",
    fontSize: 30,
    color: "black",
    backgroundColor: "#6CB4EE",
  },
});
