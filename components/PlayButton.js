import React from "react";
import { Text, Pressable, StyleSheet } from "react-native";
import Icon from "react-native-vector-icons/Ionicons";
class PlayButton extends React.PureComponent {
  render() {
    const { handlePress } = this.props;
    return (
      <Pressable style={styles.PlayIcon} onPress={() => handlePress()}>
        <Icon name={"caret-forward-outline"} size={30} color="white" />
      </Pressable>
    );
  }
}

const styles = StyleSheet.create({
  PlayIcon: {
    alignContent: "center",
    backgroundColor: "#4481FC",
    borderRadius: 50,
    padding: 10,
    width: 50,
  },
});
export default PlayButton;
